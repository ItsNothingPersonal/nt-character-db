import type { PresenceConfigSchema } from '$lib/zod/lotn/disciplines/presence';

export const presenceConfig: PresenceConfigSchema = {
	name: 'Presence',
	characteristics: {
		type: 'Social',
		masqueradeThreat: {
			type: 'Low to High',
			description:
				'Most effects of Presence can be explained by irrational behavior; however, being constantly subjected to the same powers can cause a mortal to wonder why they keep making decisions they can’t explain.'
		},
		bloodResonance: 'Sanguine',
		description:
			'Presence is an emotion-altering Discipline, but does not directly affect the mind. . Victims of Presence are not under the control of the vampire, but their behavior is influenced in specific ways as determined by the power.\nUnless otherwise stated, such as with the power Summon, in order to be affected by Presence, you must either be in the physical presence of the user or within earshot. Being blind does not make you immune to Presence. However, Presence is not transmitted through electronic devices.'
	},
	powers: {
		Awe: {
			level: 1,
			cost: 'One Rouse check',
			system:
				'To activate Awe, make one Rouse check and spend a simple action. For the remainder of the scene, you seem larger than life, more impressive than usual, and everyone within conversational distance will pay attention and feel a strong desire to be near you. You gain Gaze and Focus from all characters within 10 steps of you. Supernatural characters may exert their will and become immune to Awe for 10 minutes by spending one Willpower; this can be done outside of their initiative order and requires no action to be spent.',
			duration: 'Scene'
		},
		Daunt: {
			level: 1,
			cost: 'One Rouse check',
			system:
				'To activate Daunt, make a Rouse check and expend a simple action. For the remainder of the scene, you seem overtly threatening. Your aura of menace causes the affected to think twice about acting against you. Mortals affected by Daunt must succeed in a static challenge using their Resolve + Composure vs. a difficulty of 3 prior to physically attacking you. If you attack or use a Discipline on a character affected by Daunt, they become immune to this power for ten minutes. Thin-blood vampires are immune to Daunt.',
			duration: 'Scene'
		},
		'Eyes of the Serpent': {
			level: 1,
			amalgam: { name: 'Protean', value: 1 },
			cost: 'Free',
			challengePool: {
				attacker: 'Charisma + Persuasion',
				defender: 'Wits + Composure'
			},
			system:
				'Use a simple action to activate Eyes of the Serpent, and target a character with whom you have established Gaze and Focus. If you are successful in a contested challenge, your target is partially paralyzed, unable to take steps or make offensive actions. However, she maintains the ability to speak and defend herself.\nEyes of the Serpent immediately ends if you move a step from your location, your target suffers damage, or you fail to spend your simple action concentrating on holding their Gaze. Supernatural creatures, including ghouls and thin-blood vampires, may spend one point of Willpower after suffering from Eyes of the Serpent for two turns to end its effects.\nOnce a character has been affected by Eyes of the Serpent, and spends Willpower to end its effects, she remains immune to future uses of Eyes of the Serpent for the remainder of the scene.',
			duration: 'Two turns or see above'
		},
		Monologue: {
			level: 2,
			cost: 'One Rouse check',
			system:
				'Spend a standard action and start talking to activate Monologue. Monologue lasts for one full turn for each dot of the Subterfuge Skill you possess or until you stop talking, whichever is shorter. While this power is active, anyone who attempts to attack you must instead engage you in conversation without attacking or leaving. You cannot force others to like you or divulge specific information, but they must engage in conversation as long as you continue talking, or until you reach the maximum duration allowed by your Subterfuge Skill. Once your Monologue expires, opponents may attack you normally, and you cannot activate this power again for the next hour. If you attack, use a supernatural power that targets another character, or attempt to move away (or declare Fair Escape) from aggressors, Monologue ends immediately. Monologue does not protect your allies. Individuals affected by Monologue do not lose the ability to attack, only the ability to target you with an attack.',
			duration:
				'Turns equal to your dots in the Subterfuge Skill or until you stop talking, whichever is shorter'
		},
		'Silencing Tongue': {
			level: 2,
			cost: 'One Rouse check',
			challengePool: {
				attacker: 'Charisma + Leadership',
				defender: 'Composure + Resolve'
			},
			system:
				'Use your standard action as you make a biting remark. To use this power, you must have your target’s Gaze and Focus. If you succeed in an opposed challenge, your target is stunned into silence, and unable to speak coherently for the next five minutes. She can scarcely articulate more than a single word. If a power requires only a single spoken word for its activation, such as the Dominate power Compel, she may still utilize it.\nIf you fail a test to use Silencing Tongue, you may not test against the same target for five minutes.',
			duration: 'Five minutes'
		},
		'Dread Gaze': {
			level: 3,
			cost: 'One Rouse check',
			challengePool: {
				attacker: 'Charisma + Intimidation',
				defender: 'Composure + Resolve'
			},
			system:
				'Spend a standard action as your character bares her fangs and hisses or roars at her target, then make an opposed challenge against your target.\nIf you are successful, she is overcome by fear. She gains the Frightened Condition, which resolves when she flees more than five steps away from you. Once resolved, she will not willingly attack you or come within five steps of you for the next five minutes; however, if you come closer to your target, she is not compelled to continue fleeing. She may remain in your line of sight and you may remain in hers, but she will actively seek to avoid your attention.\nA character who has been affected by your Dread Gaze will not attack you unless she has no other option. If forced into a confined place with you where she has no means of escaping, the victim may fight you until they have an opportunity to escape.',
			duration: 'Five minutes'
		},
		Entrancement: {
			level: 3,
			cost: 'One Rouse check',
			challengePool: {
				attacker: 'Manipulation + Leadership',
				defender: 'Composure + Wits'
			},
			system:
				'To activate Entrancement, make one Rouse check, expend a standard action, and make an opposed challenge against your target. If successful, you bend your target’s emotions and capture her heart. She becomes immediately receptive to you, rationalizing any disdain or negative feelings she had for you before you used this power. While the target is not your slave and will not blindly obey your commands, the subject admires you greatly and is willing to work toward your goals, within reason.\nBoth during the effects and after this power fades, the subject will rationalize the effect of Entrancement. Those who already felt positively toward you will simply remember that you were particularly alluring; those who moderately disliked you will begrudgingly blame the brief change of heart on your incredible persuasive skills. Only an individual who actively reviled you and wished you harm will clearly see that her actions were manipulated. Others, watching the Entranced individual, may see more clearly that she is under the sway of your emotional control—but it will be difficult to convince the Entranced individual that such is true.\nEntranced characters cannot bring themselves to harm you,  physically or politically, and will generally be as nice to you asreasonably possible. Entrancement is not mind control, and characters you’ve Entranced are not obligated to follow your instructions to the letter. They will generally try to make you happy, and  they will take your side in arguments or conflicts, so long as they are not put in danger by doing so. An Entranced character will not Blood Bond herself to you or risk her life to defend you, but she will lend assistance as long as the situation isn’t dangerous.\nIf you attack someone you have Entranced, this power’s effect ends immediately. If you fail a test to use Entrancement, you may not test against the same target for five minutes.',
			duration: 'One hour'
		},
		Summon: {
			level: 4,
			cost: 'One Rouse check',
			challengePool: {
				attacker: 'Manipulation + Leadership',
				defender: 'Composure + Intelligence'
			},
			system:
				'You may target a character you have met in the last 90 days with Summon, provided they are within the same city or nearby area as you. Make one Rouse check, expend a standard action, and make an opposed challenge to summon your target to your current location. The compulsion ends at sunrise.\nA summoned target has an instinctual understanding of where they need to go and will travel to you as quickly as possible, via a reasonable route that a normal person would take.\nIf you move more than twenty steps from your current location, the target is no longer required to attend you. However, if they choose to go to you anyway, they instinctively know where they need to meet you.\nThe target knows they have been Summoned and by whom, regardless of any disguises used when they met the summoner. You may choose to communicate one of the following concepts with the summon: “help,” “attend me,” or “your presence is desired.”\nThe character may choose not to walk into an exceptionally and immediately dangerous situation that they can see. Rather, they will approach to the point where they can visually see that the situation is exceptionally dangerous. They will then contact you by other means, such as telephone, if they can.\nThe Storyteller is the final arbiter of what situations qualify as “exceptionally and immediately dangerous.” Examples of such situations include entering a burning building or an active gun battle. Situations that are not exceptionally and immediately dangerous include being summoned to a meeting with people your character fears or being summoned to stand trial for a crime.\nIf a character successfully resists your Summon, you may not attempt to Summon them again that night. If a character has seen Summoned and an additional character Summons them, the first has priority and must be resolved first.',
			duration: 'Until complete or sunrise'
		},
		'Nightmare Mantle': {
			level: 4,
			cost: 'One Rouse check',
			system:
				'Spend your simple action and make one Rouse check to activate Nightmare Mantle. You are surrounded by a palpable, frightening mantle of dread that shakes the resolve and concentration of your enemies. While Nightmare Mantle is active, characters of your choosing within three steps of you suffer the Weakened Condition. This Condition resolves when they are no longer within five steps of you.',
			duration: 'One hour'
		},
		Majesty: {
			level: 5,
			cost: 'One Rouse check',
			challengePool: {
				attacker: 'Charisma + Leadership',
				defender: 'Composure + Resolve'
			},
			system:
				'Expend a standard action and perform a Rouse check to activate Majesty. For the next hour, you appear to be the apotheosis of your character’s best nature—astonishingly beautiful, terrifyingly evil, regal beyond reproach, or otherwise—as reflects your character’s personality. The feeling of a character’s Majesty can vary, depending upon the user’s personality and current mood.\nMajesty manifests as a domineering emotional presence, amplifying your character’s nature. While this power is active, others cannot show you disrespect, and, while they may disagree with you, they must do so with utmost courtesy.\nAnyone who wishes to attack or be rude to your character must make an opposed challenge, using her Composure + Resolve vs. your Charisma + Leadership. If the aggressor fails this challenge, she cannot make another attempt against your Majesty for at least 10 minutes. She becomes trapped in the effects of your Majesty and will continue to treat you with respect and courtesy even if she leaves your locale. After 10 minutes have passed, the aggressor may again attempt to break your Majesty. This effect also applies to powers that don’t directly target the Majesty user, but target the area encompassing the Majesty user. If a character wishes to engulf a room in fire, and one of the characters in the radius has Majesty active, the aggressor must test against that Majesty to do so.\nIf you attack an individual affected by your Majesty, or if you use a power on such an individual, your Majesty immediately breaks for that person. She is rendered immune to your Majesty for the next hour and can treat you as she would normally, even attacking you, as she sees fit. This breaking of Majesty only affects the specific individual; others in the area who are affected by your Majesty are not freed simply by witnessing your aggression toward their friend.\nDuring a mass combat scene, if you use the assist defender tactic to force someone to attack you instead of their intended victim, your Majesty automatically breaks for that attacker, as you have acted aggressively toward her. If you attack a character who is aided by the Assist Defender action, your Majesty is broken for both the new target and the original target, unless you choose to forgo your attack when the other players declare their use of the assist defender tactic.',
			duration: 'One hour'
		},
		'Capricious Visage': {
			level: 5,
			cost: 'One Rouse check in addition to the cost of the enhanced power',
			system:
				'When attempting to use Dread Gaze or Entrancement, you may choose to make one additional Rouse check to activate Capricious Visage to target a number of individuals equal to the number of dots you possess of the Leadership Skill (minimum two). You must make a separate opposed challenge using the Presence test pool against each defender.',
			duration: 'As per the enhanced power'
		}
	}
};
