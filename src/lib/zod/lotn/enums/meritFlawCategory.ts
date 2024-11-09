import { z } from 'zod';

export const meritFlawCategory = z.enum([
	'Bonding',
	'Connection',
	'Feeding',
	'Ghoul',
	'Mythical',
	'Physical',
	'Psychological',
	'Thin-Blood'
]);
export type MeritFlawCategory = z.infer<typeof meritFlawCategory>;
