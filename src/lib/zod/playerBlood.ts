import { z } from 'zod';

export const playerBlood = z.object({
	value: z.number().min(0).max(30)
});

export type PlayerBlood = z.infer<typeof playerBlood>;
