import type { ClanName } from '$lib/zod/lotn/enums/clanName';
import type { DisciplineName } from '$lib/zod/lotn/enums/disciplineName';

export const clanConfig: ClanConfigMap = {
	'Banu Haqim': {
		description:
			'The Banu Haqim is a clan balanced between judges, warriors, and scholars, representing a triad of decision, action, and knowledge. Some members of the clan act as unbiased judges working to solve constant infighting and bickering within the growing Kindred population. The Judges have produced many lawmakers and rational thinkers who examine all sides of a situation before acting. Some take on martial roles, acting as deadly executioners who carry out judgments swiftly and silently. Others are scholars Embraced for their hunger for knowledge that is carried beyond life, while some are accomplished sorcerers who experiment with blood magic to battle threats that swords cannot touch.\nThe one constant among all Judges is a strong sense of justice. With the changing times, most have branched outwards from the clan’s original laws of conduct, but every one of these Kindred subscribes zealously to some code of ethics—religious doctrine, a constitution, a personal ideology, and so forth. They follow this code in every aspect of their unlives, and they expect others to do the same or pay for their crimes in blood.\nIn modern nights, the Judges still play a pivotal, often unseen role in vampiric society. They follow in their progenitors’ footsteps as defenders, judges and executioners of the Kindred world, and they tend to keep themselves at a neutral distance from politics and Courts so they can better carry out those duties. The clan has earned a well-deserved reputation as assassins, for when someone has been judged guilty, the Banu Haqim are quick to strike them down and take payment in blood.',
		inclan: ['Blood Sorcery', 'Celerity', 'Obfuscate'],
		inclanDescriptions: {
			'Blood Sorcery':
				'The study of sorcerous manipulation of vitae is part of the Banu Haqim legacy. Some warriors tend towards the aspects of this Discipline that weaponize their Blood to make an assassination go smoothly. Others use the manipulation of Blood as a tool for doling out punishment or drawing out the truth from a less-than-cooperative accused.',
			Celerity:
				'The Judges rely on speed and precision in order to catch a target, outmaneuver them in the field, and prevent their quarry from escape. If a Banu Haqim assassin strikes fast enough, they may complete their mission before their target even realizes what is happening.',
			Obfuscate:
				'Being able to hide themselves without cover significantly helps the Banu Haqim stalk their targets and learn their patterns. For the less violent of the clan, this Discipline is useful for observing how others interact without their knowledge, allowing the Judges to see their target’s true colors rather than their best public facade.'
		},
		archetypes: [
			{
				Judge:
					'These Kindred have existed long enough to be firmly confident in their own code. Their idea of “right” is, of course, the best possible “right,” and they have become just as confident in their ability to judge others’ actions. They are often the lawmakers of the city, following in their progenitor’s footsteps, dispensing justice among both Kindred and kine.'
			},
			{
				'Former Assassin':
					'These Banu Haqim were once called upon when justice needed to be delivered at the end of a blade—or when someone offered the right price. Stealthy and deadly, they struck seemingly from nowhere and disappeared, leaving no evidence. However, the clan has joined polite society now, so these Kindred often act as protectors of their domains. However, training in murder never goes away, and, for the right price, a former assassin might be persuaded to do one more job.'
			},
			{
				Scholar:
					'Masters over blood magic, scholars might study sorcery out of a desire to learn everything they can. Perhaps they want to understand their clan’s Bane. Perhaps they are simply fascinated by the intricacies and properties of vitae. Whatever their motivation, scholars who integrate with other Kindred have chosen to put that knowledge towards the betterment of vampiric society.'
			}
		],
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
		description:
			'Rebellion. Revolution. Revolt. Regardless of their background, most Brujah have some cause that they fight for. With a tendency to rise up against perceived authority, upset established norms, and show off strength, members of this clan rarely Embrace the meek. When these Rebels see a violation of their ideals, they make it known—loudly, and, when necessary, violently. Passions rule the clan, and those passions are often expressed without filter or control.\nA typical Brujah embraces the thrill of standing up for (or against) something bigger than themselves, and members of the clan value strength of body, mind, and spirit. While some Brujah lead a violent, rebellious existence by the sword, many others are shrewd tacticians and charming leaders. The interests of these Brujah lie more in planning or inspiring their revolution than in throwing punches. After all, real change does not just spring up overnight.\nHowever, not every Brujah’s cause is noble or just. Some Rebels will rebel against a good thing just as hard as they would a bad thing; they formed their opinions, and nothing will change that. Stubbornness, strength and the will to make change at any cost can be very dangerous.',
		inclan: ['Celerity', 'Potence', 'Presence'],
		inclanDescriptions: {
			Celerity:
				'Speed is often key to victory, whether the fight is a clash on the battlefield or a competitive boxing match. To the Brujah, Celerity keeps them a step ahead, giving them the freedom to outmaneuver their adversaries.',
			Potence:
				'For a clan that places great value on strength, Potence is a natural asset. The Brujah will regularly throw party-like Rants with clanmates to show off their skills, competing to see who is able to best the others in feats of athleticism. Superior strength is as good as speed when it comes to ending a fight quickly—after all, a torpid opponent cannot hit back.',
			Presence:
				'The inferno of revolution starts with a spark, and a wise Brujah never forgets the value of passionate words to light a blaze in the hearts of those who seek to upset the system. Presence is a common ability among the Brujah, making them appear as larger-than-life figures to be trusted, believed, and followed.'
		},
		archetypes: [
			{
				'Revolutionary Iconoclast':
					'Passion and leading with the heart is the Brujah way, and few members of the clan lack strong opinions about things that are important to them. The iconoclast is a leader for social change for its own sake. Power is not a motivator for these Brujah; they will lead the people in the war, but, once they have won, they have no interest in ruling.They relish the fight itself, and there will always be another cause.'
			},
			{
				'Street Tough':
					'Violence is a part of life, especially among the Brujah, but the street tough lives it regularly. These are the people who never get their security deposit back on an apartment because of the holes in the wall. They are loud, explosive, violent, and often difficult to tolerate in large doses. However, they have survived for this long because of their chosen family, and, to those they choose, they are loyal to a fault.'
			},
			{
				'Philosophical Teacher':
					'Some Brujah want to see others reach their full potential, and they are willing to Embrace a person others may deem unworthy because they see something special in them. Skilled guides and tacticians, these teachers help others grow, building their vision for a brighter future for Clan Brujah.'
			}
		],
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
		description:
			'Unbound by city limits and unchained from creature comforts, the Ferals of Clan Gangrel go where they wish because they are ready for whatever they may find. Whether they spend their days concealed from the sun in a condemned basement or submerged in the earth outside of town, the Gangrel are hardy survivalists whose greatest strengths are their self-sufficiency and freedom.\nChief among the Ferals is a keen understanding of challenge and merit. Gangrel are not inclined to accept a leader simply because they say they are in charge. Deferring only to those who demonstrate worthiness through talent, courage and sheer will, the Gangrel care about what people have actually done to prove themselves. “Getting shit done” establishes reputation among the Ferals, and deeds determine who warrants the Embrace. Conflict is a part of their lives, and pecking order is often determined among the Gangrel by competition and fighting.\nWhile being a great fighter is not required to be a great Gangrel, the will to act is a defining feature of the clan. Would-be Gangrel sires look for signs of tenacity. Mortals who show leadership qualities, stubborn dedication to their ideals, and staunch support of causes (whether they are winning or losing) are the kinds of people who might be Embraced by Ferals.',
		inclan: ['Animalism', 'Fortitude', 'Protean'],
		inclanDescriptions: {
			Animalism:
				'Their connection with the natural environment gives the Gangrel advantages. Whether they want to seek aid from an animal companion in their plans, suss out who is a vampire in a crowded room, or seize control of a Frenzying vampire to turn a conflict to their advantage, Animalism provides Gangrel with a broad set of tools to engage their surroundings.',
			Fortitude:
				'Resilient beyond mortal ken and prone to standing up for their beliefs with ragged claws, Fortitude is very valuable to any Gangrel. The world is a dangerous place, and growth in Fortitude gives the Feral a real shot at surviving and overcoming the threats they face. Why worry about a sneaky assassin or a blood-thieving sorcerer when you can endure far more punishment than they can?',
			Protean:
				'Transformation is central to the reputation of the Gangrel, giving them the tools to survive in rugged and harsh environments. Ferals take the shape necessary to overcome challenges and are not restricted by human form. Physical prowess alone means little when one can capitalize on all the benefits that come with a mutable shape.'
		},
		archetypes: [
			{
				'Wandering Courier':
					'This Gangrel lived for the road, even in life, the siren’s song of his motorcycle driving him all over the continent while he lived. After the Embrace, he continued to go wherever he saw fit—only now, he makes his living taking messages, packages, and information dossiers from one domain to another. He will never stop moving until he has to. The road is his freedom, and he feels more alive than ever.'
			},
			{
				'The Controlling Interest':
					'Business is war, words are bullets, and productivity reports are artillery, and this Gangrel knows it. They get what they want because they are the biggest dog in the room. Commanding power through strong execution of good ideas. They understand what it takes to compete and do not shy away from making calls that benefit their shareholders above all else, morality be damned.'
			},
			{
				'Mystery Seeker':
					'Drawn to the mysteries of the world, there is nowhere this well-read and wise wolf is afraid to go to find the next secret. Creatures of the night know to fear her because she knows their weaknesses and because she can out-think them just as well as out-fight them. Whether it is a cave network in the mountains of Peru or a tomb in Egypt, the mystery seeker is an occultist who will stop at nothing to sate her curiosity.'
			}
		],
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
		description:
			'Atypical among Kindred for their origins, the Hecata is a union of the surviving bloodlines and clans that focused on the study and mastery of death itself. For centuries, the Scions of Death fought among themselves for power and even survival. All were descendants of the same Antediluvian, but through internal internecine violence and the relentless march of the Second Inquisition, the students of death whittled themselves down to the point where the only option was to set aside their grievances and recognize that, whatever face Death wore, it was still Death. It no longer mattered if a vampire was from the Giovanni delegation, the hidden Cappadocian remnants and their Lamia protectors, the rotting Samedi, or the cannibalistic Nagaraja. Old grievances were put aside for the sake of survival. Within the clan, the Hecata call the moment where the different Scions of Death joined the Reunion.\nTogether, the Hecata have managed to form an independent bloc of sufficient size and strength that are able to stand alone without the protection of a sect. When they look to Embrace, they tend to look to their extended mortal families. If they look outside of the familiar, they tend to look to mafiosos, soldiers, murderers, or others experienced in death. Doctors, forensic examiners, academic and religious scholars, nurses, morticians, occultists, detectives, and others with a religious or scientific interest in death also tend to attract the interest of the Hecata. People possessed of black humor, grim insight, and firm resolve are valued.\nThe process of becoming part of the Hecata is rarely quick. Prospects are often made ghouls before eventually earning the vote of the family to be Embraced, and they may not even be Embraced by their domitor. Usually, candidates for the Embrace are prepared for it long before they know they are being considered. Their domitor and eventual sire are almost always someone they know. They may not have played a large role in that mortal’s life, but they were a feature at some point. After they conquer death and rise anew, they become one of the family, and loyalty to family is all that matters.',
		inclan: ['Auspex', 'Fortitude', 'Oblivion'],
		inclanDescriptions: {
			Auspex:
				'The Hecata believe that fate has grand plans for them, and they do not hesitate to interfere in the fate of others. What better way than to do so with a power that allows one to receive visions of the future? They use Auspex to help predict a mortal’s death, or they might use it to prevent or hasten their departure. For a clan whose members rarely act on impulse, this Discipline is key to piecing together mysteries and allowing them to catch glimpses of the restless dead.',
			Fortitude:
				'If the Scions of Death were easily killed, they could hardly be masters of death. Believing themselves to be closer to death than any other Kindred, they manifest this Discipline to lay credence to these claims. Absorbing wounds without feeling or consideration, the Necromancers shrug off harm which would destroy a lesser being.',
			Oblivion:
				'Delicate and mysterious, the Hecata’s ability to commune with, manipulate, and control the energies of death is jealously guarded. Using it, they solve mysteries by interrogating specters, fight their rivals with dark powers, and perform powerful mystic ceremonies. Oblivion stains the spirit, but the Hecata gladly pay the price for power over death itself.'
		},
		archetypes: [
			{
				'Cult Leader':
					'Charismatic, natural born leaders, and swift talkers, the cult leader learned to build a loyal following and ruthlessly defend it. The Embrace only enhanced their efforts, and though their name never was Giovanni or any other name that mattered, that hasn’t stopped them from cultivating a cult of willing blood donors falling all over themselves just to catch their eye.'
			},
			{
				'Graveyard Shift':
					'It’s not all unlifestyles of the rich and the famous. Clan Hecata was successful for so many years because they had immortal members in all walks of the mortal world. All across the globe are organizations and businesses whose doors are open 24/7 and who need people to staff the counter. First responders, morgue attendants, law enforcement, gas station attendants and everyone in between can fall into this category. While they generally do not find themselves on the fast track to running a city, their role is vital.'
			},
			{
				'Number One Fan':
					'Life imitates art, and there are far too many examples to list. When they were alive, these Kindred were covered in black, obsessed with Death, magic, and the occult. Horror movies and vampires just had to be real, so these Kindred were unsurprised when the time came for the Embrace.'
			}
		],
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
		description:
			'There is nothing more absolute in the world than a Lasombra’s belief in their own superiority. Theirs is a clan built on obtaining power and wielding it ruthlessly. For centuries, the Shadows were among the rulers of the Sabbat, but, with its downfall, most have switched sides and now vie for positions of power within the Camarilla. However, the switch came at great cost: many Princes required that any Lasombra aspiring to join their Sect put an older Lasombra or a powerful member of the Sabbat to the torch as proof of their new allegiance.\nThe Shadows are exacting and callous in selecting candidates for the Embrace. Members of the clan are attracted to people who have shed weak notions like sympathy and morality to pursue power. Some Lasombra excelled throughout their mortal lives within institutions of organized religion. These childer were not chosen because of any particular level of faith or cruelty. Rather, they were selected because they rose to prominence by acting on their desire: to control their associated congregations through spirituality and using that control as a way to advance their own interests. Also, people who have been exposed to the worst of humanity and emerged victorious, such as crooked cops, crime bosses, pit fighters, and sociopaths, are common Embraces among the Lasombra.',
		inclan: ['Dominate', 'Oblivion', 'Potence'],
		inclanDescriptions: {
			Dominate:
				'Shadows do not hesitate to use Dominate to crush wills and compel obedience in others. Dominate allows them to force their prey into safe spaces for feeding, then wipe away the memory of their presence. To some Lasombra, Dominate is a reflection of their birthright of power.',
			Oblivion:
				'Said to stem from the end beyond death, this ability yields power to harness and weaponize shadows and the dead. However, wise Shadows remember that Oblivion is a corruptive influence that comes at a cost to their Humanity.',
			Potence:
				'Ruthlessness is a characteristic that most Lasombra share, and sheer supernatural strength is a vicious and effective way to demonstrate it. Potence may not be subtle, but, when a final point must be made, tearing an opponent limb from limb can be a very effective way to make it.'
		},
		archetypes: [
			{
				Bruiser:
					'Among those who excel at winning, there is always room for people who win through sheer brute force. As mortals, these Lasombra were likely prize fighters, bullies, or boxers. The clan’s culture of respect for the ruthless acquisition of power has not given them any reason to change old habits.',
				Perfectionist:
					'Seeking perfection in all they do, these Shadows tend to focus on one thing, until they master it so completely there is nothing left for them to learn. Their pursuit of perfection is often at the expense of those around  them, sometimes fatally.',
				'Power Junkie':
					'A self-serving politician, a police officer on a power trip, and an overbearing fast food manager all have one thing in common: the love of power. They tasted it when they were Embraced, and they dedicate their existence to getting more. The Shadows whisper of gains without limit, if only they would reach out and grasp it. These Manipulators do whatever they can to gain power, and hold onto it no matter the cost.'
			}
		],
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
		description:
			'Throughout time, mortals have whispered stories of wise diviners, Oracles who are possessed with the ability to see beyond the mundane. Some claim to see into the future; others interpret dreams and provide insight into worlds beyond the understanding of humanity. Such mortals have drawn the attention of Clan Malkavian from its very beginning.\nIn modern times, the Malkavians continue to Embrace those with “second sight,” but they have also expanded their prospects to mortals with a talent for insight. Doctors, psychologists, and all manner of academics can be found among their ranks, providing the Oracles with a plethora of information at their fingertips. Some Malkavians look for possible childer among individuals who are recovering from trauma as well, seeing great potential for insight through lived experience.\nHowever, insight comes at a cost. Among the stories of those who seek knowledge of the future or the hidden are cautionary tales of what happens when a mind is unprepared for what it finds. All Malkavians suffer from a warped sense of reality to some degree, either from a mortal condition or imparted by the Blood through the Embrace. Sometimes both. To outsiders it seems as if every member of the clan suffers from some sort of derangement.\nOther clans look to the Oracles for their knowledge and their willingness to delve into the unknown without fear of what they might uncover. They tend to pay them little mind otherwise, allowing an attentive Malkavian to listen, learn, and put together pieces they might not otherwise know.',
		inclan: ['Auspex', 'Dominate', 'Obfuscate'],
		inclanDescriptions: {
			Auspex:
				'The Oracles tend to use Auspex for its extrasensory abilities, though the ability to strengthen one’s regular senses has its benefits. Many Malkavians have used this power with frightening efficiency while they hunt, preying on the fears of their designated victim.',
			Dominate:
				'For a Malkavian, the powers of Dominate can be used to make their victims into puppets, twisting their memories of events, making them doubt their own reality. Some even choose to experiment on the human mind, exposing or inflicting psychoses or other altered mental states.. While such experimentation can provide insight, the ability to convince a mortal to willingly give up their blood is the primary benefit of the Discipline.',
			Obfuscate:
				'Deceiving the senses and hiding in plain sight are valuable skills. When subterfuge is needed they will resort to their ability with Obfuscate, allowing them to observe a Court from the shadowed corners of the room, secret themselves into unsuspecting houses, and watch sleeping mortals before they feed.'
		},
		archetypes: [
			{
				Haruspex:
					'Haruspexy is the practice of divination through inspection of the fresh entrails of a sacrificial offering. In ancient times, animals were typically sacrificed, but Malkavians who consider themselves to be haruspices read the entrails of any freshly-sacrificed mortal creature. They must be cautious, as leaving behind too much evidence can lead to undue suspicion falling on the Kindred society as a whole.'
			},
			{
				'Bleeding-Edge Scientist':
					'Obsessed with scientific and magical research and experimentation, these Oracles use their insights, Disciplines, technology and the scientific method to make new discoveries and explore hidden truths. Addicted to the high of exploration, these Malkavians spend countless nights bent over lab tables and fine tuning their experiments.'
			},
			{
				'Copy-Cats':
					'With the combination of Disciplines available to the Malkavians, they make exceptional spies. They employ different methods for this work. Some are so concerned with being seen in open spaces that they skulk around in the shadows, relying on Obfuscate to hide and Auspex to listen and learn. Others turn themselves into mirror images of the clan they are currently watching, ingratiating themselves and conveniently omitting the nature of their clan when asked. If they are “made,” Dominate comes in handy for covering a trail.'
			}
		],
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
		description:
			'The Ministry’s mission is true freedom, bringing spiritual liberation to all descendants of Caine using temptation and subversion. The Ministry are truly adept at breaking their targets down: separating them from their prized possessions, shattering allegiances and friendships, and even destroying someone’s faith. Some consider them more of a cult than a clan, especially their detractors, who consider them to be degenerates and heretics who promise anything to get what they want.\nThe Serpents tend to Embrace from the more underhanded members of mortal society. Criminals, heretics, and the irreligious are common targets, but they find themselves joined in unlife by stage fraudsters, con artists, politicians and self-help gurus. Anyone who knows their way around the lies of mortal life could make a good candidate. Mortals who seek to find the truth behind myths may also find themselves under the watchful eyes of a would-be sire. Academics, philosophy students, teachers, and the occasional archeologist have been embraced for these reasons.\nTheir mission and beliefs are as much a part of their nightly routine as the need for blood. Prospective childer generally begin their indoctrination into the Cult of Set before the Embrace, and many continue on its path after. The goal is reasonably simple: to undermine whatever beliefs that individual held before. As such, their mission can take many forms, mutable and ever-adapting to the individual and their creeds, liberating the believer from the chains that bound them. When they are not performing such a vital service, the Serpents spend their time searching for and obtaining ancient writings and artifacts that would help achieve their lofty goals.\nThe Serpents generally serve two roles to vampires in any given city. They are the hands that sully themselves with things like sex, drugs, smuggling, anything on the “wrong side of the tracks.” Hypocritically, they also serve as the spiritual center of a coterie. They preach spiritual purity to others, while sinning so that others don’t have to. Most Kindred are happy to have a friend willing to risk Humanity so that they do not.\nMembers of the clan often organize into “temples,” with larger cities having multiple small shrines and places of worship. These locations are far from obvious, generally tucked away into the nooks and crannies of back alleyways, seedy dens of iniquity and squalor where Serpents can preach and worship without interruption. For those few who don’t follow the Ministry’s beliefs, others of the clan largely let them be. As long as the clan’s secrets remain hidden, its members are free to do as they please.',
		inclan: ['Obfuscate', 'Presence', 'Protean'],
		inclanDescriptions: {
			Obfuscate:
				'Being able to hide silently and in plain sight makes it easier to discover the secrets and beliefs of mortals and vampires alike. Powerful Serpents use this Discipline to wear the faces of known and trustworthy members of their surrounding populace, enabling them to lure prey to secluded locations, and even into Ministry shrines.',
			Presence:
				'Priding themselves on their ability to coerce and manipulate, the Ministry relies heavily on the powers of this Discipline. Presence allows Serpents to make grand speeches that cut directly to the heart of a congregation in worship or of a single mark waiting for their next fix.',
			Protean:
				'With the ability to change their own shapes, the Ministry inspires awe in observers. The Discipline’s usefulness for making a quick and secure getaway has also not been lost on the Ministry. It is not uncommon to see Serpents taking the forms of snakes as opposed to wolves, but they are masters of its power just as much as the Gangrel.'
		},
		archetypes: [
			{
				Kingpin:
					'These Serpents are leaders of organized crime on all levels. Cybercrime, trafficking, smuggling—if you can name the crime, these are the ones engaged in it. Likely, this was their lot in mortal life, although the Embrace may have inspired a hostile takeover of their former employers.'
			},
			{
				Psychiatrist:
					'Seeking the truth hidden in lies, these Serpents then twist it back. The irony of the role these Ministers play is not lost on them, nor on anyone else in the clan. They master the persuasive arts, hypnosis, and pharmacotherapy in order to bring mortals further into the fold. With other Kindred, Serpents are often the first to break down any reservations one might have, then plant the seeds of belief.'
			},
			{
				'The Non-Believer':
					'As an initiate into the Cult of Set, these mortals really wanted to believe. Something happened, either during or after the Embrace, that removed their blinders once and for all. Having seen the truth, they can’t go back into the dark. They keep their heads down and maintain clan secrets because it’s preferable to the alternative: final death. The clan simply allows them to exist and try to make something of their new-found eternity.'
			}
		],
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
		description:
			'From the first moments of their new existence, a Sewer Rat is separate from other vampires. No other Kindred can understand the pain of the Sewer Rat’s long Embrace, of their body swelling, twisting, breaking and reforming. No other Kindred knows the shock of the first look in a mirror, expecting to see their own face, but being met with a nightmare instead.\nOther Nosferatu have experienced all of this, which often brings members of the clan together as a close-knit family. It doesn’t matter what sect they’re in; the clan has extensive networks for gathering information and communicating between themselves. With connections like that, Sewer Rats make for excellent spymasters. As the other vampires roam the city on the surface, these Kindred have made the sewers their domain, earning their nickname as the uncontested masters of the underground.\nWhile their bodies suffer deformities, crippling injuries and other physical abnormalities, they are not a Masquerade breach. Yet many Nosferatu are hesitant to pass on the Embrace to anyone they actually like. In those rare cases, their childe is chosen from the dregs of human society, those who already know how it feels to be shunned and hidden in places no one wants to look, where even the Nosferatu Embrace would be better than what they had in life.\nOn the other hand, revenge Embraces are common, either to teach a lesson or knock someone down a peg. Should a Sewer Rat witness a stuck-up beauty queen harassing a lower-class worker, that beauty queen may quickly find herself in the agonizing process of joining the most hideous of the undead. She may spend the rest of her existence miserable, and on the outside of the outsiders, or she may learn to see beyond surface appearance and be welcomed as a worthy member of the clan – after all, she has a new perspective now.',
		inclan: ['Animalism', 'Obfuscate', 'Potence'],
		inclanDescriptions: {
			Animalism:
				'With their often-frightening looks, many Nosferatu find animals more useful allies than other Kindred. Animals are often overlooked, and opening communication with Animalism makes them a perfect network of spies and messengers.',
			Obfuscate:
				'Some Nosferatu take pride in their looks; their monstrous images make them distinct as a clan. But many just want to appear “normal,” and Obfuscate allows them to blend in. Even for those that care little for normality, Obfuscate is an extremely effective hunting tool.',
			Potence:
				'If you can take an enemy by surprise, you have the advantage. The common hit-and-hide strategy of the clan, combined with the titanic strength granted by Potence, can make it difficult for targets to thwart and attack before it is too late.'
		},
		archetypes: [
			{
				'Private Eye':
					'With ears and eyes everywhere, this vampire is hard to surprise. In the rare cases they don’t know an answer to a question, they know who to ask to figure it out. In their mortal life, they may have been a police officer or a detective. Now, they work because they enjoy it—they cannot resist following connections, solving puzzles, and learning the secrets they collect in the process.'
			},
			{
				'Freak Show':
					'The carnie might live shunned on the edges of vampire society, but, when they’re on stage, they’re truly themselves. Perhaps they like seeing the fear in the eyes of the crowd, or maybe they just want a moment in the spotlight when so often they’re in the shadows. With the show as an explanation for their looks, they try to keep the Masquerade by hiding in plain sight—a dangerous gamble.'
			},
			{
				Survivalist:
					'This Nosferatu just wants to exist, and they’ll do anything to make that happen. Maybe they miss being able to walk outside or interact without hiding, but they have long since accepted that their existence is limited to sewers and secret places, and they’re going to keep that going as long as possible. If they cannot avoid a conflict between sects, they are on whichever side is winning, making deals with both in ways that neither will find out.'
			}
		],
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
		description:
			'Ravnos prefer subtlety over physicality, masters of deception and manipulation. Why fight your way in when you can charm your way in. This mentality is well known to other clans and many Ravens keep their identity hidden. When discovered they generally move on to places that are not familiar with them. Many Ravnos believe they are akin to the trickster gods: Coyote, Anansi, Loki, Raven, and others. All cultures seem to have a tale of a capricious deity whose divine task is to teach humility and more through their tricks and chaos. The Ravens take this sacred duty to heart, and they continue to ‘instruct’ vampires in all walks of life on a nightly basis. This earns them precious few allies and innumerable hostile relationships. Forced to live on the move, and continually on the outskirts of all society, their lives are lonely and difficult.\nThe Ravnos take these hardships in stride, looking at each task with the smirk of an overconfident stuntman about to make their next leap. For potential childer, they look to mortals who have already severed their close ties to other people. Their isolation makes it so that many newly Embraced Ravnos adjust to the rigors of their changed lives easier than most vampires.\nThe clan is disorganized. Due to their need to be constantly on the move, it is difficult for Ravnos to gather in any number. Through an established and elaborate system of symbols, iconography and gestures, Ravnos come to recognize and know each other, even when they would hide their identities from other clans. Whenever they get the chance, they stop moving in the presence of their clanmates long enough to share stories, a warm meal, and a safe place to spend the day.',
		inclan: ['Animalism', 'Obfuscate', 'Presence'],
		inclanDescriptions: {
			Animalism:
				'Furthering the belief that they are the children of capricious trickster deities, the Ravens find they have an affinity towards animals, especially ravens, foxes, coyotes, spiders and monkeys. Ravnos use animals as spies, distractions and companions while on the move.',
			Obfuscate:
				'The Ravnos excel at manipulating the powers of Obfuscate to create elaborate and sustained hallucinations. The ability to vanish and change their appearance is a must-have in any Raven’s arsenal, but the Ravnos have mastered combining this Discipline with Presence to propel certain properties of Obfuscate beyond themselves into the world.',
			Potence:
				'Ravens lean heavily on the use of Presence. It is an obvious tactic in situations where their innate charm and persuasion just isn’t enough. Almost every Ravnos utilizes this Discipline to some degree.'
		},
		archetypes: [
			{
				'Master of Illusions':
					'Every good magician knows that magic is all about misdirection. Perhaps during their mortal lives they were illusionists, street game hustlers, or even carnival barkers, but one thing remains constant: their force of personality allows them to misdirect and control the narrative. No matter how hard others try to keep their eyes on both hands, there is always a split second where someone blinks. Once this Ravnos has the upper hand, it’s all downhill from there.'
			},
			{
				'Faceless One':
					'These Ravens found a way to set down stable locations, multiple havens in cities large enough that they can sleep in a different place every day, avoiding the curse of their bloodline.Maybe they have a mobile haven, and they park in a different loteach night to avoid detection. Whatever it is, these Ravnos weardifferent aliases and are comfortable no matter what illusory facethey are wearing on a given night. It’s unlikely anyone outside the clan even knows what their real clan is.'
			},
			{
				'Daredevil Extraordinaire':
					'A rare exception to the rule that most Ravnos tend to hide who they are from the surrounding vampiric populace, this Raven thrives in the limelight. They arethe ultimate distraction, keeping their cousins safe by drawingattention towards themselves. They teach lessons through theiractions and back up every one of their wild claims.'
			}
		],
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
		description:
			'Vampire society is about the long game, in which there are winners and there are losers. The Salubri have suffered far more than their share of loss. Once they were eagerly sought out as unparalleled sages and scholars about the Kindred condition; now they are fugitives. Their founder was devoured by a usurper, and their clan was blamed wholesale for the very crimes committed against them. Vicious, dangerous slanders made against them by their enemies go unchecked because there simply aren’t enough surviving Salubri left to refute them. Now, the Salubri are rare, despised, and hunted. It is rumored that only a few exist at a time.\nMany call them heretics simply for believing that their curses can be overcome. Others simply don’t care enough to see through the lies about Salubri being serial diablerists. For these reasons, Salubri are hunted and driven out of any cities where they might try to exist openly. Even Anarch Barons, who might feel sympathy towards their plight, would hardly risk giving a Cyclops safe harbor. The Salubri eke out a shadowy existence, keeping company with their own when they can find them, and hold fast to their duties and ideals. For most Salubri, their ideals are all they have.\nAll Salubri are marked by their lineage by a third eye in the middle of their forehead. Many claim that the third eye first appeared among the clan when their founder gained his enlightenment, but now it is a mark that aids their hunters in finding them. The eye can be covered, but it can never be truly hidden.\nWhen pairing the mark of the third eye with the difficult life that awaits a fledgling Cyclops, the selection of a childe is an incredibly personal matter for a sire. Most Salubri sires look for people who have problems to solve: the terminally ill, those who have endured great tragedy, or pursuers of justice questing to right a great wrong in the world.',
		inclan: ['Auspex', 'Dominate', 'Fortitude'],
		inclanDescriptions: {
			Auspex:
				'Being able to perceive beyond the limits of less-observant Kindred accounts for much of the wisdom of the Salubri. Considered by a philosophical mind, the hidden truths of the world reveal themselves.',
			Dominate:
				'The Salubri can use Dominate to shield other vampires from the horrors of the world, or wash away memories of the atrocities they commit. Troubling memories can be removed, individuals can be bolstered against the consequences of their own actions, and, for a lucky few, these powers can be used as a balm to lead others to redemption.',
			Fortitude:
				'A Cyclops benefits greatly from being hard to kill, especially when it seems the whole world is out to destroy them. Enterprising Salubri are even rumored to use their Fortitude to aid others.'
		},
		archetypes: [
			{
				'Eternal Optimist':
					'Some people are born as the embodiment of “every cloud has a silver lining.” As a living being they spent their energies on helping others in whatever way they could. Maybe they were a devoutly religious person, or they simply saw the benefit in being a true philanthropist. Whatever the reason, the Embrace has only solidified that world view. Being a Cyclops gives them access to powers and abilities to help mortals and undead alike. If they weren’t meant to fill that role, why would they have been chosen in the first place?'
			},
			{
				'Jaded Knight':
					'Vengeance can consume even the calmest and most centered of minds. The Salubri have suffered many wrongs in the course of vampiric history, and some find it difficult to forget and impossible to forgive. Faced with an eternity of ever-deepening hatred and loathing, these Cyclops spend their nights training, honing their skills, and learning whatever they can about their enemy. They hunt those they believe responsible for slights against their clan, often targeting the Tremere.'
			},
			{
				Martyrs:
					'Martyrs can exist in any group rallying behind a cause, but few are more willing to die for justice as those Cyclops in this category. Fueled by ages of being victimized, oppressed, and openly hunted, they have a fervor for change, even at the cost of their unlife. In life, they were among those easily incensed, focused on greater causes. Eternity is too long for anyone to exist, and these fanatics are willing to give their unlives for whatever cause they believe in.'
			}
		],
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
		description:
			'A Toreador craves aesthetic perfection. This may come in the form of painting, music, performance, fashion, the way a light reflects in the raindrops, and everything in between. Anything can be art, and most Divas are or surround themselves with artists of some sort, always trying to create or find something they perceive to be beautiful.\nPotential Embraces are mortals who stand out from the background and shine brightly enough to deserve notice. Many new Toreador childer are artists as well, attracting their sire through their skills, voice, or looks. Beauty doesn’t have to just be the traditional sort, though—a Diva’s tastes age as they do. The trouble with undeath is in how long it drags out. Beauty fades, lives end, stone crumbles, paint peels, and nothing remains as permanent as a vampire. Even the most creative ideas can begin to seem mundane and boring after a few decades. Stunning beauty stared at for too long eventually dulls and leaves the Diva searching for something new, and so the definition of ‘beauty’ is wide, inclusive, and open to personal taste.\nOften, this leads to a stereotype of Clan Toreador as flighty, airheaded vampires who only care about surface looks and finding a good time. This can be accurate. For every childe Embraced for their incredible talent or skill, there is a figure of beauty without a thought between their perfect ears, Embraced in a moment of passion when their sire decided the way their skin reflected in the moonlight needed to be made eternal.',
		inclan: ['Auspex', 'Celerity', 'Presence'],
		inclanDescriptions: {
			Auspex:
				'Divas appreciate the insight Auspex gives them into their victims. With it, they can pick out the mortals who will be more likely to help them discover new experiences and sensations while feeding. They also use it to enhance their ability to read other vampires, learning the intricacies of emotion that can make them easier to manipulate, and appreciate the arts with supernaturally-enhanced perception.',
			Celerity:
				'Performers appreciate the grace they can achieve through Celerity. This Discipline tends to be valued whether or not the vampire is a warrior, as the improved speed and dexterity is useful in many other ways for a clan of sensualists.',
			Presence:
				'Divas use the powers of Presence to sway a crowd with emotions, making them love or hate what they see on the stage. Most importantly, though, Presence manufactures friends and lovers, and makes mortals into willing victims.'
		},
		archetypes: [
			{
				'Night School Teacher':
					'Nothing is more beautiful than the things a living, mortal mind can dream up. Some Toreador have taken up encouraging those minds, teaching art classes for a community college’s night school. Always careful of the Masquerade, they exist on the edge of life and death, trying to remember how to rekindle their own passion.'
			},
			{
				Collector:
					'When their own beauty isn’t enough, and without much in the way of artistic skills, these Divas turn to collecting. Their collections can include paintings and sculptures they wish they could create, or even the nightclub singer they envy. Instead of creating art, these Toreador cultivate art around them.'
			},
			{
				Performer:
					'From slam poetry nights at the local coffee shop to busking in the streets to light shows at underground raves, this Toreador craves the attention of an audience and the praise of a crowd. The medium doesn’t matter, and every few decades they may get bored of their current passion and master something new. The perfection the Diva seeks is the sound of their audience’s approval.'
			}
		],
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
		description:
			'Blood Bonds so integral to the rigid hierarchy of the clan vanished, and the ability to organize as they once did has weakened greatly. Since then, the Pyramid has been fractured, with individuals separating out into one of three major Houses: House Carna, House Goratrix, and House Tremere.<h3 class="h3 mt-4">Major Houses<h3><strong>House Tremere:</strong> All members of House Tremere are Camarilla aligned. Traditional Hermetics remain fiercely loyal to the House and their clan Justicar. This House maintains a semblance of the Pyramid and has a complex internal hierarchy.\n<strong>House Carna:</strong> This House includes both Camarilla and Anarch vampires. Members of House Carna are non-conformists with no required loyalty to House Carna or the Pyramid. They often practice pagan, Wiccan, and other spiritual beliefs.\n<strong>House Goratrix:</strong> There is very little known about this House, and do not usually admit to their allegiance. Rumors claim an ancient vampire of the clan, who has avoided the Beckoning, rules this House secretly. Their goals are unknown at this time.\n\nEach Warlock typically finds themselves serving in one of three ways: they serve the Camarilla with their Blood Sorcery, they serve the clan by being experts in the Occult, and they serve themselves in their pursuit of more power. How each Warlock does this is up to them now, with the choice of what to do with their future ahead of them. The staggering weight of free will sits on their collective heads. Only the future will tell if Clan Tremere can survive it.',
		inclan: ['Auspex', 'Blood Sorcery', 'Dominate'],
		inclanDescriptions: {
			Auspex:
				'Clan Tremere makes good use of Auspex. They can read auras, study spiritual residue, discover traces of supernatural essence, and perceive other things beyond the world of the mundane. Not only that, the secret communication given by Telepathy allows the Warlocks to discuss their plans in ways that can never be accidentally overheard.',
			'Blood Sorcery':
				'A poor replacement for the magicks of the clan founders, but a replacement nonetheless, the Warlocks quickly became masters of Blood Sorcery. The Tremere are constantly learning and experimenting with it, trying to create new rituals and discovering ways to manipulate Blood as both a weapon and tool.',
			Dominate:
				'If power and knowledge lie at the end of a path, a Tremere is sure to be found walking along it. The Warlocks will do nearly anything to further their plans, and Dominate helps them shore up the Masquerade throughout that process.'
		},
		archetypes: [
			{
				'Antique Book Dealer':
					'With a brilliant mind that picks up new information like a sponge, this Warlock has always thrived on structure. Their love of books, of all things old and the mysteries held within, makes them a fount of esoteric knowledge. They are at the forefront of all enterprises to obtain new, obscure information and artifacts, peddling their knowledge and understanding of the occult for the betterment of themselves and the overall survival of their clan.'
			},
			{
				'The Mentalist':
					'When they were alive, they made their living through observation and confidence tricks, playing the numbers of statistical likelihoods and watching the subtle cues of their marks. Now that they are a Warlock, they have gained power that augments their natural talent. Leaning heavily into the powers of the clan, they excel at reading minds and subtly manipulating the actions of others. Already used to a life built on lies, these vampires tend to fall into step quite readily as spies, investigators, and interrogators—all for the good of the clan, or so they might say.'
			},
			{
				'Paranormal Investigator':
					'The Warlocks are ideally suited to investigate the things that go bump in the night and to protect vampiric society from these things. Using their access to some of the greatest libraries and minds in the world, these monster hunters hire themselves out to protect members of their clan and their allies. Just as at home in a library as they are in a brawl, they show an innovative and creative use of all the powers the clan has to offer, making them a frightening opponent.'
			}
		],
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
		description:
			'A distant lord in a castle atop a peak. Villagers going on a visit to the noble’s home, never to return. Crates of dirt are shipped across long distances, as ships fall under mysterious curses while crossing the ocean. Many vampire legends long past are whispered among mortals because of the Tzimisce.\nAbove all things, the Tzimisce care about dominion. Some value owning an area; others value control of certain types of people. Whether it is a neighborhood, a gang, or a company that a Dragon has claimed as its hoard, they are relentless in the pursuit of their ambitions and difficult to remove once they have claimed their prize. To be Tzimisce is to possess because it is right to do so, and to give up one’s dominion willingly is unthinkable. The stereotypical domain of a Dragon was once the stuff of legend. Castles on crags, overlooking entire towns, were a common image for the past of Clan Tzimisce, but now young Dragons are just as often cruel slum lords as they are aloof rulers of beautiful estates. Dominion is not about the ruler helping the ruled to thrive. What matters to the Dragon is ownership.\nEven the Embrace is an act of dominion. When a Tzimisce chooses to Embrace, it is ultimately an act of control. Relationships between a sire and their childer are traditional and hierarchical. In many cases, they are downright controlling. Sometimes, the childe is willing to join the ranks of the Dragons, but, more often than not, the young descendant is Embraced and learns to fear their aloof master. In time, they too will covet, capture, and control in a cycle of dominion. The Tzimisce drive for control extends to their own bodies, which they learn to change and rework through their mastery of Protean. To many Tzimisce, it is essential to master one’s own mind and understand that they walk a philosophical road leading to transcendance of the limits of flesh itself.\nTzimisce were once mighty leaders among the Sabbat, and some of the most relentless and cruel cell members terrorizing Camarilla domains are vengeful Dragons. Since the fall of the Sabbat as a sect, many younger Tzimisce have found their way into the Anarch Movement, where they can protect and guide their gangs. Wise Tzimisce in the Anarchs wear the trappings of a friend, rather than an owner. However, though they may present as a loving and guiding hand, it should never be forgotten that Tzimisce can slip from that loving and providing protector to a domineering tyrant in the blink of an eye. Few Tzimisce have joined the Camarilla. This is generally because they do not do well as possessions, bending knee to an unknowable ancient vampire overlord.',
		inclan: ['Animalism', 'Dominate', 'Protean'],
		inclanDescriptions: {
			Animalism:
				'In the oldest folk stories about vampires, there has always been a connection with the animal denizens of the land. The Tzimisce are a large part of the reason for this. Many Dragons use Animalism as a way of exercising their dominion, turning the local fauna into their dedicated servants.',
			Dominate:
				'Tzimisce will enforce loyalty over those they control, conditioning their servants to perform as extensions of their own will. When using Dominate against their vampiric rivals it gives them the ability to seize anything they desire.',
			Protean:
				'Tzimisce pride themselves on being masters of all, including their own bodies. Using Protean, they can force their bodies into other shapes commonly associated with vampire myths, such as the bat and the wolf. Many Tzimisce have developed methods which surpass the capabilities of basic Protean and allow them to work flesh and bone as easily as artists sculpt clay.'
		},
		archetypes: [
			{
				'Effects Artist':
					'Since the advent of the circus of the bizarre, people with the talent to imagine and create monsters have always been in demand. Dragons excel in this arena, being unafraid to look into the minds of those around them and put faces to their deepest fears. These Kindred become masters of creating living monstrosities, with more than a few students of Protean falling into this archetype.'
			},
			{
				'Statement Piece':
					'Being able to walk into a room and own it with sheer presence is what so many strive to achieve. These Dragons perfect their image to exactly what is needed at that moment. Worshiped and adored as living gods, these Tzimisce cultivate a cult of followers who would lay down their lives for their master’s favor.'
			},
			{
				Entomologist:
					'Most vampires never really consider mastery of animals outside of mammals, and when they do they hardly think to look towards insects and spiders. These Dragons have made the so-called lesser orders of some arthropods their domain, playing on the fear and disgust it inspires. Often, they fashion themselves and their homes with insectoid traits, becoming more and more detached from anything appearing human.'
			}
		],
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
		description:
			'From feudal lords to modern business executives, the Blue Bloods value power and leadership more than anything else in their existence. Tradition and lineage are also important; their Embraces are carefully chosen from actual royalty and the most “successful” members of humanity, the most driven and accomplished. A Ventrue sire expects nothing less than perfection.\nMembers of the clan commonly value history and tradition. From the moment a childe is Embraced, they begin to learn their undead lineage and the various accomplishments of their forebears. The new Ventrue is expected to rise to the same level of success as their predecessors (many of whom still exist, which adds to the stress placed on a new fledgeling). They hold more Court positions than any other clan in the Camarilla; the clan is the very lifeblood of the sect, and the Blue Bloods make sure everyone knows it.\nDeeply rooted throughout history as nobility, many Blue Bloods have taken old feudal traditions and modernized them into corporate boardrooms and back-room political dealings. Every move that a Ventrue makes is carefully strategized to either maintain their power base or acquire more. If that power ever begins to slip, they only grasp harder.',
		inclan: ['Dominate', 'Fortitude', 'Presence'],
		inclanDescriptions: {
			Dominate:
				'The Ventrue consider themselves the masters of this Discipline and especially like to use it to exert control over humanity. They often use Dominate while feeding, both for control and to keep the Masquerade.',
			Fortitude:
				'A different sort of strength holds power fast against the flailing violence of rebels. The physical and mental grounding from Fortitude helps the Ventrue outlast others who would try to take what they have.',
			Presence:
				'Subjects who love their rulers are less likely to rise against them. That love can be entirely fabricated, for all it matters, so long as it benefits the Ventrue.'
		},
		archetypes: [
			{
				Executive:
					'In life, they skyrocketed up the ladder, hungry for each new promotion and always seeking their next opportunity. Naturally, no one ever suspected they had a hand in any suddenly open positions; they were always as smart as they were ruthless. Their success is what first attracted their sire, and they’ve only expanded their enterprise since joining the ranks of the undead.'
			},
			{
				Consultant:
					'Every domain thinks its problems are unique, but this Ventrue has seen it all. Mysterious new drugs, kidnappings, and heightened Anarch tensions are common issues they’re brought in to help solve. With the right mix of confidence, experience, and just the right pedigree, they’re sought after by Princes and other leaders to solve their problems… for the right price.',
				'Heir Apparent':
					'Born with a silver spoon in mouth, this Ventrue was a mortal child of nobility and wealth. But rather than become spoiled or lazy by the ease of their childhood, they chose instead to rise even higher. Everything about them embodies royalty, and their natural way with people only became more powerful after their Embrace. One doesn’t need to be hated to understand the importance of being in charge. It is far easier to subtly manipulate adoring subjects against any rivals.'
			}
		],
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
		description:
			'No one really knows what creates a vampire whose Blood lacks any trace of their sire’s clan. More than a few insist they are all created through pitiable accidents. Vampires of the traditional clans would prefer to hide the fact that the Caitiff are Embracing their own childer with increasing frequency in recent nights. Those mortals sought by Caitiff for Embrace tend to be strong-willed people accustomed to surviving hardship. The unlife of a Caitiff is fraught with challenges and dangers, and a prospective sire will not usually waste their time Embracing someone ready to walk into the sun the first time a Camarilla member treats them like trash.\nDespite their increasing numbers in the modern nights, the Outcasts have been around since the beginning. “Proper” vampiric society shuns them, casting them aside whenever possible. Some Outcasts allow themselves to be treated as lesser, ashamed that their Embrace was a failure. Others welcome their newfound freedom and uniqueness with open arms.\nFor all the negatives associated with being an Outcast, Caitiff have power the clans might never know or realize. Pliable blood without a crippling Bane is the first benefit most Caitiff recognize, but the second, more powerful answer is the strength of numbers. With each night, their population grows, and Outcasts grow more and more organized.',
		inclan: [],
		inclanDescriptions: {},
		archetypes: [
			{
				Vigilante:
					'Fighting for mere survival is not enough. When the power to act is had, then it must be used for the greater good. Vigilantes fight for what they see as justice, or vengeance when justice is unattainable. Their targets range from the mundane to the supernatural, but their motivations give them common ground. Those who benefit from their actions are equally as diverse, and more than one shunned neonate has found their vengeance satisfied through the actions of a vigilante.'
			},
			{
				'Proud Outsider':
					'Being a survivor doesn’t always leave someone humble, especially when opinions on their own self-worth come into play. These Caitiff take no precautions to hide what they are, and may even rally others to shed any shame they harbor about being Clanless. Brash, bold, and often abrasive, they happily tell everyone that they are Caitiff and wouldn’t have unlife any other way. These Outcasts may find themselves taking Praxis or other higher level positions in a city. These proud outsiders must be ready to back up their words with actions, lest they find their immortality cut suddenly short.'
			},
			{
				Imposter:
					'Why deal with the stigma of having no clan when you can pretend to be any clan you want? These Outcasts hide their true nature by infiltrating a clan of their choosing. Many Imposters choose a clan that fits their natural talents. Gifted at playing the piano? Toreador. Love bossing people around? Venture. Many Outcasts who choose this path have either an escape plan, should they be discovered, or a well-paid ally or two who vouch for their identity.'
			}
		],
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
		description:
			'The Duskborn walk a fine line between the worlds of the living and the undead. The fact that they even exist is met with fear, jealousy, and pity by true vampires. Their ability to pass as mortal and the pliability of their Blood makes them uniquely suited for survival outside Kindred society, providing them with talents which can further secure their place in the coming nights.\nNo one knows what enables the Blood to reanimate a thinblood. But it does, even if it should not. Occasionally, some thirteenth or fourteenth generation vampire makes a feeble attempt to create a childe of their own and succeeds. A new Duskborn rises to walk between the two worlds. The only thing certain is that unlife will be hard for these new pseudo-vampires, and they are going to face nightly struggles if they wish to survive. Many Kindred view Duskborn as a threat to the Masquerade and will destroy them if given the chance.\nMost Camarilla domains have issued an edict requiring all thin-bloods to bear a mark of their status: a crescent moon, either tattooed onto their skin by a Tremere or scorched into their skin as a brand. This mark is irreversible, and even Anarchs will think twice about associating with a marked Duskborn.',
		inclan: ['Thin-Blood Alchemy'],
		inclanDescriptions: {
			'Thin-Blood Alchemy':
				'An ingenious use of their diluted Blood, their blood alchemy is attributed to part of why the Duskborn have survived as long as they have. Different draughts allow the imbiber different abilities, and smart thin-bloods always carry a few on them at any given time.'
		},
		archetypes: [
			{
				Judas:
					'There are always people who seek out the Embrace, even amongst organizations of Hunters or other supernaturals who are supposed to disdain vampires as a whole. Sometimes an Embrace occurs, and the thin-blood who results from it is angry and bitter. Their lives were changed, usually against their will, and they will spend every last hour they have on this earth hunting down and destroying the vampire directly responsible for their plight.'
			},
			{
				'Blood Addict':
					'These thin-bloods have developed a taste for the power they can imbibe through drinking the Blood of another vampire. These Outcasts spend their nights seeking out the willing, and even unwilling, to taste so that they can experience all that unlife has to offer them. Unfortunately this thrill risks causing a Blood Bond if they drink directly from the same donor more than once.'
			},
			{
				'True Believer':
					'If thin-bloods weren’t meant to exist, how could they have been created at all? This question weighs on the minds of thin-bloods and true vampires alike. Some thin-bloods believe the rhetoric: that they are a portent, a signal of something greater yet to come, and the next step on the ladder of vampiric evolution.'
			}
		],
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
		description: string;
		inclan: DisciplineName[];
		inclanDescriptions: { [key in DisciplineName]?: string };
		archetypes: { [key: string]: string }[];
		bane: { title: string; explanation: string };
		compulsion: { title: string; explanation: string };
	};
};
