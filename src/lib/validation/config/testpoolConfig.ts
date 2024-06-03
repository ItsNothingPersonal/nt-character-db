import type { DisciplineName } from '$lib/zod/classic/enums/disciplineName';
import type { Testpool } from '$lib/zod/classic/validation/testpool';

export const disciplineTestpoolConfig = new Map<DisciplineName, Testpool>([
	['Auspex', { attribute: 'Mental', skillName: 'Investigation' }],
	['Dominate', { attribute: 'Mental', skillName: 'Intimidation' }],
	['Presence', { attribute: 'Social', skillName: 'Leadership' }]
]);
