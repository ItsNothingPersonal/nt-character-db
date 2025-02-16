import { flawConfig } from '$lib/components/lotn/config/flawsConfig';
import { generateId } from '$lib/util';
import { type FlawName, flawName } from '$lib/zod/lotn/enums/flawName';
import cloneDeep from 'lodash/cloneDeep';
import { get, type Writable, writable } from 'svelte/store';
import { z } from 'zod';
import { characterCreationStore } from './characterCreationStore';

export class FlawPaymentStore {
	private _initialFlawStoreValues: FlawPaymentStoreEntrySchema[] = [];
	_flawStoreInternal: Writable<FlawPaymentStoreEntrySchema[]> = writable(
		cloneDeep(this._initialFlawStoreValues)
	);
	private unsubscribeFlawPaymentStore: () => void;

	private _initialMythicalCounterValue = 0;
	_mythicalCounterStoreInternal: Writable<number> = writable(
		cloneDeep(this._initialMythicalCounterValue)
	);
	private unsubscribeMythicalCounterStore: () => void;

	constructor() {
		// Flaw Store
		let initialValueFlawPaymentStore: FlawPaymentStoreEntrySchema[];

		if (typeof localStorage !== 'undefined') {
			const storedValue = localStorage.getItem('flawPaymentStore');
			initialValueFlawPaymentStore = storedValue
				? JSON.parse(storedValue)
				: cloneDeep(this._initialFlawStoreValues);
		} else {
			initialValueFlawPaymentStore = cloneDeep(this._initialFlawStoreValues);
		}

		this._flawStoreInternal.set(initialValueFlawPaymentStore);

		if (typeof localStorage !== 'undefined') {
			this.unsubscribeFlawPaymentStore = this._flawStoreInternal.subscribe((value) => {
				localStorage.setItem('flawPaymentStore', JSON.stringify(value));
			});
		} else {
			this.unsubscribeFlawPaymentStore = () => {};
		}

		// Mythical Counter Store
		let initialValueMythicalCounterStore: number;

		if (typeof localStorage !== 'undefined') {
			const storedValue = localStorage.getItem('mythicalCounterStore');
			initialValueMythicalCounterStore = storedValue
				? JSON.parse(storedValue)
				: cloneDeep(this._initialMythicalCounterValue);
		} else {
			initialValueMythicalCounterStore = cloneDeep(this._initialMythicalCounterValue);
		}

		this._mythicalCounterStoreInternal.set(initialValueMythicalCounterStore);

		if (typeof localStorage !== 'undefined') {
			this.unsubscribeMythicalCounterStore = this._mythicalCounterStoreInternal.subscribe(
				(value) => {
					localStorage.setItem('mythicalCounterStore', JSON.stringify(value));
				}
			);
		} else {
			this.unsubscribeMythicalCounterStore = () => {};
		}
	}

	destroy() {
		this.unsubscribeFlawPaymentStore();
		this.unsubscribeMythicalCounterStore();
	}

	reset() {
		this._flawStoreInternal.set(cloneDeep(this._initialFlawStoreValues));
		this._mythicalCounterStoreInternal.set(0);
	}

	addPredatorFlaw(name: FlawName, value: number, hasPredeterminedDescription: boolean = false) {
		const id = generateId();
		this._flawStoreInternal.update((store) => {
			return [
				...store,
				{
					id,
					name,
					predator: value,
					loresheet: 0,
					freebies: 0,
					xp: 0,
					hasPredeterminedDescription
				}
			];
		});

		return id;
	}

	addLoresheetFlaw(name: FlawName, value: number) {
		this._flawStoreInternal.update((store) => {
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

	addGenericFlaw(name: FlawName, freebies: number, xp: number) {
		const id = generateId();
		this._flawStoreInternal.update((store) => {
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

	addRequiredMythicalFlaws(value: number) {
		this._mythicalCounterStoreInternal.update((store) => store + value);
	}

	getRequiredMythicalFlaws() {
		return get(this._mythicalCounterStoreInternal);
	}

	getPredatorFlaws() {
		return get(this._flawStoreInternal).filter((entry) => entry.predator > 0);
	}

	getMythicalPredatorFlawsTotalValue() {
		return get(this._flawStoreInternal)
			.filter((entry) => entry.predator > 0 && flawConfig[entry.name]?.category === 'Mythical')
			.reduce((acc, entry) => acc + entry.predator, 0);
	}

	deletePredatorFlaws() {
		const flawsToDelete = this.getPredatorFlaws();
		const deleteIds = flawsToDelete.map((flaw) => flaw.id);

		this._mythicalCounterStoreInternal.update((store) => {
			store = 0;
			return store;
		});

		characterCreationStore.update((store) => {
			if (!store.flaws) {
				return store;
			}

			store.flaws = store.flaws.filter((storeFlaw) => !deleteIds.includes(storeFlaw.id));

			if (store.flaws.length === 0) {
				store.flaws = undefined;
			}

			return store;
		});

		this._flawStoreInternal.update((store) => {
			return store.filter((merit) => !deleteIds.includes(merit.id));
		});
	}

	deleteLoresheetFlaws() {
		const flawsToDelete = get(this._flawStoreInternal).filter((entry) => entry.loresheet > 0);
		const deleteIds = flawsToDelete.map((merit) => merit.id);

		characterCreationStore.update((store) => {
			if (!store.flaws) {
				return store;
			}
			store.flaws = store.flaws.filter((storeFlaw) => deleteIds.includes(storeFlaw.id));
			return store;
		});

		this._flawStoreInternal.update((store) => {
			return store.filter((merit) => !deleteIds.includes(merit.id));
		});
	}

	deletePredatorFlaw(name: FlawName, value: number) {
		const flawToDelete = get(this._flawStoreInternal).find(
			(entry) => entry.name === name && entry.predator === value
		);
		if (!flawToDelete) {
			return;
		}

		characterCreationStore.update((store) => {
			if (!store.merits) {
				return store;
			}
			store.merits = store.merits.filter((storeFlaw) => storeFlaw.id !== flawToDelete.id);
			return store;
		});

		this._flawStoreInternal.update((store) => {
			return store.filter((flaw) => flaw.id !== flawToDelete.id);
		});
	}

	getChosenFlaws() {
		return get(this._flawStoreInternal).filter((entry) => entry.freebies > 0);
	}

	deleteFlaw(id: string) {
		this._flawStoreInternal.update((store) => {
			return store.filter((flaw) => flaw.id !== id);
		});
	}
}

const flawPaymentStoreEntrySchema = z.object({
	predator: z.number(),
	loresheet: z.number(),
	freebies: z.number(),
	xp: z.number(),
	id: z.string(),
	name: flawName,
	hasPredeterminedDescription: z.boolean().default(false).optional()
});
type FlawPaymentStoreEntrySchema = z.infer<typeof flawPaymentStoreEntrySchema>;

export const flawPaymentStore = new FlawPaymentStore();
