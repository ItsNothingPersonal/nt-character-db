import { z } from 'zod';
import { playerHealth } from '../playerCharacter/playerHealth';

export const playerHealthServer = playerHealth.extend({
	id: z.string()
});

export type PlayerHealthServer = z.infer<typeof playerHealthServer>;
