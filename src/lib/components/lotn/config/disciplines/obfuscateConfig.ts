import type { ObfuscateConfigSchema } from '$lib/zod/lotn/disciplines/obfuscate';

export const obfuscateConfig: ObfuscateConfigSchema = {
	name: 'Obfuscate',
	characteristics: {
		type: 'Mental',
		masqueradeThreat: {
			type: 'Minimal',
			description: 'There are very few instances where Obfuscate is a threat to the Masquerade.'
		},
		bloodResonance: 'Melancholic',
		description:
			"Obfuscate works by causing an ambient beguilement. It does not create invisibility; it merely forces the mind of observers to ignore you. This causes affected individuals to unconsciously avoid you in all ways, moving out of the way or even pausing briefly to hold a door open. A character will instinctively avoid sitting in a chair that contains an Obfuscated individual. There are limitations, however. Obfuscate will fail if the observer can not ignore your presence. Raised voices and other loud noises will cause Obfuscate to fail. If an Obfuscated individual blocks a person's intent to travel, such as by standing in a doorway, her powers will fail. Unless otherwise stated, Obfuscate affects all senses.\nUnless otherwise stated, Obfuscate powers work until they fail, the user chooses to end them, they are pierced by another supernatural power such as Auspex, or until dawn. Obfuscate works on animals the same way as on other creatures.\n\nObfuscate vs. Auspex: A vampire with the Auspex power Sense the Unseen can detect and pierce the powers of an Obfuscate character by making a Contested challenge of her Wits + Awareness vs. Wits + Stealth.\n\nObfuscate and Machines: Obfuscate works by clouding the minds of observers, and, therefore, has no effect on machines. A photographer will instinctually pause while taking snapshots to avoid capturing your image. A security guard watching a live digital feed of you will ignore your presence. However, under future scrutiny, your presence will be seen on recorded media."
	},
	powers: {
		Conceal: {
			level: 1,
			cost: 'Free',
			system:
				'By using a simple action, you may activate Conceal on a weapon or other object you physically possess. This item must be no larger than three cubic feet. Objects hidden with Conceal remain invisible as long as they are physically on your person.\nConceal cannot be used to hide living or undead beings (or parts thereof). Conceal cannot be used to hide negative space; it can hide a chair, but not a doorway.\nIf another individual is looking at an item when you Conceal it, the observer automatically sees through this use of Obfuscate. However, if the observer looks away for more than a few seconds (one turn in combat), she will lose track of the object and it will be Concealed.\nConceal can be used to maintain the invisibility of a number of objects up to your dots in the Stealth Skill. You may end an object’s Conceal at any time.\nIf you interact with a Concealed object, use it to attack someone, or otherwise draw attention to the object, it will become visible. If you place other characters in a position where they must logically acknowledge the object’s existence, the Conceal will fail and the object will become visible to all. For example, no one will notice a shotgun hanging in a back-holster, but if you reach back and obviously draw that shotgun, it will appear. People might not notice you carrying a book, but if you are struggling under the weight of a handheld anvil, it will become visible to all.',
			duration:
				'One night. Conceal also ends as soon as you no longer physically possess the item you are hiding.'
		},
		'Silence of Death': {
			level: 1,
			cost: 'Free',
			system:
				"By using a simple action, the user silences their footsteps, clothing, equipment, minor collisions, and other sounds of their person. Gunshots from the user's weapon become entirely silent; their footsteps cannot be heard.\nThis power makes the vampire undetectable if an observer could only notice them by sound, such as when on different floors of a house. Even an individual using Heightened Senses will not detect the user. Only a successful use of Sense the Unseen can detect the user by hearing.\nThis power does not eliminate sounds the user makes outside their personal space (for example, this power does not allow them to break a window silently with a thrown object). This power does not affect technological means of hearing someone unless the character has learned the Ghost in the Machine power.",
			duration: 'One scene'
		},
		Chimerstry: {
			level: 2,
			amalgam: {
				name: 'Presence',
				value: 1
			},
			cost: 'One Rouse check',
			challengePool: {
				attacker: 'Manipulation + Subterfuge',
				defender: 'Composure + Wits'
			},
			system:
				'Make one Rouse check and spend your simple action as you conjure a sudden hallucinatory distraction. Make an opposed challenge against everyone who can draw line of sight to the location of your distraction. Any characters that fail gain the Distracted Condition as they refocus their attention. You may choose to create a hallucinatory distraction centered on your own person. If you do so, in addition to the above effect, anyone who loses the opposed challenge to resist Chimerstry also gives you their Gaze and Focus.\nYour hallucinations can never be recorded or transmitted through electronics even with Ghost in the Machine active.',
			duration: 'One turn'
		},
		'Unseen Passage': {
			level: 2,
			cost: 'One Rouse check',
			system:
				'Make one Rouse check and expend a standard action to become invisible, taking with you all inanimate items on your person. Unseen Passage cannot be used to make another character invisible, even if the character is unconscious or dead. While under the effects of Unseen Passage, small sounds, fragrances, or other minimal effects of your presence will be ignored by others. If you emit overpowering odors or make noise any louder than a whisper, your Unseen Passage will immediately end.\nIf another individual is looking at you when you activate Unseen Passage, the observer automatically sees through this use of Obfuscate. You will be invisible to anyone who was not looking at you when you used Unseen Passage, and, if an observer looks away for more than a few seconds (one turn in combat), she will automatically lose track of you.',
			duration: 'Until detection'
		},
		Cache: {
			level: 2,
			prerequisite: 'Conceal',
			cost: 'One Rouse check',
			system:
				'When using Conceal to hide an object, you can now hide anything inanimate smaller than a 6 passenger van. At any point, you may make 1 additional Rouse check after using Conceal to allow the use of Conceal to persist until dawn, even if the object is no longer in your presence.',
			duration: 'Scene'
		},
		'Fata Morgana': {
			level: 3,
			amalgam: {
				name: 'Presence',
				value: 2
			},
			challengePool: {
				attacker: 'Manipulation + Subterfuge',
				defender: 'Intelligence + Awareness'
			},
			cost: 'One Rouse check',
			system:
				'Spend your standard action to create an independent hallucination that appears real to the senses. This hallucination can move either in a predetermined loop, or, with continued concentration by the creator, can change as you wish. A neon street sign can flash on and off, an illusory guard can appear to walk his patrol, etc. As long as the hallucinations are contained in your visual line of sight, and no further than 100 yards from you, you may continue to create and control your hallucinations for 30 minutes. However, any attempt to physically interact with the hallucination causes Fata Morgana to fail. Similarly, because the hallucinations are not real, they cannot interact with the environment; a hallucinatory sprinkler will not put out a real fire, nor will a chimerical gun actually cause damage.\nYour hallucinations can add to the world, but they can never subtract from it. A character could create a chimerical wall and hide behind it, but could not use this power to create a hole in the ground, as Fata Morgana cannot “subtract” the dirt. A character cannot use Fata Morgana to make items or people invisible, nor duplicate other powers of Obfuscate. However, you can use Fata Morgana to create a chimerical bucket to put over an item and thus hide it. This power cannot alter a character’s overall appearance, as Mask of a Thousand Faces does, but it can change the color of a trenchcoat from red to blue.\nIf a character suspects something is a hallucination, she mayattempt to disbelieve, using her Intelligence + Awareness vs. your Manipulation + Subterfuge. She could also use a power, such as Sense the Unseen, which the user of Fata Morgana would defend against with her Manipulation + Subterfuge. A character may only attempt to pierce the same hallucination once per five minutes. Recognizing that something is a hallucination is not the same as disbelieving the hallucination. It is possible to realize that an hallucination is false, but fail to disbelieve it. The subject’s subconscious mind simply cannot agree that this construct isn’t real.\nYour hallucinations can never be recorded or transmitted through electronics even with Ghost in the Machine active.',
			duration: 'One scene'
		},
		'Ghost in the Machine': {
			level: 3,
			cost: 'Free',
			system:
				'Once purchased this power is always active when you have another Obfuscate power active. Your powers of Obfuscate now affect artificial devices. When viewed under a live feed, your powers are unchanged. If someone watches recorded images of you while affected by any Obfuscate power, the feed is distorted to such an extent that your true visage cannot be determined in any way. In addition, automated surveillance, such as motion sensors, have a tendency to glitch when trying to detect you. If you encounter security systems that rely on visual, olfactory, or auditory detection, your Storyteller will ask for a static challenge using your Wits + Resolve vs. a difficulty based on the sophistication of the security equipment. Rudimentary systems purchased at a big box retail store are considered difficulty 2, while military grade, FIRSTLIGHT-created systems are difficulty 8.',
			duration: 'As per the power used'
		},
		'Mask of a Thousand Faces': {
			level: 3,
			cost: 'One Rouse check',
			system:
				'Spend a simple action and make a Rouse check to wrap yourself in the veil of Obfuscate, changing all sensory aspects of your appearance: visual, tactile, even audible and olfactory. You may use Mask of a Thousand Faces to appear as a generic-looking and generally forgettable person, or to specifically mimic the appearance of someone you have studied.\nMask of a Thousand Faces can be used to mimic anything that generally matches your form. A vampire in human form could look like an old man, a child, or a soccer mom, but she cannot appear to be a horse. Similarly, a vampire who uses Shape of the Beast to transform into a wolf can use this power to appear as a large dog, but not as a man.\nTo believably mimic a specific individual’s appearance, you must have at least two dots of the Subterfuge Skill. You must also study that individual from multiple angles, for at least five minutes, learning her facial expressions, how she moves, and other distinctive qualities. You might be able to mimic someone’s face after studying a photograph, but your disguise will not fool people who have previously met your target, as you do not know enough to successfully replicate that person. To believably mimic another character’s voice, you must have at least three dots of the Subterfuge Skill, and you must listen to her talk for at least five minutes as she uses a variety of words and phrases. Listening to a recording of that voice is not enough for a true replication; your disguised voice would not have the variety necessary to fool anyone who has ever spoken directly to your target.\nMask of a Thousand Faces can be used to change the appearance of your clothing and equipment in minor ways, so long as your equipment does not change significantly in size or shape. A dinner jacket could be made to appear as a windbreaker, or a ribbon around your neck could appear to be a fancy tie, but this power cannot make a dinner jacket look like a floor-length trench coat, nor could it make a pistol look like a pencil. Mask of a Thousand Faces cannot be used to make an object invisible or partially invisible. You might make a hoodie and jeans look like a suit and slacks, but you cannot reduce them to appear as if you were wearing a bikini. Mask of a Thousand Faces can only affect objects that you are holding or that are on your person.',
			duration: 'One scene'
		},
		"Vanish from the Mind's Eye": {
			level: 4,
			cost: 'Free',
			challengePool: {
				attacker: 'Wits + Stealth',
				defender: 'Wits + Awareness'
			},
			prerequisite: ['Conceal', 'Unseen Passage'],
			system:
				'If you activate Conceal or Unseen Passage while someone is watching, Vanish from the Mind’s Eye allows you to make an opposed challenge against any observers. If you succeed, your power takes hold despite their alertness, and you or the object you are targeting becomes invisible at the end of the current turn. To use Vanish From the Mind’s Eye against multiple observers, you must test against each observer.\nVanish From the Mind’s Eye can be used every turn, even if you failed to vanish in a previous turn. This is an exception to the rule that prevents a character from immediately retrying a failed Mental challenge.',
			duration: 'As per the power employed'
		},
		'Soul Mask': {
			level: 4,
			cost: 'Free',
			system:
				'Once purchased, this power is always active. Your mind is a fortress hidden behind your powers of Obfuscate. Any attempt to read your mind through Telepathy or other means automatically fails (unless you choose to relent to their use). You leave no psychic residue when touching objects, making your presence undetectable through the use of Spirit’s Touch. In addition, you may alter your aura in any way you choose. For example, you can appear to be mortal, you can hide diablerie streaks, or you can appear to be another supernatural creature if you have seen their aura with the power Scry the Soul before. To alter your aura, you must spend a simple action. Once altered, your aura remains that way unless changed again.\nIf others suspect deception in your aura, they may attempt to  pierce Soul Mask using the Auspex power Sense the Unseen. If they succeed, they may use their chosen power normally or receive the true results for their power if they have already tested and won.',
			duration: 'One night'
		},
		'Cloak the Gathering': {
			level: 5,
			cost: 'One Rouse check in addition to the cost of the power being extended',
			system:
				'When you use a standard action to activate Silence of Death, Unseen Passage, Mask of a Thousand Faces, or Vanish from the Mind’s Eye, you may choose to extend the effects of those powers to nearby allies. By using Cloak the Gathering, you may extend one of the Obfuscate powers above to a number of willing individuals, equal to your number of dots in the Stealth Skill (minimum one).\nIndividuals feel a sudden, distinct chill when Obfuscate is used in an attempt to Cloak them, but the targets have no mystical ability to know who is trying to use the power, nor to what extent. If any of your targets do not wish to be affected by Obfuscate, the power automatically fails to work on that individual. The power continues to work normally on other willing targets. If a character affected by your Obfuscate becomes unwilling at any point, the Obfuscate ends immediately for that individual.\nA character can always see through her own uses of Obfuscate, regardless of whom she is affecting. Other characters concealed by a single use of Cloak the Gathering can see each other normally. If one of your allies breaks her Obfuscate, or moves more than 20 steps away from you, the power ceases to function for her but remains active for you and all other characters covered by this use of Cloak the Gathering. If you break the Obfuscate, however, your Cloak the Gathering ceases to function for all.\nWhen this power is used to augment Vanish from the Mind’s Eye, you only need to test once per observer, as though you had simply vanished yourself. If you are successful, you Obfuscate the entire group.\nYou can use Cloak the Gathering to extend more than one Obfuscate power, but you cannot extend the same power to more than one group at a time. For example, you might make five people invisible and make five people look like various circus  erformers, but you cannot use this power multiple times to make 10 or 15 people invisible. Cloak the Gathering can only be used on sentient creatures and confers no ability to conceal animals.',
			duration: 'As per the power used'
		},
		'Phantom Hunter': {
			level: 5,
			cost: 'One Rouse check',
			system:
				'When something happens that would normally end your Unseen Passage, you can immediately make one Rouse check to activate Phantom Hunter. For the remainder of the turn, you can continue to take actions that would ordinarily break your Unseen Passage, without becoming visible. Until your next initiative, you can attack, be attacked, speak out loud, and interact with your environment without becoming visible. However, if you are still interacting with your environment (such as holding a door shut) or with another character (such as suffering from the Grappled Condition) at the start of your next initiative, you become visible. If you are no longer engaged in an action that would break your Unseen Passage at the start of your next initiative, your Unseen Passage remains active.\nPhantom Hunter can be activated at any time, even before your turn in the initiative order. For example, if you are struck before your initiative, you can activate Phantom Hunter at that moment. If you attack someone while you are under the effects of Phantom Hunter, the victim catches a brief glimpse of you. They may target you until the start of your next initiative. Other characters do not see you and cannot target you with an attack, unless they have the ability to pierce your Unseen Passage, such as by using Sense the Unseen.',
			duration: 'One turn'
		}
	}
};
