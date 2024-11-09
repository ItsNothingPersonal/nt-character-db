import { z } from 'zod';
import { thinBloodAlchemyPowers } from '../enums/disciplinePowers/thinBloodAlchemyPowers';
import { normalDisciplinePowerUnion } from '../util';

export const playerFormula = z.object({
	id: z.string(),
	formula: thinBloodAlchemyPowers,
	counterfeitPower: z
		.string()
		.transform((e) => (e === '' ? undefined : normalDisciplinePowerUnion.parse(e)))
		.optional()
});

export type PlayerFormula = z.infer<typeof playerFormula>;

export const playerFormulaRequestBodyDB = playerFormula.extend({
	id: z.string().optional(),
	character_id: z.string()
});
export type PlayerFormulaRequestBodyDB = z.infer<typeof playerFormulaRequestBodyDB>;

export const playerFormulaUpdateRequestBody = z.object({
	id: z.string(),
	character_id: z.string(),
	updateData: playerFormula.omit({ id: true })
});
export type PlayerFormulaUpdateRequestBody = z.infer<typeof playerFormulaUpdateRequestBody>;
