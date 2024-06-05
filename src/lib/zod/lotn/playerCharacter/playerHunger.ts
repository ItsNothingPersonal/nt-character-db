import { z } from 'zod';

export const playerHunger = z.object({
	value: z.number().int().min(0).max(5)
});

export type PlayerHunger = z.infer<typeof playerHunger>;
