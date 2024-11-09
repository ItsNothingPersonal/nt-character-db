import { z } from 'zod';
import { proteanPowers } from '../enums/disciplinePowers/proteanPowers';
import { createDisciplineConfigSchema } from '../util';
import { discipline } from './discipline';

export const protean = discipline.extend({
	name: z.literal('Protean'),
	powers: proteanPowers.array().min(1).max(5)
});

export const proteanConfigSchema = createDisciplineConfigSchema('Protean');
export type ProteanConfigSchema = z.infer<typeof proteanConfigSchema>;
