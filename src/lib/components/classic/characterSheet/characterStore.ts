import {
	playerCharacterCreate,
	type PlayerCharacter,
	type PlayerCharacterCreate
} from '$lib/zod/classic/playerCharacter/playerCharacter';
import { writable, type Writable } from 'svelte/store';

export const characterStore: Writable<PlayerCharacter> = writable();
export const characterCreateStore: Writable<PlayerCharacterCreate> = writable(
	playerCharacterCreate.parse({})
);
