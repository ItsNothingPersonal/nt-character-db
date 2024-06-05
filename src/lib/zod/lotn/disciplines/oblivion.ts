import { z } from 'zod';
import { oblivionPowers } from '../enums/disciplinePowers/oblivionPowers';
import { discipline } from './discipline';

export const oblivion = discipline.extend({
	name: z.literal('Oblivion'),
	powers: oblivionPowers.array().min(1).max(5)
});
