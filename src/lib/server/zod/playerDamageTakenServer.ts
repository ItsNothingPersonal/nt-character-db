import { playerDamageTaken } from '$lib/zod/classic/playerCharacter/playerDamageTaken';
import { z } from 'zod';

export const playerDamageTakenServer = playerDamageTaken.extend({
	id: z.string()
});

export type PlayerDamageTakenServer = z.infer<typeof playerDamageTakenServer>;
