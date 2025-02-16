import { generateId } from '$lib/util';
import { meritName, type MeritName } from '$lib/zod/lotn/enums/meritName';
import cloneDeep from 'lodash/cloneDeep';
import { get, type Writable, writable } from 'svelte/store';
import { z } from 'zod';
import { characterCreationStore } from './characterCreationStore';

export class MeritPaymentStore {
	private _initialMeritStoreValues: MeritPaymentStoreEntrySchema[] = [];
	_meritStoreInternal: Writable<MeritPaymentStoreEntrySchema[]> = writable(
		cloneDeep(this._initialMeritStoreValues)
	);
	private unsubscribe: () => void;

	constructor() {
		let initialValue: MeritPaymentStoreEntrySchema[];

		if (typeof localStorage !== 'undefined') {
			const storedValue = localStorage.getItem('meritPaymentStore');
			initialValue = storedValue
				? JSON.parse(storedValue)
				: cloneDeep(this._initialMeritStoreValues);
		} else {
			initialValue = cloneDeep(this._initialMeritStoreValues);
		}

		this._meritStoreInternal.set(initialValue);

		if (typeof localStorage !== 'undefined') {
			this.unsubscribe = this._meritStoreInternal.subscribe((value) => {
				localStorage.setItem('meritPaymentStore', JSON.stringify(value));
			});
		} else {
			this.unsubscribe = () => {};
		}
	}

	destroy() {
		this.unsubscribe();
	}

	reset() {
		this._meritStoreInternal.set([]);
	}

	addPredatorMerit(name: MeritName, value: number) {
		const id = generateId();
		this._meritStoreInternal.update((store) => {
			return [
				...store,
				{
					id,
					name,
					predator: value,
					loresheet: 0,
					freebies: 0,
					xp: 0
				}
			];
		});

		return id;
	}

	addLoresheetMerit(name: MeritName, value: number) {
		this._meritStoreInternal.update((store) => {
			store.push({
				id: generateId(),
				name,
				predator: 0,
				loresheet: value,
				freebies: 0,
				xp: 0
			});
			return store;
		});
	}

	addGenericMerit(name: MeritName, freebies: number, xp: number) {
		const id = generateId();
		this._meritStoreInternal.update((store) => {
			store.push({
				id,
				name,
				predator: 0,
				loresheet: 0,
				freebies,
				xp
			});
			return store;
		});

		return id;
	}

	getPredatorMerits() {
		return get(this._meritStoreInternal).filter((entry) => entry.predator > 0);
	}

	deletePredatorMerits() {
		const meritsToDelete = this.getPredatorMerits();
		const deleteIds = meritsToDelete.map((merit) => merit.id);

		characterCreationStore.update((store) => {
			if (!store.merits) {
				return store;
			}

			store.merits = store.merits.filter((storeMerit) => !deleteIds.includes(storeMerit.id));

			if (store.merits.length === 0) {
				store.merits = undefined;
			}

			return store;
		});

		this._meritStoreInternal.update((store) => {
			return store.filter((merit) => !deleteIds.includes(merit.id));
		});
	}

	deleteLoresheetMerits() {
		const meritsToDelete = get(this._meritStoreInternal).filter((entry) => entry.loresheet > 0);
		const deleteIds = meritsToDelete.map((merit) => merit.id);

		characterCreationStore.update((store) => {
			if (!store.merits) {
				return store;
			}
			store.merits = store.merits.filter((storeMerit) => deleteIds.includes(storeMerit.id));
			return store;
		});

		this._meritStoreInternal.update((store) => {
			return store.filter((merit) => !deleteIds.includes(merit.id));
		});
	}

	deletePredatorMerit(name: MeritName, value: number) {
		const meritToDelete = get(this._meritStoreInternal).find(
			(entry) => entry.name === name && entry.predator === value
		);
		if (!meritToDelete) {
			return;
		}

		characterCreationStore.update((store) => {
			if (!store.merits) {
				return store;
			}
			store.merits = store.merits.filter((storeMerit) => storeMerit.id !== meritToDelete.id);
			return store;
		});

		this._meritStoreInternal.update((store) => {
			return store.filter((merit) => merit.id !== meritToDelete.id);
		});
	}

	getChosenMerits() {
		return get(this._meritStoreInternal).filter((entry) => entry.freebies > 0);
	}

	getPaidMerits() {
		return get(this._meritStoreInternal).filter((entry) => entry.xp > 0);
	}

	deleteMerit(id: string) {
		this._meritStoreInternal.update((store) => {
			return store.filter((merit) => merit.id !== id);
		});
	}

	getMerit(id: string) {
		return get(this._meritStoreInternal).find((merit) => merit.id === id);
	}

	getSelectivePaidValues(
		id: string,
		{
			freebies,
			loresheet,
			predator,
			experience
		}: { freebies: boolean; loresheet: boolean; predator: boolean; experience: boolean }
	) {
		const meritInStore = this.getMerit(id);
		if (!meritInStore) return 0;

		let result = 0;
		if (freebies) {
			result += meritInStore.freebies;
		}
		if (loresheet) {
			result += meritInStore.loresheet;
		}
		if (predator) {
			result += meritInStore.predator;
		}
		if (experience) {
			result += meritInStore.xp;
		}

		return result;
	}
}

const meritPaymentStoreEntrySchema = z.object({
	predator: z.number(),
	loresheet: z.number(),
	freebies: z.number(),
	xp: z.number(),
	id: z.string(),
	name: meritName
});
type MeritPaymentStoreEntrySchema = z.infer<typeof meritPaymentStoreEntrySchema>;

export const meritPaymentStore = new MeritPaymentStore();
