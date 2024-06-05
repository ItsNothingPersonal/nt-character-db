import { z } from 'zod';
import { presencePowers } from '../enums/disciplinePowers/presencePowers';
import { discipline } from './discipline';

export const presence = discipline.extend({
	name: z.literal('Presence'),
	powers: presencePowers.array().min(1).max(5)
});
