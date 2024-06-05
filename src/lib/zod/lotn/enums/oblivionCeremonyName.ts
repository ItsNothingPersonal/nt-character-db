import { z } from 'zod';

export const oblivionCeremonyName = z.enum([
	'Din of the Damned',
	'Eyes of the Dead',
	'Guiding Spirits',
	'Summon Spirit',
	'Awaken Homuncular Servant',
	'Blinding the Alloy Eye',
	'Compel Spirit',
	'Sin Eater',
	'Black Blood',
	'Chill of Oblivion',
	'Forsaken Edifice',
	'Shambling Hordes',
	'Bastone Diabolico',
	'Bind Spirit',
	'Faces of the Dead',
	"Heart's Bane",
	'Ethereal Horde',
	"Chalchiuhtotolin's Judgment",
	'Alone in the Dark',
	'Avatar of Rot'
]);
export type OblivionCeremonyName = z.infer<typeof oblivionCeremonyName>;
