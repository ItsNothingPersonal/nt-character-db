import { z } from 'zod';

export const predatorType = z.enum([
	'Alleycat',
	'Bagger',
	'Cleaver',
	'Consentualist',
	'Extortionist',
	'Farmer',
	'Ferryman',
	'Graverobber',
	'Hitcher',
	'Osiris',
	'Sandman',
	'Scene Queen',
	'Siren'
]);
export type PredatorType = z.infer<typeof predatorType>;
