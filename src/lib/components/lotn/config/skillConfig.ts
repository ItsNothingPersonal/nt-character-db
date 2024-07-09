import type { MentalSkill, PhysicalSkill, SocialSkill } from '$lib/zod/lotn/enums/skillName';

export const skillConfig: SkillConfig = {
	physical: {
		Athletics: {
			helptext:
				'Athletics lets you attempt things such as outrun a police officer, dodge a punch from an angry mobster, swim a raging river, or scale the side of a building.'
		},
		Brawl: {
			helptext:
				'Brawl is the Skill that relates to unarmed combat. Any attack that does not have a weapon in hand uses Brawl; this Skill covers all unarmed combat from grappling to Taekwondo. For information on combat options, see Types of Attacks, page 103.'
		},
		Crafts: {
			helptext:
				'The Craft Skill covers any form of artistry that involves creating objects. Beautiful penmanship, crafting a fine sword, restoring a car, or putting together a bear trap to protect your Haven are all Crafts checks. For each dot of Crafts you possess, you may choose a particular specialty that represents a type of crafting you create with particular expertise. When using the Crafts Skill to create something with your specialty, you gain +1 to your pool.\nFor example, if you have 2 dots in Crafts with the specialties “painting” and “tailoring,” and you are sewing a new shirt, your pool would be your Dexterity + 2 for your two dots in Crafts +1 for your specialty in tailoring. You may only gain a single +1 bonus to your Crafts pool, regardless of the number of specialties that may apply to the challenge.'
		},
		Driving: {
			helptext:
				'Except, possibly, for the oldest of vampires, almost anyone can drive a car if they learn to do so. The Driving Skill governs the ability to do so safely in dangerous or difficult conditions. Driving in regular traffic does not require a Driving test, but steering successfully away from an ambush or winning a race would.'
		},
		Marksmanship: {
			helptext:
				'Swords and supernaturally-empowered punches are not common in today’s world. Shooting a gun, on the other hand, is often dismissed as unremarkable, a sad bit of alltoo-common violence in the World of Darkness. This Skill is used for any form of ranged combat involving a weapon, from thrown weapons such as a dart, to pistols and assault rifles, to crossbows and longbows. For information on ranged combat options, see Types of Attacks page 103.'
		},
		Larceny: {
			helptext:
				'Also called “Security” by vampires who prefer to cast a more positive light on their activities, this Skill represents the physical tricks of the trade of criminals and the people who counter them. Whether you want to crack a safe, forge a passport, hot-wire a car, pick a lock, or turn off a burglar alarm, Larceny is used. Characters also use it to set up security systems or figure out how a break-in happened. High-end security systems that feature computer controls, video surveillance, or electronic alarms might also require the Technology skill to overcome.'
		},
		Melee: {
			helptext:
				'This is the skill used to hit others with objects, stake another vampire, or grapple another with a rope or chain. For information on combat options, see Types of Attacks, page 103.'
		},
		Stealth: {
			helptext:
				'Stealth advances actions such as going unseen in a crowd, hiding successfully in shadows, or sneaking around undetected. Stealth is often opposed by Awareness in a game of cat and mouse between spy and spycatcher.'
		},
		Survival: {
			helptext:
				'Survival governs the ability to endure difficult conditions outside of civilization and make it back safely. Skills such as making a safe shelter against the sun in the woods, noticing werewolf signs, and navigating by the stars are all governed by Survival.'
		}
	},
	social: {
		'Animal Ken': {
			helptext:
				'Animal Ken represents the ability to connect with animals, keep them calm, assess what might be upsetting them, and, in the case of domesticated animals, provide training. Without any dots in this Skill, most animals avoid you or are aggressive toward you.'
		},
		Etiquette: {
			helptext:
				'The Etiquette Skill allows you to follow the social conventions of a scene, change protocols, and be a pleasing presence to the people around you. This Skill is important in high society and the Camarilla.'
		},
		Insight: {
			helptext:
				'Insight grants you the ability to interpret subtle cues, body language, and other forms of social interactions. Empathic characters tend to have high Insight.'
		},
		Intimidation: {
			helptext:
				'The power to browbeat, bully, and scare in a social situation, Intimidation represents overpowering the will of another through social force.'
		},
		Leadership: {
			helptext:
				'Leadership training helps you successfully influence groups. Managing a group of Kindred on a research project, driving a riot in a particular direction, or rallying support in followers are all examples of Leadership Skills in action.'
		},
		Performance: {
			helptext:
				'The Performance Skill represents your overall ability to artistically perform, such as doing comedy standup, dancing, public speaking, or executing any type of arts that do not involve crafting an object (which would utilize the Crafts Skill).\nYou might be a hilarious comedian, a fine dancer, or an astute critic of film. For each dot of Performance you possess, you may choose a particular specialty of performance artistry in which you are more accomplished. When using the Performance Skill in your specialty area, you gain +1 to your pool.\nFor example, if you have 2 dots in Performance with the specialties dancing and singing, and you are dancing with the Prince, your pool would be Dexterity + 2 for your two dots in Performance +1 for your specialty in dancing. You may only gain a single +1 bonus to your Performance pool, regardless of the number of specialties that may apply to the challenge.'
		},
		Persuasion: {
			helptext:
				'Persuasion is used to convince someone that your point of view is correct and should be followed. From making a big sale to convincing a police officer to let you off with a warning for speeding, Persuasion applies in a wide variety of situations when you need someone to change their perspective.'
		},
		Streetwise: {
			helptext:
				'Streetwise represents a character’s understanding of the workings of the street, from knowing the gangs that populate an urban area to finding illicit drugs, knowing street lingo to understanding how to spot a narc.'
		},
		Subterfuge: {
			helptext:
				'Subterfuge is the art of the con. Whether your character is lying, telling a tall tale, or pretending to be someone  they are not, this Skill represents your talent for deception and pretending to be someone or something else—including a mortal.'
		}
	},
	mental: {
		Academics: {
			helptext:
				'Academics measures your overall training and knowledge of humanities and the liberal arts. For each dot of Academics you possess, you may choose a particular specialty that represents your strongest areas of study. When using the Academics Skill in an area of study with your specialty, you gain +1 to your pool.\nFor example, if you have 2 dots in Academics with the specialties of architecture and urban planning, and you are working on developing an area of the city to serve as new feeding grounds, your pool would be your Intelligence + 2 for two dots in Academics +1 for your specialty in urban planning. You may only gain a single +1 bonus to your Academics pool, regardless of the number of specialties that may apply to the challenge.\nFor learning foreign languages, use the Linguistics Background (see page 182). Knowledge of supernatural creatures, events, and phenomenon requires an Intelligence + Occult challenge (see page 89).'
		},
		Awareness: {
			helptext:
				'Awareness measures how perceptive a character is. They may be able to see a hidden item, spot an improvised trap hidden in a wall, smell a faint hint of gasoline, or detect someone sneaking up on them. A character’s Initiative score is measured by Composure + Awareness.'
		},
		Finance: {
			helptext:
				'The Finance Skill represents the ability to root through financial documents and receipts for clues, appraise rare items, invest money effectively, and plan for stock market shifts to your advantage (or disadvantage, if you wish to feed someone bad information).'
		},
		Investigation: {
			helptext:
				'Investigation allows you to find clues and uncover truths behind mysteries. From tracing a hiding mortal who witnessed a Masquerade breach to finding subtle hints at a murder scene, Investigation is a very useful Skill for vampires.'
		},
		Medicine: {
			helptext:
				'Medicine allows you to identify illnesses and disease, understand the cause of sickness or death, and determine clues from examining mortal bodies. Medicine also allows you to know what drugs to use for ailments, how to use medical equipment correctly, and how to perform first aid. Characters can use Medicine to accelerate healing in mortals (see Healing 111).'
		},
		Occult: {
			helptext:
				'Occult represents an understanding of the esoteric, from the beliefs of obscure cults to the practices of secret societies. You can recognize mystical sigils, do paranormal research, and understand the legends of vampiric society.'
		},
		Politics: {
			helptext:
				'The Politics Skill helps you navigate bureaucracy and understand how things get done in organizations. Whether you want to understand the basics of vampiric politics, remember which Sect runs which city, put pressure on a politician, or be able to cut through a mortal government’s red tape, the Politics Skill is useful.'
		},
		Science: {
			helptext:
				'This Skill represents understanding the many areas of mortal scientific knowledge. Smart vampires know that much can be learned from studying the building blocks of life. For each dot of Science you possess, you may choose a particular specialty that represents your strongest areas of study. When using the Science Skill in an area of study with your specialty, you gain +1 to your pool.\nFor example, if you have 2 dots in Science with the specialties of chemistry and math, and you are trying to solve a complex math problem, your pool would be your Intelligence + 2 for two dots in Science +1 for your specialty in mathematics. You may only gain a single +1 bonus to your Science pool, regardless of the number of specialties that may apply to the challenge.\nThis Skill also governs your skill with laboratory equipment.'
		},
		Technology: {
			helptext:
				'The Technology Skill is utilized to understand how to use the technical developments that most vampires would find difficult to comprehend. In modern nights, Technology provides an understanding of things such as computer systems, advanced electronic security, drones, and FIRSTLIGHT thermal scanners.'
		}
	}
};

export type SkillConfig = {
	physical: Record<PhysicalSkill, { helptext: string }>;
	social: Record<SocialSkill, { helptext: string }>;
	mental: Record<MentalSkill, { helptext: string }>;
};
