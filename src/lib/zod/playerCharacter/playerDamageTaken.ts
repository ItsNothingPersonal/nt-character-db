import { z } from 'zod';

export const playerDamageTaken = z.object({
	normal: z.number().min(0).max(15),
	aggrevated: z.number().min(0).max(15)
});

export type PlayerDamageTaken = z.infer<typeof playerDamageTaken>;
