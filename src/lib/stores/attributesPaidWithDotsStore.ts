import type { AttributeDotCategory } from '$lib/zod/lotn/enums/attributDotCategory';
import { attributeName, type AttributeName } from '$lib/zod/lotn/enums/attributeName';
import { derived, get, writable, type Writable } from 'svelte/store';
import { z } from 'zod';

export class AttributesPaidWithDotsStore {
	constructor() {
		this._attributesPaidWithDotsStoreInternal = writable(
			attributesPaidWithDotsStoreEntrySchema.parse({
				4: { max: 1, attributeNames: [] },
				3: { max: 3, attributeNames: [] },
				2: { max: 4, attributeNames: [] },
				1: { max: 1, attributeNames: attributeName.options }
			})
		);
	}

	private _attributesPaidWithDotsStoreInternal: Writable<AttributesPaidWithDotsStoreEntrySchema>;

	get store() {
		return get(this._attributesPaidWithDotsStoreInternal);
	}

	set attributePaidWithDots(value: { dots: AttributeDotCategory; attributeName: AttributeName }) {
		this.removeAttributePaidWithDots(value.attributeName);
		this._attributesPaidWithDotsStoreInternal.update((store) => {
			store[value.dots].attributeNames = [...store[value.dots].attributeNames, value.attributeName];
			return store;
		});
	}

	get amount4Dots() {
		return derived(this._attributesPaidWithDotsStoreInternal, ($store) => {
			return $store[4].attributeNames.length;
		});
	}

	get max4Dots() {
		return derived(this._attributesPaidWithDotsStoreInternal, ($store) => {
			return $store[4].max;
		});
	}

	get amount3Dots() {
		return derived(this._attributesPaidWithDotsStoreInternal, ($store) => {
			return $store[3].attributeNames.length;
		});
	}

	get max3Dots() {
		return derived(this._attributesPaidWithDotsStoreInternal, ($store) => {
			return $store[3].max;
		});
	}

	get amount2Dots() {
		return derived(this._attributesPaidWithDotsStoreInternal, ($store) => {
			return $store[2].attributeNames.length;
		});
	}

	get max2Dots() {
		return derived(this._attributesPaidWithDotsStoreInternal, ($store) => {
			return $store[2].max;
		});
	}

	get amount1Dots() {
		return derived(this._attributesPaidWithDotsStoreInternal, ($store) => {
			return $store[1].attributeNames.length;
		});
	}

	get max1Dots() {
		return derived(this._attributesPaidWithDotsStoreInternal, ($store) => {
			return $store[1].max;
		});
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
			get(this.amount1Dots) === get(this.max1Dots) &&
			get(this.amount2Dots) === get(this.max2Dots) &&
			get(this.amount3Dots) === get(this.max3Dots) &&
			get(this.amount4Dots) === get(this.max4Dots)
		) {
			return true;
		}
		return false;
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
