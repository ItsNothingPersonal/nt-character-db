import { z } from 'zod';
import { skillName } from '../enums/skillName';

export const itemQualityBonus = z.object({
	skillName: skillName,
	bonus: z.number(),
	condition: z.function().args(z.any()).returns(z.boolean()).optional()
});

export type ItemQualityBonus = z.infer<typeof itemQualityBonus>;
