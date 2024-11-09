import { z } from 'zod';
import { dominatePowers } from '../enums/disciplinePowers/dominatePowers';
import { createDisciplineConfigSchema } from '../util';
import { discipline } from './discipline';

export const dominate = discipline.extend({
	name: z.literal('Dominate'),
	powers: dominatePowers.array().min(1).max(5)
});

export const dominateConfigSchema = createDisciplineConfigSchema('Dominate');
export type DominateConfigSchema = z.infer<typeof dominateConfigSchema>;
