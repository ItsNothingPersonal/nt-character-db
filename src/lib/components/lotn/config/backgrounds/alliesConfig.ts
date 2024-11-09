import type { AlliesConfigSchema } from '$lib/zod/lotn/background/allies';

export const alliesConfig: AlliesConfigSchema = {
	name: 'Allies',
	description:
		'You have got a knack for making friends, and you understand the value in having mortals willing to help you out. These mortals do not know you are a vampire, but they are usually willing to go out on a limb to help you out of a sticky situation or run an errand for you. However, they are only human. They have their own lives that don’t revolve around you. Normally, you may be able to reach an Ally about half the time, at Storyteller discretion; most of that time they will be willing to do the task, although it may be on their own time. Cultivating a balanced relationship with your Allies is important, as they will do more than just make some calls, and they’re far more willing to help you if you help them in return. If an Ally asks a favor of you, you would be smart to act the same way you hope they will act the next time you ask them for help. Each of your Allies may be used once in a game session.\nEach purchase of this Mortal Connection represents one individual Ally, and you may purchase this Mortal Connection multiple times. Work with your Storyteller to develop specific details about your Ally. In a connected chronicle Allies will travel with a character if compensated or if they possess either the Retainer Advantage or the Reliable Advantage at any level.',
	level1:
		'Weak mortal—mostly competent, may make serious mistakes occasionally. If they are brought into a scene, they have a pool of three in their area of specialization (Physical, Mental, or Social) and two in the other areas. They have four Health levels.',
	level2:
		'Average mortal—generally competent, may make mild mistakes. If they are brought into a scene, they have a pool of five in their area of specialization (Physical, Mental, or Social) and three in the other areas. They have five Health levels.',
	level3:
		'Gifted mortal—highly competent. Mistakes are rare, if they happen at all. If they are brought into a scene, they have a pool of seven in their area of specialization (Physical, Mental, or Social) and four in the other areas. They have six Health levels.',
	advantages: {
		"At Arm's Length": {
			name: "At Arm's Length",
			level1:
				'Instead of operating directly with your Ally, you use paid-off strangers, dead drops, rerouted phone calls, and other measures to provide at least one layer of separation between you. Attempts to try to determine your connection to this Ally require a Downtime Action and an additional static test using Intelligence + Investigation at Difficulty 5. You may not attach this Advantage to an Ally with the Retainer Advantage.'
		},
		Diversity: {
			name: 'Diversity',
			description:
				'Humans have a wide variety of interests, and not everyone fits precisely into a single Sphere of Influence. Perhaps you’ve made an Ally of someone who changed career paths, works multiple jobs, volunteers, or anything else that allows them to diversify their skill set and knowledge. Whatever the reason, your Ally has branched out with a bit of impact on other Spheres outside their main one.',
			level1: 'Your Ally exists within and can provide help in two Spheres of Influence.',
			level2: 'Your Ally exists within and can provide help in three Spheres of Influence.'
		},
		Reliable: {
			name: 'Reliable',
			description:
				'You have spent a consistent amount of time cultivating your relationship with your Allies, making them much more reliable than the standard friend. While they’re still not perfect and still expect favors in return, they are willing to put you first more often than not.',
			level1:
				'Your Ally takes half the time as a standard Ally to complete a task for you. The “normal time” is up to Storyteller discretion based on the task.',
			level2:
				'You are your Ally’s number-one client. All your requests are at the top of her “to do” list. If the Ally works for multiple PCs, she always chooses to satisfy your requests first. In addition, your Ally takes one third of the time to complete a task as a standard Ally would take to complete a task for you. The “normal time” is up to Storyteller discretion based on the task.'
		},
		Retainer: {
			name: 'Retainer',
			level2:
				'Your Ally has become very special to you. You have revealed your supernatural nature to them and even let them feed off your Blood. Your Ally is now a ghoul fully Blood Bound to you. They will no longer request favors in return for their services. They will also perform tasks within the supernatural world and do not count as a witness for things that would normally be considered a breach of the Masquerade A Retainer gains two level-one Discipline powers, chosen from your in-clan Disciplines. A Retainer can never gain more than these two powers. (For more information on Ghouls, see page 116). If another character has purchased this NPC as an Ally, they permanently lose access to this NPC and must find and choose a replacement.'
		}
	},
	disadvantages: {
		Flaky: {
			name: 'Flaky',
			description:
				'You have an Ally who may be great at what they do, but they never seem to get the job done on time or for the originally-negotiated price. A Flaky Ally may never be Reliable, and vice versa.',
			level1: 'Your Ally takes twice as long as a standard Ally to complete their task.',
			level2:
				'On top of taking twice as long to accomplish a task, your Ally always demands payment for their services. At Storyteller discretion, they may partially accomplish the task, then come back to negotiate a new, increased payment.'
		},
		'Conspiracy Theorist': {
			name: 'Conspiracy Theorist',
			level1:
				'Your Ally is always looking for the next theory, and is ready to believe the unbelievable. They may inform you (and whoever will listen) that birds are not real, Bigfoot and the Loch Ness Monster exist, the moon landing was faked, or any combination of oddity. The theories that supernatural creatures like vampires could exist right under our noses are concerning. You need to take extra care to be sure this Ally is never near a Masquerade breach, as they are always keeping a lookout for anything suspicious that proves their theories to everyone they’ve told.'
		}
	}
};
