import { z } from 'zod';

export const playerMorality = z.object({
	conviction: z.string().min(1).max(30),
	touchstone: z.string().min(1).max(50)
});

export type PlayerMorality = z.infer<typeof playerMorality>;
