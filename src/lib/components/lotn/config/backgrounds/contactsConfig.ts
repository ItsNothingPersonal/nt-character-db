import type { ContactsConfigSchema } from '$lib/zod/lotn/background/contacts';

export const contactsConfig: ContactsConfigSchema = {
	name: 'Contacts',
	description:
		'Less of a friend and more of a professional connection, Contacts are people you can call when you need information. They are happy to tell you about things going on in their field, trust you enough to share insider knowledge, and don’t often ask for favors in return. However, their assistance is usually limited to information they can gather by making a few phone calls or things they would be doing in their daily jobs anyway. You may use your Contacts to learn about how the mortal world has been influenced within their Sphere(s), or they may call you if they notice something they think may pique your interest.\nEach purchase of this Mortal Connection represents one individual Contact, and you may purchase this Mortal Connection multiple times. Work with your Storyteller to develop details about your Contact. In a connected chronicle it costs 1 downtime to establish similar Contacts in a city outside the one you exist in.',
	level1:
		'A low-level employee—they do not have much in the way of secret information, but can help you get some general insider knowledge and early-access information.',
	level2:
		'Someone in middle management—they have access to some information that is kept from the public eye and a fair bit of sway in their field.',
	level3:
		'Someone in senior management—they have access to a great deal of private, sensitive, or secret information and usually hold an immense amount of influence.',
	advantages: {
		"At Arm's Length": {
			name: "At Arm's Length",
			level1:
				'Instead of communicating with your Contact directly, you use the Dark Web, encrypted messages, rerouted phone calls, and other measures to provide at least one layer of separation between you and your Contact. Attempts to determine your connection to this Contact require a Downtime Action and an additional static test using Intelligence + Investigation at Difficulty 5.'
		},
		Diversity: {
			name: 'Diversity',
			description:
				'Contacts, like Allies, often branch into multiple Spheres. Maybe they are active in multiple fields, or they “know people who know people” to have Contacts or Allies of their own. However they have managed to do so, your Contact has extended their influence to other Spheres beyond their primary one. Should you need a Contact in any of these areas, they are the one to call.',
			level1: 'Your Contact exists within two Spheres of Influence.',
			level2: 'Your Contact exists within three Spheres of Influence.'
		}
	},
	disadvantages: {
		Paranoid: {
			name: 'Paranoid',
			description:
				'Something is always hovering over this Contact’s shoulder, watching their every move, and they need to do everything in their power to avoid it. At least, that’s what they insist. You likely keep this person around because they are good at their job, despite the extra hassle.',
			level1:
				'Your Contact seems to have a new burner phone every day. Unless you are calling them on a landline or work number, it will take some time to figure out how to get in touch. Any Contacts use will have a delay of at least two days, as you are unable to reach this person on-demand.',
			level2:
				'Your Contact will only meet you in person, constantly in a different spot. On top of the delay in reaching them, you also must figure out where and when they want to meet and get yourself there. Any Contacts use will have at least a two-week delay in implementation.'
		}
	}
};
