import type { z } from 'zod';
import { playerAttribute, playerAttributeCreate } from './playerAttribute';
import { playerBackground } from './playerBackground';
import { playerBeastTraits } from './playerBeastTraits';
import { playerBlood } from './playerBlood';
import { playerCharacterBase, playerCharacterBaseCreate } from './playerCharacterBase';
import { playerDamageTaken } from './playerDamageTaken';
import { playerDiscipline } from './playerDiscipline';
import { playerExperience } from './playerExperience';
import { playerFlaw } from './playerFlaw';
import { playerItem } from './playerItem';
import { playerMerit } from './playerMerit';
import { playerMorality } from './playerMorality';
import { playerSkill } from './playerSkill';
import { playerTechnique } from './playerTechnique';
import { playerWillpower } from './playerWillpower';

export const playerCharacter = playerCharacterBase.extend({
	attributes: playerAttribute,
	skills: playerSkill.array().nonempty(),
	disciplines: playerDiscipline.array().nonempty(),
	techniques: playerTechnique.array().optional(),
	morality: playerMorality,
	merits: playerMerit.array().optional(),
	flaws: playerFlaw.array().optional(),
	backgrounds: playerBackground.array().nonempty(),
	items: playerItem.array().optional(),
	experience: playerExperience.array().optional(),
	blood: playerBlood,
	willpower: playerWillpower,
	damageTaken: playerDamageTaken,
	beastTraits: playerBeastTraits
});
export type PlayerCharacter = z.infer<typeof playerCharacter>;

export const playerCharacterCreate = playerCharacterBaseCreate.extend({
	attributes: playerAttributeCreate.optional(),
	skills: playerSkill.array().optional(),
	disciplines: playerDiscipline.array().optional(),
	techniques: playerTechnique.array().optional(),
	morality: playerMorality.optional(),
	merits: playerMerit.array().optional(),
	flaws: playerFlaw.array().optional(),
	backgrounds: playerBackground.array().optional(),
	items: playerItem.array().optional(),
	experience: playerExperience.array().optional(),
	blood: playerBlood.optional(),
	willpower: playerWillpower.optional(),
	damageTaken: playerDamageTaken.optional(),
	beastTraits: playerBeastTraits.optional()
});
export type PlayerCharacterCreate = z.infer<typeof playerCharacterCreate>;
