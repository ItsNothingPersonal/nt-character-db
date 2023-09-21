import {
	getAttributeForDisciplineName,
	getAttributeValueByName,
	getSkillForDisciplineName,
	getSkillValueByName
} from '$lib/util';
import type { DisciplineName } from '$lib/zod/disciplineName';
import type { PlayerAttribute } from '$lib/zod/playerAttribute';
import type { PlayerItem } from '$lib/zod/playerItem';
import type { PlayerSkill } from '$lib/zod/playerSkill';
import type { PlayerWillpower } from '$lib/zod/playerWillpower';
import type { Testpool } from '$lib/zod/testpool';
import { checkForApplicableItemAttackBonus, checkForApplicableItemDefenseBonus } from './items';
import { disciplineTestpoolConfig } from './testpoolConfig';

export function getDisciplineTestpool(disciplineName: DisciplineName) {
	return disciplineTestpoolConfig.get(disciplineName);
}

export function getTestpool(
	disciplineName: DisciplineName,
	attributes: PlayerAttribute,
	skills: PlayerSkill[],
	relevantTestpools: Map<DisciplineName, Testpool | undefined>
) {
	return (
		getAttributeValueByName(
			getAttributeForDisciplineName(disciplineName, relevantTestpools),
			attributes
		) + getSkillValueByName(getSkillForDisciplineName(disciplineName, relevantTestpools), skills)
	);
}

export function getAttackTestpool(
	attributes: PlayerAttribute,
	skills: PlayerSkill[],
	frenzy: boolean,
	item: PlayerItem | undefined = undefined,
	type: 'Brawl' | 'Melee' | 'Firearms'
) {
	let relevantAttributeValue: number;
	let modifier = 0;

	if (frenzy) {
		modifier++;
	}

	if (
		attributes.mental_value > attributes.physical_value &&
		attributes.mental_specialization.includes('Wits') &&
		type === 'Firearms'
	) {
		relevantAttributeValue = attributes.mental_value;
	} else {
		relevantAttributeValue = attributes.physical_value;
	}

	return (
		(skills.find((e) => e.name === type)?.value ?? 0) +
		relevantAttributeValue +
		modifier +
		checkForApplicableItemAttackBonus(item, type)
	);
}

export function getDodgeTestpool(
	attributes: PlayerAttribute,
	skills: PlayerSkill[],
	frenzy: boolean,
	prone: boolean,
	threeMetersOrMoreDistance: boolean,
	item: PlayerItem | undefined = undefined,
	attackType: 'melee' | 'ranged' | undefined
) {
	let modifier = 0;
	if (frenzy) {
		modifier -= 2;
	}

	if (prone) {
		if (threeMetersOrMoreDistance) {
			modifier += 2;
		} else {
			modifier -= 2;
		}
	}

	return (
		(skills.find((e) => e.name === 'Dodge')?.value ?? 0) +
		attributes.physical_value +
		modifier +
		checkForApplicableItemDefenseBonus(item, attackType)
	);
}

export function getSocialDefenseTestpool(attributes: PlayerAttribute, willpower: PlayerWillpower) {
	return attributes.social_value + willpower.value;
}

export function getMentalDefenseTestpool(attributes: PlayerAttribute, willpower: PlayerWillpower) {
	return attributes.mental_value + willpower.value;
}

export function getInitiativePool(
	attributes: PlayerAttribute,
	item: PlayerItem | undefined
): [{ name: string; value: number }, { name: string; value: number }] {
	const primaryName: 'Physical' | 'Mental' =
		attributes.mental_value >= attributes.physical_value ? 'Mental' : 'Physical';
	const primaryValue =
		attributes.mental_value >= attributes.physical_value
			? attributes.mental_value
			: attributes.physical_value;

	const secondaryName: 'Physical' | 'Mental' =
		attributes.mental_value < attributes.physical_value ? 'Mental' : 'Physical';
	const secondaryValue =
		attributes.mental_value < attributes.physical_value
			? attributes.mental_value
			: attributes.physical_value;

	const bonus = item?.qualities.includes('Fast') ? 3 : 0;

	return [
		{ name: primaryName, value: primaryValue + bonus },
		{ name: secondaryName, value: secondaryValue }
	];
}
