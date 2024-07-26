import type { AttributeName } from '$lib/zod/lotn/enums/attributeName';
import type { PredatorType } from '$lib/zod/lotn/enums/predatorType';
import { type SkillName } from '$lib/zod/lotn/enums/skillName';

export type PredatorSkillMap = {
	[K in PredatorType]: {
		description: string;
		huntingPool: [AttributeName, SkillName] | { type: 'Special'; description: string };
	};
};

export const predatorTypeConfig: PredatorSkillMap = {
	Alleycat: {
		description:
			'An opportunistic feeder, you ambush and exploit the weak and unsuspecting. You stalk, threaten, overpower, and leave your victims dazed or dead. A subtle beating or stealing their wallet leaves them thinking the encounter was a robbery or a mugging.',
		huntingPool: ['Wits', 'Streetwise']
	},
	Bagger: {
		description:
			'You prefer your blood cold, bland, and without much taste, probably how you enjoyed your coffee when you could still drink it. You procure bags of blood off the black market, such as entrepreneurial ambulance drivers, and, if you cannot buy it, you will steal it from the hospital if your key card to the hospital still functions.\nSpecial: You may only choose this Predator Type if your Blood Potency is 2 or lower. If your Blood Potency increases above 2 you must choose a new Predator Type.',
		huntingPool: ['Intelligence', 'Larceny']
	},
	Cleaver: {
		description:
			'You feed from a family (perhaps even your own relatives) and their closest friends. These may be mortals you knew before you were Embraced, or you may have developed these relationships after your Embrace. You go to great lengths to keep your undead condition from these mortals, maintaining a friendly and ethical relationship with them. Many other vampires frown on this behavior, considering it an unnecessary risk to the Masquerade.',
		huntingPool: ['Manipulation', 'Subterfuge']
	},
	Consentualist: {
		description:
			'You have chosen to always feed from those who consent to share their blood with you. This requires you to walk a fine line when it comes to upholding the Masquerade. Lying about why you only collect for your charity blood drive at night will not work forever. If you find the right people, they might believe you are some “gothic type” who takes things too far and is a wannabe vampire. Maybe you have said “fuck it” and just told your sources you need to drink blood to survive.',
		huntingPool: ['Manipulation', 'Persuasion']
	},
	Extortionist: {
		description:
			'Everyone has something they want, and everyone has a price they are willing to pay for it. You want blood, and you do not really care whom you get it from. You insert yourself into other people’s lives by promising them a deal they cannot refuse. You know a guy, you have a way to get your hands on things. . . Whatever lies they need to hear. Once you have them on the hook, you can turn that “front of house deal” into a “back alley bargain.” And that is when you get what you want: your payment in blood.',
		huntingPool: ['Manipulation', 'Intimidation']
	},
	Farmer: {
		description:
			'You never feed from mortals, or at least you will never admit to it. You cannot stand the idea of drinking another mortal’s blood. This is doubly confusing if you refused to eat meat as a mortal and now you are forced to consume the blood of animals. Whatever the reason, your survival as a vampire is not more important than your lofty morality. That is why you have made painstaking efforts to cultivate a literal herd of animals to feed from. Maybe you own a cattle ranch, a chain of pet stores, or work at a zoo. You have easy access to animals, large and small.\nSpecial: You may only choose this Predator Type if your Blood Potency is 2 or lower. If your Blood Potency increases above 2, you must choose a new Predator Type.',
		huntingPool: ['Composure', 'Animal Ken']
	},
	Ferryman: {
		description:
			'You live in a dark and scary world. FIRSTLIGHT is everywhere. The Sheriff of the city is more than a bit unhinged. It is probably better if you send someone else out to get your food. Depending on your preferences, that might mean a lot of work for your delivery guy. If you can drink bagged blood, the task is pretty simple. Bringing home an unsuspecting meal, then getting them back out again before the Kiss wears off…That’s more difficult. Good thing you trained your ghoul well. Better than the previous one at least.',
		huntingPool: {
			type: 'Special',
			description:
				'Your ghoul finds you blood in the best way possible, according to her own skills and taking into account any feeding limitations. Your Storyteller handles your feeding challenges in secret. If you lose your retainer, you are forced to hunt on your own or quickly train a new delivery driver.'
		}
	},
	Graverobber: {
		description:
			'You have likely always had a thing for death, which may have had something to do with your grandfather owning a mortuary. Maybe you were surrounded by death because of your own profession as a doctor or gravedigger. You prefer to feed on fresh blood, usually that of mourners at a gravesite or sad visitors identifying the corpse of a loved one at the coroner’s. You would love to be able to taste fresh blood on a regular basis, but it is just too easy for you to get aftermarket vitae. When you can’t feed on the living, you’ve got a place back home where you can preserve fresh bodies.',
		huntingPool: ['Wits', 'Medicine']
	},
	Hitcher: {
		description:
			'Almost a billion and a half people traveled at some point last year. That is basically 1 out of every 5 people in the world. Almost 70 million vehicles break down every year. That is 1 in every 3 drivers. While everyone else in the city is trying to find their feeding niche, the world is your oyster. You almost never have to worry about being recognized because you try not to feed from locals. You stick to rest stops, late night roadside diners, and solo travelers, the travelers most likely never to be found if they go missing.',
		huntingPool: ['Wits', 'Etiquette']
	},
	Osiris: {
		description:
			'You have developed a group of fans who worship the ground you walk on. This fanbase can either be the followers of your Mask’s profession or a flock of worshipers you have cultivated. While they do not know of your true supernatural nature, they still treat you like the proverbial “god amongst men.” They will provide for you, lest you forget about them.',
		huntingPool: ['Manipulation', 'Subterfuge']
	},
	Sandman: {
		description:
			'You prefer to feed from those that are asleep, perhaps out of shame, caution, or some other reason. You have gone to great lengths to be able to access sleeping mortals. You have a number of Masks that allow you to move among mortals unnoticed, despite the late hour: late night security guard, hotel attendant, even one as the graveyard shift nurse.',
		huntingPool: ['Dexterity', 'Stealth']
	},
	'Scene Queen': {
		description:
			'You belong to a subculture or close-knit community. Likely you were part of this group before your Embrace and are well-established, adored and respected with your peers. Some of them might have figured out what you are now, but your reputation is unassailable at this point. Access to your fandom allows you easy feeding opportunities.',
		huntingPool: ['Charisma', 'Etiquette']
	},
	Siren: {
		description:
			'Either through the use of supernatural charisma or personal qualities alone, you charm, beguile, and ultimately seduce your victims. Once you have privacy you feed on them, the Kiss masked as part of the intimate encounter. And while you rarely cause outright physical harm to your prey, you do have a tendency to leave a string of broken hearts in your wake.',
		huntingPool: ['Charisma', 'Subterfuge']
	}
};
