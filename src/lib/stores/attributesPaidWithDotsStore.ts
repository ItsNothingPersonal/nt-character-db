import type { AttributeDotCategory } from '$lib/zod/lotn/enums/attributDotCategory';
import { attributeName, type AttributeName } from '$lib/zod/lotn/enums/attributeName';
import cloneDeep from 'lodash/cloneDeep';
import { get, writable, type Writable } from 'svelte/store';
import { z } from 'zod';

export class AttributesPaidWithDotsStore {
	readonly _defaultValues: AttributesPaidWithDotsStoreEntrySchema = {
		4: { max: 1, attributeNames: [] },
		3: { max: 3, attributeNames: [] },
		2: { max: 4, attributeNames: [] },
		1: { max: 1, attributeNames: attributeName.options }
	};

	private _attributesPaidWithDotsStoreInternal: Writable<AttributesPaidWithDotsStoreEntrySchema> =
		writable(cloneDeep(this._defaultValues));
	private unsubscribe: () => void;

	constructor() {
		let initialValue: AttributesPaidWithDotsStoreEntrySchema;

		if (typeof localStorage !== 'undefined') {
			const storedValue = localStorage.getItem('attributesPaidWithDotsStore');
			initialValue = storedValue ? JSON.parse(storedValue) : cloneDeep(this._defaultValues);
		} else {
			initialValue = cloneDeep(this._defaultValues);
		}

		this._attributesPaidWithDotsStoreInternal.set(initialValue);

		if (typeof localStorage !== 'undefined') {
			this.unsubscribe = this._attributesPaidWithDotsStoreInternal.subscribe((value) => {
				localStorage.setItem('attributesPaidWithDotsStore', JSON.stringify(value));
			});
		} else {
			this.unsubscribe = () => {};
		}
	}

	destroy() {
		this.unsubscribe();
	}

	subscribe = this._attributesPaidWithDotsStoreInternal.subscribe;

	get store() {
		return get(this._attributesPaidWithDotsStoreInternal);
	}

	reset() {
		this._attributesPaidWithDotsStoreInternal.set(cloneDeep(this._defaultValues));
	}

	set attributePaidWithDots(value: { dots: AttributeDotCategory; attributeName: AttributeName }) {
		this.removeAttributePaidWithDots(value.attributeName);
		this._attributesPaidWithDotsStoreInternal.update((store) => {
			store[value.dots].attributeNames = [
				...store[value.dots].attributeNames,
				value.attributeName
			].sort();
			return store;
		});
	}

	get max4Dots() {
		return this.store[4].max;
	}

	get max3Dots() {
		return this.store[3].max;
	}

	get max2Dots() {
		return this.store[2].max;
	}

	get max1Dots() {
		return this.store[1].max;
	}

	getAmountDots(value: AttributeDotCategory) {
		return get(this._attributesPaidWithDotsStoreInternal)[value].attributeNames.length;
	}

	getMaxDots(value: AttributeDotCategory) {
		return get(this._attributesPaidWithDotsStoreInternal)[value].max;
	}

	getAttributesPaidWithDotsByName(name: AttributeName) {
		const attributesPaidWithDots = get(this._attributesPaidWithDotsStoreInternal);

		if (attributesPaidWithDots[1].attributeNames.some((attributeName) => attributeName === name)) {
			return 1;
		}
		if (attributesPaidWithDots[2].attributeNames.some((attributeName) => attributeName === name)) {
			return 2;
		}
		if (attributesPaidWithDots[3].attributeNames.some((attributeName) => attributeName === name)) {
			return 3;
		}
		if (attributesPaidWithDots[4].attributeNames.some((attributeName) => attributeName === name)) {
			return 4;
		}
	}

	removeAttributePaidWithDots(attributeName: AttributeName) {
		this._attributesPaidWithDotsStoreInternal.update((store) => {
			for (const key in store) {
				store[parseInt(key) as AttributeDotCategory].attributeNames = store[
					parseInt(key) as AttributeDotCategory
				].attributeNames.filter((name) => name !== attributeName);
			}
			return store;
		});
	}

	haveAllAttributeFreebiesBeenUsed() {
		if (
			this.store[1].attributeNames.length === this.max1Dots &&
			this.store[2].attributeNames.length === this.max2Dots &&
			this.store[3].attributeNames.length === this.max3Dots &&
			this.store[4].attributeNames.length === this.max4Dots
		) {
			return true;
		}
		return false;
	}

	sortAttributeNames(index: number) {
		this._attributesPaidWithDotsStoreInternal.update((store) => {
			const newStore = { ...store };

			newStore[index as AttributeDotCategory].attributeNames =
				newStore[index as AttributeDotCategory].attributeNames.sort();

			return newStore;
		});
	}
}

const attributesPaidWithDotsStoreEntrySchema = z.object({
	4: z.object({ max: z.literal(1), attributeNames: attributeName.array() }),
	3: z.object({ max: z.literal(3), attributeNames: attributeName.array() }),
	2: z.object({ max: z.literal(4), attributeNames: attributeName.array() }),
	1: z.object({ max: z.literal(1), attributeNames: attributeName.array() })
});
type AttributesPaidWithDotsStoreEntrySchema = z.infer<
	typeof attributesPaidWithDotsStoreEntrySchema
>;

export const attributesPaidWithDotsStore = new AttributesPaidWithDotsStore();
