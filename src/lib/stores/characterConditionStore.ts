import {
	conditionStoreSchema,
	type ConditionStoreSchema
} from '$lib/zod/lotn/types/conditionStoreSchema';
import { writable } from 'svelte/store';

export const characterConditionStore = writable<ConditionStoreSchema>(
	conditionStoreSchema.parse({})
);
