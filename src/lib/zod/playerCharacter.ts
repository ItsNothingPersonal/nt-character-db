import { z } from 'zod';
import { archetypeName } from './archetypeName';
import { clanName } from './clanName';
import { playerAttribute } from './playerAttribute';
import { playerBackground } from './playerBackground';
import { playerDiscipline } from './playerDiscipline';
import { playerFlaw } from './playerFlaw';
import { playerItem } from './playerItem';
import { playerMerit } from './playerMerit';
import { playerMorality } from './playerMorality';
import { playerSkill } from './playerSkill';
import { playerTechnique } from './playerTechnique';

export const playerCharacter = z.object({
	id: z.string(),
	name: z.string(),
	clan: clanName,
	generation: z.number().min(6).max(13),
	archetype: archetypeName,
	attributes: playerAttribute,
	skills: playerSkill.array().nonempty(),
	disciplines: playerDiscipline.array().nonempty(),
	techniques: playerTechnique.array().optional(),
	morality: playerMorality,
	merits: playerMerit.array().optional(),
	flaws: playerFlaw.array().optional(),
	backgrounds: playerBackground.array().nonempty(),
	items: playerItem.array().optional()
});

export type PlayerCharacter = z.infer<typeof playerCharacter>;
