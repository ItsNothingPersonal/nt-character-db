import { z } from 'zod';

export const bloodSorceryPowers = z.enum([
	'A Taste for Blood',
	'Corrosive Vitae',
	'Blood Rash',
	'Extinguish Vitae',
	'Blood of Potency',
	"Scorpion's Touch",
	'Theft of Vitae',
	'Slow the Beating Heart',
	"Baal's Caress",
	'Cauldron of Blood'
]);
export type BloodSorceryPowers = z.infer<typeof bloodSorceryPowers>;
