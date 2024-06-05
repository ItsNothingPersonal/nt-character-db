import { z } from 'zod';

export const playerHealth = z.object({
	normal: z.number().min(0).max(10).default(0),
	aggrevated: z.number().min(0).max(10).default(0)
});

export type PlayerHealth = z.infer<typeof playerHealth>;
