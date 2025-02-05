import { z } from 'zod';
import { thinBloodAlchemyPowers } from '../enums/disciplinePowers/thinBloodAlchemyPowers';
import { createDisciplineConfigSchema } from '../util';
import { discipline } from './discipline';
import { disciplinePower } from './disciplinePower';

export const thinBloodAlchemy = discipline.extend({
	name: z.literal('Thin-Blood Alchemy'),
	powers: disciplinePower.extend({ name: thinBloodAlchemyPowers }).array().min(1).default([])
});
export type ThinBloodAlchemy = z.infer<typeof thinBloodAlchemy>;

export const thinBloodAlchemyConfigSchema = createDisciplineConfigSchema('Thin-Blood Alchemy');
export type ThinBloodAlchemyConfigSchema = z.infer<typeof thinBloodAlchemyConfigSchema>;
