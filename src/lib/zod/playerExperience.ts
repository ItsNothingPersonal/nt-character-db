import { z } from 'zod';
import { experienceChangeTypeName } from './experienceChangeTypeName';

export const playerExperience = z.object({
	date: z.coerce.date(),
	value: z.number().min(1).max(5),
	type: experienceChangeTypeName,
	reason: z.string().nonempty().min(1).max(30)
});

export type PlayerExperience = z.infer<typeof playerExperience>;
