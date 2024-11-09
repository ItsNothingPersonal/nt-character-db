import { writable, type Writable } from 'svelte/store';

export const interactiveModeStore: Writable<boolean> = writable(false);
