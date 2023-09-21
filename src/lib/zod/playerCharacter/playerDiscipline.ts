import { z } from 'zod';
import { disciplineName } from '../enums/disciplineName';

export const playerDiscipline = z.object({
	name: disciplineName,
	value: z.number().min(1).max(7),
	inclan: z.boolean()
});

export type PlayerDiscipline = z.infer<typeof playerDiscipline>;
