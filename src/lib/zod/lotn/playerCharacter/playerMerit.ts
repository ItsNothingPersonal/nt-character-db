import { z } from 'zod';
import { meritName } from '../enums/meritName';
import { idSchema } from '../util';

export const playerMerit = z.object({
	name: meritName,
	value: z.number().int().min(0).max(5),
	linkedSkill: z
		.string()
		.transform((e) => (e === '' ? undefined : e))
		.optional()
});

export type PlayerMerit = z.infer<typeof playerMerit>;

export const playerMeritSingleRequestBodyDB = playerMerit.extend({
	id: z.string().optional(),
	character_id: z.string()
});
export type PlayerMeritSingleRequestBodyDB = z.infer<typeof playerMeritSingleRequestBodyDB>;

export const playerMeritRequestBodyDB = z.object({
	id: z.string().optional(),
	character_id: z.string(),
	merits: playerMerit.array().nonempty()
});
export type PlayerMeritRequestBodyDB = z.infer<typeof playerMeritRequestBodyDB>;

export const playerMeritUpdateRequestBody = z.object({
	character_id: z.string(),
	updateData: playerMerit.merge(idSchema).array().nonempty()
});
export type PlayerMeritUpdateRequestBody = z.infer<typeof playerMeritUpdateRequestBody>;