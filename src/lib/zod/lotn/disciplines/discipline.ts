import { z } from 'zod';
import { disciplineName } from '../enums/disciplineName';
import { normalDisciplinePowerUnion } from '../util';

export const discipline = z.object({
	name: disciplineName,
	powers: z.string().array(),
	value: z.number().min(1).max(5),
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
		.array()
		.optional()
		.transform((e) => (!e || e?.length <= 0 ? undefined : e))
});

export type Discipline = z.infer<typeof discipline>;
