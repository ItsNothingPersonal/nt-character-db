import { isNullOrUndefined } from '$lib/util';
import type { FlawName } from '$lib/zod/classic/enums/flawName';
import {
	playerCharacter as pc,
	playerCharacterCombined,
	type PlayerCharacter,
	type PlayerCharacterCreate
} from '$lib/zod/classic/playerCharacter/playerCharacter';
import { get, writable } from 'svelte/store';

import { flawConfig } from '../config/flawConfig';
import { calculateFlawCost } from './costCalculations';

export const maxFlaws = writable(7);

export function addFlaw<T extends PlayerCharacterCreate | PlayerCharacter>(
	playerCharacter: T,
	flawName: FlawName
): T {
	const configEntry = flawConfig.get(flawName);

	if (isNullOrUndefined(configEntry)) {
		console.error(`Flaw ${flawName}not found`);
		return playerCharacter;
	}

	if (configEntry.condition && !configEntry.condition(playerCharacter)) {
		console.error('Condition not met');
		return playerCharacter;
	}

	if (get(maxFlaws) < configEntry.cost) {
		console.error('Not enough flaw points');
		return playerCharacter;
	}

	if (configEntry.effect) {
		playerCharacter = configEntry.effect(playerCharacterCombined.parse(playerCharacter)) as T;
	}
	maxFlaws.update((e) => (e -= configEntry.cost));

	if (playerCharacter.flaws) {
		playerCharacter.flaws = [...playerCharacter.flaws, { name: flawName }];
	} else {
		playerCharacter.flaws = [{ name: flawName }];
	}

	const characterTemp = pc.parse(playerCharacter);
	playerCharacter = calculateFlawCost(characterTemp, flawName, 'add', true, configEntry.cost) as T;

	return playerCharacter;
}

export function removeFlaw<T extends PlayerCharacterCreate | PlayerCharacter>(
	playerCharacter: T,
	flawName: FlawName
): T {
	const configEntry = flawConfig.get(flawName);

	if (isNullOrUndefined(configEntry)) {
		return playerCharacter;
	}

	maxFlaws.update((e) => (e += configEntry.cost));

	playerCharacter.flaws = playerCharacter.flaws?.filter((e) => e.name !== flawName);

	const characterTemp = pc.parse(playerCharacter);
	playerCharacter = calculateFlawCost(
		characterTemp,
		flawName,
		'remove',
		true,
		configEntry.cost
	) as T;

	return playerCharacter;
}
