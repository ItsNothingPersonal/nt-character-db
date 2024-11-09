import { z } from 'zod';

export const meritName = z.enum([
	'Bond Resistance',
	'Short Bond',
	'Sympathy Pains',
	'Unbondable',
	'Linguistics',
	'Cobbler',
	'Phenom',
	'Zeroed',
	'Bloodhound',
	'Iron Gullet',
	'Viscosity',
	'Blood Empathy',
	'Vampiric Visage',
	'Loremaster',
	'Medium',
	'Ambidextrous',
	'Eat Food',
	'Light Sleeper',
	'Calm Heart',
	'Common Sense',
	'Anarch Comrades',
	'Camarilla Contact',
	'Catenating Blood',
	'Day Drinker',
	'Discipline Affinity',
	'Lifelike',
	'Thin-Blood Alchemist',
	'Vampiric Resilience'
]);
export type MeritName = z.infer<typeof meritName>;
