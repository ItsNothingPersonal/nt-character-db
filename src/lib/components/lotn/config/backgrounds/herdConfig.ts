import type { HerdConfigSchema } from '$lib/zod/lotn/background/herd';

export const herdConfig: HerdConfigSchema = {
	name: 'Herd',
	description:
		'Hunting on the streets can be dangerous, and, while some vampires like the thrill, others prefer to have a safe, consistent source of food. You have collected a group of humans who are reliable to find, easy to connect with, and susceptible to being fed on regularly without risking a threat to the Masquerade. More often than not, they are unaware of your vampiric nature. During a game session, you may Slake a total number of Hunger equal to your Herd rating. Each time you tap your Herd, you must spend five minutes out of play, regardless of how many Hunger you Slake. You may Slake multiple times during the game using your Herd (up to your limit); however, you still may not reduce your Hunger to zero without killing a victim. This causes the loss of one dot of your Herd (see Losing Mortal Connections, page 142) and at least one Stain (see Shifting Humanity, page 138).\nBe cautious of overfeeding from your Herd. Humans only have so much blood, and, if someone dies, it will take some time to regain the rest of your Herd’s trust. In some cases, and at your Storyteller’s discretion, you may need to find a new Herd entirely. If a Herd dot is lost, your character can regain it at a rate of one dot per game, starting the month after the “accident” occurred. Dots in Herd represent both size and variety. You may not purchase the Herd Mortal Connection more than once.',
	level1:
		'The blood has a random Resonance (determined each time you utilize your Herd) and no Dyscrasia.',
	level2:
		'At the start of each month, you may select one Resonance that your Herd possesses for that month. The blood you drink also has a random Dyscrasia, selected from your chosen Resonance category (see page 130).',
	level3:
		'At the start of each month, select two Resonances that your Herd possesses for that month. Each time you feed, you may choose to ingest either of the two Resonance types. When you do, the Storyteller will offer you two random Dyscrasias corresponding to the ingested Resonance types, and you must choose one to keep.',
	advantages: {
		Friendly: {
			name: 'Friendly',
			description:
				'Your Herd is a group of people-pleasers, outgoing and eager to make new friends. They usually travel in pairs or groups, and they’re happy to expose a vein for those who are with you, as long as you can vouch for them. A Friendly Herd cannot be Skittish.',
			level1:
				'When you Slake Hunger from your Herd, one other character may Slake the same amount.',
			level2:
				'When you Slake Hunger from your Herd, two other characters may Slake the same amount.'
		},
		'Flavor Station': {
			name: 'Flavor Station',
			description:
				'You have cultivated a Herd with a surprising amount of variety for its size, and you have got a wider selection when it comes to Dyscrasias. You may still only choose one Dyscrasia per Hunger you Slake from your Herd, but you have more say in what you wind up getting. For example, someone trying to Slake one Hunger with Herd 3 and Flavor Station 2 would draw four random Dyscrasias, and choose one from those four.',
			level1: 'Add one additional random Dyscrasia to your normal number drawn, and select one.',
			level2: 'Add two random Dyscrasias to your normal amount drawn, and select one.'
		},
		'Open Bar': {
			name: 'Open Bar',
			description:
				'Your Herd as a whole is either especially hardy or the people within it change quite often. This allows you to feed more often on your Herd than a normal selection of humans.',
			level1:
				'Instead of the normal amount, you may Slake a total Hunger equal to twice your Herd rating during a game session.',
			level2:
				'Instead of the normal amount, you may Slake Hunger equal to three times your Herd rating during a game session.'
		}
	},
	disadvantages: {
		Skittish: {
			name: 'Skittish',
			prerequisite: {
				name: 'Herd',
				value: 2
			},
			description:
				'Your Herd is easily frightened. You have managed to gain their trust, but for how long? Each time you Slake one Hunger, you must test using your Predator Type feeding pool. On failure, you cannot use your Herd again during the game session. You may only take this Disadvantage if you have Herd 2 or higher. A Herd with this Disadvantage may not have the Friendly Advantage.',
			level1: 'You must test vs. difficulty 3.',
			level2: 'You must test vs. difficulty 6.'
		}
	}
};
