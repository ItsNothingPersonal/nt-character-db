import { z } from 'zod';
import { presencePowers } from '../enums/disciplinePowers/presencePowers';
import { createDisciplineConfigSchema } from '../util';
import { discipline } from './discipline';
import { disciplinePower } from './disciplinePower';

export const presence = discipline.extend({
	name: z.literal('Presence'),
	powers: disciplinePower.extend({ name: presencePowers }).array().min(1).max(5)
});

export const presenceConfigSchema = createDisciplineConfigSchema('Presence');
export type PresenceConfigSchema = z.infer<typeof presenceConfigSchema>;
