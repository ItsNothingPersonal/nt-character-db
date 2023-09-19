import { localStorageStore } from '@skeletonlabs/skeleton';
import type { Writable } from 'svelte/store';

export const characterIdStore: Writable<string | undefined> = localStorageStore(
	'character-id',
	undefined
);
