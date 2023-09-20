import { z } from 'zod';

export const playerBeastTraits = z.object({
	value: z.number().min(0).max(7)
});

export type PlayerBeastTraits = z.infer<typeof playerBeastTraits>;
