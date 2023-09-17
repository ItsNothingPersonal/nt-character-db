import { z } from 'zod';
import { skillName } from './skillName';

export const testpool = z.object({
	attribute: z.enum(['Physical', 'Social', 'Mental']),
	skillName: skillName
});

export type Testpool = z.infer<typeof testpool>;
