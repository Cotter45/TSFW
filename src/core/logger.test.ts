import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { Logger, getFileNameFromStack, formatArgs, levels } from "./logger";

describe("Logger", () => {
  let logger: Logger;
  let mockConsoleLog: any;
  let mockConsoleWarn: any;
  let mockConsoleError: any;

  beforeEach(() => {
    logger = new Logger("TestLogger", levels.DEBUG);
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2024-12-03T12:00:00Z")); // Set fixed time

    mockConsoleLog = vi.spyOn(console, "log").mockImplementation(() => {});
    mockConsoleWarn = vi.spyOn(console, "warn").mockImplementation(() => {});
    mockConsoleError = vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.clearAllTimers();
  });

  describe("Constructor", () => {
    it("should initialize with the correct name and level", () => {
      expect(logger.name).toBe("TestLogger");
      expect(logger.level).toBe(levels.DEBUG);
    });
  });

  describe("log()", () => {
    it("should log a DEBUG message with the correct format", () => {
      logger.log("DEBUG", "Debug message");

      expect(mockConsoleLog).toHaveBeenCalledTimes(1);
      const [message, ...styles] = mockConsoleLog.mock.calls[0];

      expect(message).toContain("TestLogger DEBUG");
      expect(message).toContain("[07:00:00 AM]");
      expect(message).toContain("unknown");
      expect(message).toContain("Debug message");

      expect(styles).toEqual([
        "color: #fb923c;",
        "color: #9E9E9E;",
        "color: #71717a;",
        "color: #e5e5e5;",
      ]);
    });

    it("should log an INFO message with the correct format", () => {
      logger.log("INFO", "Info message");

      expect(mockConsoleLog).toHaveBeenCalledTimes(1);
      const [message, ...styles] = mockConsoleLog.mock.calls[0];

      expect(message).toContain("TestLogger INFO");
      expect(message).toContain("[07:00:00 AM]");
      expect(message).toContain("unknown");
      expect(message).toContain("Info message");

      expect(styles).toEqual([
        "color: #2196F3;",
        "color: #9E9E9E;",
        "color: #71717a;",
        "color: #e5e5e5;",
      ]);
    });

    it("should log a WARN message with the correct format", () => {
      logger.log("WARN", "Warning message");

      expect(mockConsoleWarn).toHaveBeenCalledTimes(1);
      const [message, ...styles] = mockConsoleWarn.mock.calls[0];

      expect(message).toContain("TestLogger WARN");
      expect(message).toContain("[07:00:00 AM]");
      expect(message).toContain("unknown");
      expect(message).toContain("Warning message");

      expect(styles).toEqual([
        "color: #FFC107;",
        "color: #9E9E9E;",
        "color: #71717a;",
        "color: #e5e5e5;",
      ]);
    });

    it("should log an ERROR message with the correct format", () => {
      logger.log("ERROR", "Error message");

      expect(mockConsoleError).toHaveBeenCalledTimes(1);
      const [message, ...styles] = mockConsoleError.mock.calls[0];

      expect(message).toContain("TestLogger ERROR");
      expect(message).toContain("[07:00:00 AM]");
      expect(message).toContain("unknown");
      expect(message).toContain("Error message");

      expect(styles).toEqual([
        "color: #F44336;",
        "color: #9E9E9E;",
        "color: #71717a;",
        "color: #e5e5e5;",
      ]);
    });

    it("should not log if the level is lower than the logger's level", () => {
      logger.setLevel("ERROR");
      logger.log("INFO", "This should not log");

      expect(mockConsoleLog).not.toHaveBeenCalled();
      expect(mockConsoleWarn).not.toHaveBeenCalled();
      expect(mockConsoleError).not.toHaveBeenCalled();
    });
  });

  describe("debug()", () => {
    it("should log a debug message", () => {
      logger.debug("Debug message");

      expect(mockConsoleLog).toHaveBeenCalledTimes(1);
    });
  });

  describe("info()", () => {
    it("should log an info message", () => {
      logger.info("Info message");

      expect(mockConsoleLog).toHaveBeenCalledTimes(1);
    });
  });

  describe("warn()", () => {
    it("should log a warning message", () => {
      logger.warn("Warning message");

      expect(mockConsoleWarn).toHaveBeenCalledTimes(1);
    });
  });

  describe("error()", () => {
    it("should log an error message", () => {
      logger.error("Error message");

      expect(mockConsoleError).toHaveBeenCalledTimes(1);
    });
  });

  describe("setLevel()", () => {
    it("should set the logger level", () => {
      logger.setLevel("WARN");
      expect(logger.level).toBe(levels.WARN);
    });
  });

  describe("getFileNameFromStack()", () => {
    it("should return 'unknown' if stack is missing", () => {
      const mockError = new Error("Test error");
      mockError.stack = undefined;
      expect(getFileNameFromStack(mockError)).toBe("unknown");
    });

    it("should return the correct file name from stack trace", () => {
      const mockError = new Error("Test error");
      mockError.stack = `Error:
          Test error
          
          at Object.<anonymous> (http:///test/file/path:123:45)
          at Module._compile (internal/modules/cjs/loader.js:778:30)`;
      expect(getFileNameFromStack(mockError)).toBe(
        "http:///test/file/path:123:45"
      );
    });

    it("should return 'unknown' if no match is found in the stack trace", () => {
      const mockError = new Error("Test error");
      mockError.stack = `Error: Test error
          at unknown location`;
      expect(getFileNameFromStack(mockError)).toBe("unknown");
    });
  });

  describe("formatArgs()", () => {
    it("should format a string argument correctly", () => {
      expect(formatArgs("Test string")).toBe("Test string");
    });

    it("should format an object argument correctly", () => {
      expect(formatArgs({ key: "value" })).toBe(
        JSON.stringify({ key: "value" }, null, 2)
      );
    });

    it("should handle circular references gracefully", () => {
      const circularObj: any = {};
      circularObj.self = circularObj;
      expect(formatArgs(circularObj)).toBe("Error formatting arguments");
    });

    it("should format multiple arguments correctly", () => {
      expect(formatArgs("arg1", { key: "value" }, 123)).toBe(
        `arg1 ${JSON.stringify({ key: "value" }, null, 2)} 123`
      );
    });
  });
});
