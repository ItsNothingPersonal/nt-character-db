import { z } from 'zod';
import { auspexPowers } from '../enums/disciplinePowers/auspexPowers';
import { discipline } from './discipline';

export const auspex = discipline.extend({
	name: z.literal('Auspex'),
	powers: auspexPowers.array().min(1).max(5)
});
