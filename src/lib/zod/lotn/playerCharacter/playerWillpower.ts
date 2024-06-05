import { z } from 'zod';

export const playerWillpower = z.object({
	value: z.number().int().min(0).max(10)
});

export type PlayerWillpower = z.infer<typeof playerWillpower>;
