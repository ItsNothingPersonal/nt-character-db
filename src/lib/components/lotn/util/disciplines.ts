import { bloodSurgeStore } from '$lib/stores/bloodSurgeStore';
import { characterConditionStore } from '$lib/stores/characterConditionStore';
import { characterCreationStore } from '$lib/stores/characterCreationStore';
import { isNotNullOrUndefined, isNullOrUndefined } from '$lib/util';
import type { OblivionCeremoniesConfigSchema } from '$lib/zod/lotn/ceremonies/oblivionCeremonies';
import { type BloodSorceryRitualName } from '$lib/zod/lotn/enums/bloodSorceryRitualName';
import type { ClanName } from '$lib/zod/lotn/enums/clanName';
import { disciplineName, type DisciplineName } from '$lib/zod/lotn/enums/disciplineName';
import type { OblivionCeremonyName } from '$lib/zod/lotn/enums/oblivionCeremonyName';
import type { BloodSorceryRitualConfigSchema } from '$lib/zod/lotn/rituals/bloodSorceryRituals';
import {
	createNormalDisciplinePowerSchema,
	createRitualPowerSchema,
	isNormalDiscipline,
	isNormalDisciplinePower,
	normalDisciplinePowerUnion,
	ritualDisciplinePowerUnion,
	type NormalDisciplinePowerUnion,
	type NormalDisciplines,
	type RitualDisciplinePowerUnion,
	type RitualDisciplines
} from '$lib/zod/lotn/util';
import { get } from 'svelte/store';
import type { z } from 'zod';
import { characterStore } from '../characterSheet/characterStore';
import { bloodPotencyConfig } from '../config/bloodPotencyConfig';
import { bloodSorceryRitualConfig } from '../config/bloodSorceryRitualsConfig';
import { ceremoniesConfig } from '../config/ceremoniesConfig';
import { clanConfig } from '../config/clanConfig';
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
import { mapAttributeNameToProperty } from './attributesUtil';

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

export function getDisciplineConfigForPowerName(power: NormalDisciplinePowerUnion) {
	for (const discipline of disciplineName.options) {
		const config = getDisciplineConfig(discipline);

		if (isNormalDiscipline(discipline)) {
			const schema = createNormalDisciplinePowerSchema(discipline);
			const result = schema.safeParse(config.powers);
			if (result.success && result.data[power]) {
				return config;
			}
		}
	}
}

export function getDisciplinePowerConfigForPowerName(
	power: NormalDisciplinePowerUnion | RitualDisciplinePowerUnion
) {
	for (const discipline of disciplineName.options) {
		const config = getDisciplineConfig(discipline);

		if (isNormalDiscipline(discipline) && isNormalDisciplinePower(power)) {
			const schema = createNormalDisciplinePowerSchema(discipline);
			const result = schema.safeParse(config.powers);
			const powerParsed = normalDisciplinePowerUnion.parse(power);

			if (result.success && result.data[powerParsed]) {
				return result.data[powerParsed];
			}
		} else if (!isNormalDiscipline(discipline) && !isNormalDisciplinePower(power)) {
			const schema = createRitualPowerSchema(discipline);
			const result = schema.safeParse(config.powers);
			const powerParsed = ritualDisciplinePowerUnion.parse(power);

			if (result.success && result.data[powerParsed]) {
				return result.data[powerParsed];
			}
		}
	}
}

export function getDisciplineForDisciplinePower(power: NormalDisciplinePowerUnion) {
	for (const discipline of disciplineName.options) {
		const config = getDisciplineConfig(discipline);

		if (isNormalDiscipline(discipline)) {
			const schema = createNormalDisciplinePowerSchema(discipline);
			const result = schema.safeParse(config.powers);
			if (result.success && result.data[power]) {
				return discipline;
			}
		}
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

export function getDisciplinePowerConfigsForDiscipline(
	discipline: NormalDisciplines | RitualDisciplines
) {
	if (isNormalDiscipline(discipline)) {
		const disciplineSchema = createNormalDisciplinePowerSchema(discipline);
		type DisciplineSchema = z.infer<typeof disciplineSchema>;
		const config = getDisciplineConfig(discipline);
		const powerConfig = (
			Object.entries(config.powers) as [
				keyof DisciplineSchema,
				DisciplineSchema[keyof DisciplineSchema]
			][]
		).map(([key, value]) => ({
			name: key,
			data: value,
			amalgam: value?.amalgam
		}));
		return powerConfig;
	} else {
		const disciplineSchema = createRitualPowerSchema(discipline);
		type DisciplineSchema = z.infer<typeof disciplineSchema>;
		const config = getDisciplineConfig(discipline);
		const powerConfig = (
			Object.entries(config.powers) as [
				keyof DisciplineSchema,
				DisciplineSchema[keyof DisciplineSchema]
			][]
		).map(([key, value]) => ({
			name: key,
			data: value,
			amalgam: undefined
		}));
		return powerConfig;
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

export function getValidDisciplines(
	clan: ClanName,
	inclan: boolean = false,
	hasThinBloodAlchemyMerit: boolean = false
) {
	const disciplineNames = Array.from(disciplineName.options).filter((discipline) => {
		if (!hasThinBloodAlchemyMerit && discipline === 'Thin-Blood Alchemy') {
			return false;
		}
		return true;
	});

	if (inclan && clan !== 'Caitiff') {
		return disciplineNames.filter((e) => isInClan(clan, e));
	}

	return disciplineNames;
}

export function getDisciplineValue(discipline: NormalDisciplines | RitualDisciplines | undefined) {
	return get(characterCreationStore)?.disciplines?.find((e) => e.name === discipline)?.value ?? 0;
}

export function getDisciplineCostFactor(
	discipline: NormalDisciplines | RitualDisciplines,
	clan: ClanName | undefined,
	isGhoul: boolean = false
) {
	if (isGhoul) return 10;
	if (!clan) return 7;

	const config = clanConfig[clan];
	if (clan === 'Caitiff') {
		return 6;
	}

	if (config.inclan.includes(discipline)) {
		return 5;
	}
	return 7;
}

export function getBloodSorceryLevel() {
	return (
		get(characterCreationStore).disciplines.find((d) => d.name === 'Blood Sorcery')?.value ?? 0
	);
}

export function getBloodSorceryRitualLevel(name: BloodSorceryRitualName) {
	return bloodSorceryRitualConfig.rituals[name]?.level;
}

export function addBloodSorceryRitualPowers(event: CustomEvent<{ new: BloodSorceryRitualName }>) {
	characterCreationStore.update((store) => {
		store.rituals = [...store.rituals, event.detail.new];
		return store;
	});
}

export function updateBloodSorceryRitualPowers(
	event: CustomEvent<{ old: BloodSorceryRitualName | undefined; new: BloodSorceryRitualName }>
) {
	characterCreationStore.update((store) => {
		store.rituals = store.rituals.filter((e) => e !== event.detail.old);
		store.rituals = [...store.rituals, event.detail.new];
		return store;
	});
}

export function deleteBloodSorceryRitualPowers(
	event: CustomEvent<{ name: BloodSorceryRitualName }>
) {
	characterCreationStore.update((store) => {
		store.rituals = store.rituals.filter((e) => e !== event.detail.name);
		return store;
	});
}

export function getOblivionLevel() {
	return get(characterCreationStore).disciplines.find((d) => d.name === 'Oblivion')?.value ?? 0;
}

export function getOblivionCeremonyLevel(name: OblivionCeremonyName) {
	return ceremoniesConfig.ceremonies[name]?.level;
}

export function addOblivionCeremonyPowers(event: CustomEvent<{ new: OblivionCeremonyName }>) {
	characterCreationStore.update((store) => {
		store.ceremonies = [...store.ceremonies, event.detail.new];
		return store;
	});
}

export function updateOblivionCeremonyPowers(
	event: CustomEvent<{ old: OblivionCeremonyName | undefined; new: OblivionCeremonyName }>
) {
	characterCreationStore.update((store) => {
		store.ceremonies = store.ceremonies.filter((e) => e !== event.detail.old);
		store.ceremonies = [...store.ceremonies, event.detail.new];
		return store;
	});
}

export function deleteOblivionCeremonyPowers(event: CustomEvent<{ name: OblivionCeremonyName }>) {
	characterCreationStore.update((store) => {
		store.ceremonies = store.ceremonies.filter((e) => e !== event.detail.name);
		return store;
	});
}

export function hasBloodSorcery() {
	return get(characterCreationStore).disciplines.some((e) => e.name === 'Blood Sorcery');
}

export function hasOblivion() {
	return get(characterCreationStore).disciplines.some((e) => e.name === 'Oblivion');
}

export function getBloodSorceryRitualPowers(
	maxLevel: number,
	existingBloodSorceryRituals: BloodSorceryRitualName[],
	selectedBloodSorceryRitualPower: BloodSorceryRitualName | undefined
) {
	return (
		Object.entries(bloodSorceryRitualConfig.rituals) as [
			BloodSorceryRitualName,
			BloodSorceryRitualConfigSchema['rituals'][keyof BloodSorceryRitualConfigSchema['rituals']]
		][]
	)
		.map(([key, value]) => ({
			name: key,
			data: value
		}))
		.filter((e) => !isNullOrUndefined(e.data) && e.data.level <= maxLevel)
		.filter(
			(e) =>
				!existingBloodSorceryRituals.includes(e.name) || e.name === selectedBloodSorceryRitualPower
		);
}

export function getOblivionCeremonyPowers(
	maxLevel: number,
	existingOblivionCeremonies: OblivionCeremonyName[],
	selectedOblivionCeremonyPower: OblivionCeremonyName | undefined
) {
	return (
		Object.entries(ceremoniesConfig.ceremonies) as [
			OblivionCeremonyName,
			OblivionCeremoniesConfigSchema['ceremonies'][keyof OblivionCeremoniesConfigSchema['ceremonies']]
		][]
	)
		.map(([key, value]) => ({
			name: key,
			data: value
		}))
		.filter((e) => !isNullOrUndefined(e.data) && e.data.level <= maxLevel)
		.filter(
			(e) =>
				!existingOblivionCeremonies.includes(e.name) || e.name === selectedOblivionCeremonyPower
		);
}

export function addDiscipline(
	name: NormalDisciplines | RitualDisciplines,
	value: number,
	previousDiscipline: NormalDisciplines | RitualDisciplines | undefined
) {
	if (get(characterCreationStore).disciplines.some((e) => e.name === name)) {
		characterCreationStore.update((store) => {
			store.disciplines = store.disciplines.filter((e) => e.name !== name);
			return store;
		});
	}

	if (previousDiscipline) {
		const index = get(characterCreationStore).disciplines.findIndex(
			(e) => e.name === previousDiscipline
		);
		characterCreationStore.update((store) => {
			store.disciplines[index] = { name, value, powers: [] };
			return store;
		});
	} else {
		characterCreationStore.update((store) => {
			store.disciplines = [...store.disciplines, { name, value, powers: [] }];
			return store;
		});
	}
}

export function removeFormula(id: string) {
	characterCreationStore.update((store) => {
		if (!store.formulas) return store;

		store.formulas = store.formulas.filter((e) => e.id !== id);
		return store;
	});
}

export function isInClan(clan: ClanName, discipline: DisciplineName) {
	return clanConfig[clan].inclan.includes(discipline);
}

export function getInClanDisciplines(clan: ClanName) {
	return clanConfig[clan].inclan;
}

export function hasDisciplinePower(
	discipline: NormalDisciplines | RitualDisciplines,
	power: NormalDisciplinePowerUnion | RitualDisciplinePowerUnion,
	isCharacterCreation: boolean = false
) {
	if (isCharacterCreation) {
		return (
			get(characterCreationStore)
				.disciplines.find((e) => e.name === discipline)
				?.powers.some((e) => e === power) ?? false
		);
	} else {
		return (
			get(characterStore)
				.disciplines.find((e) => e.name === discipline)
				?.powers.some((e) => e === power) ?? false
		);
	}
}
