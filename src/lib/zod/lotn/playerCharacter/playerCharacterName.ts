import { z } from 'zod';

export const playerCharacterName = z.object({
	name: z.string().min(1).max(50)
});

export type PlayerCharacterName = z.infer<typeof playerCharacterName>;

export const playerCharacterNameRequestBodyDB = playerCharacterName.extend({
	id: z.string().optional(),
	character_id: z.string()
});
export type PlayerCharacterNameRequestBodyDB = z.infer<typeof playerCharacterNameRequestBodyDB>;

export const playerCharacterNameUpdateRequestBody = z.object({
	character_id: z.string(),
	updateData: playerCharacterName
});
export type PlayerCharacterNameUpdateRequestBody = z.infer<
	typeof playerCharacterNameUpdateRequestBody
>;
