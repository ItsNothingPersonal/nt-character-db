import { z } from 'zod';
import { proteanShapechangeOption } from '../enums/proteanShapechangeOption';
import { normalDisciplinePowerUnion, ritualDisciplinePowerUnion } from '../util';

export const disciplinePower = z.object({
	id: z.string(),
	name: normalDisciplinePowerUnion.or(ritualDisciplinePowerUnion),
	thinBloodCounterfeitDisciplinePower: z
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

export type DisciplinePower = z.infer<typeof disciplinePower>;
