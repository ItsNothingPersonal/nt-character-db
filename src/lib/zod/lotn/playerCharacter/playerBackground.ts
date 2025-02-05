import { z } from 'zod';
import { backgroundName } from '../enums/backgroundName';
import { spheresOfInfluenceName } from '../enums/spheresOfInfluenceName';
import { idSchema } from '../util';
import { playerBackgroundAdvantage } from './playerBackgroundAdvantage';
import { playerBackgroundDisadvantage } from './playerBackgroundDisdvantage';

export const playerBackground = z.object({
	name: backgroundName,
	value: z.number().min(1).max(3),
	sphereOfInfluence: spheresOfInfluenceName
		.or(z.literal(''))
		.default('')
		.transform((e) => (e === '' ? undefined : e))
		.optional(),
	description: z
		.string()
		.max(300)
		.transform((e) => (e === '' ? undefined : e))
		.optional(),
	advantages: playerBackgroundAdvantage.merge(idSchema).array().optional(),
	disadvantages: playerBackgroundDisadvantage.array().optional()
});

export type PlayerBackground = z.infer<typeof playerBackground>;

export const playerBackgroundSingleRequestBodyDB = playerBackground.extend({
	character_id: z.string()
});
export type PlayerBackgroundSingleRequestBodyDB = z.infer<
	typeof playerBackgroundSingleRequestBodyDB
>;

export const playerBackgroundRequestBodyDB = z.object({
	character_id: z.string(),
	backgrounds: playerBackground.merge(idSchema).array().optional()
});
export type PlayerBackgroundRequestBodyDB = z.infer<typeof playerBackgroundRequestBodyDB>;

export const playerBackgroundCreateRequestBodyDB = z.object({
	character_id: z.string(),
	backgrounds: playerBackground.merge(idSchema).array().optional()
});
export type PlayerBackgroundCreateRequestBodyDB = z.infer<
	typeof playerBackgroundCreateRequestBodyDB
>;

export const playerBackgroundUpdateRequestBody = z.object({
	character_id: z.string(),
	updateData: z
		.object({
			id: z.string(),
			name: backgroundName,
			value: z.number().min(1).max(3).optional(),
			sphereOfInfluence: spheresOfInfluenceName
				.or(z.literal(''))
				.default('')
				.transform((e) => (e === '' ? undefined : e))
				.nullable()
				.optional(),
			description: z
				.string()
				.max(30)
				.transform((e) => (e === '' ? undefined : e))
				.nullable()
				.optional(),
			advantages: playerBackgroundAdvantage.array().optional(),
			disadvantages: playerBackgroundDisadvantage.array().optional()
		})
		.array()
		.nonempty()
});
export type PlayerBackgroundUpdateRequestBody = z.infer<typeof playerBackgroundUpdateRequestBody>;
