import { z } from 'zod';

export const playerWillpower = z.object({
	value: z.number().min(0).max(7)
});

export type PlayerWillpower = z.infer<typeof playerWillpower>;
