import { z } from 'zod';
import { celerityPowers } from '../enums/disciplinePowers/celerityPowers';
import { createDisciplineConfigSchema } from '../util';
import { discipline } from './discipline';

export const celerity = discipline.extend({
	name: z.literal('Celerity'),
	powers: celerityPowers.array().min(1).max(5)
});

export const celerityConfigSchema = createDisciplineConfigSchema('Celerity');
export type CelerityConfigSchema = z.infer<typeof celerityConfigSchema>;
