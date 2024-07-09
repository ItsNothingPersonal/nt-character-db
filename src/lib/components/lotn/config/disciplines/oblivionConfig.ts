import type { OblivionConfigSchema } from '$lib/zod/lotn/disciplines/oblivion';

export const oblivionConfig: OblivionConfigSchema = {
	name: 'Oblivion',
	characteristics: {
		type: {
			type: 'Variable',
			hint: 'The Attribute used in the pool of the initiating player dictates whether the power is mental, social, or physical.'
		},
		masqueradeThreat: { type: 'Medium to High' },
		bloodResonance: 'Non-animal blood devoid of Resonance',
		description:
			'The use of Oblivion allows its wielder to manipulate the creatures and energies of the dead, including their manifestations in the real world. Shadows, decaying flesh, incorporeal spirits, and the risen dead are the bailiwick of an Oblivion user. Unless otherwise specified, brightly-lit, enclosed areas without natural shadows prevent the use of Oblivion powers that manipulate, control, or create shadows. All powers of Oblivion are rendered inert when exposed to sunlight.\n\nOblivion vs. Auspex: Detecting the use of Oblivion can be accomplished by using the Auspex power Sense the Unseen and a successful contested challenge using Wits + Awareness vs. the Oblivion user’s Resolve + Occult. This, however, only detects the usage of an Oblivion power, such as when a vampire is extending his senses through a shadow with the power Shadow Cast. To pierce the supernatural darkness of Oblivion powers, such as Shadow Cloak, an Auspex user must utilize Heightened Senses and succeed in a contested challenge of Wits + Investigation vs. the Oblivion user’s Resolve + Occult.\n\nFailing Rouse Checks for Oblivion Powers: Using Oblivion is inherently corrupting. A vampire who fails a Rouse check to utilize an Oblivion power gains one Stain in addition to any other effects of failing a Rouse check.\n\nOblivion Ceremonies: Purchasing Oblivion unlocks the ability to purchase and perform Ceremonies, up to and including the level the user possesses in Oblivion. At character creation, if a player possesses at least one dot in Oblivion after assigning her initial Discipline levels, she receives a level-one Ceremony for free. Characters can purchase new Ceremonies at the cost of the Ceremonies level x 3 XP. The only limitation to how many Ceremonies a character may possess is her XP and the time necessary to learn them. Learning a new Oblivion Ceremony requires one downtime to research and study. For more detailed information see Ceremonies, page 282.'
	},
	powers: {
		'Shadow Cloak': {
			level: 1,
			cost: 'Free',
			system:
				'By spending a simple action, you may cause nearby natural shadows to cover your physical form, obscuring your facial features and any distinguishing characteristics you wish to hide. You may allow certain things to remain un-obscured, such as a badge or item you want observers to notice fully. Features you choose are obscured and cannot be captured on cameras, even digitally-enhanced recordings, nor recalled with any detail. Shadow Cloak is a supernatural concealment power which can be pierced by Heightened Senses, just as Sense the Unseen can detect the powers of Obfuscate. A character who wishes to pierce your Shadow Cloak with Heightened Senses must make a contested roll using their Wits + Investigation vs. your Resolve + Occult.',
			duration: 'Thirty minutes'
		},
		"Oblivion's Sight": {
			level: 1,
			cost: 'Free',
			system:
				'By spending a simple action, you can attune your senses to death, allowing you to see across the veil and its relative density in the immediate area (see p. 245). You immediately see ghosts and any other creatures not using supernatural powers of concealment.\nIn order to see supernaturally-concealed characters in the dead lands, you must pierce their powers as normal, such as through the use of the Auspex power Sense the Unseen. While Oblivion’s Sight is active, you ignore the Blind Condition from darkness. In addition, because of their attachment to the creatures of the dead lands, you can see the aura of fetters (items that sympathetically bind a ghost to the world of the living) in the real world.',
			duration: 'Thirty minutes'
		},
		'Arms of Ahriman': {
			level: 2,
			amalgam: { name: 'Potence', value: 2 },
			cost: 'One Rouse check',
			system:
				"Spend your simple action, then make one Rouse check to extend and animate a natural shadow within your line of sight. Once per turn, you may spend your standard action to use the shadow to attack one character who is standing within four steps of the shadow's location. You may only have one such appendage at a time.\nThe conglomeration has an attack and defensive pool equal to your Wits + Oblivion. It is capable of all combat maneuvers except staking. It may not use weapons. It has two health levels, but can only be harmed by bright light (taking aggravated damage as fire) and may benefit from the Potence powers Prowess, Staggering Strike, and Puissance if you know them. In order to successfully attack shadows manipulated by this power, a character must succeed in a Dexterity + Marksmanship attack to successfully ‘aim’ a source of bright light at it. Such attacks do one Aggravated Damage to the shadow. Alternatively, the shadow may be ‘struck’ with a Bane (Fire) weapon with a melee attack.\nYour Arms of Ahriman is capable of performing simple actions, such as opening doors or pulling levers. It cannot be used to do tasks that require fine manipulation or greater intelligence. As it is a shadow, the appendage must move across a surface to reach its target. It cannot “leap” or materialize into thin air.",
			duration: 'One scene or until destroyed or ended'
		},
		'Shadow Cast': {
			level: 2,
			cost: 'One Rouse check',
			system:
				"Spend your simple action to conjure a supernatural shadow from your body. While this power is active, your shadow cannot be dispelled by any amount of light except direct sunlight. Your shadow also counts as natural darkness, but only for you, and only for other uses of Oblivion that require natural darkness. While active you may direct your shadow, including changing its shape, at will. Your shadow is two steps in length by default, but you may elongate and stretch your shadow by a number of steps equal to twice your dots in Oblivion. When doing so, solid objects block the passage of your shadow; however, you may cast your shadow under doors and through windows. Observers may notice the unnatural behavior of your shadow by making a static Wits + Awareness challenge vs. a difficulty of 3.\nIn addition, for the next 30 minutes, the user may freely extend his senses to any shadow made of natural darkness in his line of sight. While doing so, the vampire's perspective changes to any location contained within the shadow. He can hear, see, smell, and feel anything as if his true position was where the shadow was. While extending his senses through the shadow, the vampire's senses may be detected in the shadow by another vampire using Sense the Unseen.",
			duration: 'Thirty minutes'
		},
		'Masque of Death': {
			level: 2,
			cost: 'One Rouse check',
			system:
				' Make one Rouse check, and spend your simple action to transform your physical form into that of a normal corpse. You may also activate this power for free if you enter torpor due to damage or if you are successfully staked.\nWhile Masque of Death is active, you are considered to be a mundane corpse. You cannot move, you have no aura, you lose access to all of your vampiric powers (except for the effects of Masque of Death), and you appear to all investigation as a simple, non-supernatural dead body. While this power is active, you are aware of everything that occurs within five steps of your physical form. You do not take wounds from damage to your body while in this state, but you can be killed if your head is severed, you are exposed to sunlight, or your body is destroyed. Powers such as Aura of Decay that directly affect corpses, however, do not work on you while you are a corpse.\nDestroying or beheading your corpse in this manner requires the attacker to utilize three standard actions, during which you may choose to end Masque of Death. Ending Masque of Death returns you to the exact state (same Conditions, Health levels, etc.) you were in prior to utilizing this power, including Torpor if you activated this prior to falling into Torpor.',
			duration: 'Until you choose to end the power'
		},
		'Aura of Decay': {
			level: 3,
			cost: 'One Rouse check',
			system:
				'Spend your simple action to channel the decaying forces of death into the physical world around you for the next five minutes. Non-sentient organic and inorganic material within five steps of you begins to rot. Plants turn black and die, food spoils and becomes toxic to eat, even brick and other solid inanimate objects slowly start to crumble, losing one Structure per turn. You may spend a Standard action and one Rouse check to touch one corpse, which disintegrates in less than a minute.\n Living creatures within five steps of you also take one point of Normal Damage per turn as they slowly rot from the inside out. In addition, mortals will immediately grow nauseated and gain the Weakened Condition. Vampires within five steps of you mend one less damage per Rouse (minimum of one). Aura of Decay does not automatically speed up the process of anything once living that is already decaying, such as a corpse, within its area of effect.',
			duration: 'Five minutes'
		},
		"Reaper's Passing": {
			level: 3,
			amalgam: { name: 'Dominate', value: 1 },
			cost: 'One Rouse check',
			challengePool: {
				attacker: 'Manipulation + Occult',
				defender: 'Resolve + Composure'
			},
			system:
				'Make one Rouse check, and use your standard action to make an opposed challenge. If you succeed, your target experiences a fleeting glimpse of her death. The target gains the Frightened Condition until she wins a Resolve + Composure test vs. a difficulty of 6 at the beginning of her initiative. The source of her fear is the location she is standing when she is affected by this power. She believes staying in the location will bring about her demise. For the remainder of the night, if she is ever within six steps of this particular location, she gains the Distracted Condition. The Distracted Condition, when levied in this manner, does not resolve normally; instead, it resolves when she is no longer within six steps of the location.',
			duration: 'One Night'
		},
		'Stygian Shroud': {
			level: 4,
			cost: 'One Rouse check',
			challengePool: {
				attacker: 'Wits + Investigation',
				defender: 'Oblivion user’s Resolve + Occult'
			},
			system:
				'Make one Rouse check, and spend your simple action to cause a naturally-occurring shadow in your line of sight to grow and cover all subjects in a six-step diameter. The shadow obscures all light and muffles all sounds within it, inflicting near-total blindness and deafness on all victims.\nAnyone standing within your Stygian Shroud gains the Blinded Condition. Powers such as Oblivion Sight, Eyes of the Beast, and Heightened Senses that would normally make you immune to the Blinded Condition do not automatically prevent this supernatural blindness. Instead, if a character has a power that would make them immune to or mitigate the Blinded Condition, they must activate that power, then attempt a contested challenge using their Wits + Investigation vs. Resolve + Occult. This challenge does not count as an attack and does not require an action. They may only make this challenge once per scene, per mitigating power. If successful, they may resolve the Blinded Condition from your Stygian Shroud for the remainder of the scene. You are able to see within your own Shroud, but you are not immune to the effects of other shrouds.\nWithin a Stygian Shroud, most living beings, such as animals, mortals, and ghouls (not thin-blooded vampires), suffer one point of Normal Damage on your initiative each turn, as Oblivion steals their breath and saps their will to live. This damage cannot be reduced or negated. If exposed to Stygian Shroud for three consecutive rounds, they suffocate and die. After creating a Stygian Shroud, you may use a simple action to move your Shroud three steps in any direction.',
			duration: 'Ten minutes or until you leave line of sight'
		},
		'Touch of Oblivion': {
			level: 4,
			cost: 'One Rouse check',
			system:
				'Spend a simple action to channel the annihilating elements of death through your touch. Activate Touch of Oblivion and choose one of the following Conditions: Blinded, Staggered or Weakened. While this power is active, your Brawl attacks do one Aggravated Damage and levy your chosen Condition. Any Condition applied this way lasts for two turns. This damage cannot be enhanced by powers that increase the amount of damage you do per strike. Exceptional successes when striking with Touch of Oblivion do not do an additional damage. Finally, this power cannot be activated multiple times in the same 10 minutes.',
			duration: 'Ten minutes'
		},
		Shadowstep: {
			level: 5,
			cost: 'One Rouse check',
			system:
				'Spend your standard action to step into one shadow and exit from another, teleporting up to 50 steps in any direction. To use Shadowstep, you must step into a patch of natural darkness, or through your shadows you have created with Shadow Cast. Supernatural Darkness you have created with other Oblivion powers does not work with Shadowstep. You immediately exit from another natural shadow within your line of sight, as though it were your next step. Shadowstep cannot normally be used in brightly lit areas and may require the use of Shadow Cast first. You may not use Shadowstep if you are Grappled.\nYou can bring another individual with you, so long as you hold her in a firm grip. To do so, you must Rouse the Blood one additional time to Shadowstep and bring the subject along. If the subject is unwilling, you must Grapple the target before using Shadowstep in this manner.',
			duration: 'N/A'
		},
		'Tenebrous Avatar': {
			level: 5,
			cost: 'Two Rouse checks',
			system:
				" Spend your simple and standard actions to transform into a two-dimensional living shadow. You are capable of slipping through small openings, sliding under doors, and oozing through holes, but you cannot pass through solid objects. A character in Tenebrous Form can talk and move at her normal speed along any solid surface, including up a wall or across a ceiling. Though you cannot actually fly, you don’t take damage from falling while in Tenebrous Form.\nWhile using Tenebrous Avatar, you cannot Rouse the Blood or physically damage anyone. You may only use Disciplines that do not require a physical form and do not require you to Rouse the Blood to activate. While in this form, you are immune to damage and attacks from physical sources except fire and sunlight, which give you one additional Aggravated Damage.\nYou may attempt to envelop a target character by spending your simple action and winning a contested challenge with your Dexterity + Athletics vs. your target's Dexterity + Athletics. Enveloped characters must spend a simple action and succeed in the same challenge to escape from you. This attack does not count as a Grapple, nor does it inflict the Grappled Condition. While enveloping a character in this manner, you may feed from them with a simple action. This counts as a Harmful Drink when used on mortals. Against vampires, you Slake one Hunger and your target’s Hunger increases by one. In addition, except for thinbloods, mortals enveloped this way suffocate and die after three turns. Tenebrous Avatar is a transformative power and cannot be combined with other transformative powers.",
			duration: 'One scene or until ended'
		}
	}
};
