import { z } from 'zod';
import { normalDisciplinePowerUnion, ritualDisciplinePowerUnion } from '../util';

export const playerDisciplinePower = z.object({
	id: z.string(),
	discipline_id: z.string(),
	name: normalDisciplinePowerUnion.or(ritualDisciplinePowerUnion),
	value: z.number().min(1).max(3),
	thinBloodCounterfeitDisciplinePower: z
		.string()
		.transform((e) => (e === '' ? undefined : normalDisciplinePowerUnion.parse(e)))
		.refine((value) =>
			value
				? ![
						'Far Reach',
						'Haze',
						'Counterfeit Power (Level 1)',
						'Envelop',
						'Counterfeit (Level 2)',
						'Defractionate',
						'Counterfeit (Level 3)',
						'Airborne Momentum',
						'Counterfeit (Level 4)',
						'Awaken the Sleeper'
					].includes(value)
				: false
		)
		.optional(),
	description: z
		.string()
		.transform((e) => (e === '' ? undefined : z.string().max(50).optional().parse(e))),
	proteanShapechangeOption: z
		.preprocess(
			(val) => (val === '' ? undefined : val),
			z.enum(['Fast', 'Slippery', 'Climber', 'Swimmer', 'Night Vision'])
		)
		.nullable()
		.optional()
});
export type PlayerDisciplinePower = z.infer<typeof playerDisciplinePower>;

export const playerDisciplinePowerSingleRequestBodyDB = playerDisciplinePower.extend({
	id: z.string().optional(),
	discipline_id: z.string()
});
export type PlayerDisciplinePowerSingleRequestBodyDB = z.infer<
	typeof playerDisciplinePowerSingleRequestBodyDB
>;
