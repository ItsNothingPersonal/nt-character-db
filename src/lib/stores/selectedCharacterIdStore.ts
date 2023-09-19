import { localStorageStore } from '@skeletonlabs/skeleton';
import type { Writable } from 'svelte/store';

export const selectedCharacterIdStore: Writable<string | undefined> = localStorageStore(
	'character-id',
	undefined
);
