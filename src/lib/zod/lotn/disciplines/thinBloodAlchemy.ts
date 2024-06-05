import { z } from 'zod';
import { thinBloodAlchemyPowers } from '../enums/disciplinePowers/thinBloodAlchemyPowers';
import { discipline } from './discipline';

export const thinBloodAlchemy = discipline.extend({
	name: z.literal('Thin-Blood Alchemy'),
	powers: thinBloodAlchemyPowers.array().min(1).max(5)
});
