import { z } from 'zod';

export const playerCharacterSelection = z.object({
	id: z.string().min(1),
	name: z.string().min(1)
});

export type PlayerCharacterSelection = z.infer<typeof playerCharacterSelection>;
