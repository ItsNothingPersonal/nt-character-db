import { z } from 'zod';
import { bloodSorceryRitualName } from '../enums/bloodSorceryRitualName';

export const playerRitual = z.object({
	rituals: bloodSorceryRitualName.array().default([])
});

export type PlayerRitual = z.infer<typeof playerRitual>;

export const playerRitualRequestBodyDB = playerRitual.extend({
	id: z.string().optional(),
	character_id: z.string()
});
export type PlayerRitualRequestBodyDB = z.infer<typeof playerRitualRequestBodyDB>;

export const playerRitualUpdateRequestBody = z.object({
	character_id: z.string(),
	updateData: bloodSorceryRitualName.array().nonempty()
});
export type PlayerRitualUpdateRequestBody = z.infer<typeof playerRitualUpdateRequestBody>;
