import { z } from 'zod';
import { archetypeName } from './archetypeName';
import { clanName } from './clanName';
import { playerAttribute } from './playerAttribute';

export const playerCharacter = z.object({
	id: z.string(),
	name: z.string(),
	clan: clanName,
	generation: z.number().min(6).max(13),
	archetype: archetypeName,
	attributes: playerAttribute
});

export type PlayerCharacter = z.infer<typeof playerCharacter>;
