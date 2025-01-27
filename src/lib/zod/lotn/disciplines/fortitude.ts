import { z } from 'zod';
import { fortitudePowers } from '../enums/disciplinePowers/fortitudePowers';
import { createDisciplineConfigSchema } from '../util';
import { discipline } from './discipline';
import { disciplinePower } from './disciplinePower';

export const fortitude = discipline.extend({
	name: z.literal('Fortitude'),
	powers: disciplinePower.extend({ name: fortitudePowers }).array().min(1).max(5)
});

export const fortitudeConfigSchema = createDisciplineConfigSchema('Fortitude');
export type FortitudeConfigSchema = z.infer<typeof fortitudeConfigSchema>;
