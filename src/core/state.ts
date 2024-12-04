import { Logger } from "./logger";

type Listener = () => void;
type ListenerOnChangeEvent<T> = (newState: T, oldState: T) => void;

export const tsfwStateLogger = new Logger("TSFW State");
const stateCache: Record<string, TSFWState<any>> = {};
const uniqueTabId = Math.random().toString(36).substring(2, 11);
export const storageTypes = [
	"memory",
	"local",
	"session",
	"idb",
	"none",
] as const;

export class TSFWState<T extends object> {
	private listeners: Map<string, Listener> = new Map();
	private listenersOnChangeEvent: Map<string, ListenerOnChangeEvent<T>> =
		new Map();
	private key: string;
	private proxy: T;
	private validator?: (state: Partial<T>) => boolean;
	private broadcastingEnabled = false;
	private broadcastChannel: BroadcastChannel | null = null;
	private storageType: "local" | "session" | "idb" | null;
	private isReady = false;
	private readyPromise: Promise<void>;

	constructor(
		initialState: T,
		key: string,
		storageType: "local" | "session" | "idb" | null = null,
		validator?: (state: Partial<T>) => boolean,
	) {
		this.key = key;
		this.validator = validator;
		this.storageType = storageType;

		this.proxy = new Proxy(initialState, {
			set: (target, property, value) => {
				(target as T)[property as keyof T] = value;
				return true;
			},
		}) as T;

		if (storageType === "idb") {
			this.readyPromise = this.loadFromIndexedDB();
		} else {
			this.loadFromStorage();
			this.readyPromise = Promise.resolve();
		}

		this.broadcastingEnabled = true;
		this.broadcastChannel = new BroadcastChannel(this.key);
		this.listenForBroadcast();
	}

	async whenReady(): Promise<void> {
		await this.readyPromise;
	}

	getState(): T {
		if (this.storageType === "idb" && !this.isReady) {
			tsfwStateLogger.warn("State is not fully loaded from IndexedDB yet.");
		}
		return this.proxy as T;
	}

	setState(
		updates: Partial<T> | { index: number; data: Partial<T[keyof T]> },
	): void {
		if (this.validator && !this.validator(updates as Partial<T>)) {
			throw new Error(
				`Validation failed for updates: ${JSON.stringify(updates)}`,
			);
		}

		const oldState = JSON.parse(JSON.stringify(this.proxy)); // Deep clone to capture the old state

		if (this.isIndexedUpdate(updates)) {
			const { index, data } = updates;
			if (Array.isArray(this.proxy) && this.proxy[index] !== undefined) {
				(this.proxy as any)[index] = { ...this.proxy[index], ...data };
			}
		} else {
			if (Array.isArray(this.proxy)) {
				this.proxy.length = 0;
				this.proxy.push(...(updates as unknown as T[]));
			} else {
				Object.assign(this.proxy, updates);
			}
		}

		this.notifyListeners(oldState);

		if (this.broadcastingEnabled) {
			this.broadcastState();
		}

		if (this.storageType) {
			this.saveToStorage();
		}

		if (this.storageType === "idb") {
			this.saveToIndexedDB();
		}
	}

	subscribe(
		listener: Listener | ListenerOnChangeEvent<T>,
		id?: string,
	): () => void {
		const uniqueId = id || this.key;

		const isAlreadySubscribed =
			this.listeners.has(uniqueId) || this.listenersOnChangeEvent.has(uniqueId);

		if (isAlreadySubscribed) {
			return () => {};
		}

		if (listener.length >= 1) {
			this.listenersOnChangeEvent.set(
				uniqueId,
				listener as ListenerOnChangeEvent<T>,
			);
			(listener as ListenerOnChangeEvent<T>)(this.proxy, this.proxy);
			return () => this.listenersOnChangeEvent.delete(uniqueId);
		}

		this.listeners.set(uniqueId, listener as Listener);
		return () => this.listeners.delete(uniqueId);
	}

	private notifyListeners(oldState: T) {
		for (const listener of this.listeners.values()) {
			listener();
		}

		for (const listener of this.listenersOnChangeEvent.values()) {
			listener(this.proxy, oldState);
		}
	}

	private broadcastState() {
		if (!this.broadcastChannel) return;

		this.broadcastChannel.postMessage({
			state: JSON.stringify(this.proxy),
			tabId: uniqueTabId,
		});
	}

	private listenForBroadcast() {
		if (!this.broadcastChannel) return;

		this.broadcastChannel.onmessage = (event) => {
			const { state, tabId } = event.data;

			if (tabId === uniqueTabId) return;

			this.applyBroadcast(JSON.parse(state));
		};
	}

	private applyBroadcast(newState: T) {
		const oldState = JSON.parse(JSON.stringify(this.proxy));

		this.broadcastingEnabled = false;
		if (Array.isArray(this.proxy)) {
			this.proxy.length = 0;
			this.proxy.push(...(newState as unknown as T[]));
		} else {
			Object.assign(this.proxy, newState);
		}
		this.notifyListeners(oldState);
		this.broadcastingEnabled = true;
	}

	private saveToStorage() {
		const currentState = this.proxy;
		if (this.storageType === "local") {
			localStorage.setItem(this.key, JSON.stringify(currentState));
		} else if (this.storageType === "session") {
			sessionStorage.setItem(this.key, JSON.stringify(currentState));
		}
	}

	private loadFromStorage() {
		if (this.storageType === "local") {
			const storedState = localStorage.getItem(this.key);
			if (storedState) {
				Object.assign(this.proxy, JSON.parse(storedState));
			}
		} else if (this.storageType === "session") {
			const storedState = sessionStorage.getItem(this.key);
			if (storedState) {
				Object.assign(this.proxy, JSON.parse(storedState));
			}
		}
	}

	private async loadFromIndexedDB() {
		const storedState = await loadFromIndexedDB(this.key, this.proxy);
		const copy = JSON.parse(JSON.stringify(storedState));
		Object.assign(this.proxy, storedState);
		this.isReady = true;
		this.notifyListeners(copy);
	}

	private async saveToIndexedDB() {
		await saveToIndexedDB(this.key, this.proxy);
	}

	private isIndexedUpdate(
		updates: Partial<T> | { index: number; data: Partial<T[keyof T]> },
	): updates is { index: number; data: Partial<T[keyof T]> } {
		return (
			updates as { index: number; data: Partial<T[keyof T]> }
		).hasOwnProperty("index");
	}
}

async function openDatabase() {
	return new Promise<IDBDatabase>((resolve, reject) => {
		const request = indexedDB.open("TSFWStateDB", 1);
		request.onerror = () => reject(request.error);
		request.onsuccess = () => resolve(request.result);
		request.onupgradeneeded = () => {
			const db = request.result;
			if (!db.objectStoreNames.contains("states")) {
				db.createObjectStore("states", { keyPath: "key" });
			}
		};
	});
}

async function saveToIndexedDB(key: string, state: object) {
	const db = await openDatabase();
	const transaction = db.transaction("states", "readwrite");
	const store = transaction.objectStore("states");

	// Serialize the state before storing
	const serializableState = JSON.parse(JSON.stringify(state));

	store.put({ key, state: serializableState });
	return new Promise<void>((resolve, reject) => {
		transaction.oncomplete = () => resolve();
		transaction.onerror = () => reject(transaction.error);
	});
}

async function loadFromIndexedDB<T>(key: string, defaultState: T): Promise<T> {
	const db = await openDatabase();
	const transaction = db.transaction("states", "readonly");
	const store = transaction.objectStore("states");
	return new Promise<T>((resolve) => {
		const request = store.get(key);
		request.onsuccess = () => {
			// Return the stored state or the default state
			resolve(request.result?.state || defaultState);
		};
		request.onerror = () => resolve(defaultState);
	});
}

function loadFromLocal<T>(key: string, defaultState: T): T {
	const savedState = localStorage.getItem(key);
	return savedState ? JSON.parse(savedState) : defaultState;
}

function loadFromSession<T>(key: string, defaultState: T): T {
	const savedState = sessionStorage.getItem(key);
	return savedState ? JSON.parse(savedState) : defaultState;
}

export function createState<T extends object>(
	key: string,
	initialState: T,
	validator?: (state: Partial<T>) => boolean,
): TSFWState<T> {
	if (stateCache[key]) {
		return stateCache[key] as TSFWState<T>;
	}

	const stateInstance = new TSFWState<T>(initialState, key, null, validator);
	stateCache[key] = stateInstance;

	return stateInstance;
}

export function createPersistentState<T extends object>(
	key: string,
	storageType: "local" | "session" | "idb" = "local",
	initialState: T,
	validator?: (state: Partial<T>) => boolean,
): TSFWState<T> {
	if (stateCache[key]) {
		return stateCache[key] as TSFWState<T>;
	}

	const startState =
		storageType === "local"
			? loadFromLocal(key, initialState)
			: storageType === "session"
				? loadFromSession(key, initialState)
				: initialState; // For idb, load asynchronously later

	const stateInstance = new TSFWState<T>(
		startState,
		key,
		storageType,
		validator,
	);
	stateCache[key] = stateInstance;

	return stateInstance;
}
