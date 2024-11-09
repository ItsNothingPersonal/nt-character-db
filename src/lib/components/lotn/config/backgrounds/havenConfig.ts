import type { HavenConfigSchema } from '$lib/zod/lotn/background/haven';

export const havenConfig: HavenConfigSchema = {
	name: 'Haven',
	description:
		'Everyone needs a place to settle down for the day, somewhere safe from Hunters and sunlight. Someone without any dots in Haven lives in complete squalor—they may have carved out a hole in the wall to sleep in, but it has no protections and is terribly uncomfortable. Once you have purchased at least one dot in this Mortal Connection, the Advantages and Disadvantages become available to purchase.\nVampires may choose to share a Haven with their Allies, especially if they are all in a gang or coterie. For more information on coterie mechanics and sharing Backgrounds, see page 293.',
	level1:
		'You have a small basement or studio apartment. It is big enough to fit yourself and one other, if you do not mind an utter lack of separated personal space.',
	level2:
		'You live in a Haven about the size of a single family home or a nice 3-4 bedroom apartment. You and four others can fit inside comfortably. Gain one free dot of an Advantage to add to your Haven. Requires Resources •.',
	level3:
		'Your home is a penthouse-quality apartment, a standalone mansion of a private estate, or even an old bank building you’ve claimed as your own. You and nine others can comfortably enjoy a space of this size. Gain one additional free Advantage dot to add to your Haven (for a total of two free). Requires Resources •••.',
	advantages: {
		Armory: {
			name: 'Armory',
			levelVariable:
				'You have a secure weapon storage within your Haven, and you maintain your Armory well. These weapons are always available to you. Should you sell, lose, or break any of your weapons, they replenish at the start of the next game. Your Armory replenishes fully once every three months. Each dot in this Advantage represents two additional weapons stored.'
		},
		Cell: {
			name: 'Cell',
			levelVariable:
				'You’ve built a secure place to keep human prisoners within your Haven that is large enough for two captives. Your Cell is not secure enough to hold another active supernatural being, and you do not want an unfriendly vampire in your Haven should they escape. Each dot after the first represents an additional two people who can fit securely in the space. If you are keeping prisoners between game sessions, your Storyteller may require a Downtime Action dedicated to feeding them to prevent unwanted side effects such as death. You decide if this location is sunproof.'
		},
		Garage: {
			name: 'Garage',
			levelVariable:
				'Your Haven has an attached Garage. Not only is there enough space to house a vehicle, you’ve accumulated enough tools and spare parts to repair or destroy such vehicles. For each dot in this Advantage, you gain two storage bays. Commercially available vehicles no larger than a Humvee take up one storage bay. Larger vehicles, such as big rigs or small planes, require two storage bays each. Your Storyteller determines how many storage bays are required for large vehicles. In addition, for each dot in this Advantage, you gain a +1 to all Crafts, Science, or Technology challenges involving maintaining and repairing vehicles stored here.'
		},
		Laboratory: {
			name: 'Laboratory',
			levelVariable:
				'You have a lab in which you may test things and do science. For each dot, gain +1 to any mundane challenge you make for Science and Technology tests, or in Thin-Blood Alchemy while working in your lab. A • Size 1 Haven cannot fit a Laboratory.'
		},
		Library: {
			name: 'Library',
			levelVariable:
				'You keep an in-depth Library in your haven, stocked with piles of books both occult and mundane. For each dot in this Advantage, gain +1 to any mundane research challenge you make within your Haven. Most often, these tests will fall under the Academics, Lore, Linguistics, Investigation, or Occult Skills.'
		},
		Location: {
			name: 'Location',
			levelVariable:
				'Your Haven is in a prestigious or hard-to-reach Location, making it more difficult for people to find and affect you. Characters attempting to to track you to your Haven or locate your Haven suffer a -1 penalty to their appropriate challenge pools for each dot of the Location Advantage you possess for that Haven.'
		},
		Luxury: {
			name: 'Luxury',
			levelVariable:
				'You want only the best—the newest technology, the most expensive furniture, and decorations that could make even a small place look like something out of a top-10 magazine. Whether you acquired your decor legally (with Resources) or illegally, it is sure to wow any guests. Each dot represents +1 to any mundane Social challenge you make when the target is in your Haven.'
		},
		Elaborate: {
			name: 'Elaborate',
			levelVariable:
				'Your Haven is rigged with hidden passages, escape hatches, safe rooms, and dead ends. Intruders are confused and disoriented when inside your Haven, allowing for you to move about with greater ease and stealth. This gives you an advantage when engaging your foes or when escaping. This Advantage only activates when you are aware of intruders, such as when your Security or Guards Advantage alert you. You and your allies may either use this to attempt to escape your Haven’s attackers or enjoy bonuses when engaging them.\nIf you engage intruders, gain a +1 to your Initiative per dot in this Advantage. If you wish to try to escape, make a test with Dexterity + Stealth with a +1 bonus per dot in this Advantage against your opponent’s Wits + Investigation. If you succeed, you may declare Fair Escape. If a group is trying to escape from multiple intruders, the groups test against one another. Use the lowest Dexterity + Stealth score in the escaping group vs. the best Wits + Investigation score in the attacker group.'
		},
		Security: {
			name: 'Security',
			levelVariable:
				'Your Haven is challenging to break into, and you are alerted in advance to any intrusions. Characters trying to break into a Haven without this Advantage require a single successful Wits + Larceny vs. a difficulty of 3 that represents about one minute of picking a lock, cutting a camera feed, etc. For every dot in this advantage, add two to the difficulty check. The time necessary to bypass your Security with this check is roughly five minutes per dot with this Advantage.'
		},
		'Surgical Ward': {
			name: 'Surgical Ward',
			levelVariable:
				'You are equipped with an operating table, sterilization tools, and medical supplies; you can stitch up wounds, draw blood, perform minor surgeries or even major ones—depending on your confidence, of course. For each dot in Surgical Ward, you gain a +1 to any mundane Medicine tests made within it.'
		},
		'Walk-In Freezer': {
			name: 'Walk-In Freezer',
			levelVariable:
				'Sometimes, you just don’t want that body right away, but you may need it for later. For this reason, you’ve found a place with an especially large freezer. For each dot, you may store one corpse or vampire, along with two additional smaller things that require refrigeration (see Blood Alchemy, page 266). Walk-In Freezers are always sunproof and may be designed for Extreme Cold (see page 128).'
		},
		Guards: {
			name: 'Guards',
			levelVariable:
				'Your Haven has private security in the form of actual people standing guard. Each dot represents four Guards (Simple Antagonists difficulty 3) and their boss (Simple Antagonist difficulty 5). In order to sneak past these Guards, characters must succeed in at least one Dexterity + Stealth test vs. a difficulty of 5. The Storyteller may require more tests depending on the Size of the Haven grounds. If any of these challenges fails, the Guards will engage the intruder and immediately alert you to the intruder’s presence. For more information on Simple NPCs, see page 320.'
		},
		Workshop: {
			name: 'Workshop',
			levelVariable:
				'You have an area of your Haven that is stocked with crafting equipment. Choose one of your Craft specializations. For each dot of this Haven Advantage, you gain a +1 bonus to any Craft challenges.'
		},
		Zoo: {
			name: 'Zoo',
			levelVariable:
				'You really like animals, or animals really like you. Luckily, your Haven can accommodate your friends. For each dot, you have the necessary living space for one Large, two Medium, or three Small animals. You are limited to animals that can reasonably be domesticated in your location, and your Storyteller is the final arbiter of what animals you possess. In addition, during a game session, for each dot in this Haven Advantage you may Slake one Hunger as long as you may Slake Hunger from animals.'
		}
	},
	disadvantages: {
		Compromised: {
			name: 'Compromised',
			description:
				'Your Haven has a history of unwanted visitors. Somehow, they just keep finding their way to your front door. If you have a Compromised Haven, you may not benefit from the Location advantage, as people are easily able to find your Haven.',
			level1:
				'Despite any security measures you take, random people tend to stumble into your place. Characters gain a +1 bonus to any challenges related to track you when you are traveling to your Haven or any other challenges relating to locating your Haven.',
			level2:
				'Local law enforcement has been called to your Haven (or the building that holds it) before, likely more than once. Future alerts cause investigators to show up very quickly. In addition to the effects of Level 1, all intruders gain a +1 bonus to their Initiative during the first round of any combat scenarios that take place inside your Haven.'
		},
		Creepy: {
			name: 'Creepy',
			description:
				'You have a unique style that leads to your Haven resembling something out of a horror movie. That plastic-lined room may keep blood off the carpet after a messy meal, but it also makes the neighbors suspicious. If someone goes missing or something bad happens anywhere nearby, attention immediately goes to you. Within your Haven, it takes significant effort to keep a guest from bolting in panic. You may not benefit from the Luxury Advantage with this Disadvantage; while your items may still be the best money can buy, they also include strange oddities, off-putting taxidermy, and macabre collectibles. For each dot, subtract two from your test pool on any mundane Social challenge you make when the target is within your Haven.',
			level1: 'You have some creepy things, and guests are constantly on edge.',
			level2: 'Your guests actively require an assurance that you will not kill them.'
		},
		Haunted: {
			name: 'Haunted',
			description:
				'Strange things tend to happen in your Haven. You hear odd noises, things tend to move around or disappear–only to reappear months later–and you may see an apparition lurking on the stairs. The entities are probably not violent, but they are certainly very distracting. For some reason, you put up with them, and your unlife now includes dodging poltergeists. For each dot of this Disadvantage, subtract one from your test pool for any challenges you make within your Haven that require you to maintain concentration or focus, such as research or distilling Thin Blood Alchemy Formulae.',
			level1: 'The ghosts are merely irritating, but persistent enough to keep you on edge.',
			level2:
				'You have a full-fledged ghost infestation in your Haven. Welcome to spook central, complete with the occasional flying television or broken mirror.'
		}
	}
};
