import { projectName } from '$lib/zod/projectName';
import { z } from 'zod';
import { characterStatus } from '../enums/characterStatus';
import { clanName } from '../enums/clanName';

export const playerCharacterSelection = z.object({
	id: z.string().min(1),
	name: z.string().min(1),
	clan: clanName,
	status: characterStatus,
	project: projectName
});

export type PlayerCharacterSelection = z.infer<typeof playerCharacterSelection>;
