import { localStorageStore } from '@skeletonlabs/skeleton';
import type { Writable } from 'svelte/store';

export const apiKeyStore: Writable<string | undefined> = localStorageStore('api-key', undefined);
