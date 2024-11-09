import type { FameConfigSchema } from '$lib/zod/lotn/background/fame';

export const fameConfig: FameConfigSchema = {
	name: 'Fame',
	description:
		'You have done something to get your name out there. Maybe you are in a band, a radio host, a social media influencer, an author, or any other “celebrity” role. Upon choosing this Mortal Connection, establish exactly how you are famous with your Storyteller and choose a Sphere of Influence in which you have made your name. Characters outside that Sphere may still know you, but recognition is more likely within that Sphere. When encountering someone who knows and likes you, they are more likely to do you a favor or help you out in a pinch, even if they are a complete stranger; you gain a +1 to mundane Social challenges per dot of Fame you possess. Being famous does have its drawbacks though. You are also far more recognizable and memorable when you go places, and not everyone may appreciate you. If you have dots in Mask (see below), your Fame may be associated with either yourself or with your Mask.',
	level1:
		'You are getting there. A handful of people who follow your field will recognize you, and your neighborhood is so proud to have you as a resident; they all know who you are.',
	level2:
		'You are on the edge of legitimate Fame. You have a large local in-genre following. Your face may be on posters, and your name may come up in conversations around your town.',
	level3:
		'You have made it big. Everyone in the city who’s involved in your selected Sphere knows your name; even outside of your Sphere, a handful who’ve never seen your work might recognize you and want to get on your good side.',
	advantages: {
		'Fan Club': {
			name: 'Fan Club',
			level2:
				'You have earned yourself a dedicated enough group of followers to have a Fan Club. These people will bend over backwards to help you should you encounter them. Once per session, if you run into a Fan Club member, you can ask them for a favor they can reasonably accomplish within the game session, such as “Guard that door and tell me if someone’s coming” or “Deliver this message to [address].” You’re smart enough to know not to exchange contact information with a raving fan, so this Advantage can only be used if a member is encountered during a game session. There is no guarantee of an encounter, but, the more your Fame rises, the farther your Fan Club will reach. Your Storyteller is the final arbiter of when you encounter random fans.'
		},
		'Star Power': {
			name: 'Star Power',
			description:
				'Additional Fame extension for wider-spread games. You may only purchase this Advantage if you already have Fame 3 and your Storyteller has chosen to allow this Advantage in their chronicle.',
			level1:
				'Your Fame has spread past the city; your whole state or region is likely to recognize you.',
			level2: 'You are as famous as can be; your name and face are globally recognized.'
		}
	},
	disadvantages: {
		Jealousy: {
			name: 'Jealousy',
			description:
				'With Fame comes people envious of your success, or people you have stepped on on your way to the top. They want to see you fail, and they certainly won’t help you.',
			level1:
				'A wide group of people dislike you. Choose one Sphere of Influence that dislikes you. You may not buy Contacts or Allies within that Sphere.',
			level2:
				'You have done some despicable things to get where you are. In addition to the Level 1 Disadvantage, anyone in a Sphere of Influence that you do not have a Contact or Ally in hates you and reacts negatively to the mention of your name. If anyone has a Contact or Sphere in the sector you describe, their Contacts or Allies in that Sphere will act against you for free and are always considered available.'
		},
		Paparazzi: {
			name: 'Paparazzi',
			level2:
				'Sometimes the fan clubs go a bit too far. You have managed to pick up some folks who refuse to leave you alone. You are constantly being tailed by people who want to know your every move and who are taking pictures for magazines. This becomes problematic when you are trying to do anything under the radar. If you are not in disguise, you are bound to run into some camera flashes almost anywhere you go. Your Storyteller determines what complications arise because of this Disadvantage.'
		}
	}
};
