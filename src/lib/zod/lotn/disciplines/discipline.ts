import { z } from 'zod';
import { disciplineName } from '../enums/disciplineName';

export const discipline = z.object({
	name: disciplineName,
	powers: z.string().array(),
	value: z.number().min(1).max(5)
});

export type Discipline = z.infer<typeof discipline>;
