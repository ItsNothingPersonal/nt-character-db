import { isNullOrUndefined } from '$lib/util';
import type { AttackMode } from '$lib/zod/classic/enums/attackMode';
import type { ItemQualityName } from '$lib/zod/classic/enums/itemQualityName';
import { itemQualityBonusConfig } from './config/itemQualityBonusConfig';

export function checkForApplicableItemAttackBonus(
	itemQualities: ItemQualityName[] | undefined,
	attackType: 'Brawl' | 'Melee' | 'Firearms'
): number {
	let bonus = 0;
	if (isNullOrUndefined(itemQualities) || attackType === 'Brawl') {
		return bonus;
	}

	for (const itemQuality of itemQualities) {
		const entry = itemQualityBonusConfig.get(itemQuality)?.find((c) => c.skillName === attackType);

		bonus += entry?.bonus ?? 0;
	}

	return bonus;
}

export function checkForApplicableItemDefenseBonus(
	itemQualities: ItemQualityName[] | undefined,
	attackType: AttackMode | undefined
): number {
	if (isNullOrUndefined(itemQualities)) {
		return 0;
	}
	let bonus = 0;

	for (const itemQuality of itemQualities) {
		const entry = itemQualityBonusConfig
			.get(itemQuality)
			?.find(
				(c) =>
					c.skillName === 'Dodge' && (c.condition === undefined || c.condition(attackType) === true)
			);

		bonus += entry?.bonus ?? 0;
	}

	return bonus;
}
