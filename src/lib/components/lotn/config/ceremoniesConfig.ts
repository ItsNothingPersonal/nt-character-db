import type { OblivionCeremoniesConfigSchema } from '$lib/zod/lotn/ceremonies/oblivionCeremonies';

export const ceremoniesConfig: OblivionCeremoniesConfigSchema = {
	name: 'Oblivion Ceremonies',
	characteristics:
		'Unlocked by learning Oblivion, Ceremonies are additional necromantic and/or abyssal effects that must be prepared in advance. Unless otherwise noted, performing a Ceremony requires uninterrupted concentration for five minutes per level of the Ceremony. In addition, it requires a quantity of the caster’s Blood equal to one Rouse check and a specific process combining that Blood with other ingredients.\nCeremonies that affect other characters vary in type. The Attribute used in the pool of the initiating player dictates whether the Ceremony is mental, social, or physical. In addition, any Ceremony effects immediately end if their caster dies. Unless otherwise stated, the caster can only perform Ceremonies upon herself or a location where she is physically standing.\nIn order to purchase a Ceremony, a character must first possess a number of dots in the Oblivion Discipline equal to or greater than the Ceremony level. For example, a character with three dots in Oblivion may purchase up to level-three Ceremonies. Ceremonies are purchased at the cost of the Ceremony’s level x 3 XP',
	ceremonies: {
		'Din of the Damned': {
			level: 1,
			ingredients: ['ash from a crematorium'],
			process:
				'The necromancer draws an unbroken perimeter around a room she wishes to protect using the mixture of her Blood and the crematorium ash.',
			system:
				'Until dawn, any attempt to eavesdrop on events inside the room, be it mundane, technologically enhanced, or supernatural, receives garbled, static-ridden results. Further, a light wind in the area carries the whispers, warnings, curses, screams, and laughter of the dead. Mundane mortals in the area will find this off-putting and foreboding, possibly choosing to leave or to not enter the area at all. This Ceremony can protect rooms up to 100 square feet in size.',
			duration: 'Until dawn'
		},
		'Eyes of the Dead': {
			level: 1,
			ingredients: ['embalming fluid'],
			process:
				'The necromancer applies a drop of embalming fluid mixed with her own Blood to each of her eyes. The mixture is slowly absorbed into his retinas over the duration of the casting time. Unlike most Ceremonies, the small amount of Blood used does not require the necromancer to make a Rouse check.',
			system:
				"For the remainder of the night the necromancer can sense the presence of any corpses within 100 yards and discover their locations with relative ease, even if hidden or buried.\nFurther, she may target a true corpse within her line of sight and, with a simple action, instantly know the details of that creature's death including all of the following:\n▷ When did the target creature die?\n▷ How did the target creature die?\n▷ Has the corpse been altered since death?\n▷ Did the death occur here, or was the body moved after death?",
			duration: 'One night'
		},
		'Guiding Spirits': {
			level: 1,
			ingredients: ['a broken compass'],
			process:
				'The necromancer must fill a broken compass with one Rouse check worth of Blood and concentrate on one location they have been to in the last 90 days.',
			system:
				'Once this Ceremony is complete, the compass turns into a magical object capable of providing direction up to three times per night. To use it, the caster visualizes a destination and opens the compass. The compass will come to life, spinning wildly, before settling on the best route to take to the chosen destination. The route avoids all mundane danger, including street gangs, the neighborhood watch, and police officers. If possible, it will lead the caster in such a way that they will encounter no onlookers at all. This Ceremony expires at dawn, and the compass becomes a mundane working object.',
			duration: 'Dawn'
		},
		'Summon Spirit': {
			level: 1,
			ingredients: ['a broken mirror', 'rotting or dead wood', 'ash from an extinguished fire'],
			process:
				'Grinding the mirror to dust and mixing it with her Blood, the necromancer pours the paste over the pile of wood. Then the ash is slowly sprinkled over the wood, causing a blue flame to slowly rise like an unnatural campfire. This flame is not truly corporeal and will not cause damage or Frenzy. In the Underworld nearby, wraiths can see this flame and are attracted to it. If a fetter is placed in the fire, the wraith it belongs to must travel to you.',
			system:
				'Summon Spirit can be used to summon a specific wraith if you possess one of its Fetters. Alternatively, you can summon the closest uncontrolled wraith. The wraith normally arrives over the course of the Ceremony’s casting time, so long as she is capable of reaching your location. Wraiths can pass through walls, but they cannot fly, nor can they cross barriers enchanted against their passage. Unless they materialize, wraiths are invisible to individuals who do not have the Medium Merit, Oblivion Sight, or other such powers. Unlike normal wraiths, wraiths summoned with this power materialize in the real world for 15 minutes, and will do so when they arrive to your summons.\nWraiths summoned by this power are created by the Storyteller if important to the story. If not, they are Simple Antagonists (difficulty 4). They are under no obligation to obey you, but they will generally stay and speak to you for at least 15 minutes unless attacked or intimidated. Summon Spirit does not work if used in the Underworld.',
			duration: 'Fifteen minutes'
		},
		'Awaken Homuncular Servant': {
			level: 2,
			ingredients: [
				'Body parts or an animal carcass',
				'the weapon used to kill the aforementioned person or animal',
				"the evacuated bodily fluids present at the animal or human's death"
			],
			process:
				'The necromancer coats the murder weapon with the gross mixture of bodily fluids. She then uses the weapon to remove a specific limb, such as a hand or skull, or carve open the animal carcass (which can be no larger than a small dog). Then she pours her Blood into the carcass or limb, which comes to life as a homuncular servant loyal only to its creator.',
			system:
				"The homunculus can scale walls, hop, “walk,” and even hide effectively, regardless of what form it takes. It cannot fly, even if it had wings in life; they are far too decayed and mangled to be capable of flight. It can see even if it doesn’t have eyes. While it cannot speak, regardless of it still having a mouth or not, it can communicate telepathically with its master by sending a slideshow of single images. It can only perform simple tasks such as pulling levers and pushing buttons; more complex tasks such as attacking, typing, or controlling a vehicle are impossible. The homunculus will spy and intimidate at its master's command.\nA necromancer can create and control one homunculus for each dot of Oblivion she possesses.",
			statblock: {
				name: 'Homuncular Servant',
				description:
					'Attributes: Physical 1, Social 0, Mental 0\nSecondary Attributes: Health Levels 3, Willpower 1\nDice Pools: Athletics 4, Stealth 6, Intimidation 4\nCharacteristics: Homunculi take damage as vampires except they are immune to sunlight. They cannot heal, mend damage, or initiate attacks. They are immune to mental and social powers and have no blood within them. They do not need limbs to move, nor eyes or ears to perceive their surroundings. They are immune to all sensory deprivation powers and Conditions. They can telepathically broadcast single images to their master.'
			},
			duration: 'Until destroyed'
		},
		'Blinding the Alloy Eye': {
			level: 2,
			ingredients: ['A small piece of aluminum mesh'],
			process:
				'The necromancer must spend 10 minutes in isolation with a wraith or a spectre. The chosen death spirit then bonds with the aluminum mesh. This requires a willing spirit or a spirit subjected to the Oblivion power Compel Spirit. The mesh can then be stored in a light-proof container that can be taken out when the effect is activated.',
			system:
				'The necromancer must remove the mesh and attach it visibly to a piece of flesh or garment to initiate the effect of this Ceremony. Once initiated, for the remainder of the scene or until the mesh is removed, no electronic surveillance will clearly record the necromancer. Instead, all recordings of the necromancer appear blurred, distorted, or scrambled, making her unidentifiable. Only the necromancer’s image is affected; everything else appears normally. A necromancer may only have one mesh prepared at a time, and only the necromancer can benefit from this ritual.',
			duration: 'One scene or until removed'
		},
		'Compel Spirit': {
			level: 2,
			ingredients: [
				'An unbroken mirror. The necromancer must be able to see (even through a power such as Oblivion Sight) and be able to gain the target wraith’s Gaze and Focus.'
			],
			process:
				'The necromancer must show the target wraith their reflection by obtaining the wraith’s Gaze and Focus. Having been summoned by the necromancer using the Summon Spirit Ceremony counts as having gained Gaze and Focus. Finally, she must cast (throw) one Rouse check worth of her Blood at the wraith.',
			system:
				'Once the casting has been completed, the necromancer must make a Manipulation + Intimidation challenge vs. the wraith’s Resolve + Composure. If successful, the necromancer can speak a simple set of instructions for a number of tasks equal to the necromancer’s dots in the Oblivion Discipline. The wraith will immediately attempt to carry out the instructions until the activity is reasonably complete or for one hour, whichever comes first. At the end of the hour or when the task is completed, the wraith will return to the necromancer. The necromancer must then win another challenge or the wraith is free to leave of its own accord. If the necromancer wins the subsequent challenge, the wraith is compelled to continue any unfinished tasks or partake in any new ones. A wraith under the effects of Compel Spirit can only ever have a number of tasks equal to his masters’ dots in Oblivion in place at once. Unlike uses of Dominate, the effects of this Ceremony do not end if the wraith is damaged whilst carrying out her instructions.',
			duration: 'One hour or until complete or extended'
		},
		'Sin Eater': {
			level: 2,
			ingredients: [
				"The destroyed and burnt remnants of an obvious religious item. This could be a bible (or other religious text), a priest's collar (or other religious clothing), or a box of communion wafers."
			],
			process:
				'The necromancer mixes ash from the burnt item and his Blood, then consumes it while speaking a prayer appropriate to the character’s religious beliefs. (Non-religious characters meditate in silence.) Consuming the mixture of ash and Blood does not Slake any Hunger.',
			system:
				'For the remainder of the night, whenever another character gains a Stain within your line of sight, you may Slake one Hunger (to your lowest maximum Hunger based on your Blood Potency, and never below 1). You must then make a Resolve + Oblivion challenge vs. a difficulty of 4+ the number of Stains you have. If you fail this challenge, you also gain one Stain.',
			duration: 'One night'
		},
		'Black Blood': {
			level: 3,
			ingredients: ['Nightshade', 'squid ink'],
			process:
				'The necromancer combines the ground up nightshade and squid ink with some of her Blood. She then consumes the mixture. Consuming Blood in this way does not Slake any Hunger.',
			system:
				'The next three times another character attempts to feed from you in any way, they Slake no Hunger (nor do you gain a Hunger) as they consume your dead Blood instead. This Ceremony lasts for one night before needing to be cast again, even if your Black Blood has not been fully consumed.',
			duration: 'One night'
		},
		'Chill of Oblivion': {
			level: 3,
			ingredients: ['A one-foot cube of ice'],
			process:
				'The necromancer must first open her rib cage and expose her heart, causing one point of Aggravated Damage to herself in the process. She must then lie upon bare earth with the cube of ice on her chest and let it melt. Her heart slowly becomes encased in ice over the next 15 minutes. She must then Rouse the Blood to keep it from freezing solid.',
			system:
				'A necromancer benefitting from Chill of the Oblivion adds +2 to her pools to resist Terror Frenzy when caused by the presence of fire. She can also make a Rouse check and use her standard action to extinguish an area of fire, up to 250 cubic feet (roughly the size of a medium closet) within five steps of her, by exhaling a visible cloud of freezing air. This requires no challenge.\nWhile under the effects of Chill of Oblivion, she draws in heat from her immediate environment, making others noticeably and unnaturally cold while within one step of her. In addition, the taint of the dead makes her an easy target for malevolent wraiths who receive a +1 bonus to their test pools when targeting an individual affected by this Ceremony.',
			duration: 'Until dawn'
		},
		'Forsaken Edifice': {
			level: 3,
			ingredients: ['mushroom seeds', 'moonflower seeds', 'a building empty of all inhabitants'],
			process:
				'The necromancer must steep mushroom and moonflower seeds in his Blood. He then plants them around the perimeter of a target building. They do not have to be planted in contiguous lines; one or two plants on either side of the building is enough.',
			system:
				"At night the mushrooms will glow with a faint bioluminescence, and the moonflowers will bloom. Regardless of its actual current state at sunset, the building itself will appear abandoned and closed up, “dead” as far as that applies to a building. The windows will appear boarded up or covered over; the doors will appear locked or chained shut. Listening at the door will provide no auditory evidence of any inhabitants. For all onlookers, regardless of what is happening inside the building, the building looks completely abandoned from the outside. Heightened Senses and similar powers will not pierce the effect of this Ceremony, but powers such as Sense the Unseen will detect its usage.\nThe necromancer must take care to not cast this ritual on well-trafficked buildings. While the ritual protects people from hearing or casually observing what's happening inside, it does not prevent anyone from entering. A curious mortal, wondering why his favorite late-night coffee store has suddenly closed, might decide to try and look inside. They will simply see the insides of the building, appearing as normal, but unoccupied and unused. If someone enters the building, the Ceremony does not end, but the entering person is no longer affected by it. You may only have a single active instance of this Ceremony active at a time. The use of this Ceremony lowers the Veil Density to Frayed (see Oblivion’s Sight, page 244), which does have a tendency to attract wraiths to the area.",
			duration: 'One month'
		},
		'Shambling Hordes': {
			level: 3,
			ingredients: [
				'A number of human corpses, up to the necromancer’s dots in Oblivion',
				'a living mortal sacrifice.'
			],
			process:
				"The necromancer arranges the corpses together in a pile. She then sacrifices the living mortal (gaining two Stains) and spills the victim's blood on the corpses she wishes to animate. The sacrificed human dies in the process and does not animate. This Ceremony does not require a Rouse check nor any of the necromancer’s Blood.",
			system:
				'After the casting is complete, the corpses animate into aggressive Shambler zombies. These zombies will serve only their creator’s commands and can follow moderately complex orders such as “Kill anyone who enters this room” or “Break in and destroy everything in that building.” If left unattended, they will attack any living creature on sight. A Shambler’s creator can order them into stasis, which is the only way to keep them docile. Shambler zombies do not decay or continue to rot. They will exist until destroyed. A necromancer can maintain and control a number of Shamblers equal to his Oblivion score.',
			statblock: {
				name: 'Shambler Zombie',
				description:
					'Attributes: Physical 4, Social 0, Mental 0\nSecondary Attributes: Health Levels 4, Willpower 0\nExceptional Pools: Brawl 6, Survival 6\nCharacteristics: Shambler Zombies take damage as vampires, except they are immune to sunlight. They cannot heal or mend damage. They are immune to mental and social powers and have no blood within them. They do not need eyes or ears to perceive their surroundings. They are immune to all sensory-deprivation powers and Conditions. Zombies do not suffer from the Impaired Condition for having zero Willpower. Bites from Zombies inflict Aggravated wounds to mortals.'
			},
			duration: 'Until destroyed'
		},
		'Bastone Diabolico': {
			level: 4,
			ingredients: ['human thigh bone'],
			process:
				'The necromancer must clean and prepare a thigh bone from a human corpse. After it is clean, a number of Stygian runes are carved into its surface.',
			system:
				'The thigh bone is permanently enchanted to cause great harm to the restless dead and the inhabitants of the Underworld. Any time the necromancer successfully hits a zombie, wraith or other permanent inhabitant of the Underworld, such as a Specter, the necromancer automatically achieves a critical win. Ghosts and zombies can sense a Bastone Diabolico. They tend to stay away from individuals carrying one. A necromancer can have only one Bastone Diabolico in existence at any time. Creating a new one causes the old one to disintegrate.',
			duration: 'Until destroyed'
		},
		'Bind Spirit': {
			level: 4,
			ingredients: [
				'A wraith’s fetter or control of a wraith, via the Compel Spirit Ceremony, and sufficient salt to surround a location. If you are targeting a character, you must possess some part of their body, such as hair, blood, skin, or, in the case of a vampire, some of their remains. Alternatively, you must know their birth name.'
			],
			process:
				"If used to bind a spirit to a location, this Ceremony requires the necromancer to mix her Blood and the salt and paint a circle around the target location, which can be no larger than an estate house or mansion. This must be done while the wraith is Compelled to be inside the circle, or the caster must place the wraith's fetter inside the circle upon completion. If this Ceremony is used to target a character, the necromancer must surreptitiously place the fetter or salt and blood mixture on his target. This requires a successful Dexterity + Larceny challenge vs. the target's Wits + Awareness. Your Storyteller may agree to an alternative challenge depending on your methods.",
			system:
				'Once completed, your location or target becomes Haunted. If a location, the location gains the Haunted (••) Disadvantage (see page 150). If the target is a character, the character temporarily gains the Haunted (••) Flaw (see page 186). Gaining either the Flaw or Disadvantage through this Ceremony does not let the target player offset the cost of Advantages or Merits. The wraith is bound to the location or person until destroyed. Once destroyed, the Disadvantage and Flaw are removed from the target character or location. Wraiths are invisible to individuals who do not have the Medium Merit, Oblivion Sight, or other such powers. Unless summoned with Summon Spirit, wraiths may not manifest in the real world unless the Shroud Density is Absent (see Oblivion Sight, page 244). Instead, they torment their location or target according to their wraith type (see Wraiths, page 327).',
			duration: 'Until destroyed'
		},
		'Faces of the Dead': {
			level: 4,
			ingredients: [
				'An obsidian dagger and either a freshly-dead corpse with no damage to the skin or a live person'
			],
			process:
				"The necromancer removes a body's top layer of skin with an obsidian dagger, taking care to damage the skin as little as possible in the process. If this is performed on a living mortal being, they die in the process and the necromancer gains two Stains.",
			system:
				"The necromancer then dons the facial skin of her victim, which forms a second layer over her own. The victim needs to be of relatively similar stature—otherwise, the features become distorted, and the disguise becomes useless. Under normal scrutiny, the ruse is visually flawless. The Ceremony’s magic will also supernaturally mimic the victim’s fingerprints and retina scans, even fooling DNA tests. However, the disguise imparts none of the victim’s knowledge and mannerisms, including her voice. Proper mimicry of a victim's mannerisms requires a Manipulation + Performance vs. a difficulty of 8 after at least 15 minutes of study. If the necromancer has observed her victim for at least an hour, the difficulty is 5. If the test is successful, they act convincingly for the scene in front of anyone who recognizes the deceased.",
			duration: 'Until ended'
		},
		"Heart's Bane": {
			level: 4,
			ingredients: [
				'a Rouse check worth of the necromancer’s blood',
				'a needle made of bone',
				'a human eye'
			],
			process:
				'The necromancer chants in a forgotten language while soaking a human eye in her blood. When the Ceremony is prepared, the necromancer pierces the pupil of the eye with the bone needle in a representation of perfect accuracy.',
			system:
				'Once this Ceremony is complete, any sharp object the necromancer holds may be used to stake a vampire in hand-tohand combat. This provides the Staking quality as a bonus trait for any sharp Melee weapon the necromancer uses.\nIn addition, if attempting to stake a vampire with a wooden stake, you may immediately end this effect to automatically succeed on one of the Staking tests. The other Staking tests in the attempt to stake a target are unaffected.',
			duration: 'Until sunrise or until expended, whichever is shorter'
		},
		'Ethereal Horde': {
			level: 5,
			ingredients: ['A human skull from a human sacrifice engraved with arcane sigils and runes'],
			process:
				'The necromancer must ritually sacrifice a human and remove her skull. Doing so causes the necromancer to gain one Stain. She must then soak the skull in her own Blood for one complete evening. After soaking, the necromancer carves ancient stygian runes and sigils in it using an iron knife, again, soaked in her own Blood. This successfully creates the spirit beacon necessary to complete this Ceremony. A spirit beacon is a supernatural object that has Size 1 and Structure 3 (three Health levels).',
			system:
				"The necromancer must make one Rouse check and spend a standard action to activate the spirit beacon. Once activated, the arcane sigils and runes glow with a soft, sickly light, both in the physical world and the dead lands.\nA cloud of 10-15 minor wraiths are summoned and manifest in the living world, swirling around the location of the spirit beacon. As a standard action, the necromancer can force the cloud as a group to attack a number of other characters equal to your Occult dots, with a test pool of 6 vs. the target's Dexterity + Athletics. These characters must be within 15 steps of the beacon. On a success, the necromancer chooses whether the target takes one Normal Damage or loses one Willpower. Each target may only be attacked once per round by the cloud, and different targets may suffer different consequences from the cloud’s attacks. Critical wins have no added benefit.\nEthereal Horde lasts until the necromancer spends a simple action to reverse the effect of the spirit beacon and drive the cloud away. Ethereal Hordes can be attacked, but, because of their chaotic behavior, they are immune to area-of-effect powers. Each individual wraith is considered a Simple Antagonist (difficulty 3). If the number of wraiths in the Ethereal Horde is ever less than necromancer’s Occult score, the remaining wraiths flee and the beacon falls safely inert. If the necromancer's beacon is destroyed, the wraiths return to the dead lands and disperse.",
			duration: 'Until destroyed or ended'
		},
		"Chalchiuhtotolin's Judgment": {
			level: 5,
			ingredients: [
				'A dagger made of obsidian or flint',
				'a clay pot of rotting fruit',
				'an item personal to the target victim'
			],
			process:
				'The necromancer cuts themselves, forcing a Rouse check worth of blood over the rotting fruit. The resulting mixture is mashed together into paste, which is used to coat the personal item of a target character. The personal item is then buried at least one foot below ground in natural earth.',
			system:
				'Once targeted by this Ceremony, the target makes a static test using her Stamina + Resolve with a difficulty equal to Resolve + Occult. If the target fails this challenge, she takes one point of aggravated damage as her flesh rots and falls off in clumps. Repeat this process once per hour until the target either succeeds in a challenge (indicating her body has finally resisted the disease), dies, or she falls into torpor. Until the disease has been resisted, the victim appears grotesque and sickly to onlookers.\nLiving characters can die from this Ceremony, but vampires stop taking damage from this power once they fall into torpor. If a vampire voluntarily enters torpor before running out of health levels, this ritual continues to eat away at her flesh until she runs out of health levels. The personal item used in this ritual is destroyed once the disease is resisted.',
			duration: 'Until resisted'
		},
		'Alone in the Dark': {
			level: 5,
			ingredients: ['A tub of saltwater'],
			process:
				'The necromancer mixes his Blood with the salt water and then submerges himself beneath the water for the duration of the casting time. The Ceremony must be performed in complete darkness in order to succeed.',
			system:
				'When the necromancer emerges, her psychic aura is flooded with darkness. If a character attempts to use powers that do not require line of sight (such as Summon or Clairvoyance), or that require past interactions with you, a name, or a personal item, the attempt automatically fails. In addition, until the end of the night, you do not leave a psychic impression that can be detected through Spirit’s Touch or similar powers.',
			duration: 'One night'
		},
		'Avatar of Rot': {
			level: 5,
			ingredients: [
				'at least one pound of rotting flesh',
				'a few ounces of nightshade, hemlock, snakeroot',
				'the fresh stomach of a medium-sized animal or mortal (living or dead)'
			],
			process:
				'The necromancer grinds up the herbs into a slurry with her own Blood. He then pours the mixture over the rotting flesh. The rotting flesh is then placed inside the fresh stomach. The necromancer then must carve open his abdomen and place the stomach inside her own undead body. She may then heal the wound with one Rouse check.',
			system:
				'For the rest of the night the necromancer may spend a standard action to corrode and blight anything she is touching with her flesh, rendering the item useless. In combat you may even destroy an item held by another character. To do so, she must win a Strength + Brawl challenge against a target character and, instead of doing damage to her target, she may destroy an object held or worn by her target. The blighting effect works immediately on items up to the size of a large book. Larger items take several turns or even longer, depending on their size and density.\nIn addition, once per night, the necromancer may pierce her abdomen (and her false stomach) by spending a simple action to stab herself, doing one Normal Damage. The rotting flesh and horrible smelling mixture of herbs comes spilling out, filling the area with an awful spell of decay and rot. For the remainder of the combat scene, while within five steps of her, other creatures must spend double the normal cost to utilize any healing effects. In the case of vampires, two Rouse checks are required to mend wounds. All benefits of this Ceremony end after a combat scenario in which the false stomach was pierced in this way. The effects of this Ceremony do not stack with other powers such as Aura of Decay.',
			duration: 'One night'
		}
	}
};
