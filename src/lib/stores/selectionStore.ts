import type { PlayerCharacterSelection } from '$lib/zod/lotn/types/playerCharacterSelection';
import { writable } from 'svelte/store';

export const playerCharacterSelectionStore = writable<{
	characters: PlayerCharacterSelection[] | undefined;
	drafts: PlayerCharacterSelection[] | undefined;
}>({ characters: undefined, drafts: undefined });
