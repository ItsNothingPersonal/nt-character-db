export function joinWithOr(arr: string[]): string {
	if (arr.length === 0) return '';
	if (arr.length === 1) return arr[0];
	if (arr.length === 2) return arr.join(' or ');

	const allButLast = arr.slice(0, -1).join(', ');
	const last = arr[arr.length - 1];
	return `${allButLast}, or ${last}`;
}

export function sortStringAscending(a: string, b: string) {
	return a.localeCompare(b);
}

export function createNumberList(max: number | undefined, min: number = 1) {
	if (!max) return [];
	if (max === min) return [max];
	return Array.from({ length: max - min + 1 }, (_, i) => min + i);
}

export function isMobileScreen(breakpoint: string = '(max-width: 768px)'): boolean {
	if (typeof window === 'undefined') return false;
	return window.matchMedia(breakpoint).matches;
}
