import { z } from 'zod';
import { oblivionPowers } from '../enums/disciplinePowers/oblivionPowers';
import { createDisciplineConfigSchema } from '../util';
import { discipline } from './discipline';

export const oblivion = discipline.extend({
	name: z.literal('Oblivion'),
	powers: oblivionPowers.array().min(1).max(5)
});

export const oblivionConfigSchema = createDisciplineConfigSchema('Oblivion');
export type OblivionConfigSchema = z.infer<typeof oblivionConfigSchema>;
