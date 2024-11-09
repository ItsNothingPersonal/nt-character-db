import { z } from 'zod';

export const masqueradeThreat = z.enum([
	'Minimal',
	'Low',
	'Medium',
	'Medium to High',
	'High',
	'Low to High',
	'Variable'
]);
export type MasqueradeThreat = z.infer<typeof masqueradeThreat>;
