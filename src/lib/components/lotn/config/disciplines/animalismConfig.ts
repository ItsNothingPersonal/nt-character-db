import type { AnimalismConfigSchema } from '$lib/zod/lotn/disciplines/animalism';

export const animalismConfig: AnimalismConfigSchema = {
	name: 'Animalism',
	characteristics: {
		type: 'Social',
		masqueradeThreat: {
			type: 'Low',
			description:
				'Talking to animals may seem weird, but someone observing the use of Animalism has no visual proof of supernatural influence. Even the more violent powers of Animalism can be attributed to a bad drug trip.'
		},
		bloodResonance: 'Animal blood',
		description:
			'Unless otherwise mentioned, Animalism powers can only be used on vertebrate, non-human animals.'
	},
	powers: {
		'Feral Whispers': {
			level: 1,
			cost: 'Free or one Rouse check',
			duration: 'Scene',
			system:
				"You can communicate with animals by murmuring to them in animalistic sounds or using body language. To ask questions of an animal, consult your Storyteller. The Storyteller should respond from the point of view of a local animal that has been drawn by your howls, chirps, or other inquiring noises. A character who wishes to establish communication must be both visible and audible to the creature.\nIf there are no animals in your line of sight, you may spend a simple action and perform a Rouse check to summon the closest animal of a chosen type (e.g., bird, dog, coyote, crow) or any one nearby animal. Summoned animals are not granted any unusual power to answer your call and must be able to travel to your location within 15 minutes. A coyote cannot open a locked door, but it will arrive in the parking lot, while a crow could more easily fulfill a rooftop summons. This power confers no special abilities, intelligence, or courage to the animals summoned, and they are under no obligations to obey further commands. Feral Whispers will never summon an animal under the effects of another character's Animalism powers or one who is Blood Bound to another character.\nFurther, if the Storyteller believes you are asking about something animals would not notice (or might not understand), your character may receive a confused or incomplete answer. Asking, “Have any two-legged creatures (mortal or vampire) passed through here tonight?” will likely receive a reasonable answer. The local chipmunks, stray dogs, or birds could tell you that a pack of six men walked by, and they were here very recently. However, such animals would be unable to tell one mortal from another, nor identify the kind of equipment they were carrying."
		},
		'Sense the Beast': {
			level: 1,
			cost: 'One Rouse check',
			duration: 'Immediate',
			system:
				'Spend a simple action to target a character in your line of sight and perform one Rouse check. You can immediately identify if your target is a werewolf or vampire and their current Rage or Hunger level. If the target is not a vampire or werewolf, you sense any hostility in the target, but not the target of that hostility or the propensity to indulge in that hostility.\nAlternatively, you may sense the general number of animals in your line of sight and their mood or intentions. This includes any animals that would normally be in your line of sight but are hidden by darkness, fog, or other non-solid obstructions. In this way, you automatically detect any animal under the effect of the Atavism power. For example, you may detect a pack of wolves lurking in the forest nearby, hunting for prey, or a circling hawk on patrol.'
		},
		'Animal Succulence': {
			level: 2,
			cost: 'Free',
			duration: 'Scene',
			system:
				'When feeding from animals, you Slake one additional Hunger ,and your Blood Potency is considered two levels lower with regard to the feeding penalties for Slaking Hunger from animal blood (see Hunger, page 117).'
		},
		Atavism: {
			level: 2,
			cost: 'One Rouse check',
			duration: 'One Scene or one hour (if using the Patrol option)',
			challengePool: {
				attacker: 'Charisma + Animal Ken',
				defender: 'variable',
				hint: 'see below'
			},
			system:
				"Target a single animal in your line of sight, who immediately becomes aware of your presence, and spend your standard action. Perform a static challenge using your Charisma + Animal Ken versus a difficulty of 4. If you target an animal already under the effects of another character's Atavism, or one who is Blood Bound to another character, the difficulty is equal to that other character’s Manipulation + Resolve. If the challenge is successful, you may choose to enact one of the following:\n▷ Fight: On its initiative, the target animal must attempt a Physical attack against another target of your choosing. You must visually indicate your target by pointing if you do not have the Feral Whispers power.\n▷ Flight: On its initiative, the target animal must spend its actions to move in a direction directly away from you, taking the maximum number of steps available to it. If prevented from moving, it will attempt to free itself before continuing to flee. It may do nothing else during this movement.\n▷ Guard or Patrol: Your target spends the next hour patrolling up to one square mile of territory. Alternatively, you can command your target animal to stay in one spot and watch a location. If it detects an interloper, you may command it either to attack or to alert you.\nFor the remainder of the scene you may spend a simple action to alter the instructions given to the target animal."
		},
		'Enhance the Wild Ride': {
			level: 3,
			cost: 'Free',
			duration: 'Passive',
			system:
				'Once purchased, Enhance the Wild Ride activates automatically whenever you enter a Frenzy. While active, your Blood Potency is considered two higher only for the purposes of determining your Blood Surge bonus (see page 126). In addition, once per Frenzy you may Blood Surge without making a Rouse check. If the use of this power would consider your Blood Potency to be 6, your Blood Surge Bonus is +3; if your Blood Potency would be considered 7, then your Blood Surge Bonus increases to +4. This power is the exception to the rule that social powers end when you enter a frenzy.'
		},
		'Quell the Beast': {
			level: 3,
			cost: 'One Rouse check',
			duration: 'Varies (see above)',
			challengePool: { attacker: 'Charisma + Animal Ken', defender: 'Stamina + Resolve' },
			system:
				'Spend a standard action and make a contested challenge. If you are successful, and your target is a mortal, they become overcome with severe lethargy and are only capable of defending themselves. They may only take defensive actions or flee, moving at half their normal rate. This lasts for 30 minutes if you remain or for five minutes after you leave their presence.\nIf you are successful and your target is a vampire, instead of being Incapacitated, they may not perform Blood Surges for two turns starting on their next initiative.\nFinally, if your target was in a Frenzy when this power was successfully used, she immediately falls out of the Frenzy. A Frenzying vampire affected in this way does not lose the ability to Blood Surge. You may not target yourself with Quell the Beast.'
		},
		'Unliving Hive': {
			level: 3,
			amalgam: { name: 'Obfuscate', value: 2 },
			cost: 'Free or one Rouse check',
			duration: 'Until dismissed or destroyed',
			system:
				'Your Animalism has developed to the point where you may use Animalism on insects and spiders. This benefit applies to all of your Animalism powers. Groups of insects are treated as a single animal for the purposes of Animalism.\nBy spending five minutes in concentration, you may call a swarm of arachnids and/or insects, and, if you wish, direct them to hide inside your body. Gathering this swarm into yourself requires the presence of sufficient insects and cannot be done during combat. While the swarm of creatures are inside you, only an x-ray or similar device will reveal them. The swarm remains inside you until dismissed or destroyed.\n When targeted by a ranged attack, you may instantly expel a swarm of insects housed in your body to envelop you in a protective cloud of flying bugs or a thick carapace of beetles and spiders. This negates the ranged attack entirely as the swarm blocks it. This costs one Rouse check, does not require an action, and may be done at any time in the initiative order. Unliving Hive can be used only once in this way before you have to replenish the swarm inside you.'
		},
		'Subsume the Spirit': {
			level: 4,
			cost: 'One Rouse check (free if used on a ghouled Familiar)',
			duration: 'One hour plus one hour per additional Rouse check',
			challengePool: {
				attacker: 'Manipulation + Animal Ken',
				defender: 'variable',
				hint: 'see below'
			},
			system:
				"To activate Subsume the Spirit, target an animal within your line of sight, perform one Rouse check, and spend a standard action. No Rouse check is required to target your own ghouled Familiars (see Familiars, page 146). Make a Manipulation + Animal Ken test vs. difficulty 4. If successful, your consciousness is transferred into the target animal’s body. When targeting an animal ghouled by someone other than yourself, or an animal that is already Subsumed by another, you must also succeed in a Manipulation + Animal Ken challenge vs. the Resolve + Animal Ken of its domitor. Successfully targeting an animal who was Subsumed by another character kicks that character’s consciousness out of the body and returns them to their vampiric body.\nWhile the animal is inhabited by your consciousness, its mind is rendered into a fugue-like state. Because your character’s mind is focused entirely on controlling the body she has inhabited, the vampire has no sense of anything occurring to her native physical form. Your character’s original body falls into a torpid state and can neither defend itself nor act on its own, but it does retain your Fortitude or other powers that are always active while your consciousness is absent. While Subsuming the Spirit, you always know the direction and distance of your real body, even if it moves, although you cannot perceive its surroundings.\nWhile possessing a ghouled animal, you may utilize any Discipline powers it possesses as if used by the ghoul itself. You maintain your own mental attributes, but you must use the attributes and Skills of the animal in all other cases.\nSubsume the Spirit lasts for one hour. You may extend the duration of Subsume the Spirit by performing one Rouse check prior to  its expiration. When extending this possession into the daylight, you must follow the rules for staying awake (page 126), and, if you see the sun, you must test for Terror Frenzy vs. a difficulty of 2. If the animal dies while you are possessing it, your consciousness immediately returns to your body and you suffer one Aggravated Damage. If your physical body takes damage of any type, your consciousness is immediately released from the animal and returns to your character's body."
		},
		'Control the Savage Beast': {
			level: 4,
			cost: 'One Rouse check',
			duration: 'Frenzy duration',
			challengePool: {
				attacker: 'Charisma + Animal Ken',
				defender: 'Stamina + Resolve',
				hint: 'no bonus for being in Frenzy'
			},
			system:
				"Make one Rouse check and an opposed challenge to direct a Frenzying vampire within your line of sight. Your target does not gain the usual bonus against social powers for being in Frenzy when targeted by Control the Savage Beast. Instructing a Frenzying vampire takes no action and can be done outside of your turn, but this power may only be used once per turn. The target must still fight, feed, or flee as required by her particular type of Frenzy, but you can decide which target your victim attacks, whose blood she drinks, and in which direction she flees. Controlling another vampire's Frenzy does not limit your ability to act, and the Frenzied vampire’s dictated actions still occur on their initiative.\nIf you are the only available target for the Hunger or Fury Frenzy of another vampire, you may attempt to alter her Fury or Hunger Frenzy to a Terror Frenzy. Make another Rouse check and engage the target Frenzying vampire in another opposed challenge. If successful, your target's current Frenzy immediately becomes a Terror Frenzy with you as the source of fear.\nA vampire who has been successfully targeted by Control the Savage Beast cannot Ride the Wave (see Frenzy, page 127). You may only control one Frenzying vampire at a time, and you must maintain line of sight to her in order to do so."
		},
		'Animal Dominion': {
			level: 5,
			cost: 'One Rouse check',
			duration: 'Animal Dominion lasts for 10 minutes per one Rouse check',
			system:
				'Make one Rouse check, and spend a simple action to activate Animal Dominion. When activated, your eyes turn a cloudy white, and your consciousness becomes supernaturally linked to all the animals within one square mile. You see, hear, and feel exactly what they do, all at the same time. You may elect to experience any sensory stimuli within the area of effect of Animal Dominion, such as listening to a conversation, watching a criminal steal a car, or catching the scent of a fire. This power does not extend your field of vision for the purpose of activating other Disciplines or powers, nor does it give you any control over the animals.\nAs a practical matter, the Storyteller will advise you if something important is happening within the range of your power. What additional information this gives you about your surroundings is decided by the Storyteller. You may elect to extend the duration of Animal Dominion by performing one Rouse check prior to its expiration.\nFinally, with an additional Rouse check, you may choose to Subsume the Spirit (if you possess the power) on any animal you are linked to while using Animal Dominion. However, doing so immediately ends the duration of Animal Dominion.'
		},
		'Drawing Out the Beast': {
			level: 5,
			cost: 'One Rouse check',
			duration: 'Frenzy Duration',
			system:
				'Any time you must test to resist a Terror or Fury Frenzy, you may instead make a contested challenge vs. another character in your line of sight as a free action. If you succeed, your target enters the same type of Frenzy, as though they failed the challenge to resist Frenzy instead of you. If you fail the contested challenge, you enter the appropriate Frenzy as normal.\nWhile mortals cannot normally Frenzy on their own, this power causes them to gain all the drawbacks and benefits of a Fury or Terror Frenzy as if they were a vampire. Further stimuli after the use of this power can cause you to Frenzy again, but you may continue to use this power as long as you can make Rouse checks and other targets remain present. You may not target a Frenzying character with this power.'
		}
	}
};
