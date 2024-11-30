import { describe, it, expect } from "vitest";
import { clsx } from "./clsx";

describe("clsx", () => {
	it("should return an empty string when no arguments are provided", () => {
		expect(clsx()).toBe("");
	});

	it("should concatenate string arguments with a space", () => {
		expect(clsx("foo", "bar")).toBe("foo bar");
	});

	it("should handle a single string argument", () => {
		expect(clsx("foo")).toBe("foo");
	});

	it("should ignore empty strings", () => {
		expect(clsx("foo", "", "bar")).toBe("foo bar");
	});

	it("should concatenate numbers and strings correctly", () => {
		expect(clsx("foo", 42, "bar")).toBe("foo 42 bar");
	});

	it("should ignore falsy values like 0, null, undefined, and false", () => {
		expect(clsx("foo", 0, null, undefined, false, "bar")).toBe("foo bar");
	});

	it("should handle nested arrays of strings and numbers", () => {
		expect(clsx(["foo", "bar", [42, "baz"]])).toBe("foo bar 42 baz");
	});

	it("should handle arrays with falsy values", () => {
		expect(clsx(["foo", 0, null, "bar", undefined])).toBe("foo bar");
	});

	it("should handle arrays within arrays", () => {
		expect(clsx(["foo", ["bar", ["baz"]]])).toBe("foo bar baz");
	});

	it("should handle an object with truthy and falsy properties", () => {
		expect(clsx({ foo: true, bar: false, baz: true })).toBe("foo baz");
	});

	it("should handle multiple objects and concatenate their truthy keys", () => {
		expect(clsx({ foo: true }, { bar: true, baz: false }, { qux: true })).toBe(
			"foo bar qux",
		);
	});

	it("should handle objects within arrays", () => {
		expect(clsx([{ foo: true }, "bar", { baz: false }, "qux"])).toBe(
			"foo bar qux",
		);
	});

	it("should handle deeply nested arrays and objects", () => {
		const input = [
			"foo",
			["bar", { baz: true, qux: false }],
			[{ foo2: true }, "baz2"],
			"end",
		];
		expect(clsx(input)).toBe("foo bar baz foo2 baz2 end");
	});

	it("should handle mixed types (strings, numbers, arrays, and objects)", () => {
		expect(clsx("foo", 42, { bar: true }, ["baz", { qux: false }])).toBe(
			"foo 42 bar baz",
		);
	});

	it("should handle object keys with numeric values (truthy)", () => {
		expect(clsx({ 1: true, 2: false, 3: true })).toBe("1 3");
	});
});
