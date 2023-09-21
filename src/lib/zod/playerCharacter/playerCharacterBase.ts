import { z } from 'zod';
import { archetypeName } from '../enums/archetypeName';
import { clanName } from '../enums/clanName';

export const playerCharacterBase = z.object({
	id: z.string(),
	name: z.string(),
	clan: clanName,
	generation: z.number().min(6).max(13),
	archetype: archetypeName
});

export type PlayerCharacterBase = z.infer<typeof playerCharacterBase>;
