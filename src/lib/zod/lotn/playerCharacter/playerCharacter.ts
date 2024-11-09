import { z } from 'zod';
import { bloodSorceryRitualName } from '../enums/bloodSorceryRitualName';
import { oblivionCeremonyName } from '../enums/oblivionCeremonyName';
import { idSchema } from '../util';
import { playerAttribute, playerAttributeCreate } from './playerAttribute';
import { playerBackground } from './playerBackground';
import { playerCharacterBase, playerCharacterBaseCreate } from './playerCharacterBase';
import { playerDiscipline } from './playerDiscipline';
import { playerExperience } from './playerExperience';
import { playerFlaw } from './playerFlaw';
import { playerFormula } from './playerFormula';
import { playerHealth } from './playerHealth';
import { playerHumanity } from './playerHumanity';
import { playerHunger } from './playerHunger';
import { playerItem } from './playerItem';
import { playerLoresheet } from './playerLoresheet';
import { playerMerit } from './playerMerit';
import { playerMorality } from './playerMorality';
import { playerSkill } from './playerSkill';
import { playerStatus } from './playerStatus';
import { playerWillpower } from './playerWillpower';

export const playerCharacter = playerCharacterBase.extend({
	name: z.string(),
	attributes: playerAttribute,
	skills: playerSkill.array(),
	disciplines: playerDiscipline.array(),
	morality: playerMorality.array(),
	formulas: playerFormula.array().optional(),
	rituals: bloodSorceryRitualName.array().optional(),
	ceremonies: oblivionCeremonyName.array().optional(),
	backgrounds: playerBackground.merge(idSchema).array(),
	loresheet: playerLoresheet.optional(),
	merits: playerMerit.merge(idSchema).array().optional(),
	flaws: playerFlaw.merge(idSchema).array().optional(),
	hunger: playerHunger,
	health: playerHealth,
	willpower: playerWillpower,
	experience: playerExperience.array().default([]),
	humanity: playerHumanity,
	items: playerItem.merge(idSchema).array().optional(),
	characterStatus: playerStatus.array().optional()
});
export type PlayerCharacter = z.infer<typeof playerCharacter>;

export const playerCharacterCreate = playerCharacterBaseCreate.extend({
	name: z.string().optional(),
	attributes: playerAttributeCreate.default({
		physical_strength: 1,
		physical_dexterity: 1,
		physical_stamina: 1,
		social_charisma: 1,
		social_manipulation: 1,
		social_composure: 1,
		mental_intelligence: 1,
		mental_wits: 1,
		mental_resolve: 1
	}),
	skills: playerSkill.array().default([]),
	disciplines: playerDiscipline.array().default([]),
	morality: playerMorality.array().default([]),
	formulas: playerFormula.array().default([]).optional(),
	rituals: bloodSorceryRitualName.array().default([]),
	ceremonies: oblivionCeremonyName.array().default([]),
	backgrounds: playerBackground.merge(idSchema).array().default([]),
	loresheet: playerLoresheet.optional(),
	merits: playerMerit.merge(idSchema).array().optional(),
	flaws: playerFlaw.merge(idSchema).array().optional(),
	hunger: playerHunger.default({ value: 1 }),
	health: playerHealth.default({ normal: 0, aggrevated: 0 }),
	willpower: playerWillpower.default({ value: 0 }),
	experience: playerExperience.array().default([]),
	humanity: playerHumanity.default({ value: 7, stains: 0 }),
	items: playerItem.merge(idSchema).array().optional(),
	characterStatus: playerStatus.array().optional()
});
export type PlayerCharacterCreate = z.infer<typeof playerCharacterCreate>;

export const playerCharacterCombined = z.intersection(playerCharacter, playerCharacterCreate);
export type PlayerCharacterCombined = z.infer<typeof playerCharacterCombined>;
