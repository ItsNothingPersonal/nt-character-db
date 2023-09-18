import { writable } from 'svelte/store';

export const characterIdStore = writable<string | undefined>();
