import { z } from 'zod';
import { backgroundDisadvantageName } from '../enums/backgroundDisadvantageName';

export const playerBackgroundDisadvantage = z
	.object({
		name: backgroundDisadvantageName,
		value: z.number().min(1).max(3)
	})
	.optional();

export type PlayerBackgroundDisadvantage = z.infer<typeof playerBackgroundDisadvantage>;
