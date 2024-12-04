const isNotProd = import.meta.env.MODE !== "production";

export const levels = {
	DEBUG: 0,
	INFO: 1,
	WARN: 2,
	ERROR: 3,
} as const;

const levelStyles = {
	DEBUG: "color: #fb923c;",
	INFO: "color: #2196F3;",
	WARN: "color: #FFC107;",
	ERROR: "color: #F44336;",
} as const;

const defaultStyles = {
	timestamp: "color: #9E9E9E;",
	fileName: "color: #71717a;",
};

export const getFileNameFromStack = (err: Error) => {
	const stack = err.stack;
	if (!stack) return "unknown";

	const stackLine = stack.split("\n")[3]?.trim();
	if (!stackLine) return "unknown";
	const match = stackLine.match(/(?:https?:\/\/[^\s)]+)/);
	return match ? match[0] : "unknown";
};

export const formatArgs = (...args: any[]) => {
	try {
		return args
			.map((arg) =>
				typeof arg === "object" ? JSON.stringify(arg, null, 2) : String(arg),
			)
			.join(" ");
	} catch (err) {
		return "Error formatting arguments";
	}
};

export class Logger {
	public name: string;
	public level: number;

	constructor(name = "TSFW", level = levels.DEBUG) {
		this.name = name;
		this.level = level;
	}

	public log(level: keyof typeof levels, ...args: unknown[]) {
		if (levels[level] >= this.level && isNotProd) {
			const now = new Date();
			const timeStamp = new Intl.DateTimeFormat("en-US", {
				hour: "2-digit",
				minute: "2-digit",
				second: "2-digit",
				hour12: true,
			}).format(now);

			const fileName = getFileNameFromStack(new Error());
			const formattedArgs = formatArgs(...args);

			const logMethod =
				level === "ERROR"
					? console.error
					: level === "WARN"
						? console.warn
						: console.log;

			logMethod(
				`%c${this.name} ${level} %c[${timeStamp}] %c ${fileName}\n%c\n${formattedArgs}\n`,
				levelStyles[level],
				defaultStyles.timestamp,
				defaultStyles.fileName,
				"color: #e5e5e5;", // Style for the args
			);
		}
	}

	public debug(...args: unknown[]) {
		this.log("DEBUG", ...args);
	}

	public info(...args: unknown[]) {
		this.log("INFO", ...args);
	}

	public warn(...args: unknown[]) {
		this.log("WARN", ...args);
	}

	public error(...args: unknown[]) {
		this.log("ERROR", ...args);
	}

	public setLevel(level: keyof typeof levels) {
		this.level = levels[level];
	}
}

export const logger = new Logger("TSFW");
