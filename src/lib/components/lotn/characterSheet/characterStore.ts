import { type PlayerCharacter } from '$lib/zod/lotn/playerCharacter/playerCharacter';
import { writable, type Writable } from 'svelte/store';

export const characterStore: Writable<PlayerCharacter> = writable();
