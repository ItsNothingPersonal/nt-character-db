import { z } from 'zod';
import { backgroundDisadvantageName } from '../enums/backgroundDisadvantageName';
import { backgroundName } from '../enums/backgroundName';

export const playerBackgroundDisadvantage = z.object({
	name: backgroundDisadvantageName,
	value: z.number().min(1).max(3)
});

export type PlayerBackgroundDisadvantage = z.infer<typeof playerBackgroundDisadvantage>;

export const playerBackgroundDisadvantageSingleRequestBodyDB = playerBackgroundDisadvantage.extend({
	id: z.string().optional(),
	background_id: z.string()
});
export type PlayerBackgroundDisadvantageSingleRequestBodyDB = z.infer<
	typeof playerBackgroundDisadvantageSingleRequestBodyDB
>;

export const playerBackgroundDisadvantageRequestBodyDB = z.object({
	id: z.string().optional(),
	background_id: z.string(),
	disadvantages: playerBackgroundDisadvantage.array().nonempty()
});
export type PlayerBackgroundDisadvantageRequestBodyDB = z.infer<
	typeof playerBackgroundDisadvantageRequestBodyDB
>;

export const playerBackgroundDisadvantageUpdateRequestBody = z.object({
	background_id: z.string(),
	updateData: playerBackgroundDisadvantage.array().nonempty()
});
export type PlayerBackgroundDisadvantageUpdateRequestBody = z.infer<
	typeof playerBackgroundDisadvantageUpdateRequestBody
>;

export const backgroundDisadvantageConfig = z.object({
	name: backgroundDisadvantageName,
	prerequisite: z
		.object({
			name: backgroundName,
			value: z.number().min(1).max(3)
		})
		.optional(),
	description: z.string().optional(),
	level1: z.string().optional(),
	level2: z.string().optional()
});
export type BackgroundDisadvantageConfig = z.infer<typeof backgroundDisadvantageConfig>;
