import { z } from 'zod';

export const backgroundName = z.enum([
	'Allies',
	'Familiar',
	'Contacts',
	'Fame',
	'Haven',
	'Herd',
	'Mask',
	'Resources'
]);
export type BackgroundName = z.infer<typeof backgroundName>;
