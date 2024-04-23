import { z } from 'zod';
import {
	playerCharacter,
	playerCharacterCombined,
	playerCharacterCreate
} from '../playerCharacter/playerCharacter';

export const advantageConfigBody = z.object({
	cost: z.number(),
	condition: z
		.function()
		.args(playerCharacter.or(playerCharacterCreate))
		.returns(z.boolean())
		.optional(),
	effect: z.function().args(playerCharacterCombined).returns(playerCharacterCombined).optional()
});

export type AdvantageConfigBody = z.infer<typeof advantageConfigBody>;
