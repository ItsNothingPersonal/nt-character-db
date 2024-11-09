import type { CelerityConfigSchema } from '$lib/zod/lotn/disciplines/celerity';

export const celerityConfig: CelerityConfigSchema = {
	name: 'Celerity',
	characteristics: {
		type: 'Physical',
		masqueradeThreat: {
			type: 'High',
			description:
				'All but the most subtle uses of Celerity are clearly supernatural. Thankfully, eye witness statements are unreliable, and it is incredibly hard to catch you on film.'
		},
		bloodResonance: 'Choleric'
	},
	powers: {
		"Cat's Grace": {
			level: 1,
			cost: 'One Rouse check',
			system:
				'Spend a simple action and a Rouse check. For the next hour, your character sticks to solid vertical surfaces and can maintain her balance at angles up to and including 90 degrees. Thus, your character can stride up a wall or saunter across a miniscule tightrope. Cat’s Grace does not allow you to walk upside-down, such as on a ceiling.',
			duration: 'One hour'
		},
		Quicksilver: {
			level: 1,
			cost: 'Free',
			system:
				'Once purchased you always benefit from this power. When someone declares a Surprise Attack against you, you may choose to take your turn’s Simple and Standard actions directly following the resolution of the Surprise Attack, instead of during your normal initiative. This power works for you even if another character uses Assist Defender to protect you, but only you gain the effect of Quicksilver in that circumstance.',
			duration: 'Passive'
		},
		Fleetness: {
			level: 2,
			cost: 'One Rouse check',
			system:
				'You may activate Fleetness at the beginning of the round by making one Rouse check without an action cost. This is an exception to the rule that requires you to activate Disciplines on your initiative. Once activated, you gain a bonus to your initiative equal to your dots in Celerity for the remainder of the scene.',
			duration: 'One scene'
		},
		'Rapid Reflexes': {
			level: 2,
			cost: 'Free',
			system:
				'You gain an additional simple action to use at any time during your turn. However, this simple action cannot be used to take steps for movement or to activate Disciplines. You may ready a weapon, reload a weapon, clear the Staggered Condition, open or close a door, interact with an object, etc. In addition, you may add your dots in Celerity to any non-combat Dexterity-based tests.',
			duration: 'Passive'
		},
		Blink: {
			level: 3,
			cost: 'One Rouse checks per action',
			system:
				'Any time you spend an action for movement, you can perform a Rouse check and take three additional steps with that action. This benefit does not stack with Savage Pursuit.',
			duration: 'N/A'
		},
		'Nimble Departure': {
			level: 3,
			cost: 'One Rouse check',
			system:
				'You may choose to declare Fair Escape at the end of a turn instead of during your initiative. In addition, if you have won all challenges against your Dexterity + Athletics pool during the turn Nimble Departure was activated you may still fair escape. You must satisfy all the other conditions for Fair Escape normally. Use of Nimble Departure must be declared prior to the end of the turn but before Rouse checks are completed. If your Rouse check causes you to Hunger Frenzy, Nimble Departure fails.',
			duration: 'N/A'
		},
		'Unerring Aim': {
			level: 4,
			amalgam: {
				name: 'Auspex',
				value: 2
			},
			cost: 'One Rouse check',
			system:
				'Once per turn, you may declare the use of Unerring Aim before making a Marksmanship attack. Once declared, your next Marksmanship attack this turn automatically hits and achieves a normal success. If Unerring Aim is used in combination with Bulletstorm, it makes only one of the attacks automatically hit; you may choose which target you automatically hit.',
			duration: 'N/A'
		},
		Velocity: {
			level: 4,
			cost: 'One Rouse check',
			system:
				'Once per turn, when you are subject to critical win from a Brawl, Melee, or ranged weapon attack, you may reduce the critical win to a normal success.',
			duration: 'N/A'
		},
		Zephyr: {
			level: 4,
			cost: 'One Rouse check',
			system:
				'Once activated, for the rest of the scene, your movement speed increases to nine steps per action you spend on movement instead of the normal three steps per action. This bonus can stack with any other movement-enhancing powers. This movement can be in any direction, over any surface, or even through thin air, as long as you end your movement on a solid object or holding a solid object. If you have the Celerity power Cat’s Grace or the Potence power Uncanny Grip, these may be used to prevent falling. Failing to end your movement on a solid surface you can stand on or grasp causes you to fall.',
			duration: 'One Scene'
		},
		Bulletstorm: {
			level: 5,
			cost: 'Two Rouse checks',
			system:
				'Make two Rouse checks, then make an Marksmanship attack challenge against a number of characters in your line of sight, up to your dots in the Marksmanship Skill. On a successful challenge, your attack does one damage of the appropriate type. These attacks cannot benefit from critical wins or combat maneuvers. When using Bulletstorm with thrown weapons or single-shot ranged weapons, you reload or draw another weapon in between each challenge as a free action. When using modern firearms, you may reload your weapon as a free action after performing all of your challenges for Bulletstorm. Regardless of the type of weapon used, you must have enough ammunition for each declared target.\nA vampire firing a Bane (Fire) weapon with Bulletstorm must test for Frenzy once at the end of her action, not once per target',
			duration: 'N/A'
		},
		'Lightning Strike': {
			level: 5,
			cost: 'One Rouse check',
			system:
				'You must declare the use of Lightning Strike before making a Brawl or Melee attack. Once declared, your next Brawl or Melee attack automatically hits and achieves a normal success. If your target possesses Celerity 5, they may make their own Rouse check to defend normally. Lightning Strike may not be used with combat maneuvers (page 103).',
			duration: 'N/A'
		}
	}
};
