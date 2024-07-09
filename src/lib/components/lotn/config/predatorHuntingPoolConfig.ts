import type { PredatorType } from '$lib/zod/lotn/enums/predatorType';
import { type SkillName } from '$lib/zod/lotn/enums/skillName';

export type PredatorSkillMap = { [K in PredatorType]: [string, SkillName] };

export const predatorHuntingPool: PredatorSkillMap = {
	Alleycat: ['Wits', 'Streetwise'],
	Bagger: ['Intelligence', 'Larceny'],
	Cleaver: ['Manipulation', 'Subterfuge'],
	Consentualist: ['Manipulation', 'Persuasion'],
	Extortionist: ['Manipulation', 'Intimidation'],
	Farmer: ['Composure', 'Animal Ken'],
	Ferryman: ['Occult', 'Medicine'],
	Graverobber: ['Wits', 'Medicine'],
	Hitcher: ['Wits', 'Etiquette'],
	Osiris: ['Manipulation', 'Subterfuge'],
	Sandman: ['Dexterity', 'Stealth'],
	'Scene Queen': ['Charisma', 'Etiquette'],
	Siren: ['Charisma', 'Subterfuge']
};
