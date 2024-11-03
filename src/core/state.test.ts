import { describe, it, expect, beforeEach, vi } from "vitest";
import { createState, createPersistentState } from "./state";
import { TSFWState } from "./state";
import { afterEach } from "node:test";

global.BroadcastChannel = vi.fn(() => ({
  postMessage: vi.fn(),
  close: vi.fn(),
  onmessage: null,
})) as any;

describe("TSFWState", () => {
  let instance: TSFWState<any>;
  const initialState = { foo: "bar" };
  const key = "testKey";

  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();
    instance = createState(key, initialState);
  });

  describe("getState", () => {
    it("should return the current state", () => {
      expect(instance.getState()).toEqual(initialState);
    });
  });

  describe("setState", () => {
    it("should update state with new values", () => {
      instance.setState({ foo: "baz" });
      expect(instance.getState()).toEqual({ foo: "baz" });
    });

    it("should merge state for partial updates", () => {
      const instance = createState("mergeTest", { foo: "bar" });
      // @ts-expect-error
      instance.setState({ newKey: "newValue" });
      expect(instance.getState()).toEqual({ foo: "bar", newKey: "newValue" });
    });

    it("should ignore invalid updates if validator fails", () => {
      const invalidInstance = createState(
        key,
        initialState,
        (state) => state.foo === "valid"
      );
      invalidInstance.setState({ foo: "invalid" });
      expect(invalidInstance.getState()).toEqual(initialState);
    });
  });

  describe("subscribe", () => {
    it("should notify listeners on state update", () => {
      const listener = vi.fn();
      instance.subscribe(listener);
      instance.setState({ foo: "baz" });
      expect(listener).toHaveBeenCalled();
    });

    it("should return an unsubscribe function", () => {
      const listener = vi.fn();
      const unsubscribe = instance.subscribe(listener);
      unsubscribe();
      instance.setState({ foo: "baz" });
      expect(listener).not.toHaveBeenCalled();
    });
  });

  describe("saveToStorage", () => {
    it("should save state to localStorage", () => {
      localStorage.clear();
      const localState = createPersistentState(
        "localTest",
        { foo: "bar" },
        "local"
      );
      localState.setState({ foo: "baz" });
      expect(JSON.parse(localStorage.getItem("localTest")!)).toEqual({
        foo: "baz",
      });
    });

    it("should save state to sessionStorage", () => {
      sessionStorage.clear();
      const sessionState = createPersistentState(
        "sessionTest",
        { foo: "bar" },
        "session"
      );
      sessionState.setState({ foo: "baz" });
      expect(JSON.parse(sessionStorage.getItem("sessionTest")!)).toEqual({
        foo: "baz",
      });
    });

    it("should not save to storage if storageType is null", () => {
      instance.setState({ foo: "baz" });
      expect(localStorage.getItem(key)).toBeNull();
      expect(sessionStorage.getItem(key)).toBeNull();
    });
  });

  describe("broadcasting", () => {
    it("should broadcast state changes across tabs", async () => {
      const listener = vi.fn();
      const instance1 = createState("broadcastTest", { foo: "bar" });
      const instance2 = createState("broadcastTest", { foo: "bar" });

      instance2.subscribe(listener);
      instance1.setState({ foo: "baz" });

      await new Promise((resolve) => setTimeout(resolve, 100)); // Wait for broadcast

      expect(listener).toHaveBeenCalled();
      expect(instance2.getState()).toEqual({ foo: "baz" });
    });
  });

  describe("listenersOnChangeEvent", () => {
    it("should call onChange listeners with updated state", () => {
      const onChangeListener = vi.fn();
      const instance = createState("onChangeTest", { foo: "bar" });

      const unsubscribe = instance.subscribe(onChangeListener);

      instance.setState({ foo: "updated" });

      expect(onChangeListener).toHaveBeenCalledTimes(2);
      expect(onChangeListener).toHaveBeenCalledWith();

      unsubscribe();
      instance.setState({ foo: "final" });
      expect(onChangeListener).toHaveBeenCalledTimes(2);
    });
  });

  describe("storage loading", () => {
    it("should load state from localStorage on creation", () => {
      localStorage.setItem("loadTest", JSON.stringify({ foo: "baz" }));
      const loadedInstance = createPersistentState(
        "loadTest",
        { foo: "bar" },
        "local"
      );
      expect(loadedInstance.getState()).toEqual({ foo: "baz" });
    });

    it("should load state from sessionStorage on creation", () => {
      sessionStorage.setItem("sessionLoadTest", JSON.stringify({ foo: "baz" }));
      const loadedInstance = createPersistentState(
        "sessionLoadTest",
        { foo: "bar" },
        "session"
      );
      expect(loadedInstance.getState()).toEqual({ foo: "baz" });
    });
  });

  describe("proxy behavior", () => {
    it("should update listeners when setting nested properties", () => {
      const nestedInstance = createState("nestedKey", { nested: { value: 1 } });
      const listener = vi.fn();
      nestedInstance.subscribe(listener);

      nestedInstance.setState({ nested: { value: 2 } });
      expect(listener).toHaveBeenCalled();
      expect(nestedInstance.getState().nested.value).toBe(2);
    });
  });

  describe("DOM Binding", () => {
    it("should bind state changes to elements with data-bind attribute", () => {
      document.body.innerHTML = `<input type="text" data-bind="${key}.foo" />`;
      instance.setState({ foo: "boundValue" });

      const inputElement = document.querySelector(
        `[data-bind="${key}.foo"]`
      ) as HTMLInputElement;
      expect(inputElement.value).toBe("boundValue");
    });
  });

  describe("TSFWState Additional Tests", () => {
    let instance: TSFWState<any>;
    const initialState = { foo: "bar", nested: { inner: "value" } };

    beforeEach(() => {
      localStorage.clear();
      sessionStorage.clear();
      instance = createState("testKey", initialState);
    });

    afterEach(() => {
      // Clear any lingering BroadcastChannels or IndexedDB connections
      vi.clearAllMocks();
    });

    describe("broadcastState functionality", () => {
      it("should broadcast state changes across different instances in tabs", async () => {
        const listener = vi.fn();
        const instance1 = createPersistentState(
          "broadcastKey",
          { foo: "bar" },
          "local"
        );
        const instance2 = createPersistentState(
          "broadcastKey",
          { foo: "bar" },
          "local"
        );

        instance2.subscribe(listener);
        instance1.setState({ foo: "baz" });

        await new Promise((resolve) => setTimeout(resolve, 50)); // Reduced delay to speed up test

        expect(listener).toHaveBeenCalled();
        expect(instance2.getState()).toEqual({ foo: "baz" });
      });
    });

    // Mock IndexedDB for tests to avoid hanging
    describe("Storage loading with different storage types", () => {
      it("should load state from localStorage on creation", () => {
        localStorage.setItem(
          "loadLocalTest",
          JSON.stringify({ foo: "loadedValue" })
        );
        const loadedInstance = createPersistentState(
          "loadLocalTest",
          initialState,
          "local"
        );
        expect(loadedInstance.getState()).toEqual({ foo: "loadedValue" });
      });
    });
  });
});
