import type { PredatorTypeConfigMap } from '$lib/zod/lotn/types/predatorTypeConfigSchema';

export const predatorTypeConfig: PredatorTypeConfigMap = {
	Alleycat: {
		description:
			'An opportunistic feeder, you ambush and exploit the weak and unsuspecting. You stalk, threaten, overpower, and leave your victims dazed or dead. A subtle beating or stealing their wallet leaves them thinking the encounter was a robbery or a mugging.',
		huntingPool: ['Wits', 'Streetwise'],
		changeDescription:
			'▷ Lose one dot of Humanity.\n▷ Gain two dots of the Contacts Background, which represent other criminals operating in your feeding territory. These Contacts must be assigned to the Underworld or Street Sphere of Influence.\n▷ Gain one dot of the Resources Background and one dot of the Cash Money Advantage.\n▷ Hunting Pool: Wits + Streetwise. Knowing how and when to threaten, stalk and overpower a particular prey is far more important than physical strength or a commanding personality.',
		changes: [
			{ style: 'remove', kind: 'Humanity', value: 1 },
			{
				style: 'add',
				kind: 'Background',
				name: 'Contacts',
				value: 2,
				sphereOfInfluence: ['Underworld', 'Street'],
				multiPurchase: true
			},
			{
				style: 'add',
				kind: 'Background',
				name: 'Resources',
				value: 1,
				associatedAdvantage: { name: 'Cash Money', value: 1 }
			}
		]
	},
	Bagger: {
		description:
			'You prefer your blood cold, bland, and without much taste, probably how you enjoyed your coffee when you could still drink it. You procure bags of blood off the black market, such as entrepreneurial ambulance drivers, and, if you cannot buy it, you will steal it from the hospital if your key card to the hospital still functions.\nSpecial: You may only choose this Predator Type if your Blood Potency is 2 or lower. If your Blood Potency increases above 2 you must choose a new Predator Type.',
		huntingPool: ['Intelligence', 'Larceny'],
		changeDescription:
			'▷ Gain the Feeding Merit: Iron Gullet (•••).\n▷ Gain two dots of the Contacts Background that represent your black-market sellers of bagged blood. These Background points must be in the Underworld Sphere of Influence.\n▷ Gain the Enemy (••) Flaw: You have stolen from the wrong blood supply or crossed into the wrong turf. Even if you rid yourself of this enemy, a new one will emerge within one month or two games, whichever is shorter, unless you remove this Flaw with XP. Your Storyteller will provide the details of this enemy.\n▷ Hunting Pool: Intelligence + Larceny. When your stash runs out and no one’s selling, the only thing you can do is steal your blood. Generally you know who’s holding out on you; it’s just a matter of whether you can break in and get what you need before they catch you.',
		changes: [
			{ style: 'add', kind: 'Merit', name: 'Iron Gullet', value: 3 },
			{
				style: 'add',
				kind: 'Background',
				name: 'Contacts',
				value: 2,
				sphereOfInfluence: ['Underworld'],
				multiPurchase: true
			},
			{ style: 'add', kind: 'Flaw', name: 'Enemy', value: 2 }
		],
		maxBloodPotency: 2
	},
	Cleaver: {
		description:
			'You feed from a family (perhaps even your own relatives) and their closest friends. These may be mortals you knew before you were Embraced, or you may have developed these relationships after your Embrace. You go to great lengths to keep your undead condition from these mortals, maintaining a friendly and ethical relationship with them. Many other vampires frown on this behavior, considering it an unnecessary risk to the Masquerade.',
		huntingPool: ['Manipulation', 'Subterfuge'],
		changeDescription:
			'▷ Gain the Dark Secret: Cleaver (•) Flaw.\n▷ Gain two dots of the Herd Background.\n▷ Gain a two-dot Mask.\n▷ Hunting Pool: Manipulation + Subterfuge. Your family and their friends know you have a rough work schedule that makes you unavailable during the day. When possible, you attend night time parties or make it home in time to kiss your loved ones goodnight, only to disappear before dawn.',
		changes: [
			{ style: 'add', kind: 'Flaw', name: 'Dark Secret', value: 1, description: 'Cleaver' },
			{ style: 'add', kind: 'Background', name: 'Herd', value: 2 },
			{ style: 'add', kind: 'Background', name: 'Mask', value: 2, multiPurchase: false }
		]
	},
	Consentualist: {
		description:
			'You have chosen to always feed from those who consent to share their blood with you. This requires you to walk a fine line when it comes to upholding the Masquerade. Lying about why you only collect for your charity blood drive at night will not work forever. If you find the right people, they might believe you are some “gothic type” who takes things too far and is a wannabe vampire. Maybe you have said “fuck it” and just told your sources you need to drink blood to survive.',
		huntingPool: ['Manipulation', 'Persuasion'],
		changeDescription:
			'▷ Gain one dot of Humanity.\n▷ Gain three dots of the Herd Background and one dot in any Herd Advantage.\n▷ Gain the Dark Secret: Masquerade Breacher (•) Flaw.\n▷ Gain the Prey Exclusion (non-consenting) (•) Feeding Flaw.\n▷ Hunting Pool: Manipulation + Persuasion. You have a few go-to friends who keep your secret or don’t ask too many questions about the lies you are obviously telling them. When you cannot rely on these friends, you must rely on your charm and persuasion.',
		changes: [
			{ style: 'add', kind: 'Humanity', value: 1 },
			{
				style: 'add',
				kind: 'Background',
				name: 'Herd',
				value: 3,
				associatedAdvantage: { name: undefined, value: 1 }
			},
			{
				style: 'add',
				kind: 'Flaw',
				name: 'Dark Secret',
				value: 1,
				description: 'Masquerade Breacher'
			},
			{
				style: 'add',
				kind: 'Flaw',
				name: 'Prey Exclusion',
				value: 1,
				description: 'non-consenting'
			}
		]
	},
	Extortionist: {
		description:
			'Everyone has something they want, and everyone has a price they are willing to pay for it. You want blood, and you do not really care whom you get it from. You insert yourself into other people’s lives by promising them a deal they cannot refuse. You know a guy, you have a way to get your hands on things. . . Whatever lies they need to hear. Once you have them on the hook, you can turn that “front of house deal” into a “back alley bargain.” And that is when you get what you want: your payment in blood.',
		huntingPool: ['Manipulation', 'Intimidation'],
		changeDescription:
			'▷ Gain one dot of the Resources Background and 1 dot in any Resources Advantage.\n▷ Gain three dots to spend on the Contacts Background or the Allies Background. You may choose any Spheres of Influence for these dots.\n▷ Gain the Enemy (••) Flaw: You may choose any Sphere of Influence for this enemy, which represents a victim who escaped you and now wants revenge.\n▷ Hunting Pool: Manipulation + Intimidation. First you set the trap by giving them a good deal, usually on something illegal. Then you provide it, but you jack up your price. They cannot turn you down because you could turn them in to the cops. Now you have someone you can lean on whenever you need to feed.',
		changes: [
			{
				style: 'add',
				kind: 'Background',
				name: 'Resources',
				value: 1,
				associatedAdvantage: { name: undefined, value: 1 }
			},
			{
				style: 'add',
				kind: 'Background',
				name: ['Contacts', 'Allies'],
				value: 3,
				multiPurchase: true
			},
			{ style: 'add', kind: 'Flaw', name: 'Enemy', value: 2 }
		]
	},
	Farmer: {
		description:
			'You never feed from mortals, or at least you will never admit to it. You cannot stand the idea of drinking another mortal’s blood. This is doubly confusing if you refused to eat meat as a mortal and now you are forced to consume the blood of animals. Whatever the reason, your survival as a vampire is not more important than your lofty morality. That is why you have made painstaking efforts to cultivate a literal herd of animals to feed from. Maybe you own a cattle ranch, a chain of pet stores, or work at a zoo. You have easy access to animals, large and small.\nSpecial: You may only choose this Predator Type if your Blood Potency is 2 or lower. If your Blood Potency increases above 2, you must choose a new Predator Type.',
		huntingPool: ['Composure', 'Animal Ken'],
		changeDescription:
			'▷ Gain two dots in the Haven Background and two dots of the Haven Advantage: Zoo.\n▷ Gain one dot of Humanity.\n▷ Gain the Farmer (••) Feeding Flaw.\n▷ Hunting Pool: Composure + Animal Ken. Hunting for you can be tedious. You cannot drain your entire stock dry and leave a bunch of dead animals lying around. Instead you feed in small amounts from many animals. The big animals (if you have access to them) still get a little skittish, so you try not to overstress them if you can.',
		changes: [
			{
				style: 'add',
				kind: 'Background',
				name: 'Haven',
				value: 2,
				associatedAdvantage: { name: 'Zoo', value: 2 }
			},
			{ style: 'add', kind: 'Humanity', value: 1 },
			{ style: 'add', kind: 'Flaw', name: 'Farmer', value: 2 }
		],
		maxBloodPotency: 2
	},
	Ferryman: {
		description:
			'You live in a dark and scary world. FIRSTLIGHT is everywhere. The Sheriff of the city is more than a bit unhinged. It is probably better if you send someone else out to get your food. Depending on your preferences, that might mean a lot of work for your delivery guy. If you can drink bagged blood, the task is pretty simple. Bringing home an unsuspecting meal, then getting them back out again before the Kiss wears off…That’s more difficult. Good thing you trained your ghoul well. Better than the previous one at least.',
		huntingPool: {
			type: 'Special',
			description:
				'Your ghoul finds you blood in the best way possible, according to her own skills and taking into account any feeding limitations. Your Storyteller handles your feeding challenges in secret. If you lose your retainer, you are forced to hunt on your own or quickly train a new delivery driver.'
		},
		changeDescription:
			'▷ Gain a two-dot Ally and attach the (••) Retainer Advantage to this Ally.\n▷ Gain two dots in the Haven Background.\n▷ Gain three dots worth of Mythical Flaws.\n▷ Hunting Pool: Special. Your ghoul finds you blood in the best way possible, according to her own skills and taking into account any feeding limitations. Your Storyteller handles your feeding challenges in secret. If you lose your retainer, you are forced to hunt on your own or quickly train a new delivery driver.',
		changes: [
			{
				style: 'add',
				kind: 'Background',
				name: 'Allies',
				value: 2,
				associatedAdvantage: { name: 'Retainer', value: 2 }
			},
			{ style: 'add', kind: 'Background', name: 'Haven', value: 2 },
			{ style: 'add', kind: 'Flaw', flawKind: 'Mythical', value: 3 }
		]
	},
	Graverobber: {
		description:
			'You have likely always had a thing for death, which may have had something to do with your grandfather owning a mortuary. Maybe you were surrounded by death because of your own profession as a doctor or gravedigger. You prefer to feed on fresh blood, usually that of mourners at a gravesite or sad visitors identifying the corpse of a loved one at the coroner’s. You would love to be able to taste fresh blood on a regular basis, but it is just too easy for you to get aftermarket vitae. When you can’t feed on the living, you’ve got a place back home where you can preserve fresh bodies.',
		huntingPool: ['Wits', 'Medicine'],
		changeDescription:
			'▷ Gain the Feeding Merit: Iron Gullet (•••).\n▷ Gain 1 dot of the Haven Background and the Haven Advantage: Walk In Freezer.\n▷ Gain the Obvious Predator (••) Feeding Flaw.\n▷ Hunting Pool: Wits + Medicine. With the number of people dying these days, bodies going missing is a regular occurrence. You have a haven on Dead Body Boulevard right near the morgue, hospital, etc. This gives you access to mourners and visitors. When necessary you can appropriate a body, using fake credentials, misfile some paperwork, and wheel the body right into your own freezer . . . All before the blood spoils.',
		changes: [
			{ style: 'add', kind: 'Merit', name: 'Iron Gullet', value: 3 },
			{
				style: 'add',
				kind: 'Background',
				name: 'Haven',
				value: 1,
				associatedAdvantage: { name: 'Walk-In Freezer', value: 1 }
			},
			{ style: 'add', kind: 'Flaw', name: 'Obvious Predator', value: 2 }
		]
	},
	Hitcher: {
		description:
			'Almost a billion and a half people traveled at some point last year. That is basically 1 out of every 5 people in the world. Almost 70 million vehicles break down every year. That is 1 in every 3 drivers. While everyone else in the city is trying to find their feeding niche, the world is your oyster. You almost never have to worry about being recognized because you try not to feed from locals. You stick to rest stops, late night roadside diners, and solo travelers, the travelers most likely never to be found if they go missing.',
		huntingPool: ['Wits', 'Etiquette'],
		changeDescription:
			'▷ Gain one dot of the Haven Background and attach 1 dot of the Haven Background: Garage to this Haven.\n▷ Gain one dot of the Resources Background and the Resources Advantage: Liquidity.\n▷ Gain a Prey Exclusion: (•) Feeding Flaw of your choice.\n▷ Hunting Pool: Wits + Etiquette. You are just another smiling face on the dark road. You are always happy to help a traveler who needs assistance. “Flat tire needs fixing? I think I know a 24-hour garage further up the highway.” “Directions to the nearest diner? I was headed there myself.” Once you make sure the two of you are alone, you can feed quietly…Or, if you fancy yourself a killer, you can always dispose of their car back at your garage.',
		changes: [
			{
				style: 'add',
				kind: 'Background',
				name: 'Haven',
				value: 1,
				associatedAdvantage: { name: 'Garage', value: 1 }
			},
			{
				style: 'add',
				kind: 'Background',
				name: 'Resources',
				value: 1,
				associatedAdvantage: { name: 'Liquidity', value: 1 }
			},
			{
				style: 'add',
				kind: 'Flaw',
				name: 'Prey Exclusion',
				value: 1
			}
		]
	},
	Osiris: {
		description:
			'You have developed a group of fans who worship the ground you walk on. This fanbase can either be the followers of your Mask’s profession or a flock of worshipers you have cultivated. While they do not know of your true supernatural nature, they still treat you like the proverbial “god amongst men.” They will provide for you, lest you forget about them.',
		huntingPool: ['Manipulation', 'Subterfuge'],
		changeDescription:
			'▷ Gain a two-dot Mask Background.\n▷ Gain three dots to spend on any combination of the Herd Background or Fame Background.\n▷ Gain the Enemy (••) Flaw: You may choose any Sphere of Influence for this enemy which represents someone who doesn’t worship the ground you walk on.\n▷ Hunting Pool: Manipulation + Subterfuge. Your reputation is everything. Your followers flock to you when asked, heeding your call at all hours and all locations. Motivated by obligatory adoration, they fear the loss of your attention. Every time you feed, you leave them ecstatic and relieved that you still value them.',
		changes: [
			{ style: 'add', kind: 'Background', name: 'Mask', value: 2 },
			{ style: 'add', kind: 'Background', name: ['Herd', 'Fame'], value: 3, multiPurchase: true },
			{ style: 'add', kind: 'Flaw', name: 'Enemy', value: 2 }
		]
	},
	Sandman: {
		description:
			'You prefer to feed from those that are asleep, perhaps out of shame, caution, or some other reason. You have gone to great lengths to be able to access sleeping mortals. You have a number of Masks that allow you to move among mortals unnoticed, despite the late hour: late night security guard, hotel attendant, even one as the graveyard shift nurse.',
		huntingPool: ['Dexterity', 'Stealth'],
		changeDescription:
			'▷ Gain four points in the Mask Background. You may create multiple different Masks with these free points.\n▷ Gain the Prey Exclusion: Conscious Mortals (•) Feeding Flaw.\n▷ Hunting Pool: Dexterity + Stealth. Sneak in, act like you belong there, feed, and get out, easy as that… You hope.',
		changes: [
			{ style: 'add', kind: 'Background', name: 'Mask', value: 4, multiPurchase: true },
			{
				style: 'add',
				kind: 'Flaw',
				name: 'Prey Exclusion',
				value: 1,
				description: 'Conscious Mortals'
			}
		]
	},
	'Scene Queen': {
		description:
			'You belong to a subculture or close-knit community. Likely you were part of this group before your Embrace and are well-established, adored and respected with your peers. Some of them might have figured out what you are now, but your reputation is unassailable at this point. Access to your fandom allows you easy feeding opportunities.',
		huntingPool: ['Charisma', 'Etiquette'],
		changeDescription:
			'▷ Gain a two-dot Mask Background.\n▷ Gain one dot of the Fame Background that applies to the above Mask Background.\n▷ Gain two dots of the Herd Background.\n▷ Gain two dots of the Enemy Flaw or two dots of any Mythical Flaws.\n▷ Hunting Pool: Charisma + Etiquette. As long as you maintain your well-crafted persona your reputation allows you access to dozens of adoring fans happy to have your attention. The more they experience the Kiss, the more fantastic you become.',
		changes: [
			{ style: 'add', kind: 'Background', name: 'Mask', value: 2 },
			{ style: 'add', kind: 'Background', name: 'Fame', value: 1 },
			{ style: 'add', kind: 'Background', name: 'Herd', value: 2 },
			{ style: 'add', kind: 'Flaw', value: 2, name: 'Enemy', flawKind: 'Mythical' }
		]
	},
	Siren: {
		description:
			'Either through the use of supernatural charisma or personal qualities alone, you charm, beguile, and ultimately seduce your victims. Once you have privacy you feed on them, the Kiss masked as part of the intimate encounter. And while you rarely cause outright physical harm to your prey, you do have a tendency to leave a string of broken hearts in your wake.',
		huntingPool: ['Charisma', 'Subterfuge'],
		changeDescription:
			'▷ Gain five dots to spend on Herd or Fame Backgrounds and/or Advantages.\n▷ Gain two dots of the Enemy Flaw. You may choose any Sphere of Influence for this enemy that represents a spurned lover or jealous stalker.\n▷ Hunting Pool: Charisma + Subterfuge. With very little effort, you attract others through your physical appearance and by seduction. You say what you need to say to isolate your prey, making them feel desired, and often leave them as fulfilled as you feel when you finish feeding.',
		changes: [
			{
				style: 'add',
				kind: 'Background',
				name: ['Herd', 'Fame'],
				value: 5,
				multiPurchase: true,
				associatedAdvantage: { name: undefined, value: 0, mayUseParentValue: true }
			},
			{ style: 'add', kind: 'Flaw', name: 'Enemy', value: 2 }
		]
	}
};
