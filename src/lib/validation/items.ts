import type { PlayerItem } from '$lib/zod/playerItem';

export function checkForApplicableItemAttackBonus(item: PlayerItem | undefined): number {
	let result = 0;

	if (item?.qualities.includes('Accurate')) {
		result += 2;
	}

	return result;
}

export function checkForApplicableItemDefenseBonus(
	item: PlayerItem | undefined,
	attackType: 'melee' | 'ranged' | undefined
): number {
	let result = 0;

	if (item?.qualities.includes('Ballistic')) {
		if (attackType === 'melee') {
			result += 1;
		} else if (attackType === 'ranged') {
			result += 3;
		}
	}

	if (item?.qualities.includes('Full Body')) {
		result += 3;
	}

	if (item?.qualities.includes('Hardened')) {
		if (attackType === 'melee') {
			result += 3;
		} else if (attackType === 'ranged') {
			result += 1;
		}
	}

	return result;
}
