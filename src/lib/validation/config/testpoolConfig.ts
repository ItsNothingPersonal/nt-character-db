import type { DisciplineName } from '$lib/zod/enums/disciplineName';
import type { Testpool } from '$lib/zod/validation/testpool';

export const disciplineTestpoolConfig = new Map<DisciplineName, Testpool>([
	['Auspex', { attribute: 'Mental', skillName: 'Investigation' }],
	['Dominate', { attribute: 'Mental', skillName: 'Intimidation' }],
	['Presence', { attribute: 'Social', skillName: 'Leadership' }]
]);
