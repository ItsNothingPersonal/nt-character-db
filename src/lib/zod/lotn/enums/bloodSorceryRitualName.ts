import { z } from 'zod';

export const bloodSorceryRitualName = z.enum([
	'Blood Walk',
	'Cling of the Arachnid',
	'Craft Bloodstone',
	'Wake With Evening’s Freshness',
	'Ward Against Ghouls',
	'Illuminate the Trail of Prey',
	'Instantaneous Materialization',
	'Phantom Whispers',
	'Ward Against Spirits',
	'Warding Circle Against Ghouls',
	"Dagon's Call",
	'Firewalker',
	'Perfect Forgery',
	'Ward Against Shifters',
	'Warding Circle Against Spirits',
	'Defense of the Sacred Haven',
	'Incorporeal Passage',
	'Splinter Servant',
	'Ward Against Cainites',
	'Warding Circle Against Shifters',
	'Blade of Eternal Thirst',
	"Cobra's Favor",
	'Escape to True Sanctuary',
	'Shaft of Belated Dissolution',
	'Warding Circle Against Cainites'
]);
export type BloodSorceryRitualName = z.infer<typeof bloodSorceryRitualName>;
