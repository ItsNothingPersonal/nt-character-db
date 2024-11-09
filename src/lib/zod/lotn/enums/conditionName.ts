import { z } from 'zod';

export const conditionName = z.enum([
	'Blinded',
	'Distracted',
	'Frightened',
	'Grappled',
	'Helpless',
	'Impaired',
	'Prone',
	'Staggered',
	'Weakened'
]);
export type ConditionName = z.infer<typeof conditionName>;
