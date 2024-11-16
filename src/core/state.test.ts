import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";
import { createState, createPersistentState } from "./state";
import { TSFWState } from "./state";
import "fake-indexeddb/auto";

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
      const instance = createState<any>("mergeTest", { foo: "bar" });
      instance.setState({ newKey: "newValue" });
      expect(instance.getState()).toEqual({ foo: "bar", newKey: "newValue" });
    });

    it("should ignore invalid updates if validator fails", () => {
      const invalidInstance = createState(
        key,
        initialState,
        (state) => state.foo !== "invalid"
      );
      invalidInstance.setState({ foo: "invalid" });
      expect(invalidInstance.getState()).toEqual(initialState);
    });

    it("should allow valid updates if validator passes", () => {
      const validInstance = createState(
        key,
        initialState,
        (state) => state.foo === "bar"
      );
      validInstance.setState({ foo: "bar" });
      expect(validInstance.getState()).toEqual({ foo: "bar" });
    });

    it("should update state for indexed updates", () => {
      const indexedInstance = createState<any>("indexedTest", [{ foo: "bar" }]);
      indexedInstance.setState({ index: 0, data: { foo: "baz" } });
      expect(indexedInstance.getState()).toEqual([{ foo: "baz" }]);
    });

    it("should throw error for updates that fail validation", () => {
      const invalidInstance = createState(
        "errorTest",
        initialState,
        (state) => state.foo !== "invalid"
      );

      expect(() => invalidInstance.setState({ foo: "invalid" })).toThrowError();
    });
  });

  describe("saveToStorage", () => {
    it("should save state to localStorage", () => {
      const localState = createPersistentState("localTest", "local", {
        foo: "bar",
      });
      localState.setState({ foo: "baz" });
      expect(JSON.parse(localStorage.getItem("localTest")!)).toEqual({
        foo: "baz",
      });
    });

    it("should save state to sessionStorage", async () => {
      const sessionState = createPersistentState("sessionTest", "session", {
        foo: "bar",
      });
      sessionState.setState({ foo: "baz" });
      await new Promise((resolve) => setTimeout(resolve, 50));
      expect(JSON.parse(sessionStorage.getItem("sessionTest")!)).toEqual({
        foo: "baz",
      });
    });

    it("should save state to indexedDB", async () => {
      const idbState = createPersistentState("idbTest", "idb", { foo: "bar" });
      expect(idbState.getState()).toEqual({ foo: "bar" });
      idbState.setState({ foo: "baz" });
      await new Promise((resolve) => setTimeout(resolve, 100));
      expect(idbState.getState()).toEqual({ foo: "baz" });
    });
  });

  describe("loadFromStorage", () => {
    it("should load state from localStorage", () => {
      localStorage.setItem("loadLocal", JSON.stringify({ foo: "baz" }));
      const localState = createPersistentState("loadLocal", "local", {
        foo: "bar",
      });
      expect(localState.getState()).toEqual({ foo: "baz" });
    });

    it("should load state from sessionStorage", () => {
      sessionStorage.setItem("loadSession", JSON.stringify({ foo: "baz" }));
      const sessionState = createPersistentState("loadSession", "session", {
        foo: "bar",
      });
      expect(sessionState.getState()).toEqual({ foo: "baz" });
    });

    it("should load state from indexedDB", async () => {
      await new Promise((resolve) => setTimeout(resolve, 100));
      const idbState = createPersistentState("loadIdb", "idb", { foo: "bar" });
      expect(idbState.getState()).toEqual({ foo: "bar" });
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
