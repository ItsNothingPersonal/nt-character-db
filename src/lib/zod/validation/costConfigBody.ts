import { z } from 'zod';
import { playerCharacter } from '../playerCharacter/playerCharacter';

export const costConfigBody = z
	.function()
	.args(
		playerCharacter,
		z.string().nonempty(),
		z.literal('add').or(z.literal('remove')),
		z.boolean(),
		z.number().gte(0),
		z.number().gt(0)
	)
	.returns(playerCharacter);

export type CostConfigBody = z.infer<typeof costConfigBody>;
