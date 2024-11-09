import { z } from 'zod';
import { potencePowers } from '../enums/disciplinePowers/potencePowers';
import { createDisciplineConfigSchema } from '../util';
import { discipline } from './discipline';

export const potence = discipline.extend({
	name: z.literal('Potence'),
	powers: potencePowers.array().min(1).max(5)
});

export const potenceConfigSchema = createDisciplineConfigSchema('Potence');
export type PotenceConfigSchema = z.infer<typeof potenceConfigSchema>;
