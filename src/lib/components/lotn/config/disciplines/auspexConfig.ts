import type { AuspexConfigSchema } from '$lib/zod/lotn/disciplines/auspex';

export const auspexConfig: AuspexConfigSchema = {
	name: 'Auspex',
	characteristics: {
		type: 'Mental',
		masqueradeThreat: {
			type: 'Low',
			description:
				'Unless otherwise stated, Auspex powers never manifest in a way that is visible to the naked eye.'
		},
		bloodResonance: 'Phlegmatic',
		description:
			'Auspex vs. Obfuscate: A vampire with the Auspex power Sense the Unseen can detect an Obfuscated character by making a contested challenge of her Wits + Awareness vs. the Obfuscated character’s Wits + Stealth.\n\nAuspex vs. Oblivion: Detecting the use of Oblivion can be accomplished by using the Auspex power Sense the Unseen and a successful contested challenge using Wits + Awareness vs. the Oblivion user’s Resolve + Occult. This test only detects the usage of an Oblivion power, such as when a vampire extends his senses with the power Shadow Cast. To pierce the supernatural darkness of Oblivion powers such as Shadow Cloak, an Auspex user must utilize Heightened Senses and succeed in a contested challenge using her Wits + Investigation vs. the Oblivion user’s Resolve + Occult.'
	},
	powers: {
		'Heightened Senses': {
			level: 1,
			cost: 'Free',
			duration: 'Until deactivated',
			system:
				'Heightened Senses may be activated reflexively, even outside of your usual initiative order. A character’s heightened vision allows her to see clearly, even in total darkness. Your heightened hearing allows you to understand sounds too quiet for normal people to hear. You may eavesdrop on any conversation in your line of sight. When physically blinded, your hearing can compensate adequately for the loss of vision. Similarly, if something deafens you, your sense of touch can feel the vibrations of sounds made. Unless otherwise stated, you are immune to the Blinded Condition when Heightened Senses is active. Certain powers may impose supernatural penalties to your senses. When trying to overcome this interference, Heightened Senses is critical. Those powers will dictate what contested pools are used to overcome the sensory deprivation.\nTo signify that you are using Heightened Senses without interrupting roleplay, point your index finger at the sensory body part you are enhancing such as your eye, ear, or nose.'
		},
		'Sense the Unseen': {
			level: 1,
			cost: 'One Rouse check',
			duration: 'Passive',
			challengePool: {
				attacker: { attribute: 'Wits', skill: 'Awareness' }, //'Wits + Awareness',
				defender: 'variable',
				hint: 'see below'
			},
			system:
				'You have the ability to see things that others cannot. You can pierce the supernatural concealment of other vampires and visually detect the latent energies of supernatural objects. Your senses can even cross the boundaries of the mundane world, allowing you to see the inhabitants of the spiritual world. Any time you wish to look for a supernaturally hidden creature or object, you may spend a simple action, make a Rouse check, and alert the Storyteller. To notice the use of some powers, a contested challenge will be made; the power you are trying to observe defines what pool you are testing against. To notice objects that have been supernaturally enhanced or created with a power, such as a warding circle created by Blood Sorcery or a werewolf fetish, make a static challenge versus a difficulty of 2 + the level of the power used to create or enhance the item.\nThis power can only detect things normally unable to be seen by mundane eyesight, such as an obfuscated vampire, a magical ward, or a Hecata spying through a shadow with the Oblivion power Shadow Cast. If you fail a test to notice a supernaturally-concealed individual or object, you may not test against that target’s supernatural concealment again for five minutes.\nTo signify you are using Sense the Unseen without interrupting roleplay, make a circle with your fingers and thumb, then hold your hand over or in front of one of your eyes.'
		},
		Panacea: {
			level: 2,
			amalgam: { name: 'Fortitude', value: 1 },
			cost: 'One Rouse check',
			duration: 'N/A',
			challengePool: {
				attacker: { attribute: 'Composure', skill: 'Medicine' }, //'Composure + Medicine',
				defender: 'difficulty of 2'
			},
			system:
				'Spend your standard action touching a target, either living or undead (which may require a Grapple check if the target is unwilling). Make one Rouse check and a static challenge using Composure + Medicine vs. a difficulty of 2. If successful, you can choose one of the following effects:\n▷ Calm a mortal who is experiencing a heightened emotional state. This includes removing the Frightened Condition from a mortal.\n▷ Restore one point of Willpower to the target.\n▷ Resolve the Distracted, Staggered, or Weakened Condition.\nPanacea may not be used on yourself. If the user of Panacea targets more than one different character a night, she loses one Willpower each time she attempts an additional target. This Willpower may only be regained by resting. The user may use Panacea on her initial target (or any subsequent targets she already lost a Willpower to attempt) as many times as she wishes for one Rouse check per use.'
		},
		Premonition: {
			level: 2,
			cost: 'Free',
			duration: 'Passive',
			system:
				'Premonition is always active. Whenever the Storyteller deems it appropriate, they may choose to give you a hint to aid you in some way. This could be a clue to progress plot, a warning about your proposed plan, or something similar. This hint manifests as a sudden vision in your mind. If multiple people possessing this power are all involved in the same scene, this vision may even be shared between all those present. In addition, small flashes of insight come when most needed.\nIn addition, once a night you can use your simple action at any time, even before your initiative, by sacrificing your standard action for that same round.'
		},
		'Scry the Soul': {
			level: 2,
			cost: 'One Rouse check',
			duration: 'N/A',
			challengePool: {
				attacker: { attribute: 'Intelligence', skill: 'Insight' },
				defender: { attribute: 'Composure', skillOrAttribute: 'Subterfuge' }
			},
			system:
				"Target a character within your line of sight, spend a standard action, and make a contested challenge. If you succeed, your target must truthfully answer two of the following questions. In order to gain the answers to additional questions, you must utilize Scry the Soul again.\n▷ What is your emotional state?\n▷ What is the Resonance of your blood? (When used on a vampire, this will reveal the Resonance type of the last blood she fed on.)\n▷ What is your creature type? (Vampire, werewolf, ghoul, etc.)\n▷ Are you under the influence of supernatural powers? (This question does not reveal the specific powers influencing the character, only whether the character is under the effects of a supernatural power with a Duration that is not Passive or Immediate.)\n▷ Have you committed diablerie in the last year?\nIf used against a target that is currently possessed by another character's essence, such as an animal being affected by Subsume the Spirit, or a mortal under the effects of Possession, the answer to “what is your creature type” is the actual creature type of the physical entity  you see, not the controlling entity. However, if the second question asked is “Are you under the influence of supernatural powers?” this would reveal the influence of the controlling character, though not necessarily what power is being used, as described above.\nAlternatively, you may use this power to scan a room looking for either a mortal with a specific type of blood Resonance or a supernatural creature of a specific type. For example, you may wish to search for vampires in a crowd of people or a mortal possessing Choleric Blood Resonance. To scan the room, declare to the Storyteller what type of creature type or Blood Resonance you are looking for and perform a static challenge. The difficulty of the static challenge depends on how many people are in your search area. A group of up to 25 people would be difficulty 2. For each additional 25 people beyond the first 25, increase the difficulty by 2. If you succeed, you identify everyone in the room who meets your search criteria."
		},
		'Collective Cognizance': {
			level: 3,
			cost: 'Free',
			duration: 'Passive',
			challengePool: {
				attacker: { attribute: 'Wits', skill: 'Awareness' },
				defender: { attribute: 'Composure', skillOrAttribute: 'Subterfuge' },
				hint: 'You automatically notice failed mental and social attacks without a test (see Noticing Attacks, page 107).'
			},
			system:
				'Collective Cognizance is always active. You automatically notice failed mental and social attacks without a test (see Noticing Attacks, page 107). In addition, you may even notice the successful use of mental and social powers, even if there is no visual or auditory phenomenon associated with its use. If you are the power’s target, you are looking at someone who successfully uses a power, or you are looking at the power’s target, you may make an opposed challenge using your Wits + Awareness vs. Composure + Subterfuge to determine if you notice what happened. If the source of a supernatural power isn’t within line of sight, characters who notice the power will know what general direction the power came from.'
		},
		'Share the Senses': {
			level: 3,
			cost: 'One Rouse check',
			duration: 'One hour',
			challengePool: {
				attacker: { attribute: 'Resolve', skill: 'Awareness' },
				defender: { attribute: 'Composure', skillOrAttribute: 'Awareness' }
			},
			system:
				'Target a character within your line of sight, spend a standard action, and make a contested challenge. If you succeed, you can ‘ride’ the senses of your target for up to one hour. You see, hear, smell, and feel exactly what they do. Your target remains unaware of your intrusion, but others may notice through the use of Scry the Soul. If your target is alerted to your presence, they may attempt to push you out by making a contested challenge using their Resolve + Awareness vs. your Composure + Awareness. If you are successfully separated, you may not target that same character with Shared Senses for the remainder of the night. While Shared Senses is active, you may still move, act normally, and use your own senses as well.'
		},
		'Unveil the Edifice': {
			level: 4,
			cost: 'One Rouse check',
			duration: 'Until you leave the building',
			system:
				'Make one Rouse check and spend one full turn in concentration while inside a building. Afterwards, you get a complete sense of a building’s layout and inhabitants at that moment. You receive accurate information about the building’s design — where each room is, whether there are secret passages or hidden chambers, and so forth. Your senses extend a maximum of three stories up and three stories down from the floor you currently occupy. You also learn the locations and approximate number of the inhabitants, unless they are supernaturally concealed.'
		},
		"Spirit's Touch": {
			level: 4,
			cost: 'One Rouse check',
			duration: 'Passive',
			challengePool: {
				attacker: { attribute: 'Intelligence', skill: 'Investigation' },
				defender: 'difficulty of 3'
			},
			system:
				"You can only use this power on objects. For the purposes of this power, inanimate corpses (including the corpses of supernatural creatures and the remains of destroyed vampires) count as objects and may be targeted by Spirit’s Touch. Vampires who have not met Final Death do not count as corpses. Spend a standard action, make one Rouse check, and touch an object. To collect a psychic impression, touch the target with your bare skin. You then enter a shallow trance and glean information from the spiritual residue on the object. You are only marginally aware of your surroundings while using Spirit’s Touch, although a loud noise or jarring physical sensation will break the trance in an instant. Spirit’s Touch works in the following three ways:\n▷ If the object is a corpse, your character receives a vision of the last few moments of the target’s life, including the killer's face if the victim saw her. If the killer was using supernatural means (such as Mask of a Thousand Faces) to hide their true identity, Spirit’s Touch reveals the fake visage, not the true face.\n▷ If the object is not a corpse, you can determine the last person that handled the object (not including yourself).\n▷ If the object is not a corpse, you can discover the most memorable event concerning the object. This may be its creation, its use in a murder, etc. Merely being present for a memorable event does not reveal anything; the object must have been involved in the event to “remember” it.\nTo discover additional interactions, such as an older handler of an item, or another memorable event, you must succeed in a Intelligence + Investigation challenge vs. a difficulty of 3 while maintaining your hold on the item. These challenges do not cost additional actions or Rouse checks. This difficulty increases by one for each additional interaction trying to be discovered. Once you have failed one of these tests, you may not test again for an hour.\nThese images come from a 360-degree point of view, extending outward, from the object or corpse. Regardless of whether the object is a corpse, you also sense any deep emotions relevant to the psychic images you received. The visions received by the use of this power are seldom clear or detailed; they register more like a “psychic snapshot.” They are visual only and lack any sounds, smell, or tactile stimuli. Still, a clever vampire can learn a great deal from a glimpse.\nUnlike people, objects do not have a mind that can be fooled by Obfuscate. When using Spirit’s Touch on an object (not a corpse), powers such as Unseen Passage and Mask of a Thousand Faces do not obscure interactions with objects. The true visage of characters employing these powers is left behind, unless the character is using the Obfuscate power Soul Mask or the Oblivion Ceremony Alone in the Dark. Unless a character touches an item using one of these two powers, the psychic impression she leaves is always of her true self, even if disguised in other ways."
		},
		Clairvoyance: {
			level: 5,
			cost: 'One Rouse check',
			duration: 'Thirty minutes plus 30 minutes per additional Rouse check',
			challengePool: {
				attacker: { attribute: 'Intelligence', skill: 'Investigation' },
				defender: { attribute: 'Resolve', skillOrAttribute: 'Composure' }
			},
			system:
				"Your perceptions split, allowing you to focus on a single far away person, place, or object, without losing the ability to perceive your current surroundings. You may target a character, item, or location you have seen in person in the last 90 days with Clairvoyance, provided the target is within your game’s local area of play.\nSpend a standard action, and make a Rouse check. No challenge is required to observe a location or object. If you use Clairvoyance on a supernatural creature, or on an object in the possession of a supernatural creature, you must make an opposed challenge against your target or the individual controlling the object. If successful, you can see, hear, and otherwise sense the area around your target as though you are in their presence. This challenge does not alert the other character that she is being observed.\nIf you use Clairvoyance to spy on a character whose consciousness and physical body are in two different locations (such as when they are using the Possession power), you always perceive her consciousness.\nYou may only use Heightened Senses and Sense the Unseen through Clairvoyance. A character's Heightened Senses would allow her to smell a candle or see in a poorly-lit room through Clairvoyance. Sense the Unseen could detect the use of Obfuscated individuals or hallucinations.\nYou may maintain this power at the conclusion of its duration by making another Rouse check."
		},
		Possession: {
			level: 5,
			amalgam: { name: 'Dominate', value: 3 },
			cost: 'One Rouse check and one Stain',
			duration: 'Until ended or at dawn (unless extended)',
			system:
				"To use Possession, use your standard action to stare into the eyes of your subject. This power will not work on blind subjects or subjects who cannot see your eyes. Your target must be a non-supernatural mortal or a ghoul who is three steps Blood Bound to you. Make a Rouse check, and make an opposed challenge. If successful, your consciousness is transferred into the target’s body, and her mind is rendered into a fugue-like state.\nWhile using Possession, your character’s mind is focused entirely on controlling the body she has inhabited. The vampire has no innate sense of anything occurring to her native physical form. The character’s original body falls into a temporary torpor that lasts the duration of the power. If the possessing vampire's body takes any amount of damage, Possession ends immediately, and the vampire awakens.\nWhile possessing a mortal, the controlling vampire may use any Auspex, Presence, and Dominate powers she knows through  the mortal. If possessing a ghoul, she may also use any Potence, Celerity, Fortitude, or Protean powers the ghoul may have. In both instances, Amalgams are eligible to be used as long as the second Discipline is also one of the eligible Disciplines to be used during Possession. The vampire maintains her attributes and Skills, both mental and social, but she must use the possessed body’s physical attributes and Skills.\nA vampire using Possession must still Rouse her Blood to empower any Disciplines she may access. However, she may not Rouse the Blood for any other purposes. In addition, she is still susceptible to Frenzy while possessing the mortal. If the host body takes Aggravated Damage, the controlling vampire must make a static challenge using her Resolve + Intimidation vs. a difficulty of 3 + the damage taken to stay in control of the body. If the host body dies during the use of Possession, the power ends, and the controlling vampire loses three Willpower. If the controlling vampire does not have three Willpower to spend, she immediately falls into torpor.\nPossession lasts until dawn unless the user wishes to extend the effects. In order to do so, she must make a test to stay awake as normal. Finally, Possession is a profoundly violating experience. The use of Possession causes the user to gain one Stain. Depending on the actions committed during the use of Possession, the Storyteller may choose to award additional Stains.\nThin-blooded vampires cannot be targeted by this power."
		},
		Telepathy: {
			level: 5,
			cost: 'One Rouse check',
			duration: 'One hour (willing target) or one turn (unwilling target)',
			challengePool: {
				attacker: { attribute: 'Resolve', skill: 'Awareness' },
				defender: { attribute: 'Wits', skillOrAttribute: 'Subterfuge' }
			},
			system:
				'Telepathy provides two abilities: the ability to communicate telepathically and the ability to draw information from the mind of another. Either use requires a standard action and a Rouse check. If the target is mortal or willing, no challenge is required. If they are not mortal and are unwilling, make a contested challenge.\nCommunicating telepathically allows the character and her target to send and receive mental messages and simple images. You may use this mode of Telepathy on any character you have met who is within your local area of play. Line of sight is not required. When communicating with a willing target, a single use of Telepathy lasts for an hour and allows the characters to communicate freely. This mode of Telepathy may be extended by another hour for one Rouse check. A character can maintain Telepathic links to a number of willing characters equal to her dots in Composure. When communicating with an unwilling target, you may send one image or a brief message that would take less than ten seconds to say to the target.\nIf a willing character becomes unwilling during a telepathic session, the character using Telepathy must immediately succeed in an opposed challenge using the Telepathy test pool or be ejected from the now-unwilling character’s mind. A character may also choose to become willing at any point during the resolution of Telepathy.\nAlternatively, your character may pull one image or specific piece of information out of the mind of an unwilling target within line of sight. The information you gain in this way must truthfully answer one of the following questions (your choice):\n▷ What are you currently thinking about?\n▷ What does that person or thing you just described look like?\n▷ Where is the person or object you were just talking about located?\n▷ Do you like or dislike the person you’re currently talking to?\n▷ What are you planning to do in the next few minutes?\nIf you target a character who happens to be possessed by another character, such as through use of the powers Subsume the Spirit or Possession, your Telepathy links you to the controlling mind, while the possessed mind remains dormant and unreachable.'
		},
		'Unburdening the Bestial Soul': {
			level: 5,
			amalgam: {
				name: 'Dominate',
				value: 3
			},
			prerequisite: 'Panacea',
			cost: 'Two Rouse checks and gain one Stain',
			duration: 'One game session',
			system:
				'To use Unburdening the Bestial Soul, you and your target must spend 10 minutes in seclusion with each other. During this time, you must share your moral serenity and how the target can protect herself against the repercussions of bestial urges. After this 10 minutes elapses, if the target is willing, you make two Rouse checks and gain one Stain which cannot be prevented in any way. Your target then immediately removes one Stain. If she has no remaining Stains after this reduction, she gains a psychological shield that prevents the next Stain she would gain in the same night. If, after removing one Stain, she has more Stains remaining, she removes a second Stain and does not gain the psychological shield.\nAlternatively, instead of removing Stains, the user of Unburdening the Bestial Soul may permanently restore one point of lost Humanity to a target vampire who has a lower Humanity score. This Humanity gain does not cost XP. A vampire may only regain Humanity in this way once ever. The Humanity restored must be one the character has lost during play or during character creation (such as when choosing the Alleycat Predator type).\nFor the rest of the session, the target maintains a sympathetic bond to you. Any Dominate powers you use on them no longer require Gaze and Focus. When the power expires at the end of the night, any unused psychological shields are lost.\nEach time per night the user of Unburdening the Bestial Soul targets an additional character beyond the first with this power, she loses one Willpower and gains one Stain per additional target. This Willpower cannot be restored without first resting. The user may utilize Panacea on her initial target (or any subsequent targets she has already lost a Willpower for) as many times as she wishes. A character who has gained Stains from Unburdening the Bestial Soul cannot have those Stains removed by another character’s use of the same power.'
		}
	}
};
