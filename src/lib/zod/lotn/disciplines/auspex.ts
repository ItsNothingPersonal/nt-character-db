import { z } from 'zod';
import { auspexPowers } from '../enums/disciplinePowers/auspexPowers';
import { createDisciplineConfigSchema } from '../util';
import { discipline } from './discipline';
import { disciplinePower } from './disciplinePower';

export const auspex = discipline.extend({
	name: z.literal('Auspex'),
	powers: disciplinePower.extend({ name: auspexPowers }).array().min(1).max(5)
});

export const auspexConfigSchema = createDisciplineConfigSchema('Auspex');
export type AuspexConfigSchema = z.infer<typeof auspexConfigSchema>;
