import { z } from 'zod';

export const backgroundName = z.enum([
	'Allies',
	'Alternate Identity',
	'Contacts',
	'Fame',
	'Generation',
	'Haven',
	'Herd',
	'Influences',
	'Resources',
	'Retainers',
	'Rituals'
]);
export type BackgroundName = z.infer<typeof backgroundName>;
