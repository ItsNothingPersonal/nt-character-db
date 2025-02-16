import { z } from 'zod';
import { mentalSkill, physicalSkill, socialSkill } from '../enums/skillName';

export const playerSkill = z.object({
	id: z.string(),
	name: physicalSkill.or(socialSkill).or(mentalSkill),
	value: z.number().min(1).max(5),
	specialization: z
		.string()
		.transform((e) => (e === '' ? undefined : e))
		.refine((e) => e === undefined || (typeof e === 'string' && e.length >= 1 && e.length <= 30), {
			message: 'Specialization must be between 1 and 30 characters'
		})
		.nullable()
		.optional()
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
