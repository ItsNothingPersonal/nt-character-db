import { z } from 'zod';
import { skillName } from '../enums/skillName';

export const playerSkill = z.object({
	name: skillName,
	value: z.number().min(1).max(5),
	specialization: z
		.union([z.string().min(1), z.string().max(30)])
		.optional()
		.transform((e) => (e === '' ? undefined : e))
});

export type PlayerSkill = z.infer<typeof playerSkill>;

export const playerSkillSingleRequestBodyDB = playerSkill.extend({
	id: z.string().optional(),
	character_id: z.string()
});
export type PlayerSkillSingleRequestBodyDB = z.infer<typeof playerSkillSingleRequestBodyDB>;

export const playerSkillRequestBodyDB = z.object({
	id: z.string().optional(),
	character_id: z.string(),
	skills: playerSkill.array().nonempty()
});
export type PlayerSkillRequestBodyDB = z.infer<typeof playerSkillRequestBodyDB>;
