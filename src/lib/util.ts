import { getDisciplineTestpool } from './validation/testpools';
import type { AttributeName } from './zod/enums/attributeName';
import type { DisciplineName } from './zod/enums/disciplineName';
import type { SkillName } from './zod/enums/skillName';
import type { PlayerAttribute } from './zod/playerCharacter/playerAttribute';
import type { PlayerSkill } from './zod/playerCharacter/playerSkill';
import type { Testpool } from './zod/validation/testpool';

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

export function typedObjectKeys<T extends object>(object: T) {
	return Object.keys(object) as (keyof typeof object)[];
}
