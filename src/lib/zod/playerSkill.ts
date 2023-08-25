import { z } from 'zod';
import { skillName } from './skillName';

export const playerSkill = z.object({
	name: skillName,
	value: z.number().min(1).max(7),
	specialization: z
		.union([z.string().min(1), z.string().max(30)])
		.optional()
		.transform((e) => (e === '' ? undefined : e))
});

export type PlayerSkill = z.infer<typeof playerSkill>;
