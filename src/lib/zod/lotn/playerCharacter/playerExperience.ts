import { z } from 'zod';
import { changeTypeName } from '../enums/changeTypeName';

export const playerExperience = z.object({
	date: z.coerce.date(),
	value: z.number().min(0).max(20),
	type: changeTypeName,
	reason: z.string().min(1).max(40)
});

export type PlayerExperience = z.infer<typeof playerExperience>;
