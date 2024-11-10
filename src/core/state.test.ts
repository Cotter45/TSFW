import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";
import { createState, createPersistentState } from "./state";
import { TSFWState } from "./state";

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
  });
});
