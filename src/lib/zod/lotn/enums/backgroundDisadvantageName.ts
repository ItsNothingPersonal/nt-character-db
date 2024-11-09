import { z } from 'zod';

export const backgroundDisadvantageName = z.enum([
	'Flaky',
	'Conspiracy Theorist',
	'Paranoid',
	'Jealousy',
	'Paparazzi',
	'Compromised',
	'Creepy',
	'Haunted',
	'Skittish'
]);
export type BackgroundDisadvantageName = z.infer<typeof backgroundDisadvantageName>;
