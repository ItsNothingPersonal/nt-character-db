import type { ThinBloodAlchemyConfigSchema } from '$lib/zod/lotn/disciplines/thinBloodAlchemy';

export const thinBloodAlchemyConfig: ThinBloodAlchemyConfigSchema = {
	name: 'Thin-Blood Alchemy',
	characteristics: {
		type: {
			text: 'Mental',
			hint: 'In the case of Counterfeit Power, the type is the same as the power being counterfeit. All other effects are Mental.'
		},
		masqueradeThreat: { type: 'Variable', description: 'Varies according to the effects' },
		bloodResonance: 'Variable',
		description:
			'The alchemist pours one Rouse check’s worth of Blood, as well as any other required ingredients, and at least one of the suggested ingredients (listed in the powers description) into her athanor, heating and mixing it into a slurry, which then cools into a drinkable liquid that will not harm the alchemist. The athanor can be anything from a pressure cooker, repurposed propane tank, beer keg or an actual furnace. To distill a Formula, you must succeed in a static challenge with a difficulty of 6 using your Intelligence + Alchemy. Formulae of level 3 or lower may be distilled in the field in small, portable equipment. Formulae of level 4 or 5 require the use of a laboratory.\nAn alchemist may safely carry a number of potions equal to  the higher of her Wits or Dexterity. The potions remain stable for up to 24 hours without refrigeration. The potions are usually the size of a soda can, thermos, or large vial. An alchemist may store a number of potions equal to twice her number of Alchemy dots plus the number dots she has in her Haven. As long as she has a powered refrigerator, these potions will last indefinitely.\nOnce a Formula has been distilled, the power it conveys requires its own activation, which is detailed in the individual power descriptions. Drinking a potion is a simple action. Once the potion is consumed, the alchemist must spend the activation cost for the power’s effect as normal. In the case of Counterfeit powers gained by Blood Alchemy, the thin-blood gains the ability to use the counterfeited power for a scene.\nOnly thin-blooded vampires may benefit from Blood Alchemy. Unless otherwise noted, only the thin-blood vampire who distilled the Formula can benefit from ingesting the resulting potion.\nIngredients: Most non-Blood Resonance ingredients are not specifically defined for each Formula. Blood Alchemists typically develop their own proprietary ingredient lists for each Formula. Each specific Formula will list any required primary ingredients and suggestions for required secondary ingredients. Unless your Storyteller dictates specific ingredients for the purposes of game balance or chronicle-imposed limitations, the player is free to choose her own ingredients.\nAn alchemist receives one free Formula that does not require the listed Research time when she purchases a new dot of Blood Alchemy. There is no limit to the number of Formulae you may have per dot of Blood Alchemy.\n\nCost per Formula: Learning a new Formula costs an amount of XP equal to the level of the new Formula being learned x 4. For example, if a character wants to learn a level 3 Formula, that costs 12 XP.\n\nCounterfeit Formulae: Some of the Formulae available to thinbloods are designed to counterfeit powers in other Disciplines. Each power you wish to counterfeit requires a separate Formulawith a separate XP cost. For example, if your character wishes to purchase Counterfeit (Level 3) for the Potence power Staggering Strike, and Counterfeit (Level 3) for the Celerity power Blink, those each cost 12 XP. Counterfeit powers work identically to their listed mechanics.\nDistillation and Research Time: Unlike normal Disciplines, researching a new Formula takes time to learn. XP must be spent prior to the start of the research time. Once learned, the stronger the Formula, the longer it takes to distill.\n\nConsult the chart on p. 268 for research and distillation times. The listed distillation time provides one dose.\n\nBlood Alchemy and Downtimes: Unless otherwise dictated by your Storyteller, gathering ingredients and distilling any number of Formulae takes a single downtime action.'
	},
	powers: {
		'Far Reach': {
			level: 1,
			requiredIngredients: ['Alchemist’s Blood', 'Choleric mortal blood'],
			suggestedIngredients: [
				'Anything that symbolizes or can act as long-distance control, such as nylon fibers from a rope or a melted-down grappling hook.'
			],
			cost: 'One Rouse check',
			challengePool: {
				attacker: { attribute: 'Resolve', skill: 'Science' },
				defender: { attribute: 'Strength', skillOrAttribute: 'Athletics' }
			},
			system:
				'Use your standard action to telekinetically push, pull, or lift an object weighing up to 225 pounds that is within your line of sight and no farther than 12 steps. You can move or use the object in any fashion, as though you were using your hands, such as to push a button, turn a dial, fire a gun, or type on a keyboard. Knives and other dense, blunt objects can be wielded as weapons using your Resolve + Science vs. Dexterity + Athletics.\nAfter activating Far Reach, you can remotely control a targeted object for five minutes, until you lose line of sight, or it moves further than twelve steps from you. Objects moved with Far Reach move six steps per turn. Remotely using an object takes your full concentration and requires you to spend a standard action. In stressful situations that require fine control (such as typing a specific sequence of numbers and letters on a keyboard) at range your Storyteller may impose a -2 penalty to your test pool.\nYou may attempt to use Far Reach to move someone else. This requires a Resolve + Science challenge vs. your target’s Strength + Athletics. On a win, an invisible force pushes, pulls, or lifts your target three steps in any direction. Breaking free from someone using Far Reach to hold you in the air requires the expenditure of a simple action and a successful Strength + Athletics test vs. your Resolve + Science. Depending on your height this may incur damage or levy a Condition. (See Falling, page 108). You cannot use Far Reach on yourself or anything you are physically touching.',
			duration: 'Ten minutes'
		},
		Haze: {
			level: 1,
			requiredIngredients: ['Alchemist’s Blood', 'Phlegmatic mortal blood'],
			suggestedIngredients: ['Dry ice', 'cigar smoke', 'bottled engine exhaust'],
			cost: 'One Rouse check',
			system:
				'Make one Rouse check, and use your standard action to instantly fill an area, up to the size of a large ballroom, with a thick cloud of mist and fog. If used outdoors, your Haze extends 50 steps in every direction, with you at the center.\nIndividuals in your instantly-created Haze cannot see more than three steps away. Characters outside of the Haze cannot see more than three steps into the Haze. Characters wishing to attack or use a power on characters more than three steps away through a Haze are considered to have the Blinded Condition. Powers that make you immune to the Blinded Condition from mundane or supernatural darkness do not make you immune to the Blinded Condition inflicted by Haze. Haze lasts for 30 minutes, but you can dispel it early by expending a simple action.\nYou may also choose to activate Haze for free, requiring no action and no Rouse check. If activated in this way, your cloud of mist only surrounds yourself, making you unidentifiable to onlookers. It provides no other bonuses.',
			duration: 'One scene'
		},
		'Counterfeit Power (Level 1)': {
			level: 2,
			requiredIngredients: [
				'Alchemist’s Blood',
				'the Blood Resonance listed for the Discipline from which the counterfeit power belongs'
			],
			suggestedIngredients: [
				'When counterfeiting other powers, the ingredients symbolize the theme of the Discipline or the effect of the specific power.'
			],
			cost: 'As per the counterfeited power',
			system: 'As per the counterfeited power',
			duration: 'As per the counterfeited power'
		},
		Envelop: {
			level: 2,
			requiredIngredients: ['Alchemist’s Blood', 'Melancholic and Phlegmatic mortal blood'],
			suggestedIngredients: [
				'Potassium chloride',
				'halon gas',
				'bottled smog',
				'the ashes of a garotte'
			],
			cost: 'One Rouse check',
			challengePool: {
				attacker: { attribute: 'Wits', skill: 'Science' },
				defender: { attribute: 'Stamina', skillOrAttribute: 'Survival' }
			},
			system:
				'Once the potion is imbibed, for the next 15 minutes the alchemist can gesture at a target within sight and make an opposed challenge by spending their standard action. If the alchemist is successful, a swirling mist envelops the target, causing the Blinded Condition. Powers that make you immune to the Blinded Condition from mundane or supernatural darkness do not make you immune to the Blinded Condition inflicted by Envelop. If the target is mortal, then they also can take no actions except movement as they cough and choke. Thin-blooded vampires are not considered mortals for the purposes of interacting with Envelop.\nThe mist lasts for two turns, at which point the effects of this power on the target end. An alchemist may only conjure one such mist at time.',
			duration: 'Fifteen minutes'
		},
		'Counterfeit (Level 2)': {
			level: 3,
			requiredIngredients: [
				'Alchemist’s Blood',
				'the Blood Resonance listed for the Discipline from which the counterfeit power belongs'
			],
			suggestedIngredients: [
				'Ingredients symbolizing the theme of the Discipline or the effect of the specific power'
			],
			cost: 'As per the counterfeited power',
			system: 'As per the counterfeited power',
			duration: 'As per the counterfeited power'
		},
		Defractionate: {
			level: 3,
			requiredIngredients: ['Alchemist’s Blood', 'Sanguine and Melancholic mortal blood'],
			suggestedIngredients: [
				'Moldy spinach',
				'hot black coffee (no additives)',
				'sodium octanoate (protein stabilizer)',
				'O-negative mortal blood'
			],
			cost: 'Free aside from the distillation costs',
			system:
				'Instead of making a static challenge when distilling, make a contested challenge vs. Difficulty 4. If you succeed in the challenge, you make enough elixir to turn two blood bags into unfractionated blood that any vampire can feed on normally. Each bag Slakes one Hunger. This blood remains unfractionated indefinitely, as long as it is refrigerated within 24 hours. This is an exception to the rule that other vampires cannot benefit from Thin-Blood Alchemy.\nAn alchemist can store a number of unfractionated blood bags equal to twice her number of Alchemy dots + the number of dots she has in her Haven, as long as she has a powered refrigerator.',
			duration: 'Twenty-four hours or indefinitely if refrigerated'
		},
		'Counterfeit (Level 3)': {
			level: 4,
			requiredIngredients: [
				'Alchemist’s Blood',
				'the Blood Resonance listed for the Discipline from which the counterfeit power belongs.',
				'In addition, all counterfeit Formulae at this level and higher require a drop of Blood from a vampire who possesses at least one dot in the counterfeit Discipline or for whom the Discipline is in-clan. The Blood does not need to come from someone who has the specific power being counterfeited, only the Discipline itself.\nFor example, to counterfeit the power Scorpion’s Touch from the Blood Sorcery Discipline, the alchemist would need a drop of Blood from a Tremere, Banu Haqim, or a vampire who had learned at least one dot of Blood Sorcery. This small amount of Blood does not require a Hunger gain, nor does consuming it cause a Blood Bond. However, it is rare for vampires to freely give their Blood to an alchemist and generally only do so at the cost of a major boon.'
			],
			suggestedIngredients: [
				'Ingredients symbolizing the theme of the Discipline or the effect of the specific power'
			],
			cost: 'As per the counterfeited power',
			system: 'As per the counterfeited power',
			duration: 'As per the counterfeited power'
		},
		'Airborne Momentum': {
			level: 4,
			requiredIngredients: ['Alchemist’s Blood', 'Choleric and Sanguine mortal blood'],
			suggestedIngredients: [
				'Wings of any animal that can achieve true flight or fabric from a hot air balloon'
			],
			cost: 'One Rouse check',
			system:
				'After consuming this elixir and making one Rouse check, the alchemist can hover in the air and fly at a speed of three steps per action spent moving. While flying, she may carry a single human-sized mass. Doing so requires her to spend both her simple and standard action to move three steps in a turn. Unwilling passengers must be Grappled first.',
			duration: 'Thirty minutes'
		},
		'Counterfeit (Level 4)': {
			level: 5,
			requiredIngredients: [
				'Alchemist’s Blood',
				'the Blood Resonance listed for the Discipline from which the counterfeit power belongs In addition, counterfeiting level 4 powers require a drop of Blood from a vampire who possesses at least one dot in the counterfeit Discipline or considers the Discipline in-clan.'
			],
			suggestedIngredients: [
				'The ingredients symbolize the theme of the Discipline or the effect of the specific power'
			],
			cost: 'As per the counterfeited power',
			system: 'As per the counterfeited power',
			duration: 'As per the counterfeited power'
		},
		'Awaken the Sleeper': {
			level: 5,
			requiredIngredients: [
				'Alchemist’s Blood (one Rouse check)',
				'Choleric or Sanguine mortal blood'
			],
			suggestedIngredients: ['Adrenaline', 'caffeine', 'cocaine', 'melatonin', 'other stimulants'],
			cost: 'None',
			system:
				"The alchemist combines all the required and secondary ingredients, then distills the elixir in her athanor. Unlike normal distillation, however, this Formula does not require an immediate distillation challenge. Instead, make the distillation challenge when the target torpored vampire consumes the resulting elixir. The difficulty of the challenge is equal to the target torpored vampire's Blood Potency. If the challenge is successful, the torpid vampire immediately wakes from torpor at Hunger 4. Each elixir created through this process has one dose.\nAn alchemist can store a number of these elixirs equal to her Alchemy dots, as long as she has access to a working refrigerator.",
			duration: 'Twenty-four hours or indefinitely if refrigerated'
		}
	}
};
