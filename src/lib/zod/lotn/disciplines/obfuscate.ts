import { z } from 'zod';
import { obfuscatePowers } from '../enums/disciplinePowers/obfuscatePowers';
import { discipline } from './discipline';

export const obfuscate = discipline.extend({
	name: z.literal('Obfuscate'),
	powers: obfuscatePowers.array().min(1).max(5)
});
