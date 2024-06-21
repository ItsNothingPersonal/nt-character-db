import { localStorageStore } from '@skeletonlabs/skeleton';
import type { Writable } from 'svelte/store';

export const selectedCharacterIdStoreClassic: Writable<string | undefined> = localStorageStore(
	'character-id',
	undefined
);

export const selectedCharacterIdStoreLotN: Writable<string | undefined> = localStorageStore(
	'character-id',
	undefined
);
