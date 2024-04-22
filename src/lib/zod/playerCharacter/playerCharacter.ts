import { z } from 'zod';
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
	experience: playerExperience.array(),
	blood: playerBlood,
	willpower: playerWillpower,
	damageTaken: playerDamageTaken,
	beastTraits: playerBeastTraits
});
export type PlayerCharacter = z.infer<typeof playerCharacter>;

export const playerCharacterCreate = playerCharacterBaseCreate.extend({
	attributes: playerAttributeCreate.default({
		physical_value: 0,
		social_value: 0,
		mental_value: 0
	}),
	skills: playerSkill.array().default([]),
	disciplines: playerDiscipline.array().default([]),
	techniques: playerTechnique.array().optional(),
	morality: playerMorality.default({ name: 'Humanity', value: 5 }),
	merits: playerMerit.array().optional(),
	flaws: playerFlaw.array().optional(),
	backgrounds: playerBackground.array().default([]),
	items: playerItem.array().optional(),
	experience: playerExperience
		.array()
		.default([{ value: 0, date: new Date(), type: 'add', reason: 'Initial Expierience-Bonus' }]),
	blood: playerBlood.optional().default({ value: 10 }),
	willpower: playerWillpower.default({ value: 6 }),
	damageTaken: playerDamageTaken.default({ normal: 0, aggrevated: 0 }),
	beastTraits: playerBeastTraits.default({ value: 0 })
});
export type PlayerCharacterCreate = z.infer<typeof playerCharacterCreate>;

export const playerCharacterCombined = z.intersection(playerCharacter, playerCharacterCreate);
export type PlayerCharacterCombined = z.infer<typeof playerCharacterCombined>;
