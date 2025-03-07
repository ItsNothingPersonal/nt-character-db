import { z } from 'zod';
import { backgroundAdvantageName } from '../enums/backgroundAdvantageName';

export const playerBackgroundAdvantage = z.object({
	id: z.string(),
	name: backgroundAdvantageName,
	value: z.number().min(1).max(3)
});

export type PlayerBackgroundAdvantage = z.infer<typeof playerBackgroundAdvantage>;

export const playerBackgroundAdvantageSingleRequestBodyDB = playerBackgroundAdvantage.extend({
	id: z.string().optional(),
	background_id: z.string()
});
export type PlayerBackgroundAdvantageSingleRequestBodyDB = z.infer<
	typeof playerBackgroundAdvantageSingleRequestBodyDB
>;

export const playerBackgroundAdvantageRequestBodyDB = z.object({
	id: z.string().optional(),
	background_id: z.string(),
	advantages: playerBackgroundAdvantage.array().nonempty()
});
export type PlayerBackgroundAdvantageRequestBodyDB = z.infer<
	typeof playerBackgroundAdvantageRequestBodyDB
>;

export const playerBackgroundAdvantageUpdateRequestBody = z.object({
	background_id: z.string(),
	updateData: playerBackgroundAdvantage.array().nonempty()
});
export type PlayerBackgroundAdvantageUpdateRequestBody = z.infer<
	typeof playerBackgroundAdvantageUpdateRequestBody
>;

export const backgroundAvantageConfig = z.object({
	name: backgroundAdvantageName,
	description: z.string().optional(),
	level1: z.string().optional(),
	level2: z.string().optional(),
	levelVariable: z.string().optional()
});
export type BackgroundAvantageConfig = z.infer<typeof backgroundAvantageConfig>;
