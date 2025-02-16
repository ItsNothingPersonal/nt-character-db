import { flawConfig } from '$lib/components/lotn/config/flawsConfig';
import { generateId } from '$lib/util';
import { type FlawName, flawName } from '$lib/zod/lotn/enums/flawName';
import { get, type Writable, writable } from 'svelte/store';
import { z } from 'zod';
import { characterCreationStore } from './characterCreationStore';

export class FlawPaymentStore {
	constructor() {
		this._flawStoreInternal = writable(flawPaymentStoreEntrySchema.array().parse([]));
	}

	_flawStoreInternal: Writable<FlawPaymentStoreEntrySchema[]>;
	_mythicalCounter: Writable<number> = writable(0);

	reset() {
		this._flawStoreInternal.set([]);
		this._mythicalCounter.set(0);
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
		this._mythicalCounter.update((store) => store + value);
	}

	getRequiredMythicalFlaws() {
		return get(this._mythicalCounter);
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

		this._mythicalCounter.update((store) => {
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
