type Listener = () => void;
type ListenerOnChangeEvent<T> = (state: T) => void;

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
  private storageType: "local" | "session" | "idb" | null;

  constructor(
    initialState: T,
    key: string,
    storageType: "local" | "session" | "idb" | null = null,
    validator?: (state: Partial<T>) => boolean
  ) {
    this.key = key;
    this.validator = validator;
    this.storageType = storageType;

    this.proxy = new Proxy(initialState, {
      set: (target, property, value) => {
        if (
          this.validator &&
          !this.validator({ [property as keyof T]: value } as Partial<T>)
        ) {
          console.warn(
            `Storage: ${key} validation failed for property "${String(
              property
            )}" with value: ${value}.`
          );
          return false;
        }

        (target as T)[property as keyof T] = value;

        if (this.broadcastingEnabled && this.storageType) {
          this.broadcastState();
          this.saveToStorage();
        } else {
          this.notifyListeners();
        }

        return true;
      },
    }) as T;

    this.loadFromStorage().then(() => {
      this.broadcastingEnabled = true;
    });
    this.listenForBroadcast();
  }

  getState(): T {
    return this.proxy as T;
  }

  setState(
    updates: Partial<T> | { index: number; data: Partial<T[keyof T]> }
  ): void {
    if (this.validator && !this.validator(updates as Partial<T>)) {
      console.warn(`Validation failed for updates:`, updates);
      return;
    }

    if (this.isIndexedUpdate(updates)) {
      const { index, data } = updates;
      if (Array.isArray(this.proxy) && this.proxy[index] !== undefined) {
        (this.proxy as any)[index] = { ...this.proxy[index], ...data };
      }
    } else {
      Object.assign(this.proxy, updates);
    }

    if (this.broadcastingEnabled && this.storageType) {
      this.notifyListeners();
      this.broadcastState();
    }

    if (this.storageType) {
      this.saveToStorage();
    }
  }

  subscribe(
    listener: Listener | ListenerOnChangeEvent<T>,
    id?: string
  ): () => void {
    const uniqueId = id || this.key;

    const isAlreadySubscribed =
      this.listeners.has(uniqueId) || this.listenersOnChangeEvent.has(uniqueId);

    if (isAlreadySubscribed) {
      return () => {};
    }

    if (listener.length === 1) {
      this.listenersOnChangeEvent.set(
        uniqueId,
        listener as ListenerOnChangeEvent<T>
      );
      (listener as ListenerOnChangeEvent<T>)(this.proxy);
      return () => this.listenersOnChangeEvent.delete(uniqueId);
    }

    this.listeners.set(uniqueId, listener as Listener);
    return () => this.listeners.delete(uniqueId);
  }

  private notifyListeners() {
    this.listeners.forEach((listener) => listener());
    this.listenersOnChangeEvent.forEach((listener) =>
      listener(this.proxy as T)
    );
  }

  private broadcastState() {
    const tempChannel = new BroadcastChannel(this.key);
    tempChannel.postMessage({
      state: JSON.stringify(this.proxy),
      tabId: uniqueTabId,
    });
    tempChannel.close();
  }

  private listenForBroadcast() {
    const listenerChannel = new BroadcastChannel(this.key);
    listenerChannel.onmessage = (event) => {
      const { state, tabId } = event.data;
      if (tabId !== uniqueTabId) {
        this.applyBroadcast(JSON.parse(state));
      }
    };
  }

  private applyBroadcast(newState: T) {
    this.broadcastingEnabled = false;
    Object.assign(this.proxy, newState);
    this.notifyListeners();
    this.broadcastingEnabled = true;
  }

  private isIndexedUpdate(
    updates: Partial<T> | { index: number; data: Partial<T[keyof T]> }
  ): updates is { index: number; data: Partial<T[keyof T]> } {
    return (
      (updates as { index: number; data: Partial<T[keyof T]> }).index !==
      undefined
    );
  }

  private saveToStorage() {
    const currentState = this.proxy;
    if (this.storageType === "local") {
      localStorage.setItem(this.key, JSON.stringify(currentState));
    } else if (this.storageType === "session") {
      sessionStorage.setItem(this.key, JSON.stringify(currentState));
    } else if (this.storageType === "idb") {
      saveToIndexedDB(this.key, currentState);
    }
  }

  private async loadFromStorage() {
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
    } else if (this.storageType === "idb") {
      const storedState = await loadFromIndexedDB(this.key, this.proxy);
      Object.assign(this.proxy, storedState);
    }
  }
}

export function createState<T extends object>(
  key: string,
  initialState: T,
  validator?: (state: Partial<T>) => boolean
): TSFWState<T> {
  if (stateCache[key]) {
    return stateCache[key] as TSFWState<T>;
  }

  const stateInstance = new TSFWState<T>(initialState, key, null, validator);
  stateCache[key] = stateInstance;

  return stateInstance;
}

function loadFromLocal<T>(key: string, defaultState: T): T {
  const savedState = localStorage.getItem(key);
  return savedState ? JSON.parse(savedState) : defaultState;
}

function loadFromSession<T>(key: string, defaultState: T): T {
  const savedState = sessionStorage.getItem(key);
  return savedState ? JSON.parse(savedState) : defaultState;
}

export async function saveToIndexedDB(key: string, state: any) {
  const db = await openDatabase();
  const tx = db.transaction("states", "readwrite");
  const store = tx.objectStore("states");
  try {
    await store.put(JSON.stringify(state), key);
  } catch (error) {
    console.error(`[IndexedDB] Failed to save state for key "${key}":`, error);
  }
}

async function loadFromIndexedDB<T>(key: string, defaultState: T): Promise<T> {
  const db = await openDatabase();
  const tx = db.transaction("states", "readonly");
  const store = tx.objectStore("states");
  const request = store.get(key);

  return new Promise((resolve) => {
    request.onsuccess = () => {
      const result = request.result ? JSON.parse(request.result) : defaultState;
      resolve(result);
    };
    request.onerror = () => {
      console.warn(`[IndexedDB] Failed to load state for key "${key}"`);
      resolve(defaultState);
    };
  });
}

function openDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("tsfw-db", 1);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains("states")) {
        db.createObjectStore("states");
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export function createPersistentState<T extends object>(
  key: string,
  storageType: "local" | "session" | "idb" = "local",
  initialState: T,
  validator?: (state: Partial<T>) => boolean
): TSFWState<T> {
  if (stateCache[key]) {
    return stateCache[key] as TSFWState<T>;
  }

  let startState: T | Promise<T>;

  if (storageType === "local") {
    startState = loadFromLocal(key, initialState);
  } else if (storageType === "session") {
    startState = loadFromSession(key, initialState);
  } else {
    startState = loadFromIndexedDB(key, initialState);
  }

  const stateInstance = new TSFWState<T>(
    startState instanceof Promise ? initialState : startState,
    key,
    storageType,
    validator
  );

  stateCache[key] = stateInstance;

  if (storageType === "idb" && startState instanceof Promise) {
    startState.then((resolvedState) => {
      stateInstance.setState(resolvedState);
    });
  }

  return stateInstance;
}
