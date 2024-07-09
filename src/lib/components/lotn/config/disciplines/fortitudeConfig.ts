import type { FortitudeConfigSchema } from '$lib/zod/lotn/disciplines/fortitude';

export const fortitudeConfig: FortitudeConfigSchema = {
	name: 'Fortitude',
	characteristics: {
		type: 'Physical',
		masqueradeThreat: {
			type: 'Medium to High',
			description:
				'Special effects (when caught on camera), surges of adrenaline, and the unreliability of eyewitness accounts can all help to explain away surviving a hail of bullets or an alleyway beat down. Depending on the severity of the attack, walking away from it seemingly unharmed is a huge risk to the Masquerade.'
		},
		bloodResonance: 'Melancholic'
	},
	powers: {
		Resiliency: {
			level: 1,
			cost: 'Free',
			system:
				'Once purchased, this power is always active. Characters who attempt to stake you must win one additional test (see page 107). In addition, you are immune to the effects of extreme cold (see page 128).',
			duration: 'Passive'
		},
		Toughness: {
			level: 1,
			cost: 'Free',
			system:
				'When purchased, you gain one additional Health level. In addition, you ignore all wound penalties (see page 108).',
			duration: 'Passive'
		},
		Coagulate: {
			level: 2,
			cost: 'One Rouse check',
			system:
				'Spend a simple action and make one Rouse check to thicken the viscosity of your Blood. The next time that you are subjected to a Discipline attack that increases your Hunger, reduce the Hunger increase by one. If this reduces your Hunger increase to zero, and the power that caused your Hunger increase allowed your enemy to Slake, they are no longer able to Slake. Otherwise they Slake the normal amount. For example, if you are targeted by Brutal Feed which causes your Hunger to increase by one, Coagulate would reduce your Hunger increase to zero and the user of Brutal Feed would not Slake one Hunger. However you would still take damage from Brutal Feed.',
			duration: 'Ten minutes'
		},
		'Enduring Beasts': {
			level: 2,
			amalgam: { name: 'Animalism', value: 1 },
			cost: 'One Rouse check',
			system:
				'By spending a simple action and Rousing the Blood, you may target a number of animals under your control equal to twice your dots in the Animal Ken Skill. Each target gains one additional health level. When this power expires, remove a health level that does not have damage assigned to it. If there are no undamaged health levels to remove the animal dies. If the animal has no empty health levels, after removing the bonus health level, the animal falls unconscious. An animal may only benefit from one instance of this power at a time.',
			duration: 'One scene'
		},
		'Unswayable Mind': {
			level: 2,
			cost: 'Free',
			system:
				'Once purchased this power is always active. You are immune to the Distracted Condition.',
			duration: 'Passive'
		},
		Valeren: {
			level: 2,
			amalgam: { name: 'Auspex', value: 1 },
			cost: 'One Rouse check',
			challengePool: {
				attacker: 'Intelligence + Medicine',
				defender: 'difficulty of 2'
			},
			system:
				'Make a Rouse check, and spend a standard action touching a target (which may require a challenge if the target is unwilling). You may heal one point of Normal Damage for every two dots of Medicine you have, rounded up. Alternatively, if you have three dots of Medicine or more, you may heal one point of Aggravated Damage. A target may benefit from Valeren once per night. You may not target yourself with this power. Each use of this power in a night beyond the first costs a Willpower.',
			duration: 'Passive'
		},
		'Roots of the Mountain': {
			level: 3,
			cost: 'Free',
			system:
				'Once purchased this power is always active. You are immune to the Staggered Condition. Once a turn, when you are subject to the Prone Condition, you may choose to ignore it by making a Rouse check.',
			duration: 'Passive'
		},
		Unyielding: {
			level: 3,
			cost: 'Free',
			system:
				'Once purchased this power is always active. You are immune to the Weakened Condition.',
			duration: 'Passive'
		},
		Aegis: {
			level: 4,
			cost: 'One Rouse check',
			system:
				'Once per turn, you may reduce one source of Aggravated Damage to Normal Damage. This cannot be used to reduce damage from sunlight.',
			duration: 'Scene'
		},
		Adaptability: {
			level: 4,
			cost: 'One Rouse check',
			system:
				'Once activated, you gain the benefit of both the Ballistic and Deflecting (Melee/Brawl) protective gear qualities (see Protective Gear, page 332). This benefit does not stack if you wear actual gear that conveys the same benefit. In addition, when activated, you may choose one perilous environmental circumstance, such as extreme cold, heat (not fire), or deep-water pressure. You are protected from this type of environmental hazard for the duration of this power. You may wear other types of armor as normal but can only benefit from the same gear quality once.',
			duration: 'Scene'
		},
		'Flesh of Marble': {
			level: 5,
			cost: 'Two Rouse checks',
			system:
				'You may activate Flesh of Marble at any time, including in reaction to an incoming attack. For the duration of the scene, the maximum damage you can take from any attack, falling or explosion is one, regardless of whether it is Normal or Aggravated Damage. You take one damage per round from an ongoing area effect, like standing in a fiery inferno. This power has no effect against sunlight.',
			duration: 'Scene'
		},
		'Personal Armor': {
			level: 5,
			cost: 'Two Rouse checks',
			system:
				'You may activate Personal Armor at any time, including in reaction to an incoming attack. For the remainder of the scene, when you are struck by a Brawl or Melee attack, your attacker suffers one damage of the same damage type that she dealt to you. Reflect this damage before applying any other Fortitude powers that may reduce or change the type of damage you receive.',
			duration: 'Scene'
		}
	}
};
