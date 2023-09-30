import { isNullOrUndefined } from '$lib/util';
import type { MeritName } from '$lib/zod/enums/meritName';
import {
	playerCharacterCombined,
	type PlayerCharacterCreate
} from '$lib/zod/playerCharacter/playerCharacter';
import { get, writable } from 'svelte/store';
import { meritConfig } from '../config/meritConfig';

export const maxMerits = writable(7);

export function addMerit(
	playerCharacter: PlayerCharacterCreate,
	meritName: MeritName
): PlayerCharacterCreate {
	const configEntry = meritConfig.get(meritName);

	if (isNullOrUndefined(configEntry)) {
		return playerCharacter;
	}

	if (configEntry.condition && !configEntry.condition(playerCharacter)) {
		return playerCharacter;
	}

	if (get(maxMerits) < configEntry.cost) {
		return playerCharacter;
	}

	if (configEntry.effect) {
		playerCharacter = configEntry.effect(playerCharacterCombined.parse(playerCharacter));
	}
	maxMerits.update((e) => (e -= configEntry.cost));

	if (playerCharacter.merits) {
		playerCharacter.merits = [...playerCharacter.merits, { name: meritName }];
	} else {
		playerCharacter.merits = [{ name: meritName }];
	}

	return playerCharacter;
}

export function removeMerit(
	playerCharacter: PlayerCharacterCreate,
	meritName: MeritName
): PlayerCharacterCreate {
	const configEntry = meritConfig.get(meritName);

	if (isNullOrUndefined(configEntry)) {
		return playerCharacter;
	}

	maxMerits.update((e) => (e += configEntry.cost));

	playerCharacter.merits = playerCharacter.merits?.filter((e) => e.name !== meritName);

	return playerCharacter;
}
