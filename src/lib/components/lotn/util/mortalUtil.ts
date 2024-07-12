import { characterStore } from '$lib/components/lotn/characterSheet/characterStore.js';
import { get } from 'svelte/store';

export function isMortal() {
	const characterStoreLocal = get(characterStore);
	return characterStoreLocal.bloodPotency === 0 && characterStoreLocal.clan !== 'Thin-Blooded';
}
