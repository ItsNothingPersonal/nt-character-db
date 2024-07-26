import { characterStore } from '$lib/components/lotn/characterSheet/characterStore';
import { bloodPotencyConfig } from '$lib/components/lotn/config/bloodPotencyConfig';
import { getDisciplinePowerChallengePool } from '$lib/components/lotn/util/disciplines';
import { mapAttributeNameToProperty } from '$lib/components/lotn/util/generalUtils';
import { attackerPositionStore } from '$lib/stores/attackerPositionStore';
import { bloodSurgeStore } from '$lib/stores/bloodSurgeStore';
import { characterConditionStore } from '$lib/stores/characterConditionStore';
import { isNullOrUndefined } from '$lib/util';
import type { AttributeName } from '$lib/zod/lotn/enums/attributeName';
import type { SkillName } from '$lib/zod/lotn/enums/skillName';
import type { PlayerItem } from '$lib/zod/lotn/playerCharacter/playerItem';
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

export function getMeleeTestPool(weapon: PlayerItem | undefined) {
	const characterStoreLocal = get(characterStore);
	const conditionStore = get(characterConditionStore);
	const negativeModifiers =
		0 -
		(conditionStore.blinded ? -5 : 0) -
		(conditionStore.impaired ? -2 : 0) -
		(conditionStore.weakened ? -1 : 0);
	const positiveModifiers =
		(get(bloodSurgeStore)
			? bloodPotencyConfig[get(characterStore).bloodPotency].bloodSurgeBonus
			: 0) + +(weapon?.quality === 'Devastating' ? 1 : 0);

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

function getDodgeTestPool() {
	const characterStoreLocal = get(characterStore);
	const conditionStore = get(characterConditionStore);
	const negativeModifiers =
		0 -
		(conditionStore.blinded ? -5 : 0) -
		(conditionStore.impaired ? -2 : 0) -
		(get(attackerPositionStore) === 'attackerLessThanTwoMetersAway' ? -2 : 0);
	const positiveModifiers =
		0 +
		(get(attackerPositionStore) === 'attackerMoreThanThreeMetersAway' ? +3 : 0) +
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

export function getCloseCombatDodgeTestPool(defenseItem: PlayerItem | undefined = undefined) {
	let baseDodgePool = getDodgeTestPool();

	if (defenseItem?.quality === 'Deflecting') {
		baseDodgePool += 1;
	}

	return baseDodgePool;
}

export function getRangedDodgeTestPool(defenseItem: PlayerItem | undefined = undefined) {
	let baseDodgePool = getDodgeTestPool();

	if (defenseItem?.quality === 'Ballistic') {
		baseDodgePool += 1;
	}

	return baseDodgePool;
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

export function getInitiativePool(weapon: PlayerItem | undefined) {
	return (
		get(characterStore).attributes.social_composure +
		(get(characterStore).skills.find((e) => e.name === 'Awareness')?.value ?? 0) +
		(weapon?.quality === 'Concealable' ? 1 : 0)
	);
}

export function getHuntingTestPool(attribute: AttributeName, skill: SkillName) {
	const attributeValue = get(characterStore).attributes[mapAttributeNameToProperty(attribute)];
	const skillValue = get(characterStore).skills.find((e) => e.name === skill)?.value ?? 0;

	return attributeValue + skillValue;
}
