import { z } from 'zod';

export const playerHunger = z.object({
	value: z.number().int().min(0).max(5)
});

export type PlayerHunger = z.infer<typeof playerHunger>;

export const playerHungerRequestBodyDB = playerHunger.extend({
	id: z.string().optional(),
	character_id: z.string()
});
export type PlayerHungerRequestBodyDB = z.infer<typeof playerHungerRequestBodyDB>;

export const playerHungerUpdateRequestBody = z.object({
	character_id: z.string(),
	updateData: playerHunger
});
export type PlayerHungerUpdateRequestBody = z.infer<typeof playerHungerUpdateRequestBody>;
