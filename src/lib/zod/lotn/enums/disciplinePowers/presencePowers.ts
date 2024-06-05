import { z } from 'zod';

export const presencePowers = z.enum([
	'Awe',
	'Daunt',
	'Eyes of the Serpent',
	'Monologue',
	'Silencing Tongue',
	'Dread Gaze',
	'Entrancement',
	'Summon',
	'Nightmare Mantle',
	'Majesty',
	'Capricious Visage'
]);
