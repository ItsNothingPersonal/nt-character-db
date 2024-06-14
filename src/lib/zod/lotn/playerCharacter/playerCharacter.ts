import { z } from 'zod';
import { bloodSorceryRitualName } from '../enums/bloodSorceryRitualName';
import { oblivionCeremonyName } from '../enums/oblivionCeremonyName';
import { playerAttribute, playerAttributeCreate } from './playerAttribute';
import { playerBackground } from './playerBackground';
import { playerCharacterBase, playerCharacterBaseCreate } from './playerCharacterBase';
import { playerDiscipline } from './playerDiscipline';
import { playerExperience } from './playerExperience';
import { playerFlaw } from './playerFlaw';
import { playerHealth } from './playerHealth';
import { playerHumanity } from './playerHumanity';
import { playerHunger } from './playerHunger';
import { playerLoresheet } from './playerLoresheet';
import { playerMerit } from './playerMerit';
import { playerMorality } from './playerMorality';
import { playerSkill } from './playerSkill';
import { playerStatus } from './playerStatus';
import { playerWillpower } from './playerWillpower';

export const playerCharacter = playerCharacterBase.extend({
	attributes: playerAttribute,
	skills: playerSkill.array(),
	disciplines: playerDiscipline.array(),
	morality: playerMorality.array(),
	rituals: bloodSorceryRitualName.array().optional(),
	ceremonies: oblivionCeremonyName.array().optional(),
	backgrounds: playerBackground.array(),
	loresheet: playerLoresheet.optional(),
	merits: playerMerit.array().optional(),
	flaws: playerFlaw.array().optional(),
	hunger: playerHunger,
	health: playerHealth,
	willpower: playerWillpower,
	experience: playerExperience.array().default([]),
	humanity: playerHumanity,
	characterStatus: playerStatus.array().optional()
});
export type PlayerCharacter = z.infer<typeof playerCharacter>;

export const playerCharacterCreate = playerCharacterBaseCreate.extend({
	attributes: playerAttributeCreate.optional(),
	skills: playerSkill.array().default([]),
	disciplines: playerDiscipline.array().default([]),
	morality: playerMorality.array().default([]),
	rituals: bloodSorceryRitualName.array().default([]),
	ceremonies: oblivionCeremonyName.array().default([]),
	backgrounds: playerBackground.array().default([]),
	loresheet: playerLoresheet.optional(),
	merits: playerMerit.array().optional(),
	flaws: playerFlaw.array().optional(),
	hunger: playerHunger.default({ value: 1 }),
	health: playerHealth.default({ normal: 0, aggrevated: 0 }),
	willpower: playerWillpower.default({ value: 0 }),
	experience: playerExperience.array().default([]),
	humanity: playerHumanity.default({ value: 7, stains: 0 }),
	characterStatus: playerStatus.array().optional()
});
export type PlayerCharacterCreate = z.infer<typeof playerCharacterCreate>;

export const playerCharacterCombined = z.intersection(playerCharacter, playerCharacterCreate);
export type PlayerCharacterCombined = z.infer<typeof playerCharacterCombined>;
