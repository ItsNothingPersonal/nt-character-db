import { z } from 'zod';
import { archetypeName } from './archetypeName';
import { clanName } from './clanName';
import { playerAttribute } from './playerAttribute';
import { playerSkill } from './playerSkill';

export const playerCharacter = z.object({
	id: z.string(),
	name: z.string(),
	clan: clanName,
	generation: z.number().min(6).max(13),
	archetype: archetypeName,
	attributes: playerAttribute,
	skills: playerSkill.array()
});

export type PlayerCharacter = z.infer<typeof playerCharacter>;
