import { z } from 'zod';

export const playerWillpower = z.object({
	value: z.number().int().min(0).max(10)
});

export type PlayerWillpower = z.infer<typeof playerWillpower>;

export const playerWillpowerRequestBodyDB = playerWillpower.extend({
	id: z.string().optional(),
	character_id: z.string()
});
export type PlayerWillpowerRequestBodyDB = z.infer<typeof playerWillpowerRequestBodyDB>;

export const playerWillpowerUpdateRequestBody = z.object({
	character_id: z.string(),
	updateData: playerWillpower
});
export type PlayerWillpowerUpdateRequestBody = z.infer<typeof playerWillpowerUpdateRequestBody>;
