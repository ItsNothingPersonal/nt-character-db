import { z } from 'zod';
import { mentalSkill, physicalSkill, socialSkill } from '../enums/skillName';

export const playerSkill = z.object({
	id: z.string(),
	name: physicalSkill.or(socialSkill).or(mentalSkill),
	value: z.number().min(1).max(5),
	specialization: z
		.union([z.string().min(1), z.string().max(30)])
		.optional()
		.nullable()
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

export const playerSkillUpdateRequestBody = z.object({
	character_id: z.string(),
	updateData: playerSkill.array().nonempty()
});
export type PlayerSkillUpdateRequestBody = z.infer<typeof playerSkillUpdateRequestBody>;
