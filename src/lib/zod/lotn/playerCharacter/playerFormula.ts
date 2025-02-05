import { z } from 'zod';
import { thinBloodAlchemyPowers } from '../enums/disciplinePowers/thinBloodAlchemyPowers';
import { proteanShapechangeOption } from '../enums/proteanShapechangeOption';
import { normalDisciplinePowerUnion } from '../util';

export const playerFormula = z.object({
	id: z.string(),
	formula: thinBloodAlchemyPowers,
	counterfeitPower: z
		.string()
		.transform((e) => (e === '' ? undefined : normalDisciplinePowerUnion.parse(e)))
		.optional(),
	description: z
		.string()
		.transform((e) => (e === '' ? undefined : z.string().max(50).optional().parse(e)))
		.optional(),
	proteanShapechangeOption: z
		.string()
		.transform((e) => (e === '' ? undefined : proteanShapechangeOption.parse(e)))
		.optional()
});

export type PlayerFormula = z.infer<typeof playerFormula>;

export const playerFormulaRequestBodyDB = z.object({
	id: z.string().optional(),
	character_id: z.string(),
	formulas: playerFormula.array()
});
export type PlayerFormulaRequestBodyDB = z.infer<typeof playerFormulaRequestBodyDB>;

export const playerFormulaUpdateRequestBody = z.object({
	id: z.string(),
	character_id: z.string(),
	updateData: playerFormula.omit({ id: true })
});
export type PlayerFormulaUpdateRequestBody = z.infer<typeof playerFormulaUpdateRequestBody>;
