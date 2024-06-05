import { z } from 'zod';
import { dominatePowers } from '../enums/disciplinePowers/dominatePowers';
import { discipline } from './discipline';

export const dominate = discipline.extend({
	name: z.literal('Dominate'),
	powers: dominatePowers.array().min(1).max(5)
});
