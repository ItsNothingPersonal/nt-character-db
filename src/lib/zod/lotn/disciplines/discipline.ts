import { z } from 'zod';
import { disciplineName } from '../enums/disciplineName';
import { disciplinePower } from './disciplinePower';

export const discipline = z.object({
	name: disciplineName,
	value: z.number().min(1).max(5),
	powers: disciplinePower.array().min(1).max(5)
});

export type Discipline = z.infer<typeof discipline>;
