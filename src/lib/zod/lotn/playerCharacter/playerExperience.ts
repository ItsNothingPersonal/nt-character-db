import { z } from 'zod';
import { changeTypeName } from '../enums/changeTypeName';

export const playerExperience = z.object({
	date: z.coerce.date(),
	value: z.number().min(0).max(20),
	type: changeTypeName,
	reason: z.string().min(1).max(40)
});

export type PlayerExperience = z.infer<typeof playerExperience>;

export const playerExperienceSingleRequestBodyDB = playerExperience.extend({
	id: z.string().optional(),
	character_id: z.string()
});
export type PlayerExperienceSingleRequestBodyDB = z.infer<
	typeof playerExperienceSingleRequestBodyDB
>;

export const playerExperienceRequestBodyDB = z.object({
	id: z.string().optional(),
	character_id: z.string(),
	experience: playerExperience.array().nonempty()
});
export type PlayerExperienceRequestBodyDB = z.infer<typeof playerExperienceRequestBodyDB>;
