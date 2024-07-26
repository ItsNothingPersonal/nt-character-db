import type { AttributeName } from '$lib/zod/lotn/enums/attributeName';

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

export function mapAttributeNameToProperty(attribute: AttributeName) {
	switch (attribute) {
		case 'Strength':
			return 'physical_strength';
		case 'Dexterity':
			return 'physical_dexterity';
		case 'Stamina':
			return 'physical_stamina';
		case 'Charisma':
			return 'social_charisma';
		case 'Manipulation':
			return 'social_manipulation';
		case 'Composure':
			return 'social_composure';
		case 'Intelligence':
			return 'mental_intelligence';
		case 'Wits':
			return 'mental_wits';
		case 'Resolve':
			return 'mental_resolve';
	}
}
