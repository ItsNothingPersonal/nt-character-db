import { z } from 'zod';
import { bloodSorceryPowers } from '../enums/disciplinePowers/bloodSorceryPowers';
import { createDisciplineConfigSchema } from '../util';
import { discipline } from './discipline';
import { disciplinePower } from './disciplinePower';

export const bloodSorcery = discipline.extend({
	name: z.literal('Blood Sorcery'),
	powers: disciplinePower.extend({ name: bloodSorceryPowers }).array().min(1).max(5)
});

export const bloodSorceryConfigSchema = createDisciplineConfigSchema('Blood Sorcery');
export type BloodsorceryConfigSchema = z.infer<typeof bloodSorceryConfigSchema>;
