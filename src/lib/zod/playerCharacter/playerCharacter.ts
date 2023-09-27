import type { z } from 'zod';
import { playerAttribute } from './playerAttribute';
import { playerBackground } from './playerBackground';
import { playerBeastTraits } from './playerBeastTraits';
import { playerBlood } from './playerBlood';
import { playerCharacterBase } from './playerCharacterBase';
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
	disciplines: playerDiscipline.array(),
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
