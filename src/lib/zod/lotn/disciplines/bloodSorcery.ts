import { z } from 'zod';
import { bloodSorceryPowers } from '../enums/disciplinePowers/bloodSorceryPowers';
import { discipline } from './discipline';

export const bloodSorcery = discipline.extend({
	name: z.literal('Blood Sorcery'),
	powers: bloodSorceryPowers.array().min(1).max(5)
});
