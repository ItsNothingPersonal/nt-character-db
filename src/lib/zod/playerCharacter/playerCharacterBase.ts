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

export const playerCharacterBaseCreate = z.object({
	id: z.string().default('-1'),
	name: z.string().optional(),
	clan: clanName.optional(),
	generation: z.number().min(6).max(13).default(13),
	archetype: archetypeName.optional()
});
export type PlayerCharacterBaseCreate = z.infer<typeof playerCharacterBaseCreate>;
