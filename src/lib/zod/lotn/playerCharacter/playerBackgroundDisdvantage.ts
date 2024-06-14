import { z } from 'zod';
import { backgroundDisadvantageName } from '../enums/backgroundDisadvantageName';

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
