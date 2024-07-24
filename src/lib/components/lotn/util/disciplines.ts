import { bloodSurgeStore } from '$lib/stores/bloodSurgeStore';
import { characterConditionStore } from '$lib/stores/characterConditionStore';
import { isNotNullOrUndefined, isNullOrUndefined } from '$lib/util';
import { type AttributeName } from '$lib/zod/lotn/enums/attributeName';
import type { DisciplineName } from '$lib/zod/lotn/enums/disciplineName';
import {
	createNormalDisciplinePowerSchema,
	createRitualPowerSchema,
	isNormalDiscipline,
	normalDisciplinePowerUnion,
	ritualDisciplinePowerUnion,
	type NormalDisciplinePowerUnion,
	type NormalDisciplines,
	type RitualDisciplinePowerUnion,
	type RitualDisciplines
} from '$lib/zod/lotn/util';
import { get } from 'svelte/store';
import { characterStore } from '../characterSheet/characterStore';
import { bloodPotencyConfig } from '../config/bloodPotencyConfig';
import { animalismConfig } from '../config/disciplines/animalismConfig';
import { auspexConfig } from '../config/disciplines/auspexConfig';
import { bloodSorceryConfig } from '../config/disciplines/bloodSorceryConfig';
import { celerityConfig } from '../config/disciplines/celerityConfig';
import { dominateConfig } from '../config/disciplines/dominateConfig';
import { fortitudeConfig } from '../config/disciplines/fortitudeConfig';
import { obfuscateConfig } from '../config/disciplines/obfuscateConfig';
import { oblivionConfig } from '../config/disciplines/oblivionConfig';
import { potenceConfig } from '../config/disciplines/potenceConfig';
import { presenceConfig } from '../config/disciplines/presenceConfig';
import { proteanConfig } from '../config/disciplines/proteanConfig';
import { thinBloodAlchemyConfig } from '../config/disciplines/thinBloodAlchemyConfig';

export function getDisciplineConfig(disciplineName: DisciplineName) {
	switch (disciplineName) {
		case 'Animalism':
			return animalismConfig;
		case 'Blood Sorcery':
			return bloodSorceryConfig;
		case 'Auspex':
			return auspexConfig;
		case 'Celerity':
			return celerityConfig;
		case 'Dominate':
			return dominateConfig;
		case 'Fortitude':
			return fortitudeConfig;
		case 'Obfuscate':
			return obfuscateConfig;
		case 'Oblivion':
			return oblivionConfig;
		case 'Potence':
			return potenceConfig;
		case 'Presence':
			return presenceConfig;
		case 'Protean':
			return proteanConfig;
		case 'Thin-Blood Alchemy':
			return thinBloodAlchemyConfig;
	}
}

export function getDisciplinePower(
	discipline: NormalDisciplines | RitualDisciplines,
	power: NormalDisciplinePowerUnion | RitualDisciplinePowerUnion
) {
	const config = getDisciplineConfig(discipline);
	if (isNormalDiscipline(discipline)) {
		const schema = createNormalDisciplinePowerSchema(discipline);
		const result = schema.safeParse(config.powers);

		if (result.success) {
			const powerParsed = normalDisciplinePowerUnion.parse(power);
			return result.data[powerParsed];
		}
	} else if (!isNormalDiscipline(discipline)) {
		const schema = createRitualPowerSchema(discipline);
		const result = schema.safeParse(config);
		if (result.success) {
			const powerParsed = ritualDisciplinePowerUnion.parse(power);
			return result.data[powerParsed];
		}
	}
}

export function getDisciplinePowerChallengePool(
	discipline: NormalDisciplines | RitualDisciplines,
	power: NormalDisciplinePowerUnion | RitualDisciplinePowerUnion
) {
	const config = getDisciplineConfig(discipline);
	if (isNormalDiscipline(discipline)) {
		const schema = createNormalDisciplinePowerSchema(discipline);
		const result = schema.safeParse(config.powers);

		if (result.success) {
			const powerParsed = normalDisciplinePowerUnion.parse(power);
			return result.data[powerParsed]?.challengePool;
		}
	} else if (!isNormalDiscipline(discipline)) {
		const schema = createRitualPowerSchema(discipline);
		const result = schema.safeParse(config);
		if (result.success) {
			const powerParsed = ritualDisciplinePowerUnion.parse(power);
			return result.data[powerParsed]?.challengePool;
		}
	}
}

export function calculateDisciplinePowerChallengeTestPool(
	discipline: NormalDisciplines | RitualDisciplines,
	power: NormalDisciplinePowerUnion | RitualDisciplinePowerUnion
) {
	const disciplinePowerChallengePool = getDisciplinePowerChallengePool(discipline, power);
	if (isNullOrUndefined(disciplinePowerChallengePool?.attacker)) return 0;

	const playerAttributeValue =
		get(characterStore).attributes[
			mapAttributeNameToProperty(disciplinePowerChallengePool.attacker.attribute)
		];
	const playerSkillValue =
		get(characterStore).skills.find((e) => e.name === disciplinePowerChallengePool.attacker.skill)
			?.value ?? 0;

	const conditionStore = get(characterConditionStore);
	const negativeModifiers = 0 - (conditionStore.impaired ? -2 : 0);
	const positiveModifiers = get(bloodSurgeStore)
		? bloodPotencyConfig[get(characterStore).bloodPotency].bloodSurgeBonus
		: 0;

	return playerAttributeValue + playerSkillValue - negativeModifiers + positiveModifiers;
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

export function hasDisciplinePowerChallengePool(
	discipline: NormalDisciplines | RitualDisciplines,
	power: NormalDisciplinePowerUnion[] | RitualDisciplinePowerUnion[]
) {
	const hasOneChallengePool = power.map((power) => {
		const disciplinePowerChallengePool = getDisciplinePowerChallengePool(discipline, power);
		return isNotNullOrUndefined(disciplinePowerChallengePool);
	});

	return hasOneChallengePool.find((e) => e === true) ?? false;
}
