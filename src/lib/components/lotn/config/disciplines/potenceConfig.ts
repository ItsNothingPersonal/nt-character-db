import type { PotenceConfigSchema } from '$lib/zod/lotn/disciplines/potence';

export const potenceConfig: PotenceConfigSchema = {
	name: 'Potence',
	characteristics: {
		type: 'Physical',
		masqueradeThreat: {
			type: 'High',
			description:
				'Some uses of this Discipline can be more subtle than others. By pulling your punch, you can disguise your use of Potence as adrenaline-fueled anomalies. However, if you punch the ground and people go flying, it becomes impossible to explain as anything but a supernatural effect.'
		},
		bloodResonance: 'Choleric'
	},
	powers: {
		Prowess: {
			level: 1,
			cost: 'One Rouse check',
			system:
				'You may activate Prowess by making one Rouse check. A character benefiting from Prowess can push, pull, or drag 1000 pounds per dot of Potence. She may lift and carry up to 500 pounds of weight per dot of Potence. In both situations, she may move at her normal speed. In any non-combat challenge, a character with this power may add her dots of Potence to her Strength pool.',
			duration: 'One hour'
		},
		'Soaring Leap': {
			level: 1,
			cost: 'Free',
			system:
				'You may expend both your simple and standard action to activate Soaring Leap. You may then jump nine steps in any direction, including straight upwards. This movement does not require a running start, but failure to land on a mostly-horizontal surface may require a climbing check (Strength + Athletics) at the discretion of your Storyteller. This power does not stack with other movement-enhancing powers such as Blink or Zephyr.',
			duration: 'N/A'
		},
		'Lethal Body': {
			level: 2,
			cost: 'Free',
			system:
				'Once purchased, this power is always active. Characters with this power who hit a mortal with a Brawl or Melee attack automatically achieve a critical win. Ghouls and thin-blooded vampires without the Thin-Blood Merit: Vampire Resilience are considered mortal creatures. In addition, your attacks do one additional damage to objects.',
			duration: 'Passive'
		},
		'Uncanny Grip': {
			level: 2,
			cost: 'One Rouse check',
			system:
				'This power does not cost an action to activate. You automatically succeed in any challenge that involves climbing and may climb at your normal movement speed for the remainder of the scene by making one Rouse check. During this movement, you may perform other actions as if you were standing on the ground with one arm free. In other words, you may pause your movement up a building to fire a gun, swing a sword, or Grapple an opponent. Your movement in this way leaves an obvious path, and any attempts to track your movement while using this power automatically succeed. In addition, any time you are successfully targeted by the Disarm Combat Maneuver, you may make one Rouse check to negate the success and remain in control of items you are holding.',
			duration: 'Scene'
		},
		'Brutal Feed': {
			level: 3,
			cost: 'Free',
			system:
				"When feeding on mortals, you may drain them of blood far more quickly than most vampires. When you successfully utilize a bite attack against a mortal, you may immediately Slake up to three Hunger. Every point of Hunger you Slake in this way causes one point of Aggravated Damage to mortal targets, as their internal organs are rapidly damaged from the sudden exit of blood.\nWhen used on a vampire, including thin-bloods, Brutal Feed causes one Normal Damage and then you may immediately Slake one Hunger while your opponent's Hunger rises by one.\nBrutal Feed is an exception to the rule that prevents you from dealing damage and feeding with the same bite attack. Depending on your Chronicle Tenets, the use of Brutal Feed may cause you to gain one or more Stains at your Storyteller's discretion.",
			duration: 'Passive'
		},
		'Staggering Strike': {
			level: 3,
			cost: 'One Rouse check',
			system:
				'When activated, all of your successful Brawl and Melee attacks automatically inflict the Staggered Condition (see Conditions, page 111).',
			duration: 'Scene'
		},
		'Fist of Caine': {
			level: 4,
			cost: 'One Rouse check',
			system:
				'When activated, you are capable of inflicting grievous wounds to all opponents, mundane and supernatural. Your Brawl and Melee attacks do Aggravated Damage.',
			duration: 'Scene'
		},
		'Savage Pursuit': {
			level: 4,
			cost: 'One Rouse check',
			system:
				'When a target within one step of you moves away from you on their Initiative, you may make a Rouse check to move up to 12 steps towards them on your initiative as a free action. During this movement, you may ignore intervening terrain, such as walls and trees, as you smash through them. You must land as close as possible to your target and may not use your Simple or Standard actions in your turn for movement if you use Savage Pursuit during the turn. You may only activate Savage Pursuit once a turn.',
			duration: 'N/A'
		},
		'Earth Shock': {
			level: 5,
			cost: 'Two Rouse checks',
			system:
				'By striking the ground with your fist or stomping your foot, you cause the ground around you to burst upwards. Make two Rouse checks, then make an unarmed attack challenge against all characters (including allies) within five steps of you using Strength + Brawl pool vs. their Dexterity + Athletics pool. On a successful challenge, your attack does one damage and inflicts the Staggered Condition. Critical wins from your attack also inflict the Prone Condition. Damage from Earth Shock is always normal and can never be converted to Aggravated.\nAfter all attacks are resolved, the Storyteller will determine the effects of this power on any inanimate objects or structures in the area of effect. The floor may collapse, furniture may break, and windows may shatter. For simplicity, the Storyteller may choose to have objects within five steps of you take one point of Structure damage.',
			duration: 'N/A'
		},
		Puissance: {
			level: 5,
			cost: 'One Rouse check',
			system:
				'When activated, your base Brawl and Melee damage increases to two damage (instead of one). In addition, your critical wins from Brawl or Melee attacks now do three damage (instead of two). This effect is cumulative with other Potence powers which modify your damage type or inflict additional conditions.',
			duration: 'Scene'
		}
	}
};
