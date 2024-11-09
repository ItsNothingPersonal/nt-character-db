export const attributeConfig: AttributeConfigMap = {
	physical: {
		strength: {
			helptext:
				'How much you can lift, how far you can jump, how much force you can bring to bear. . . These matters of physical power are measured by Strength. The rough amount you can deadlift without an Attribute test appears in parentheses below.\nCharacters who frequently use Brawl, Melee, Potence, and Protean will find Strength useful.\n• You can easily lift a child. (20 kg/44 lbs)\n•• You are physically average. (45 kg/99 lbs)\n••• You can lift a large person or similar-sized objects without difficulty. (115 kg/253 lbs)\n•••• You are remarkably strong, able to move things solo that would usually require a team. (180 kg/396 lbs)\n••••• Your strength is incredible, like the greatest of mortal body builders. (250 kg/550 lbs)'
		},
		dexterity: {
			helptext:
				'Your grace, agility, and speed are governed by Dexterity. Dodging a punch, picking a lock or doing brain surgery without slicing the cerebellum are all examples of things governed by this Attribute. Characters who want to avoid hits, engage in ranged combat, or use the Celerity Discipline should consider having high Dexterity.\n• You have poor balance and agility.\n•• You can be fast on occasion.\n••• You are coordinated and quick.\n•••• You are naturally acrobatic and can move with incredible grace.\n••••• You are more graceful than the best of dancers and more agile than an Olympic gymnast.'
		},
		stamina: {
			helptext:
				'Toughness, resilience and resistance to harm are the province of Stamina. The number of Health levels your character has is equal to your Stamina + 3.\n• You are easily winded and have little tolerance for pain.\n•• You can take a few hits and go for a long hike.\n••• You are fit and hearty.\n•••• Your personal resilience is impressive, like the finest of Special Forces soldiers or marathon runners.\n••••• You are incredibly difficult to hurt, with nearly supernatural levels of tolerance for injury.'
		}
	},
	social: {
		charisma: {
			helptext:
				'Allure, social graces, and personal presence are governed by Charisma. Those who have it find their lives–and feeding–easier; those who do not have it find that people are not drawn to them. Note that Charisma does not depend solely (or at all) on appearance. A character who is stunning might lack any sort of charm, while an average-looking character might have incredible magnetism. Characters who wish to use the Dominate, Presence and Animalism Disciplines may find Charisma helpful.\n• You are unremarkable and struggle to connect.\n•• You are generally likable, though you are not someone who would draw people in a crowd.\n••• You are easily trusted and make friends without difficulty.\n•••• You are magnetic and alluring.\n••••• You are a paragon of social magnetism. People want to know you.'
		},
		manipulation: {
			helptext:
				'Manipulation is the ability to change another’s perspective, lie convincingly, or otherwise socially maneuver another person in the direction you wish. Manipulation is useful for characters who wish to use the Dominate, Presence, and Animalism Disciplines.\n• You can convince people if you remain honest.\n•• You can deceive people sometimes, if they are not particularly astute.\n••• You are a capable negotiator.\n•••• You could be a politician or argue in front of a jury.\n••••• You are incredibly adept at getting what you want.'
		},
		composure: {
			helptext:
				'Composure governs keeping calm, cool and collected, whether in the face of danger, during a tense negotiation, or in the face of great terror. Your Composure + Resolve equals your Willpower. Composure comes up often in tests to resist supernatural disciplines.\n• You are easily angered by minor frustrations.\n•• You can keep it cool in most situations, but unexpected occurrences raise your hackles.\n••• When chaos breaks out, people look to you to guide them.\n•••• You have a remarkable poker face and a good handle on your Beast.\n••••• You are a rock in stormy seas, a paragon of keeping it together.'
		}
	},
	mental: {
		intelligence: {
			helptext:
				'Intelligence governs your capacity to learn, analyze, and assess information. A character with high Intelligence might be educated or a natural genius. Characters who use the Auspex, Obfuscate and Blood Sorcery Disciplines will find Intelligence helpful.\n• You can read and write, but you struggle with deep analysis.\n•• You are of average intelligence, but rarely have anything groundbreaking to say.\n••• You have a keen mind, with the ability to connect difficult concepts and clues.\n•••• You have a brilliant mind. Others may seek your thoughts on all manner of subjects.\n••••• Genius like yours comes about only rarely.'
		},
		wits: {
			helptext:
				'Quick thinking, working on the fly, and instincts are governed by Wits. A character who has high Wits is perceptive and intuitive, with the ability to pick up on subtleties. High Wits is useful for augmenting various Auspex, Obfuscate and Blood Sorcery powers.\n• It takes you time and explanation to grasp subtleties, but you can do it with effort.\n•• You have a reasonable reaction time and can rely on your gut more often than not.\n••• You have strong intuition and can quickly devise solutions, even under pressure.\n•••• You catch subtleties easily and are very difficult to ambush.\n••••• You have exceptional instincts, and you react incredibly fast to danger.'
		},
		resolve: {
			helptext:
				'A character’s force of will, mental fortitude and drive is measured by their Resolve. Remaining on task for a long period of time and shutting out distractions rely on this Attribute. Resolve can also help resist supernatural Disciplines.\n• You are easily distracted, though you can focus on important things.\n•• You can pull an all-nighter on a task once in a while, but you would not make a habit of it.\n••• You are focused. People would say you have a good work ethic.\n•••• Knocking you off the course you set for yourself is very difficult.\n••••• Very few people can match your focus, drive, and ambition.'
		}
	}
};

export type AttributeConfigMap = {
	physical: {
		strength: {
			helptext: string;
		};
		dexterity: {
			helptext: string;
		};
		stamina: {
			helptext: string;
		};
	};
	social: {
		charisma: {
			helptext: string;
		};
		manipulation: {
			helptext: string;
		};
		composure: {
			helptext: string;
		};
	};
	mental: {
		intelligence: {
			helptext: string;
		};
		wits: {
			helptext: string;
		};
		resolve: {
			helptext: string;
		};
	};
};
