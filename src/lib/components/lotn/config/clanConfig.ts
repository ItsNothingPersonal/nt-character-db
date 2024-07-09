import type { ClanName } from '$lib/zod/lotn/enums/clanName';
import type { DisciplineName } from '$lib/zod/lotn/enums/disciplineName';

export const clanConfig: ClanConfigMap = {
	'Banu Haqim': {
		inclan: ['Blood Sorcery', 'Celerity', 'Obfuscate'],
		bane: {
			title: 'Diablerie Addicts',
			explanation:
				'The Banu Haqim have been cursed with an incredible lust for the vitae of other vampires. From the first sip, they are on the edge of losing control and drinking everything they can, even to the point of committing diablerie, the act of devouring another vampire’s essence. When a Banu Haqim tries to Slake one or more Hunger with vitae from another Kindred, they must immediately test for Hunger Frenzy against a Difficulty of 2 + Bane Severity. If they fail this challenge, they will enter a Frenzy and continue gorging on their Kindred meal. If not stopped, they will attempt to drain their victim and commit diablerie.'
		},
		compulsion: {
			title: 'Judgment',
			explanation:
				'Each member of the clan has their own code of ethics that they follow, and that they expect others to follow. Blood or ‘public trial’ is the only appropriate payment to absolve the judged of their transgression. When this Compulsion is triggered, for the rest of that scene the Banu Haqim is compelled to pass judgment on anyone they observe acting against one of the Banu Haqim’s Convictions. In combat, this can be satisfied by Slaking at least one Hunger from the offender. Out of combat, this can be satisfied by making a public declaration in front of the Banu Haqim’s peers about the perceived ‘crime’ that has been committed. Until they do so, or until the Scene ends, the Banu Haquim suffers the Impaired Condition (see Conditions, page 111).'
		}
	},
	Brujah: {
		inclan: ['Celerity', 'Potence', 'Presence'],
		bane: {
			title: 'Short Fuse',
			explanation:
				'Brujah have earned their reputation as a violent clan of loud thugs, and it is not at all undeserved. The clan has a strong temper. When they get angry and their temper flares, they have difficulty reigning in their Beast. A Brujah must subtract their Bane Severity from their test pool on any challenge they make to resist Fury Frenzy (see Frenzy, page 127).'
		},
		compulsion: {
			title: 'Rebellion',
			explanation:
				'If there were nothing to rally against, the Brujah would be lost. But, luckily, they tend to be incredibly good at making their own fights. When their Compulsion is triggered, a Brujah suffers a -2 penalty on all challenges (including those to resist Frenzy) until the end of the scene or until they have successfully “rebelled” — this could mean anywhere from disobeying an order to changing someone’s mind. This act of defiance must be witnessed by other characters, but it does not have to be violent.'
		}
	},
	Gangrel: {
		inclan: ['Animalism', 'Fortitude', 'Protean'],
		bane: {
			title: 'Animal Features',
			explanation:
				'The Beast within a Gangrel is unleashed by Frenzy, causing the Kindred to gain one or more animal features that last until the end of the next night. Whenever a gangrel enters a Frenzy they gain a number of animal features equal to their Bane Severity. A character who chooses to Ride the Wave of Frenzy by spending a Willpower in the first round after she begins a Frenzy can choose to manifest only one feature regardless of their Bane Severity (see Riding the Wave, page 127). These features might be a physical change, a musky stench, or a feral behavior. All are obvious, and each reduces one Attribute by one point while manifested. The Storyteller and player may agree on which Attribute a feature logically affects, but, if nothing immediately comes to mind, the feature reduces Intelligence or Manipulation.'
		},
		compulsion: {
			title: 'Feral Impulses',
			explanation:
				'Gripped by the Beast, the vampire regresses into an animalistic state. Speech is difficult, reason is cumbersome, and violence is a more straightforward way to make their displeasure known. Until the end of the scene, the vampire suffers a -2 penalty to all challenges involving Manipulation or Intelligence and may only speak in one word sentences.'
		}
	},
	Hecata: {
		inclan: ['Auspex', 'Fortitude', 'Oblivion'],
		bane: {
			title: 'Painful Kiss',
			explanation:
				'Suffering is part of death, and death is part of every member of this clan. The bite of the Hecata does not bring feelings of bliss as with other Kindred. Victims will violently resist unless restrained, and few will submit willingly to such torture. When feeding, Hecata may only take harmful drinks that result in blood loss (see Feeding from Mortals, page 120). Unrestrained targets will attempt to escape, and those coerced or willing must succeed in a Stamina + Resolve check against Difficulty 2 + Bane Severity in order not to recoil from the pain. Many Hecata resort to alternative feeding methods, such as drinking from blood bags, fresh corpses, or using needles and bloodletting to deal with this Bane'
		},
		compulsion: {
			title: 'Morbidity',
			explanation:
				'The Scions of Death are fascinated with the cycle of life and death. When this Compulsion is active, they suffer a -2 penalty to challenges not related to killing or returning something to life. This act of moving something from life to death, or vice versa, can be figurative or literal. The subject does not have to be a person; this “movement” can be as abstract as reviving a conversation or restoring a broken object to working order. The penalty from this Compulsion lasts for a scene or until the Scion has ended or resurrected something.'
		}
	},
	Lasombra: {
		inclan: ['Dominate', 'Oblivion', 'Potence'],
		bane: {
			title: 'No Reflection',
			explanation:
				'Any reflective surface or recording device renders the Lasombra’s image as faded or distorted in some way. The distortion is clearly unnatural to the observer and betrays the Lasombra’s undead state. To those ignorant to the existence of vampires, the reflection appears unnatural and upsetting. This effect will not hide the identity of a vampire, nor will it allow Lasombra to be less difficult to catch on surveillance.\nSimilarly, modern communication technology has a more difficult time obeying the presence and actions of a Lasombra. Any time physical interaction based solely on touch is required to operate a modern communication device, the Lasombra must make a test using their Technology Skill vs. a Difficulty of 2 + Bane Severity. If this test fails the device refuses to respond in some way, such as the touch screen not working. This includes the use of touch screen phones, voice activated sensors, and similar technology. More archaic communication devices, such as rotary phones, phones with physical buttons to push, or devices such as BlackBerrys will work until used for a call or voice recording. Then if a Technology test fails, the call fails to transmit the Lasombra’s voice. Technology such as machinery or cars that rely on turning a key, pulling a lever, or depressing a physical button is unaffected by this Bane. However, a car that has seat sensors to make sure someone is in the driver seat might fail to recognize the Lasombra and then fail to start.\nThis Bane can never benefit the Lasombra. A Lasombra can’t simply grab someone’s phone to erase video taken of her or touch the car of escaping prey to turn it off. This Bane also makes her easier to detect. A Lasombra also gains a penalty to any pool used to avoid electronic detection systems equal to her Bane Severity'
		},
		compulsion: {
			title: 'Ruthlessness',
			explanation:
				'Failure is a sin among the Lasombra, and their Blood drives them to increasingly vicious actions when they suffer this Compulsion. The next test they fail after suffering this Compulsion causes a -2 penalty to all tests until they succeed at another attempt at the same action or until the end of the scene.'
		}
	},
	Malkavian: {
		inclan: ['Auspex', 'Dominate', 'Obfuscate'],
		bane: {
			title: 'Derangement',
			explanation:
				'All Malkavians suffer from a derangement. They receive a penalty equal to their Bane Severity to all challenges involving one Attribute category (Physical/Social/Mental) when they suffer a Bestial Failure (see Bestial Failures, page 117). This penalty lasts for the scene. The category of Attribute affected is unique to each character and is chosen at character creation. Work with your Storyteller to describe the derangement and how it affects your characters behavior along with the appropriate Attribute category affected.'
		},
		compulsion: {
			title: 'Delusions',
			explanation:
				'When suffering from their Clan Compulsion, Malkavians begin seeing visions and portents that skew their perceptions. They suffer a -2 penalty to all challenges that use the Insight, Awareness and Investigation Skills. In addition, they suffer a -2 penalty to resist Terror Frenzy. These penalties last until the scene ends.'
		}
	},
	'The Ministry': {
		inclan: ['Obfuscate', 'Presence', 'Protean'],
		bane: {
			title: 'Light Sensitive',
			explanation:
				'The Ministry have always been sensitive to light. Exposure to direct light, natural or otherwise, causes a Serpent to recoil. They take a penalty equal to their Bane Severity to all challenges while subjected to bright light directed straight at them. Ministry also take twice their Bane Severity in Aggravated Damage (before any reduction from protection) from exposure to sunlight'
		},
		compulsion: {
			title: 'Transgression',
			explanation:
				'Set teaches his children to break the chains binding their mind and spirit. When a Serpent suffers from this Compulsion, they receive a -2 penalty to all offensive challenges not related to enticing someone to break a Chronicle Tenet or personal Conviction or doing so themselves. This Compulsion ends when they cause at least one Stain, to their target or themselves, or until the end of the scene.'
		}
	},
	Nosferatu: {
		inclan: ['Animalism', 'Obfuscate', 'Potence'],
		bane: {
			title: 'Hideous',
			explanation:
				'All Nosferatu appear hideous and vile, though not always supernaturally so. Nosferatu suffer a -2 penalty on all mundane social challenges when their natural appearance is visible. Additionally, all attempts by the character to disguise their deformities, including with the use of Disciplines, incur a penalty equal to the character’s Bane Severity.'
		},
		compulsion: {
			title: 'Cryptophilia',
			explanation:
				'Almost every Nosferatu gains a deep hunger for secrets. Whether a piece of information is relevant to them or not is a completely different story; every secret has a purpose, even if that purpose is to trade for more secrets. When their Compulsion is triggered, a Nosferatu has a -2 penalty to all actions that are not spent attempting to gather secrets. Once they learn something important enough to be useful or the scene ends, the Compulsion ends. Actually putting the secret to use is their own choice. They may save it for a later trade.'
		}
	},
	Ravnos: {
		inclan: ['Animalism', 'Obfuscate', 'Presence'],
		bane: {
			title: 'Always on the Road',
			explanation:
				'The fire of the sun that incinerated their clan founder erupts from a Raven’s Blood if they ever settle in one place too long. If a Ravnos does not spend one downtime action per month moving from haven to haven or sleeping in different locations, they take a number of Aggravated Damage equal to their Bane Severity. This damage is unaffected by any levels of Fortitude they possess. Instead, for each point of damage she would take, she can make a simple test against the Storyteller. On an outright win, she avoids one point of Aggravated Damage. The Ravnos starts the next game with any remaining Aggravated Damage from failed or tied tests, as well as any other Aggravated Damage unmended between game sessions (See Damage Mended, page 126). The downtime action is spent making sure the Ravnos does not sleep within a mile of the last place for seven days in a row. Ravnos cannot take the No Haven Flaw at character creation.'
		},
		compulsion: {
			title: 'Tempting Fate',
			explanation:
				'A Ravnos is driven by their Blood to pursue danger. When suffering from their Compulsion, a Ravnos is incapable of attempting a safe solution to any problem. She suffers a -2 penalty to any actions that the Storyteller deems safe or unthreatening. This penalty does not apply to defensive test pools.\nFor example, a Ravnos fleeing from an assailant while under this Compulsion could attempt to cross the river safely and quietly on foot. She would suffer a -2 penalty to her Athletics and her Stealth pools by taking this safe action. On the other hand, she could drive her motorcycle through open territory while under her opponent’s gunfire. This Driving check would not suffer a penalty. In combat, a Ravnos suffering from her Clan Compulsion uses dangerous and unsafe tactics, either fighting against the odds or not retreating when she otherwise would. As long as the player can appropriately describe why her combat actions are dangerous, she does not suffer a penalty.\nThis Compulsion persists until the problem is solved, the scene ends, or further attempts become impossible.'
		}
	},
	Salubri: {
		inclan: ['Auspex', 'Dominate', 'Fortitude'],
		bane: {
			title: 'Tasty Vitae',
			explanation:
				'The Salubri are hunted, and other vampires who taste their Blood cannot help but want to drain them dry. If a non-Salubri character drinks enough Salubri Blood to Slake at least one Hunger, they must immediately make a Hunger Frenzy test at Difficulty 2+ the Salubri’s Bane severity (3+ if the drinker is Banu Haqim). If they fail, the imbiber continues to feed and cannot stop unless they are forcibly removed or the Salubri is drained of all their blood, which takes 5 standard actions of Slaking. The imbiber is not forced to commit diablerie. After being removed from the Salubri (or after the Salubri runs out of blood), the Hunger Frenzy continues until it ends normally.\nThe Salubri also has a third eye that is always present. While the eye can be covered physically, it cannot be obscured by supernatural powers. When the Salubri uses a Discipline, the third eye weeps vitae that triggers a Hunger Frenzy test from nearby vampires with Hunger 4 or higher. Low level Disciplines cause the eye to weep a small amount of Blood, but high level Disciplines bring on a torrential flow.'
		},
		compulsion: {
			title: 'Affective Empathy',
			explanation:
				'Their teachings and Disciplines require Salubri to empathize with the Kindred condition in order to better understand it, but sometimes that empathy comes with a price. When suffering this Compulsion, the Salubri is overcome with empathy for a personal problem that afflicts someone in the scene and tries to help them solve it. Any action not taken towards mitigating that personal tragedy incurs a -2 penalty. The Compulsion persists until the sufferer’s burden is eased, a more immediate crisis supersedes it, or the end of the scene.'
		}
	},
	Toreador: {
		inclan: ['Auspex', 'Celerity', 'Presence'],
		bane: {
			title: 'Sensory Overload',
			explanation:
				'Beauty is more than a simple, shallow want for the Toreador; an environment that violates their aesthetic sensibilities distracts and chafes to the point of physical detriment. When forced to tolerate such offensive surroundings, a Diva suffers a penalty equal to their Bane Severity on any attempt to use Disciplines in that space. Even surroundings that most mortals would consider ordinary, while not enough to trigger the Bane, will cause the vampire minor discomfort.'
		},
		compulsion: {
			title: 'Obsession',
			explanation:
				'When perfection catches their eye, a Diva’s mind can think of nothing else. If the Compulsion is triggered, choose something in the room. It might be a painting, a song, a person, or anything that fits the vampire’s idea of perfection. It consumes their every thought; even if their attention is forced elsewhere, the obsession with their target draws their mind back to it. Toreador suffer a -2 penalty to any action not directly involving this object, such as trying to protect it from harm, or influencing it for the betterment of the Toreador. This lasts until the scene ends, or until the Toreador can no longer see the target of their obsession.'
		}
	},
	Tremere: {
		inclan: ['Auspex', 'Blood Sorcery', 'Dominate'],
		bane: {
			title: 'Broken Bonds',
			explanation:
				'Discipline and hierarchy enforced by Blood Bonds was once core to the Tremere way of life. With the destruction of the Prime Chantry, the clan realized that the ability to Blood Bond others, relied so heavily upon, had suddenly disappeared. Clan Tremere can no longer subject another vampire to the shackles of the Blood Bond. They are still subject to the Bond themselves.\nGhouls and humans can still be Bound, though with great difficulty. To establish a successful Bond, the ghoul or human mustconsume their domitor’s vitae an additional number of times  equal to their Bane Severity.'
		},
		compulsion: {
			title: 'Perfectionism',
			explanation:
				'Nobody is perfect, but the Warlocks insist on being the best they can be. When this Compulsion is triggered, they cannot suffer anything but perfection. They will try again and again when they fail, forsaking all other duties, until they get it right. Until the end of the scene, or until the Tremere scores a critical win on a Skill challenge, she suffers a -2 penalty to all non-Discipline pools. Reduce this penalty by one if the Tremere has attempted the same action, using the same pool in the scene. On the third attempt of the same action with the same pool, remove the penalty altogether.'
		}
	},
	Tzimisce: {
		inclan: ['Animalism', 'Dominate', 'Protean'],
		bane: {
			title: 'Dragon Hoard',
			explanation:
				'Tzimisce are ruled by what they possess. Choose a charge, a group of people, an organization, a physical domain (such as dedicated Haven Background, which must be purchased by the Tzimisce) or something more esoteric—but defined and limited. The Dragon must sleep surrounded by their chosen charge. If they do not, when they Awaken they lose a number of Willpower equal to their Bane Severity.'
		},
		compulsion: {
			title: 'Covetousness',
			explanation:
				'To be Tzimisce is to own something completely, to be one with it beyond any doubt. When a Dragon suffers this Compulsion, they become obsessed with possessing something in the scene. This can be anything from a person, to a piece of property, or an object. Any action not taken towards this purpose incurs a -2 penalty. The Compulsion persists until ownership is established (the Storyteller  decides what constitutes “ownership” for a non-physical object), the object of desire becomes unattainable, or the scene ends.'
		}
	},
	Ventrue: {
		inclan: ['Dominate', 'Fortitude', 'Presence'],
		bane: {
			title: 'Refined Taste',
			explanation:
				'Refined in palate as much as in action, the Ventrue are extremely picky eaters. While other vampires can drink from most any mortal they come across, each Ventrue has their own preferences. The details always vary, but the details of their prey’s life may be incredibly important: college graduates, drug users, or people with a particular hair or eye color are all examples of their preferences. Nearly any aspect of a person’s life may give their blood that special perfect flavor, and nothing else can compare.\nIf a Ventrue attempts to feed from anyone outside their preference, they must spend Willpower equal to their Bane severity orvomit the blood back up. A Blue Blood can tell whether someone  fits their preference even at a distance by making a Resolve + Awareness challenge vs. Difficulty 4, or through the use of the Bloodhound Merit.'
		},
		compulsion: {
			title: 'Arrogance',
			explanation:
				'The Blue Bloods have their moniker for a reason. When a Ventrue’s Compulsion is triggered, they need to be in command, controlling the situation and everyone in it. They suffer a -2 penalty to any challenge until the end of the scene or until someone obeys one of their orders. This penalty applies even to challenges involving supernaturally commanding another character to follow orders with powers such as Dominate. A faked, forced, or coerced resolution can’t satisfy the vampire; the person must bow to their leadership without being Dominated or supernaturally compelled, and the order should have an impact to the scene, ideally in the Ventrue’s favor, and most often with other witnesses.'
		}
	},
	Caitiff: {
		inclan: [],
		bane: {
			title: 'Outcast',
			explanation:
				'Because they lack a clan, the Outcasts generally do not carry a Bane. Their ‘Bane’ is that they are socially outcast by much of vampire society. Whether they are Anarch or accepted in a Camarilla Court, a known Caitiff requires 2 additional Support beyond the normal Support required to gain a dot of Status.\nIn a city with a Camarilla Authority if a character who deliberately hides their lack of a clan is publicly revealed to be a Caitiff, they immediately remove 1 dot of Status. A Caitiff cannot automatically lose the first dot of Status because of this, although an Authority can strip them of Acceptance (see City Status, page 295). In addition, the cost to improve Disciplines is six times the level purchased in experience points.'
		},
		compulsion: {
			title: 'None',
			explanation:
				'Clanless characters have no clan-specific Compulsions. A Storyteller is welcome to use other Compulsions listed, but should avoid giving any options that mimic named clan Compulsions to represent this.'
		}
	},
	'Thin-Blooded': {
		inclan: ['Thin-Blood Alchemy'],
		bane: {
			title: 'None',
			explanation:
				'Because they do not carry any resonance with a clan, the Duskborn do not have a Bane or suffer from any clan-specific Compulsions.'
		},
		compulsion: {
			title: 'None',
			explanation:
				'Because they do not carry any resonance with a clan, the Duskborn do not have a Bane or suffer from any clan-specific Compulsions.'
		}
	}
};

export type ClanConfigMap = {
	[K in ClanName]: {
		inclan: DisciplineName[];
		bane: { title: string; explanation: string };
		compulsion: { title: string; explanation: string };
	};
};
