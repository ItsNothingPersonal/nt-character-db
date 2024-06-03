import { isNullOrUndefined } from '$lib/util';
import type { MeritName } from '$lib/zod/classic/enums/meritName';
import {
	playerCharacter as pc,
	playerCharacterCombined,
	type PlayerCharacter,
	type PlayerCharacterCreate
} from '$lib/zod/classic/playerCharacter/playerCharacter';
import { get, writable } from 'svelte/store';
import { meritConfig } from '../config/meritConfig';
import { calculateMeritCost } from './costCalculations';

export const maxMerits = writable(7);

export function addMerit<T extends PlayerCharacterCreate | PlayerCharacter>(
	playerCharacter: T,
	meritName: MeritName
): T {
	const configEntry = meritConfig.get(meritName);

	if (isNullOrUndefined(configEntry)) {
		console.error(`Merit ${meritName}not found`);
		return playerCharacter;
	}

	if (configEntry.condition && !configEntry.condition(playerCharacter)) {
		console.error('Condition not met');
		return playerCharacter;
	}

	if (get(maxMerits) < configEntry.cost) {
		console.error('Not enough merit points');
		return playerCharacter;
	}

	if (configEntry.effect) {
		playerCharacter = configEntry.effect(playerCharacterCombined.parse(playerCharacter)) as T;
	}
	maxMerits.update((e) => (e -= configEntry.cost));

	if (playerCharacter.merits) {
		playerCharacter.merits = [...playerCharacter.merits, { name: meritName }];
	} else {
		playerCharacter.merits = [{ name: meritName }];
	}

	const characterTemp = pc.parse(playerCharacter);
	playerCharacter = calculateMeritCost(
		characterTemp,
		meritName,
		'add',
		true,
		configEntry.cost
	) as T;

	return playerCharacter;
}

export function removeMerit<T extends PlayerCharacterCreate | PlayerCharacter>(
	playerCharacter: T,
	meritName: MeritName
): T {
	const configEntry = meritConfig.get(meritName);

	if (isNullOrUndefined(configEntry)) {
		return playerCharacter;
	}

	maxMerits.update((e) => (e += configEntry.cost));

	playerCharacter.merits = playerCharacter.merits?.filter((e) => e.name !== meritName);

	const characterTemp = pc.parse(playerCharacter);
	playerCharacter = calculateMeritCost(
		characterTemp,
		meritName,
		'remove',
		true,
		configEntry.cost
	) as T;

	return playerCharacter;
}
