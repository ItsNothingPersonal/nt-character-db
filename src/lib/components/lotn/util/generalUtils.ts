import type { DisciplinePower } from '$lib/zod/lotn/disciplines/disciplinePower';

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

export function sortDisciplinePowerAscending(a: DisciplinePower, b: DisciplinePower) {
	return a.name.localeCompare(b.name);
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

export function splitStringIntoLines(text: string, numberOfLines: number): string[] {
	const totalLength = text.length;
	const charsPerLine = Math.ceil(totalLength / numberOfLines);
	const lines: string[] = [];

	let startIndex = 0;
	for (let i = 0; i < numberOfLines; i++) {
		if (startIndex >= totalLength) break;

		let endIndex = Math.min(startIndex + charsPerLine, totalLength);

		if (i < numberOfLines - 1 && endIndex < totalLength) {
			const lastSpace = text.lastIndexOf(' ', endIndex);
			if (lastSpace > startIndex) {
				endIndex = lastSpace;
			}
		}

		lines.push(text.substring(startIndex, endIndex).trim());
		startIndex = endIndex;
	}

	if (startIndex < totalLength) {
		lines[lines.length - 1] += text.substring(startIndex);
	}

	return lines;
}
