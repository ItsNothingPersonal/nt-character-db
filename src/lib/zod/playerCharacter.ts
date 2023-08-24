import { z } from 'zod';
import { archetypeName } from './archetypeName';
import { clanName } from './clanName';
import { playerAttribute } from './playerAttribute';
import { playerDiscipline } from './playerDiscipline';
import { playerSkill } from './playerSkill';
import { playerTechnique } from './playerTechnique';

export const playerCharacter = z.object({
	id: z.string(),
	name: z.string(),
	clan: clanName,
	generation: z.number().min(6).max(13),
	archetype: archetypeName,
	attributes: playerAttribute,
	skills: playerSkill.array(),
	disciplines: playerDiscipline.array(),
	techniques: playerTechnique.array().optional()
});

export type PlayerCharacter = z.infer<typeof playerCharacter>;
