import { z } from 'zod';

export const playerHumanity = z.object({
	value: z.number().min(0).max(10).default(7),
	stains: z.number().min(0).max(10).default(0)
});

export type PlayerHumanity = z.infer<typeof playerHumanity>;

export const playerHumanityRequestBodyDB = playerHumanity.extend({
	id: z.string().optional(),
	character_id: z.string()
});
export type PlayerHumanityRequestBodyDB = z.infer<typeof playerHumanityRequestBodyDB>;
