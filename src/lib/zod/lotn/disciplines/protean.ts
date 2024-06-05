import { z } from 'zod';
import { proteanPowers } from '../enums/disciplinePowers/proteanPowers';
import { discipline } from './discipline';

export const protean = discipline.extend({
	name: z.literal('Protean'),
	powers: proteanPowers.array().min(1).max(5)
});
