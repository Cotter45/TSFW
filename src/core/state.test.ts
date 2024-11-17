import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";
import { createState, createPersistentState } from "./state";
import { TSFWState } from "./state";
import "fake-indexeddb/auto";

const MockBroadcastChannel = vi.fn(function (name) {
  // @ts-ignore
  this.name = name;
  // @ts-ignore
  this.postMessage = vi.fn();
  // @ts-ignore
  this.close = vi.fn();
  // @ts-ignore
  this.onmessage = null;

  // @ts-ignore
  this.dispatchEvent = (event: Event) => {
    try {
      // @ts-ignore
      if (this.onmessage) {
        // @ts-ignore
        this.onmessage(event);
      }
    } catch (e) {
      console.error(e);
    }
  };
}) as unknown as typeof BroadcastChannel;

// @ts-ignore
MockBroadcastChannel.prototype.triggerMessage = function (data: any) {
  if (this.onmessage) {
    const event = new Event("message");
    Object.defineProperty(event, "data", { value: data });
    // @ts-ignore
    this.onmessage(event);
  }
};

global.BroadcastChannel = MockBroadcastChannel;

describe("TSFWState", () => {
  let instance: TSFWState<any>;
  const initialState = { foo: "bar" };
  const key = "testKey";

  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();
    vi.clearAllMocks();
    instance = createState(key, initialState);
  });

  describe("getState", () => {
    it("should return the current state", () => {
      expect(instance.getState()).toEqual(initialState);
    });

    it("should wait for IndexedDB to load before accessing state", async () => {
      const state = createPersistentState("idbtestKey", "idb", {
        foo: "default",
      });

      let isReady = false;
      state.whenReady().then(() => (isReady = true));

      expect(isReady).toBe(false);

      await state.whenReady();
      state.setState({ foo: "loadedFromIDB" });
      expect(isReady).toBe(true);
      await new Promise((resolve) => setTimeout(resolve, 0));
      expect(state.getState()).toEqual({ foo: "loadedFromIDB" });
    });

    it("should log a warning if state is not fully loaded from IndexedDB", () => {
      const consoleMock = vi
        .spyOn(console, "warn")
        .mockImplementation(() => undefined);

      const state = createPersistentState("idbtestKey2", "idb", {
        foo: "default",
      });
      state.getState();
      expect(consoleMock).toHaveBeenCalledWith(
        "State is not fully loaded from IndexedDB yet."
      );
    });
  });

  describe("setState", () => {
    it("should update state with new values", () => {
      instance.setState({ foo: "baz" });
      expect(instance.getState()).toEqual({ foo: "baz" });
    });

    it("should merge state with new values", () => {
      const newInstance = createState<any>("mergeTest", { foo: "bar" });
      newInstance.setState({ bar: "baz" });
      expect(newInstance.getState()).toEqual({ foo: "bar", bar: "baz" });
    });

    it("should update state with indexed update", () => {
      const newInstance = createState("indexedTest", [{ foo: "bar" }]);
      newInstance.setState({ index: 0, data: { foo: "baz" } });
      expect(newInstance.getState()).toEqual([{ foo: "baz" }]);
    });

    it("should update state with indexed update on array", () => {
      const instance2 = createState("arrayTest", [{ foo: "bar" }]);
      instance2.setState({ index: 0, data: { foo: "baz" } });
      expect(instance2.getState()).toEqual([{ foo: "baz" }]);
    });

    it("should update arrays without indexed update", () => {
      const instance2 = createState("arrayTest2", [{ foo: "bar" }]);
      instance2.setState([{ foo: "baz" }]);
      expect(instance2.getState()).toEqual([{ foo: "baz" }]);
    });
  });

  describe("loadFromStorage", () => {
    it("should load state from localStorage", () => {
      localStorage.setItem("localTest", JSON.stringify({ foo: "baz" }));
      const instance = createPersistentState("localTest", "local", {
        foo: "bar",
      });

      expect(instance.getState()).toEqual({ foo: "baz" });
    });

    it("should load state from sessionStorage", () => {
      sessionStorage.setItem("sessionTest", JSON.stringify({ foo: "baz" }));
      const instance = createPersistentState("sessionTest", "session", {
        foo: "bar",
      });

      expect(instance.getState()).toEqual({ foo: "baz" });
    });

    it("should load state from IndexedDB", async () => {
      const instance = createPersistentState("idbTest", "idb", { foo: "bar" });
      instance.setState({ foo: "baz" });

      const newInstance = createPersistentState("idbTest", "idb", {
        foo: "bar",
      });
      await newInstance.whenReady();
      expect(newInstance.getState()).toEqual({ foo: "baz" });
    });
  });

  describe("saveToStorage", () => {
    it("should save and load state from localStorage", () => {
      const instance = createPersistentState("localTest", "local", {
        foo: "bar",
      });
      instance.setState({ foo: "baz" });
      const savedState = JSON.parse(localStorage.getItem("localTest")!);
      expect(savedState).toEqual({ foo: "baz" });
    });

    it("should save and load state from sessionStorage", () => {
      const instance = createPersistentState("sessionTest", "session", {
        foo: "bar",
      });
      instance.setState({ foo: "baz" });
      const savedState = JSON.parse(sessionStorage.getItem("sessionTest")!);
      expect(savedState).toEqual({ foo: "baz" });
    });
  });

  describe("validator", () => {
    it("should not update state and throw error if validator returns false", () => {
      const instance = createState(
        "validatorTest",
        { foo: "bar" },
        () => false
      );
      expect(() => instance.setState({ foo: "baz" })).toThrow();
      expect(instance.getState()).toEqual({ foo: "bar" });
    });

    it("should update state if validator returns true", () => {
      const instance = createState(
        "validatorTest2",
        { foo: "bar" },
        () => true
      );
      instance.setState({ foo: "baz" });
      expect(instance.getState()).toEqual({ foo: "baz" });
    });
  });

  describe("subscribe", () => {
    it("should not add duplicate listeners", () => {
      const listener = vi.fn();
      instance.subscribe(listener);
      instance.subscribe(listener);
      instance.setState({ foo: "baz" });
      expect(listener).toHaveBeenCalledTimes(1);
    });

    it("should trigger ListenerOnChangeEvent immediately and on state change", () => {
      const newInstance = createState("testKey2", { foo: "bar" });
      const listener = vi.fn();
      newInstance.subscribe((state) => listener(state.foo));
      expect(listener).toHaveBeenCalledWith("bar");
      newInstance.setState({ foo: "baz" });
      expect(listener).toHaveBeenCalledWith("baz");
    });

    it("should notify all listeners on state change", () => {
      const newInstance = createState("testKey3", { foo: "bar" });
      const listenerOnChange = vi.fn();
      newInstance.subscribe((state) => listenerOnChange(state.foo));
      newInstance.setState({ foo: "baz" });
      expect(listenerOnChange).toHaveBeenCalledWith("baz");
    });
  });

  describe("broadcasting state changes", () => {
    it("should broadcast state changes", () => {
      const broadcastInstance = createPersistentState(
        "broadcastTest",
        "local",
        {
          foo: "bar",
        }
      );

      // @ts-ignore
      const mockChannel = MockBroadcastChannel.mock.instances[0];

      broadcastInstance.setState({ foo: "baz" });

      expect(mockChannel.postMessage).toHaveBeenCalledWith({
        state: JSON.stringify({ foo: "baz" }),
        tabId: expect.any(String),
      });
    });

    it("should update state when receiving broadcast message", () => {
      const broadcastInstance = createPersistentState(
        "broadcastTestTwo",
        "local",
        {
          foo: "bar",
        }
      );

      // @ts-ignore
      const mockChannel = MockBroadcastChannel.mock.instances[0];

      expect(mockChannel).toBeDefined();

      const event = new Event("message");
      Object.defineProperty(event, "data", {
        value: {
          state: JSON.stringify({ foo: "baz" }),
          tabId: "differentTabId",
        },
      });

      try {
        mockChannel.dispatchEvent(event);
      } catch (e) {
        console.error(e);
      }

      expect(broadcastInstance.getState()).toEqual({ foo: "baz" });
    });

    it("should update array state when receiving broadcast message", () => {
      const broadcastInstance = createPersistentState(
        "broadcastTestThree",
        "local",
        [{ foo: "bar" }]
      );

      // @ts-ignore
      const mockChannel = MockBroadcastChannel.mock.instances[0];

      expect(mockChannel).toBeDefined();

      const event = new Event("message");
      Object.defineProperty(event, "data", {
        value: {
          state: JSON.stringify([{ foo: "baz" }]),
          tabId: "differentTabId",
        },
      });

      try {
        mockChannel.dispatchEvent(event);
      } catch (e) {
        console.error(e);
      }

      expect(broadcastInstance.getState()).toEqual([{ foo: "baz" }]);
    });

    it("should initialize BroadcastChannel and load from storage", () => {
      const spyLoadFromStorage = vi.spyOn(
        TSFWState.prototype as any,
        "loadFromStorage"
      );
      const instance = createPersistentState("constructorTest", "local", {
        foo: "bar",
      });
      expect(spyLoadFromStorage).toHaveBeenCalled();
      expect(MockBroadcastChannel).toHaveBeenCalledWith("constructorTest");
    });

    it("should reuse existing broadcast channel for state updates", () => {
      const instance = createPersistentState("broadcastReuseTest", "local", {
        foo: "bar",
      });
      const broadcastSpy = vi.spyOn(instance as any, "broadcastChannel", "get");
      instance.setState({ foo: "baz" });
      expect(broadcastSpy).toBeCalled();
    });
  });

  describe("not recreating state", () => {
    it("should return the same state instance for the same key", () => {
      const instance2 = createPersistentState(key, "local", { foo: "baz" });
      const instance3 = createPersistentState(key, "local", { foo: "baz" });
      expect(instance2).toBe(instance3);
    });
  });
});
