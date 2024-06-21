import { z } from 'zod';
import { flawName } from '../enums/flawName';

export const playerFlaw = z.object({
	name: flawName,
	value: z.number().int().min(0).max(5)
});

export type PlayerFlaw = z.infer<typeof playerFlaw>;

export const playerFlawSingleRequestBodyDB = playerFlaw.extend({
	id: z.string().optional(),
	character_id: z.string()
});
export type PlayerFlawSingleRequestBodyDB = z.infer<typeof playerFlawSingleRequestBodyDB>;

export const playerFlawRequestBodyDB = z.object({
	id: z.string().optional(),
	character_id: z.string(),
	flaws: playerFlaw.array().nonempty()
});
export type PlayerFlawRequestBodyDB = z.infer<typeof playerFlawRequestBodyDB>;

export const playerFlawUpdateRequestBody = z.object({
	character_id: z.string(),
	updateData: playerFlaw.array().nonempty()
});
export type PlayerFlawUpdateRequestBody = z.infer<typeof playerFlawUpdateRequestBody>;
