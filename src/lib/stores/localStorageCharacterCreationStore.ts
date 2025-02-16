import { generateId } from '$lib/util';
import type { PlayerCharacterCreate } from '$lib/zod/lotn/playerCharacter/playerCharacter';
import cloneDeep from 'lodash/cloneDeep';
import { writable, type Writable } from 'svelte/store';
import { attributesPaidWithDotsStore } from './attributesPaidWithDotsStore';
import { backgroundPaymentStore, initialCharacterStoreObject } from './characterCreationStore';
import { flawPaymentStore } from './flawPaymentStore';
import { meritPaymentStore } from './meritPaymentStore';

export function localStorageCharacterCreationStore(
	key: string
): Writable<PlayerCharacterCreate> & { clear: () => void } {
	let storedValue: PlayerCharacterCreate;

	if (typeof localStorage !== 'undefined') {
		const item = localStorage.getItem(key);
		storedValue = item ? JSON.parse(item) : cloneDeep(initialCharacterStoreObject);
	} else {
		storedValue = cloneDeep(initialCharacterStoreObject);
	}

	const store = writable<PlayerCharacterCreate>(storedValue);

	if (typeof localStorage !== 'undefined') {
		store.subscribe((value) => {
			localStorage.setItem(key, JSON.stringify(value));
		});
	}

	return {
		...store,
		clear: () => {
			if (typeof localStorage !== 'undefined') {
				localStorage.removeItem(key);
			}
			store.set(cloneDeep(initialCharacterStoreObject));
			store.update((store) => {
				if (!store.merits?.find((e) => e.name === 'Linguistics')) {
					store.merits = [{ id: generateId(), name: 'Linguistics', value: 0 }];
				}
				return store;
			});
			attributesPaidWithDotsStore.reset();
			backgroundPaymentStore.reset();
			meritPaymentStore.reset();
			flawPaymentStore.reset();
		}
	};
}
