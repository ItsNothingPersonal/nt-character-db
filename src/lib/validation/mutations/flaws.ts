import { isNullOrUndefined } from '$lib/util';
import type { FlawName } from '$lib/zod/enums/flawName';
import {
	playerCharacterCombined,
	type PlayerCharacterCreate
} from '$lib/zod/playerCharacter/playerCharacter';
import { get, writable } from 'svelte/store';

import { flawConfig } from '../config/flawConfig';

export const maxFlaws = writable(7);

export function addFlaw(
	playerCharacter: PlayerCharacterCreate,
	flawName: FlawName
): PlayerCharacterCreate {
	const configEntry = flawConfig.get(flawName);

	if (isNullOrUndefined(configEntry)) {
		return playerCharacter;
	}

	if (configEntry.condition && !configEntry.condition(playerCharacter)) {
		return playerCharacter;
	}

	if (get(maxFlaws) < configEntry.cost) {
		return playerCharacter;
	}

	if (configEntry.effect) {
		playerCharacter = configEntry.effect(playerCharacterCombined.parse(playerCharacter));
	}
	maxFlaws.update((e) => (e -= configEntry.cost));

	if (playerCharacter.flaws) {
		playerCharacter.flaws = [...playerCharacter.flaws, { name: flawName }];
	} else {
		playerCharacter.flaws = [{ name: flawName }];
	}

	return playerCharacter;
}

export function removeFlaw(
	playerCharacter: PlayerCharacterCreate,
	flawName: FlawName
): PlayerCharacterCreate {
	const configEntry = flawConfig.get(flawName);

	if (isNullOrUndefined(configEntry)) {
		return playerCharacter;
	}

	maxFlaws.update((e) => (e += configEntry.cost));

	playerCharacter.flaws = playerCharacter.flaws?.filter((e) => e.name !== flawName);

	return playerCharacter;
}
