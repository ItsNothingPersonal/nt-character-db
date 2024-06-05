import { z } from 'zod';
import { meritName } from '../enums/meritName';

export const playerMerit = z.object({
	name: meritName,
	value: z.number().int().min(0).max(5)
});

export type PlayerMerit = z.infer<typeof playerMerit>;
