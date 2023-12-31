import { playerWillpower } from '$lib/zod/playerCharacter/playerWillpower';
import { z } from 'zod';

export const playerWillpowerServer = playerWillpower.extend({
	id: z.string()
});

export type PlayerWillpowerServer = z.infer<typeof playerWillpowerServer>;
