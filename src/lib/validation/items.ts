import { isNullOrUndefined } from '$lib/util';
import type { PlayerItem } from '$lib/zod/playerCharacter/playerItem';

export function checkForApplicableItemAttackBonus(
	item: PlayerItem | undefined,
	type: 'Brawl' | 'Melee' | 'Firearms'
): number {
	let result = 0;
	if (isNullOrUndefined(item)) {
		return result;
	}

	let itemAttackType: 'Brawl' | 'Melee' | 'Firearms' | undefined;

	if (item.type === 'ranged') {
		itemAttackType = 'Firearms';
	} else if (item.type === 'melee') {
		itemAttackType = 'Melee';
	}

	if (type === itemAttackType) {
		if (item.qualities.includes('Accurate')) {
			result += 2;
		}
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
