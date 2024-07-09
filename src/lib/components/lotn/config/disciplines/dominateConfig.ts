import type { DominateConfigSchema } from '$lib/zod/lotn/disciplines/dominate';

export const dominateConfig: DominateConfigSchema = {
	name: 'Dominate',
	characteristics: {
		type: 'Social',
		masqueradeThreat: {
			type: 'Minimal',
			description:
				'While it might be hard to explain why someone did something exactly after another person asked them to, there are no visual cues to the use of Dominate.'
		},
		bloodResonance: 'Phlegmatic',
		description:
			'All Dominate powers have the following limitations:\n▷ Gaze and Focus: Unless otherwise stated, to use any Dominate power on a target, that individual must have her gaze or her attention focused on the Dominate user. For more information on Gaze and Focus, see page 197.\n▷ Dominate cannot be used to force a target to do something physically self-destructive. Commands akin to “walk in front of a bus,” “jump off a building,” or “shoot yourself in the foot” automatically fail. Commands which direct a character into a dangerous situation break when the character suffers damage for following the compulsion. Characters may not relent to attacks that would pull them out of a Dominate command.\n▷ However, Dominate does not provide a supernatural ability to know when something is dangerous. If the character does not know a cliff is ahead and cannot sense it, they will walk until they realize the danger—which may very well be too late.\n▷ See Terminal Decree on page 229 for how that power modifies this base rule.\nUnless specifically stated, Dominate doesn’t impart any special ability to complete extraordinary commands. If a target is ordered to do something that she cannot accomplish, the target will make her best effort to obey the command but may not succeed. For example, if you use Compel to give the order to “sleep,” your target will lie down and try, but very few people can fall asleep in six seconds (two turns).\n▷ Dominate cannot be used to compel someone to speak the truth or refrain from lying. Truth and lies are too subjective to be isolated by any clever phrase, loophole, or command.\n▷ Most Dominate powers may not be used during combat.\nWhether a Dominate power may be used in combat is defined within the write-up for the power.\n▷ Dominate cannot be used to force a supernatural being to turn off powers or prevent them from using powers.\n▷ The use of Dominate threatens free will and Humanity. Using it on mortals may incur Stains (see page 138).'
	},
	powers: {
		'Cloud Memory': {
			level: 1,
			challengePool: {
				attacker: 'Charisma + Persuasion',
				defender: 'Wits + Resolve'
			},
			cost: 'One Rouse check',
			system:
				"Spend a simple action targeting a character in your line of sight, and speak aloud the phrase “Forget!” You automatically succeed against a mortal. Against supernatural targets, you must succeed in an opposed challenge. If successful, your target's memories for the last five minutes, and the next five minutes after the use of this power become cloudy and incoherent. Until she is pressured to speak about the missing time, she is not even aware she has forgotten anything. If she is forced to try, she is still unable to recall details or descriptions, but she does become aware she is missing time.\nCloud Memory does not require Gaze and Focus. It may be used during combat.",
			duration: 'Indefinitely'
		},
		Compel: {
			level: 1,
			challengePool: {
				attacker: 'Charisma + Intimidation',
				defender: 'Intelligence + Resolve'
			},
			cost: 'Free',
			system:
				'To Compel an individual, expend a standard action and speak a simple order, up to three words, for your target to immediately fulfill. You may also gesture as part of your order for additional context. If you succeed in an opposed challenge, your target must obey you. The subject will spend her next two turns attempting to carry out your order.\nYour command must be clear and straightforward: run, fall, yawn, jump, laugh, stop, go, scream, or follow are good examples. The target of Compel will attempt to take context into account. If you point at a door and Compel your victim to “Leave!” she will attempt to leave via the door you indicated (as opposed to using a different door or jumping out of a window). Compel may be part of a sentence in order to conceal the power’s use, such as, “I’m afraid I must ask you to leave this house at once!”\nIf a use of Compel is confusing or ambiguous, the subject may respond with less accuracy or perform her task poorly, as she struggles to understand what’s been asked of her. Compel cannot rob your target of the ability to defend herself. The Storyteller is the final arbiter of whether or not a Compel is being appropriately followed.\nCompel may be used in combat.',
			duration: 'Two turns'
		},
		Dementation: {
			level: 2,
			amalgam: {
				name: 'Obfuscate',
				value: 2
			},
			challengePool: {
				attacker: 'Manipulation + Insight',
				defender: 'Intelligence + Composure'
			},
			cost: 'One Rouse check',
			system:
				'While engaging in a conversation with one or more people, make a Rouse check and use your simple action to activate Dementation. For the next 10 minutes, you may spend a standard action and target any character who can reasonably hear your voice. A successful challenge causes the target to lose one point of Willpower.\nIf a character runs out of Willpower and gains the Impaired Condition (see page 111) from the use of this power, an additional effect occurs. Mortals who become Impaired by this power experience a psychotic break depending on the Resonance of their blood (see page 130). For example, a mortal with choleric blood would become enraged and violent. Vampires who become Impaired by this power must immediately succumb to a Compulsion chosen by the user of Dementation until they resolve the Impaired Condition.\nUnlike other Dominate powers, Dementation does not require Gaze and Focus. It may not be used in combat.',
			duration: 'Ten minutes'
		},
		Mesmerize: {
			level: 2,
			challengePool: {
				attacker: 'Manipulation + Persuasion',
				defender: 'Intelligence + Resolve'
			},
			cost: 'One Rouse check',
			system:
				'With Mesmerize, you can issue complex commands to your targets. To Mesmerize your target, make one Rouse check, speak a simple set of instructions aloud, and perform a contested challenge. If successful, the target will immediately attempt to carry out your instructions until the activity is reasonably complete or for one hour, whichever comes first.\nThe Mesmerism user may dictate anything from simple directives (“hand me your car keys”) to complex ones (“take detailed notes at the Brujah clan meeting, and bring those notes to me afterwards”). Mesmerism cannot rob your target of the ability to defend herself. A character forced to count loudly to one million can still dodge, run away, or even attack, so long as she keeps counting. However, she probably could not effectively hide (or use her Obfuscate to vanish) while calling out numbers.\nMesmerism cannot string together multiple unrelated actions. ou cannot use Mesmerism to force another character to perform a list of tasks: “Tell me where your ghoul lives, and give me your car keys, then go punch that Brujah, and, finally, sit in the corner for the rest of the hour.” You may imply more than one action in a single command, such as, “Give me the money in your wallet.” In this case, the recipient will unbutton their back pocket, remove their wallet, extract any currency they have and hand it to you.\nMesmerism cannot be used to prevent a character from using a Discipline, although it can be used to prevent a victim from acting in certain ways. For example, you cannot tell someone not to use Conceal, but you can order them to show you all of the weapons on their person. In all cases, your Storyteller is the final arbiter of what is or is not appropriate for a Mesmerism.\nThis power may not be used during combat, but, if initiated prior to the start of combat, its duration continues into combat. For example, when a Mesmerism given outside of combat to “murder the Prince when he enters the room” activates and causes the target to begin attacking the Prince, the compulsion continues until the task is completed or another effect would cause the attack to stop. When Mesmerism commands that carry into combat cannot rob your target of the ability to defend herself.\nAn individual can only have one active Mesmerism from a given Dominate user. If you attempt to implant a new suggestionin the mind of a victim currently under a previous Mesmerism from you, the new application of this power erases your earlier instruction. A victim may have multiple Mesmerisms lurking in her psyche at the same time, provided each Mesmerism was implanted by a different individual.\nIf two mesmerists implant conflicting orders in a target, the victim will follow the newer Mesmerism first. The victim will perform those tasks until completed (or for an hour). Once that Mesmerism has ended, the subject will attempt to fulfill the older Mesmerism. Note that the older Mesmerism’s duration begins at the point it was triggered, so the victim may have only a few minutes of duration left in such a situation.\nIf you fail a test to use Mesmerism, you may not test against the same target for five minutes.',
			duration: 'Until the order is carried out or one hour'
		},
		"Domitor's Favor": {
			level: 2,
			cost: 'One Rouse check',
			system:
				'Activate this power by making one Rouse check while in the presence of one of your thralls. The target thrall must be able to see you. Once activated, for the next month, any Defiance checks the thrall makes uses their Resolve + Intelligence vs Bond Strength plus three. In addition, if a thrall fails one or more Defiance checks during the duration of this power, their Blood Bond will not weaken that month. The use of this power cannot in any way circumvent the maximum number of vampire thralls a domitor may have based on their Blood Potency (see The Blood Bond, page 113).',
			duration: 'One month'
		},
		'Forgetful Mind': {
			level: 3,
			challengePool: {
				attacker: 'Manipulation + Subterfuge',
				defender: 'Composure + Resolve'
			},
			cost: 'One Rouse check per 10 minutes of memories altered',
			system:
				'To activate Forgetful Mind, expend a standard action, make one Rouse check and make an opposed challenge. If you are successful, your target enters a trance for a small amount of time while you offer details to alter, erase, or completely overwrite the target’s memory. If the target is threatened in any way, she will snap out of this trance, ending the application of Forgetful Mind. For this reason, it is not possible to use Forgetful Mind in a combat situation. A successful use of Forgetful Mind allows you to erase or alter up to 10 minutes of memory. A more substantial period of time may be altered (in 10-minute increments) with repeated applications (requiring multiple Rouse checks) of this power.\nIt is a relatively simple matter to rifle through a victim’s psyche and erase swaths of memory, but, unless you offer something in its place, the deletion will leave a blank spot in the victim’s recollection. You can instead create false memories, describing a plausible story for the victim’s subconscious to absorb.\nYou may tell the target to incorporate new information into (or remove details from) her original memory. The target will do so seamlessly, justifying the information within the context of her overall remembrance. Unless someone else points out major contradictions in the memory, the target will rationalize away any discrepancies.\nForgetful Mind does not grant the user any telepathic ability to “see” an event in the target’s mind. The events are remembered from the subject’s point of view and are verbally described to the best of the subject’s ability. If the subject does not know a detail about the event, then she cannot describe that detail under Forgetful Mind.\nA character can also use Forgetful Mind to detect false or missing memories. When you use Forgetful Mind on a target, you must log your action with the subject’s Storyteller. Include your character’s Dominate test pool and the number of Dominate powers possessed at the time you performed the Forgetful Mind.\nRestoring lost or altered memories is impossible. A vampire cannot use Forgetful Mind to alter or erase her own memories.\nThis power may not be used in combat. If you fail a test to use Forgetful Mind you may not test against the same target for five minutes.',
			duration: 'Indefinitely'
		},
		'Submerged Directive': {
			level: 3,
			cost: 'Free',
			prerequisite: ['Cloud Memory', 'Compel', 'Mesmerize'],
			system:
				'Any time you utilize the powers of Cloud Memory, Compel, or Mesmerism, you may allow your commands to remain dormant until a specific stimulus occurs. This trigger can be almost anything, such as a date or time, encountering a specific person, or hearing a certain phrase.\nFor example, you might direct a target to drink mortal blood if she hears the word “vagrant.” If your target hears the word, and there is a source of mortal blood nearby, she will attempt to do so.\nThese dormant effects remain until triggered and should be logged with your Storyteller. You may only have one active Submerged Directive in effect on a single character at a time. A character may have multiple Submerged Directives lying dormant from multiple different characters. If the dormant effect is triggered during combat, Submerged Directive works normally.',
			duration: 'Until triggered'
		},
		Rationalize: {
			level: 4,
			cost: 'Free',
			system:
				'Your targets do not realize they’ve been Dominated by you. They will only recall your commands if reminded by someone else, and, even then, they will proudly proclaim and believe their actions to be their own. Your victims must rationalize away any strange behavior after only the briefest moments of confusion. If a power Rationalize would modify is triggered during combat (such as a Mesmerism or Conditioning), Rationalize works normally.',
			duration: 'Indefinitely'
		},
		Conditioning: {
			level: 4,
			challengePool: {
				attacker: 'Manipulation + Persuasion',
				defender: 'Intelligence + Resolve'
			},
			prerequisite: { main: 'Submerged Directive', or: ['Compel', 'Mesmerize'] },
			cost: 'Two Rouse checks',
			system:
				'Through sustained mental exertion, you can implant a semi-permanent Mesmerism (as per the above Dominate power) deep in your subject’s mind. Conditioning a target takes three hours of diligent and uninterrupted effort, during which time your subject must be conscious and aware. The target may be restrained, but she cannot be unconscious, drugged, or otherwise unaware. Once your character has spent this time, make an opposed challenge against the subject. If successful, you implant a Mesmerism that can be triggered repeatedly.\nMesmerisms implanted through Conditioning must have a clearly defined trigger. A Conditioned character acts normally, with no alterations of her standard behavior, until such time as her Conditioning is triggered. Once activated, the target must fulfill the behaviors demanded by the Conditioning or attempt to do so for one hour, whichever comes first. Just like Compel or Mesmerism, a Conditioning compulsion will automatically break if the target realizes that performing these actions will lead to direct harm. When this happens, the current compulsion to act will cease, but the Conditioning itself will remain and can be triggered again in the future.\nFor example, you might Condition a target to drink mortal blood every time she hears the word “vagrant.” If your target hears the word, and there is a source of mortal blood nearby, she will always attempt to do so. This Conditioning may seem foreign, unnecessary and even uncomfortable to fulfill unless the vampire user also has Rationalize power. The initial compulsion will end as soon as she finishes drinking, but could start again if someone else says the word. If the Conditioned individual is stranded in the middle of a desert, with no source of blood available when she hears the word, she will spend an hour looking for a source of mortal blood. Thereafter, the compulsion will fade (until the next time she hears the word).\nA successful compulsion implanted with Conditioning is permanent until broken by the subject. It cannot be removed or overwritten. A mortal who goes one year without having her Conditioning triggered may make an contested challenge. If successful, the target breaks the Conditioning. If she fails, the target must wait another year before she can attempt to break the Conditioning a second time, and another year after that before she can try a third time.\nSupernatural characters may attempt to break their Conditioning if they avoid having the compulsion triggered for three months. If the victim fails that opposed challenge, then she must wait another three months before making another attempt.\nA character’s Conditioning cannot be triggered more than once per hour. The compulsion placed by Conditioning does not count towards a character’s Mesmerism limit; a target may be the victim of your Mesmerism and Conditioning powers at the same time. However, you may implant one Conditioning compulsion at a time per person. A subject may have multiple Conditioning compulsions, provided each one comes from a different user of Dominate.\nIf the dormant effect is triggered during combat, Conditioning works normally.',
			duration: 'Until broken'
		},
		'Mass Manipulation': {
			level: 5,
			cost: 'One Rouse check in addition to the cost of the power being augmented.',
			system:
				'Your Dominate powers can affect a number of additional targets equal to your dots of the Intimidation Skill (minimum 2). You must have the Gaze and Focus of your intended targets. Mass Manipulation cannot be used with Possession. It may be used to augment Compel during combat.',
			duration: 'Passive'
		},
		'Terminal Decree': {
			level: 5,
			cost: 'One Rouse check in addition to the cost of the power being augmented.',
			prerequisite: ['Compel', 'Mesmerize', 'Conditioning'],
			system:
				'You may now direct targets into dangerous situations with your Dominate powers. Your Dominate commands no longer automatically end when your target takes damage from following them. (This is an exception to the base rule on page 225). For example, a character Mesmerized to stake and kidnap their gang leader for the Camarilla would continue to try, even if their gang was beating them into torpor.\nHowever, you may not order the target to damage themselves. For example, you cannot order them to jump off a building, step into the sun, put their hand in a fire, allow themselves to be struck without defending themselves, walk in front of a bus, stake their heart, or similar actions. With these principles in mind, the Storyteller is the final arbiter of what uses of Terminal Decree are appropriate.',
			duration: 'As the duration of the power being enhanced'
		}
	}
};
