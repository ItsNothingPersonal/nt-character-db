import { disciplineTestpoolConfig } from './validation/testpoolConfig';
import type { AttributeName } from './zod/attributeName';
import type { DisciplineName } from './zod/disciplineName';
import type { PlayerAttribute } from './zod/playerAttribute';
import type { PlayerSkill } from './zod/playerSkill';
import type { PlayerWillpower } from './zod/playerWillpower';
import type { SkillName } from './zod/skillName';
import type { Testpool } from './zod/testpool';

export function isNullOrUndefined<T>(obj: T | null | undefined): obj is null | undefined {
	return typeof obj === 'undefined' || obj === null;
}

export function detectTouchscreen() {
	return 'ontouchstart' in window;
}

export function getAllDisciplineTestpools(disciplineNames: DisciplineName[]) {
	const result = new Map<DisciplineName, Testpool | undefined>();

	for (const name of disciplineNames) {
		result.set(name, getDisciplineTestpool(name));
	}

	return result;
}

export function getDisciplineTestpool(disciplineName: DisciplineName) {
	return disciplineTestpoolConfig.get(disciplineName);
}

export function getAttributeValueByName(
	attributeName: AttributeName | undefined,
	playerAttributes: PlayerAttribute
) {
	if (!attributeName) {
		return 0;
	}

	let value: number;
	if (attributeName === 'Physical') {
		value = playerAttributes.physical_value;
	} else if (attributeName === 'Social') {
		value = playerAttributes.social_value;
	} else {
		value = playerAttributes.mental_value;
	}

	return value;
}

export function getSkillValueByName(skillName: SkillName | undefined, playerSkills: PlayerSkill[]) {
	return playerSkills.find((e) => e.name === skillName)?.value ?? 0;
}

export function getAttributeForDisciplineName(
	disciplineName: DisciplineName,
	relevantTestpools: Map<DisciplineName, Testpool | undefined>
) {
	return relevantTestpools.get(disciplineName)?.attribute;
}

export function getSkillForDisciplineName(
	disciplineName: DisciplineName,
	relevantTestpools: Map<DisciplineName, Testpool | undefined>
) {
	return relevantTestpools.get(disciplineName)?.skillName;
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

export function getBrawlTestpool(
	attributes: PlayerAttribute,
	skills: PlayerSkill[],
	frenzy: boolean
) {
	let modifier = 0;
	if (frenzy) {
		modifier++;
	}

	return (
		(skills.find((e) => e.name === 'Brawl')?.value ?? 0) + attributes.physical_value + modifier
	);
}

export function getMeleeTestpool(
	attributes: PlayerAttribute,
	skills: PlayerSkill[],
	frenzy: boolean
) {
	let modifier = 0;
	if (frenzy) {
		modifier++;
	}

	return (
		(skills.find((e) => e.name === 'Melee')?.value ?? 0) + attributes.physical_value + modifier
	);
}

export function getFirearmsTestpool(
	attributes: PlayerAttribute,
	skills: PlayerSkill[],
	frenzy: boolean
) {
	let modifier = 0;
	if (frenzy) {
		modifier++;
	}

	let relevantAttributeValue: number;

	if (
		attributes.mental_value > attributes.physical_value &&
		attributes.mental_specialization.includes('Wits')
	) {
		relevantAttributeValue = attributes.mental_value;
	} else {
		relevantAttributeValue = attributes.physical_value;
	}

	return (
		(skills.find((e) => e.name === 'Firearms')?.value ?? 0) + relevantAttributeValue + modifier
	);
}

export function getDodgeTestpool(
	attributes: PlayerAttribute,
	skills: PlayerSkill[],
	frenzy: boolean,
	prone: boolean,
	threeMetersOrMoreDistance: boolean
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
		(skills.find((e) => e.name === 'Dodge')?.value ?? 0) + attributes.physical_value + modifier
	);
}

export function getSocialDefenseTestpool(attributes: PlayerAttribute, willpower: PlayerWillpower) {
	return attributes.social_value + willpower.value;
}

export function getMentalDefenseTestpool(attributes: PlayerAttribute, willpower: PlayerWillpower) {
	return attributes.mental_value + willpower.value;
}
