import { z } from 'zod';
import { loresheetName } from '../enums/loresheetName';

export const playerLoresheet = z.object({
	name: loresheetName,
	values: z.coerce.number().int().min(1).max(3).array()
});
export type PlayerLoresheet = z.infer<typeof playerLoresheet>;

export const playerLoresheetRequestBodyDB = playerLoresheet.extend({
	id: z.string().optional(),
	character_id: z.string()
});
export type PlayerLoresheetRequestBodyDB = z.infer<typeof playerLoresheetRequestBodyDB>;

export const playerLoresheetUpdateRequestBody = z.object({
	character_id: z.string(),
	updateData: playerLoresheet.partial()
});
export type PlayerLoresheetUpdateRequestBody = z.infer<typeof playerLoresheetUpdateRequestBody>;
