import { z } from 'zod';
import { damageUpdateBody } from '../updateBody/damageUpdateBody';

export const playerHealth = z.object({
	normal: z.number().min(0).max(10).default(0),
	aggrevated: z.number().min(0).max(10).default(0)
});

export type PlayerHealth = z.infer<typeof playerHealth>;

export const playerHealthRequestBodyDB = playerHealth.extend({
	id: z.string().optional(),
	character_id: z.string()
});
export type PlayerHealthRequestBodyDB = z.infer<typeof playerHealthRequestBodyDB>;

export const playerHealthUpdateRequestBody = z.object({
	character_id: z.string(),
	updateData: damageUpdateBody
});
export type PlayerHealthUpdateRequestBody = z.infer<typeof playerHealthUpdateRequestBody>;
