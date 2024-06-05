import { z } from 'zod';
import { backgroundName } from '../enums/backgroundName';
import { spheresOfInfluenceName } from '../enums/spheresOfInfluenceName';
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
		.max(30)
		.transform((e) => (e === '' ? undefined : e))
		.optional(),
	advantages: playerBackgroundAdvantage.array().optional(),
	disadvantages: playerBackgroundDisadvantage.array().optional()
});

export type PlayerBackground = z.infer<typeof playerBackground>;
