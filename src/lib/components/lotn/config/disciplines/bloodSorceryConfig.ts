import type { BloodsorceryConfigSchema } from '$lib/zod/lotn/disciplines/bloodSorcery';

export const bloodSorceryConfig: BloodsorceryConfigSchema = {
	name: 'Blood Sorcery',
	characteristics: {
		type: { type: 'Mental', hint: 'except Scorpion’s Touch and Baal’s Caress, which are Physical' },
		masqueradeThreat: {
			type: 'Low to High',
			description:
				'Blood Sorcery can be extremely subtle or obviously Masquerade breaching. The powers with a visual aspect shatter the Masquerade, as you cannot really explain blood floating through the air or concrete dissolving with a touch. Other Blood Sorcery powers have no effect or can be explained by personality peculiarities, such as talking to inanimate objects.'
		},
		bloodResonance: 'Sanguine',
		description:
			'Purchasing Blood Sorcery unlocks the ability to purchase and perform Rituals up to and including the level the user possesses in Blood Sorcery. At character creation, if a player possesses at least one dot in Blood Sorcery after assigning her initial Discipline levels, she receives a level-one Ritual for free. Characters can then purchase new Rituals at the cost of the Ritual’s level x 3 XP. The only limitations to how many Rituals a character may possess are her XP and the time necessary to learn them. Learning a new Blood Sorcery Ritual requires one downtime to research and study. For more detailed information, see Rituals, page 272.'
	},
	powers: {
		'A Taste for Blood': {
			level: 1,
			cost: 'Free',
			system:
				'By ingesting a small amount of a target’s blood and spending a simple action, you can find out all of the following information:\n▷ Medical information, such as blood type and state of health;\n▷ How much blood is currently in the subject’s system, what Blood Resonance they have, and the type of Dyscrasia;\n▷ What type of creature the blood came from. If the creature is not a mortal, ghoul, or vampire, the Storyteller may require a Lore challenge to identify exact creature type;\n▷ If the subject is a vampire, you may also determine:\n▷ The subject’s generation;\n▷ Whether the subject has ever committed diablerie;\n▷ How recently the subject fed.\nA Taste for Blood requires you to physically ingest the blood that you test. This power can be dangerous if the blood is tainted with disease or other effects. Fortunately, the magical nature of this power shields you from being Bound by the Blood ingested when activating this power. Ingesting a drop of your target’s blood does not Slake your Hunger, nor does it increase the Hunger the target vampire. However, it may trigger Hunger Frenzy because of the sight/smell/taste of blood (see page 127).',
			duration: 'N/A'
		},
		'Corrosive Vitae': {
			level: 1,
			cost: 'One Rouse check',
			system:
				'Make one Rouse check to force your Blood to sweat through the palm of your hand. You may spend your standard action smearing your Corrosive Vitae on an object, causing it to corrode and decompose to the point of uselessness. If you wish to corrode an item on another character’s person, such as a weapon or armor, you need to reach out and touch the item with a Dexterity + Brawl vs. Dexterity + Athletics, opposed challenge.\nObjects larger than a standard door require more than one application of Corrosive Vitae to fully destroy. This power has no effect on living or undead matter, but it can rot dead bodies until they are unrecognizable.',
			duration: 'One turn'
		},
		'Blood Rash': {
			level: 2,
			cost: 'One Rouse check',
			challengePool: {
				attacker: 'Intelligence + Occult',
				defender: 'Wits + Resolve'
			},
			system:
				'Make one Rouse check, and expend a standard action as you gesture obviously at a target vampire. On a successful challenge, your target finds that Rousing the Blood brings her discomfort and physical irritation. For the next two turns, any time your target Rouses the Blood, her skin becomes unnaturally and noticeably flushed, and she gains the Distracted Condition.',
			duration: 'Two turns'
		},
		'Extinguish Vitae': {
			level: 2,
			cost: 'One Rouse check',
			challengePool: {
				attacker: 'Intelligence + Occult',
				defender: 'Stamina + Composure'
			},
			system:
				'Make one Rouse check and expend your standard action as you gesture obviously at a target vampire. On a successful challenge, your target finds it harder to mend damage by Rousing the Blood. If your target is Blood Potency 1 or less, she must make an additional Rouse check (two total) to mend damage. If your target is Blood Potency 2 or higher, she mends one less damage when she Rouses to mend damage. Extinguish Vitae lasts for two turns. Use of this power does not give you in-character knowledge of your target’s Blood Potency.',
			duration: 'Two turns'
		},
		'Blood of Potency': {
			level: 3,
			cost: 'One Rouse check',
			challengePool: {
				attacker: 'Resolve + Occult',
				defender: 'a Difficulty of 2 + your Blood Potency (Static Challenge)'
			},
			system:
				'Make one Rouse check, and spend a simple action to make a static challenge using your Resolve + Occult vs. a Difficulty of 2 + your Blood Potency. If you win, your Blood Potency increases by two for the duration of this power. Otherwise, your Blood Potency increases by one. You may exceed your generational limit on Blood Potency by using this power. If your temporary Blood Potency increases past five, consult the tgable on page 227.\nFeeding Penalties at Blood Potency 6 and 7 are the same as at Blood Potency 5. If you are diablerized during this time, or if you Embrace a childe, your true Blood Potency is used to determine the results for those actions.',
			duration: 'Thirty minutes'
		},
		"Scorpion's Touch": {
			level: 3,
			cost: 'One Rouse check',
			challengePool: {
				attacker: 'Dexterity + Marksmanship',
				defender: 'Dexterity + Athletics'
			},
			system:
				'Make one Rouse check to transmute some of your Blood into a paralyzing poison. Each Rouse check produces enough poison to coat a bladed weapon or fill your mouth with enough poison to spit at a target.\nCoating a weapon costs a simple action and requires you to draw a bladed weapon across your skin (dealing no appreciable damage) or lick it with your tongue. Weapons remain coated for one scene before the poison becomes inert. Spitting your poison at a target requires a standard action and a successful contested challenge.\nIndividuals struck by your poison spit or a weapon coated with Scorpion’s Touch suffer the Weakened Condition for three turns, with additional successful strikes resetting this duration. Mortals struck by poison from Scorpion’s Touch suffer the Impaired Condition instead.\nFinally, anyone trying to feed directly from you (not including powers such as Theft of Vitae) during a scene in which you Scorpionated your Blood immediately gains the Weakened Condition for three turns.\nYou are immune to your own Scorpion’s Touch, but other individuals wielding weapons coated with your venom risk being poisoned. If someone else fails a Melee challenge to strike a target with a weapon coated by your Scorpion’s Touch, she gains the Weakened Condition (or Impaired if a mortal character). If the wielder repeatedly loses challenges in this way, she suffers the same extended penalty durations as someone who was struck multiple times.\nScorpion’s Touch may only be used on bladed weapons used with the Melee Skill. Throwing weapons with Scorpion’s Touch causes the poison to fall off of the weapon. Scorpion’s Touch cannot be used to modify bullets or other ranged equipment (including arrows), as the heat or speed of the projectile destroysthe Blood coating on any projectile fired.',
			duration: 'One scene, or N/A if used as a projectile'
		},
		'Theft of Vitae': {
			level: 4,
			cost: 'One Rouse check',
			challengePool: {
				attacker: 'Wits + Occult',
				defender: 'Wits + Occult'
			},
			system:
				'Make one Rouse check, use your standard action to make a beckoning gesture toward a target character within 25 steps of you, and make an opposed challenge. If you succeed and your target is not a vampire, you can Slake two Hunger every turn you concentrate as if you were feeding with a Harmful Drink. While concentrating you may take no other actions other than movement and must keep your target in line of sight. This blood bursts from one of the major arteries of your victim, soaring through the air into your mouth and fangs. Blood stolen in this fashion has all of its normal properties such as Resonance and Dyscrasias. This rather unsettling power is obviously supernatural while in progress. However, the victim experiences the throes of the Kiss, and, once finished, the wound closes, leaving no evidence.\nWhen Theft of Vitae is used on a vampire, the user Slakes one Hunger and the target’s Hunger increases by one.',
			duration: 'N/A'
		},
		'Slow the Beating Heart': {
			level: 4,
			cost: 'One Rouse check',
			challengePool: {
				attacker: 'Resolve + Medicine',
				defender: 'Stamina + Composure'
			},
			system:
				'You have mastered the manipulation of blood to the point where you can rob lesser beings of wakefulness. Make one Rouse check and spend your standard action to make an opposed challenge against the highest Stamina + Composure score of any animal or non-supernatural mortal in the same room (no larger than 250 square feet) as you. If used outdoors, or in a larger room, test against the highest score from the 10 closest animals or non-supernatural mortals.\nIf successfully used in a room smaller than 250 square feet, all other animals and non-supernatural mortals have their blood flow slow, putting them in a temporary coma and gaining the Helpless Condition. If used outside or in a larger room, it affects the 10 closest animals or non-supernatural mortals. If undisturbed, they will remain this way for 10 minutes. After this time has passed, the Helpless Condition resolves, and the mortal awakens. If they suffer any damage, the Helpless Condition resolves, and the mortal may then act on their normal initiative score and defend themselves normally.\nVictims of this power have no recollection of any events that occurred around them while comatose. The moments before being affected by Slow the Beating Heart are foggy and hard to recall as if they were a dream. From the mortal’s perspective, they simply fell asleep inexplicably.',
			duration: 'Ten minutes'
		},
		"Baal's Caress": {
			level: 5,
			cost: 'Free when enhancing Scorpions touch or one Rouse check per ranged attack',
			challengePool: {
				attacker: 'Dexterity + Marksmanship',
				defender: 'Dexterity + Athletics'
			},
			prerequisite: "Scorpion's Touch",
			system:
				"When using Scorpion’s Touch you may choose to instead secrete a more lethal poison when coating weapons. This poison has all the effects of Scorpion's Touch but also converts your melee Normal Damage to Aggravated Damage.\nIn addition, you may also spit your poison at a target by making one Rouse check and engaging them in a contested challenge. If successful, your target takes one point of Aggravated Damage (two  points on a critical win) and suffers the effects of Scorpion's Touch.",
			duration: 'One scene when enhancing Scorpions Touch or N/A when used for a ranged attack.'
		},
		'Cauldron of Blood': {
			level: 5,
			cost: 'One Rouse check',
			challengePool: {
				attacker: 'Intelligence + Occult',
				defender: 'Stamina + Resolve'
			},
			system:
				'Make one Rouse check and spend your standard action obviously concentrating on a target character within three steps of you. If you succeed in a contested challenge against your target, you boil their blood.\nVampires affected by Cauldron of Blood take two Aggravated Damage and gain one Hunger. This power gains no additional benefit from a critical win. Mortals affected by Cauldron of Blood suffer three Aggravated Damage and gain the Impaired Condition.',
			duration: 'N/A'
		}
	}
};
