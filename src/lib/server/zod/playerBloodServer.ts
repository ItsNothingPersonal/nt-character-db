import { playerBlood } from '$lib/zod/playerCharacter/playerBlood';
import { z } from 'zod';

export const playerBloodServer = playerBlood.extend({
	id: z.string()
});

export type PlayerBloodServer = z.infer<typeof playerBloodServer>;
