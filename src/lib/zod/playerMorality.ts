import { z } from 'zod';
import { moralityName } from './moralityName';

export const playerMorality = z.object({
	name: moralityName,
	value: z.number().min(0).max(7)
});

export type PlayerMorality = z.infer<typeof playerMorality>;
