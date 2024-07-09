import { z } from 'zod';
import { animalismPowers } from '../enums/disciplinePowers/animalismPowers';
import { createDisciplineConfigSchema } from '../util';
import { discipline } from './discipline';

export const animalism = discipline.extend({
	name: z.literal('Animalism'),
	powers: animalismPowers.array().min(1).max(5)
});

export const animalismConfigSchema = createDisciplineConfigSchema('Animalism');
export type AnimalismConfigSchema = z.infer<typeof animalismConfigSchema>;
