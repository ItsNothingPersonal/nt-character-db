import { z } from 'zod';

export const playerCharacter = z.object({
	name: z.string()
});

export type PlayerCharacter = z.infer<typeof playerCharacter>;
