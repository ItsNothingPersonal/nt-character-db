import {
	pointsRecordSchema,
	type PointsRecordSchema
} from '$lib/zod/lotn/types/pointsRecordSchema';
import { writable, type Writable } from 'svelte/store';

export const pointsRecordStore: Writable<PointsRecordSchema> = writable(
	pointsRecordSchema.parse({})
);
