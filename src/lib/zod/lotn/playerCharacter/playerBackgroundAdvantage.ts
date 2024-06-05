import { z } from 'zod';
import { backgroundAdvantageName } from '../enums/backgroundAdvantageName';

export const playerBackgroundAdvantage = z.object({
	name: backgroundAdvantageName,
	value: z.number().min(1).max(3)
});

export type PlayerBackgroundAdvantage = z.infer<typeof playerBackgroundAdvantage>;
