// src/types/globals.d.ts

// Import `jsx` type
import type { jsx as jsxFunction } from "@core/jsx";

// Declare `jsx` as a global function
declare global {
	const jsx: typeof jsxFunction;
}
