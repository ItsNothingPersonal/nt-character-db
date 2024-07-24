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
