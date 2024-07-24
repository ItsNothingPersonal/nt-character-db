import { characterStore } from '$lib/components/lotn/characterSheet/characterStore';
import { bloodPotencyConfig } from '$lib/components/lotn/config/bloodPotencyConfig';
import { getDisciplinePowerChallengePool } from '$lib/components/lotn/util/disciplines';
import { attackerPositionStore } from '$lib/stores/attackerPositionStore';
import { bloodSurgeStore } from '$lib/stores/bloodSurgeStore';
import { characterConditionStore } from '$lib/stores/characterConditionStore';
import { isNullOrUndefined } from '$lib/util';
import type {
	NormalDisciplinePowerUnion,
	NormalDisciplines,
	RitualDisciplinePowerUnion,
	RitualDisciplines
} from '$lib/zod/lotn/util';
import { get } from 'svelte/store';

export function getBrawlTestPool() {
	const characterStoreLocal = get(characterStore);
	const conditionStore = get(characterConditionStore);
	const negativeModifiers =
		0 -
		(conditionStore.blinded ? -5 : 0) -
		(conditionStore.impaired ? -2 : 0) -
		(conditionStore.weakened ? -1 : 0);
	const positiveModifiers = get(bloodSurgeStore)
		? bloodPotencyConfig[get(characterStore).bloodPotency].bloodSurgeBonus
		: 0;

	return (
		characterStoreLocal.attributes.physical_strength +
		(characterStoreLocal.skills.find((e) => e.name === 'Brawl')?.value ?? 0) -
		negativeModifiers +
		positiveModifiers
	);
}

export function getMeleeTestPool() {
	const characterStoreLocal = get(characterStore);
	const conditionStore = get(characterConditionStore);
	const negativeModifiers =
		0 -
		(conditionStore.blinded ? -5 : 0) -
		(conditionStore.impaired ? -2 : 0) -
		(conditionStore.weakened ? -1 : 0);
	const positiveModifiers = get(bloodSurgeStore)
		? bloodPotencyConfig[get(characterStore).bloodPotency].bloodSurgeBonus
		: 0;

	return Math.max(
		0,
		characterStoreLocal.attributes.physical_strength +
			(get(characterStore).skills.find((e) => e.name === 'Melee')?.value ?? 0) -
			negativeModifiers +
			positiveModifiers
	);
}

export function getRangedTestPool() {
	const characterStoreLocal = get(characterStore);
	const conditionStore = get(characterConditionStore);
	const negativeModifiers =
		0 -
		(conditionStore.blinded ? -5 : 0) -
		(conditionStore.impaired ? -2 : 0) -
		(conditionStore.weakened ? -1 : 0);
	const positiveModifiers = get(bloodSurgeStore)
		? bloodPotencyConfig[get(characterStore).bloodPotency].bloodSurgeBonus
		: 0;

	return Math.max(
		0,
		characterStoreLocal.attributes.physical_dexterity +
			(characterStoreLocal.skills.find((e) => e.name === 'Marksmanship')?.value ?? 0) -
			negativeModifiers +
			positiveModifiers
	);
}

export function getDodgeTestPool() {
	const characterStoreLocal = get(characterStore);
	const conditionStore = get(characterConditionStore);
	const negativeModifiers =
		0 -
		(conditionStore.blinded ? -5 : 0) -
		(conditionStore.impaired ? -2 : 0) +
		(get(attackerPositionStore).attackerLessThanTwoMetersAway ? -2 : 0);
	const positiveModifiers =
		(get(attackerPositionStore).attackerMoreThanThreeMetersAway ? +3 : 0) +
		(get(bloodSurgeStore)
			? bloodPotencyConfig[get(characterStore).bloodPotency].bloodSurgeBonus
			: 0);

	return Math.max(
		0,
		characterStoreLocal.attributes.physical_dexterity +
			(characterStoreLocal.skills.find((e) => e.name === 'Athletics')?.value ?? 0) -
			negativeModifiers +
			positiveModifiers
	);
}

export function getDefenderTestPool(
	discipline: NormalDisciplines | RitualDisciplines,
	power: NormalDisciplinePowerUnion | RitualDisciplinePowerUnion
) {
	const challengePool = getDisciplinePowerChallengePool(discipline, power);
	if (isNullOrUndefined(challengePool)) return 0;

	if (typeof challengePool.defender === 'string') {
		return challengePool.defender;
	}
	{
		return `${challengePool.defender.attribute} + ${challengePool.defender.skillOrAttribute}`;
	}
}
