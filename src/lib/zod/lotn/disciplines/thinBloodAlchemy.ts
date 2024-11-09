import { z } from 'zod';
import { thinBloodAlchemyPowers } from '../enums/disciplinePowers/thinBloodAlchemyPowers';
import { createDisciplineConfigSchema } from '../util';
import { discipline } from './discipline';

export const thinBloodAlchemy = discipline.extend({
	name: z.literal('Thin-Blood Alchemy'),
	powers: thinBloodAlchemyPowers.array().min(1)
});

export const thinBloodAlchemyConfigSchema = createDisciplineConfigSchema('Thin-Blood Alchemy');
export type ThinBloodAlchemyConfigSchema = z.infer<typeof thinBloodAlchemyConfigSchema>;
