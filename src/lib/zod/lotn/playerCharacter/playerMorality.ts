import { z } from 'zod';

export const playerMorality = z.object({
	conviction: z.string().min(1).max(30),
	touchstone: z.string().min(1).max(50)
});

export type PlayerMorality = z.infer<typeof playerMorality>;

export const playerMoralitySingleRequestBodyDB = playerMorality.extend({
	id: z.string().optional(),
	character_id: z.string()
});
export type PlayerMoralitySingleRequestBodyDB = z.infer<typeof playerMoralitySingleRequestBodyDB>;

export const playerMoralityRequestBodyDB = z.object({
	id: z.string().optional(),
	character_id: z.string(),
	morality: playerMorality.array().nonempty()
});
export type PlayerMoralityRequestBodyDB = z.infer<typeof playerMoralityRequestBodyDB>;
