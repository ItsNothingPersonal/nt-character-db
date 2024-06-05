import { z } from 'zod';
import { fortitudePowers } from '../enums/disciplinePowers/fortitudePowers';
import { discipline } from './discipline';

export const fortitude = discipline.extend({
	name: z.literal('Fortitude'),
	powers: fortitudePowers.array().min(1).max(5)
});
