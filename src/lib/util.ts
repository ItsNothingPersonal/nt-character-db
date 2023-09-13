export function isNullOrUndefined<T>(obj: T | null | undefined): obj is null | undefined {
	return typeof obj === 'undefined' || obj === null;
}

export function detectTouchscreen() {
	return 'ontouchstart' in window;
}
