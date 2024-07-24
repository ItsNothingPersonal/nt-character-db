import type { ConditionName } from '$lib/zod/lotn/enums/conditionName';

export const conditionConfig: ConditionConfigSchema = {
	Blinded:
		'While suffering from this Condition, you automatically fail all ranged physical attack challenges and any mental or social challenges that require line of sight. In addition, your pools for offensive and defensive physical challenges (except those that use your Stamina attribute) suffer a -5 penalty. Powers that cause Blinded will indicate within their text what resolves the Condition.\n▷ In the modern world, areas of natural ‘pitch blackness’ are rare; only places such as caverns, underwater depths, and specifically designed rooms should cause this Condition. For other situations see Visual Impairment, page 112.',
	Distracted:
		'A character with the Distracted Condition is momentarily overwhelmed by external stimuli. While Distracted, she loses her next simple action. Losing the next simple action resolves the Distracted Condition.',
	Frightened:
		'The character must use all available actions to immediately move away from the source of their fear until the Condition is resolved. Abilities that cause Frightened will indicate within their text what resolves the Condition.',
	Grappled:
		"A character with the Grappled Condition is unable to take steps in any direction. This does not eliminate their ability to take Standard and Simple Actions. This Condition may be resolved by winning a Strength + Brawl or Melee test vs. the grappler's Strength + Brawl or Melee as a standard action. Some powers, such as Mist Form, may allow a character to slip out of a Grapple because they can no longer be targeted by Grapple maneuvers. An individual Grappled by more than one person must defeat the highest of the grapplers' test pools. The grapplers gain a +1 bonus for each additional grappler beyond the first. If the Grappled character wins the test, they escape all the Grapples against them.",
	Helpless:
		'A character with the Helpless Condition is unable to defend themselves, whether due to torpor, unconsciousness, or paralysis. A character with the Helpless Condition may take no actions. They automatically lose all physical attack tests against them.',
	Impaired: 'All of your test pools are reduced by 2.',
	Prone:
		'A Prone character has been knocked flat on the ground. They may spend your simple action to stand up, which removes the Prone Condition. While Prone, you gain a +3 bonus to your defense test pool against Ranged attacks further than three steps away, but a -2 penalty to your defense test pool against all physical attacks from a character within two steps of you. In addition, you may crawl at one step per action spent on movement. A character can spend a simple action to lie down, inflicting the Prone Condition on themselves.',
	Staggered:
		'A character with the Staggered Condition has been physically stunned and loses his next simple action. Losing the next simple action resolves the Staggered Condition.',
	Weakened: 'Offensive physical test pools are reduced by 1.'
};

type ConditionConfigSchema = {
	[M in ConditionName]: string;
};
