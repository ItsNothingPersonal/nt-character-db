import type { ProteanConfigSchema } from '$lib/zod/lotn/disciplines/protean';

export const proteanConfig: ProteanConfigSchema = {
	name: 'Protean',
	characteristics: {
		type: 'Physical',
		masqueradeThreat: {
			type: 'High',
			description: 'Nearly every Protean power breaches the Masquerade when used.'
		},
		bloodResonance: 'Animal blood'
	},
	powers: {
		'Eyes of the Beast': {
			level: 1,
			cost: 'Free',
			system:
				'Use a simple action to activate Eyes of the Beast. While active, your eyes glow a soft, feral red, and you can see perfectly even in pitch darkness. Unless otherwise stated, you ignore the Blinded Condition when it is inflicted by mundane or supernatural darkness. Eyes of the Beast lasts until dawn or you choose to deactivate it.',
			duration: 'Until dawn'
		},
		'Weight of a Feather': {
			level: 1,
			cost: 'Free',
			system:
				'You may activate Weight of the Feather as a simple action. While active, the user is immune to falling damage, collisions from external objects (does not include attacks utilizing the Marksmanship Skill), or being thrown into objects. In addition, the user will not trigger devices reliant on weight, such as mines.',
			duration: 'One scene'
		},
		'Feral Weapons': {
			level: 2,
			cost: 'One Rouse check',
			system:
				'Spend your simple action to activate Feral Weapons. When activated, your Brawl attacks do Aggravated Damage to mortals. In addition, when you successfully strike a vampire with a Brawl attack using your claws, they must immediately make one Rouse check without any benefit as the claws draw blood from the otherwise un-bleeding vampire body. Combat maneuvers do benefit from Feral Weapons.',
			duration: 'Until dawn'
		},
		'Earth Meld': {
			level: 2,
			cost: 'One Rouse check',
			system:
				'Use your simple action to begin sinking into the ground. You must be touching the earth (clay, soil, or any other soft-consistency ground) in order to use Earth Meld. At the end of the turn, you resolve any Grappled Conditions you may have and become supernaturally joined with the earth. Before the end of the turn, you may attack and be attacked as normal. If you choose to end this power willingly and are still part of a combat scenario, you appear at the end of the turn and may act normally again on the following turn.\nWhile joined with the earth, the vampire exists in a semisolid form and cannot take actions or use any powers. While awake and melded with the earth, you can perceive your surroundings as though you were standing above the ground with which you are merged. Melding with the earth shelters a character from the sunlight during the day, or from fire searing the ground overhead, and makes the vampire immune to most forms of physical harm.\nSignificant disruption to the ground where a character is melded ends this power prematurely, immediately ejecting the vampire from the ground. An ejected vampire returns to full wakefulness immediately, showering dirt in a wide radius as she erupts violently from the soil. Typically, this disruption takes three minutes of digging. Using tools to disturb the ground can reduce the time needed to disrupt an Earth Meld. For example, a character with a shovel might be able to eject a melded vampire in two minutes, whereas a character with a pipe bomb could eject her with a single standard action.\nEarth Meld allows a vampire to sink into dirt or other naturally-occurring substances with similar consistency, such as sand or gravel, but cannot be used to meld with (or pass through) concrete, rock, metal, plastic, wood, or any other ground covering. Earth Meld cannot be combined with transformative powers; melding with the earth returns a vampire to her original state.',
			duration: 'One day or more, or until disturbed'
		},
		Vicissitude: {
			level: 2,
			amalgam: { name: 'Dominate', value: 2 },
			cost: 'One Rouse check',
			system:
				'You gain the ability to make and maintain Vicissitude alterations to your body. You may have one alteration active at a time for free. Each additional alteration costs the temporary loss of one Physical attribute of your choosing each as you redistribute body mass to new areas. Any lost Physical attributes return when your total number of alterations becomes one or fewer. Making an alteration requires five minutes. Choose from the following list of alterations:\n▷ Appearance: You may physically sculpt your features to any appearance within a normal human range. You can alter your face, size, skin, sex, or hair color. You may also make yourself taller or shorter by up to one foot. To mimic a specific person’s appearance, you must have at least two dots of the Medicine Skill, and you must study that individual from multiple angles for at least fifteen minutes. This study must be done live; it cannot be done through recordings.\n▷ Voice: You may alter your vocal cords to change your voice however you wish. You may duplicate another person’s voice if you have three dots of the Medicine Skill and have spent at least five minutes listening to that person speak. This study must be done live; it cannot be done through recordings.\n▷ Horrifying Appearance: By making yourself appear horrifying through alterations, you may gain a +3 bonus on mundane Charisma + Intimidation checks to terrify mortals. This is a Masquerade breach, but some fleshcrafters do this and use Dominate to cover up the deed.\n▷ Bony Weapons: You may alter your skeleton to create a bone weapon with the Concealable quality. This weapon can be wielded using either the Brawl or Melee Skill and may not be disarmed.\n▷ Hag’s Wrinkles: You may conceal items up to the size of a large handgun within folds and pouches in your flesh. Accessing items stored in these pouches requires a simple action.\n▷ Bone Tool: You can modify your fingers to be more efficient for various tasks that would otherwise be accomplished by a tool. In this way, you could give yourself the ability to pick locks, hotwire cars, tailor a suit, or any other thing that a tool would assist with. This reduces the difficulty of a test by two, as if you had Superior Miscellaneous Gear. This effect does not stack with Gear.\n▷ Climbing Spurs: You may add spurs to your feet and hands that allow you to climb surfaces without handholds at your normal speed. This does not require a test.\nMaking such alterations requires concentration and time. You must spend at least five minutes of relatively focused effort on making each alteration. These alterations are permanent until reverted through another use of Vicissitude, or they may be mended, with each change healing at the same rate as one Aggravated Damage. Vicissitude is not a transformative power, nor are the alterations it creates. When using a transformative power, any alterations made from Vicissitude cease to function unless otherwise stated.',
			duration: 'Until healed or undone with other uses of Vicissitude'
		},
		Fleshcrafting: {
			level: 3,
			amalgam: { name: 'Dominate', value: 2 },
			prerequisite: 'Vicissitude',
			cost: 'One Rouse check',
			system:
				'Once purchased, you may now use Vicissitude on other characters. Unwilling targets must be restrained or have the Helpless Condition during the entire process. The use of Vicissitude on an unwilling victim causes one Stain. Fleshcrafting another character requires physical contact.\nMaking such alterations requires concentration and time; you must spend at least 10 minutes of relatively focused effort on making such alterations. These alterations are permanent until reverted through another use of Vicissitude, or they may be healed with each change healing at the same rate as one Aggravated Damage.',
			duration: 'Until healed'
		},
		'Unfettered Heart': {
			level: 3,
			cost: 'Free',
			system: 'You are immune to Staking.',
			duration: 'Passive'
		},
		Shapechange: {
			level: 3,
			cost: 'One Rouse check',
			system:
				'When you learn the Shapechange power, you may select one animal roughly the same mass as your human shape. Youlearn how to transform into this creature. You may make one Rouse check and spend your simple action to transform into this creature’s form. You maintain your Attributes and Skills while doing so but are unable to use equipment. Any equipment you possess when you activate Shapechange melds into your new form and disappears. While using Shapechange, you are indistinguishable from a natural animal. Shapechange is a transformative power. If you wish to purchase additional animal forms, they may be purchased for 3 XP each.\nWhen you select the animal, you may select one of the following benefits. The selection made should reflect the natural capabilities of the animal you have selected.\n▷ Fast: This animal is known for its speed. You may take one additional step per action spent moving and may automatically succeed on Athletics tests related to running and jumping so long as it would be possible for the animal to do so.\n▷ Slippery: This animal is hard to pin down or otherwise good at escaping a Grapple. You may spend your simple action to slip out of a Grapple without a test.\n▷ Climber: This animal is an excellent climber. You may climb up surfaces at your normal movement speed (using either your simple action, standard action, or both without requiring tests), so long as there are sufficient outcroppings or handholds for you to use.\n▷ Swimmer: This animal is an excellent swimmer. You may swim at your normal movement (using either your simple action, standard action, or both without requiring tests).\n▷ Night Vision: This animal is known for excellent night vision and may see in natural darkness without penalty.\n▷ Smell: This animal has a finely-tuned sense of smell and may smell details that a normal person cannot. This may allow a character to track down a target by smell if the Storyteller rules that it is appropriate to do so. Wits + Survival static tests may be needed depending on how difficult the tracking would be. However, this talent may not be used to overcome a Fair Escape.',
			duration: 'Transformative'
		},
		Metamorphosis: {
			level: 4,
			cost: 'Free',
			prerequisite: 'Shapechange',
			system:
				'Purchasing Metamorphosis gives you access to an additional animal form when using the Shapechange power. This second animal form can have mass as low as one pound (like a rat) or up to one ton (like a bear). Though it is a Masquerade breach to do so, you may choose to change into a singular abnormally large creature from a type of swarm, such as an unusually large insect or spider.\nWhenever you select an animal form, you may select two benefits. These benefits can come from the Shapechange or Metamorphosis ability lists to determine your form’s capabilities. These selections are permanent. The selections made should reflect the natural capabilities of the animal you have selected. In addition, your Brawl attacks now do Aggravated Damage while transformed. If you wish to purchase additional forms with new traits, they may be purchased for 5 XP each.\n▷ Flight: This animal can fly. You may fly at your normal movement (using either your simple action, standard action, or both without requiring tests).\n▷ Huge: This animal is very large, like a bear. You gain one additional health level and do one additional damage to structures or inanimate objects with your Brawl attacks. When this power expires, remove a health level that does not have damage assigned to it. If you have no empty health levels after removing the bonus health level, you fall to torpor.\n▷ Stealthy: This animal is very small and stealthy, like a rat. You gain +3 to mundane Dexterity + Stealth tests to avoid notice and do not trigger mundane security apparatuses such as pressure plates or motion sensors.\n▷ Burrower: This animal is excellent at tunneling. You may tunnel through dirt, packed earth, sand, mud, and other similar non-manufactured earth at your normal movement (using either your simple action, standard action, or both without requiring tests). Manufactured items such as concrete or hard objects like rock cannot be burrowed through.\n▷ Echolocation: This animal navigates by echolocation, like a bat. You gain the ability to echolocate within 15 steps of you by emitting a sound that is outside the range of human hearing. You automatically detect characters hiding with mundane Stealth tests within that radius and are immune to the Blinded Condition. Characters within 100 feet of you with Heightened Senses active may hear this as a highpitched noise with a Wits + Awareness test at difficulty 6.',
			duration: 'Transformative'
		},
		'Abrupt Internment': {
			level: 4,
			cost: 'One Rouse check',
			amalgam: { name: 'Auspex', value: 1 },
			challengePool: {
				attacker: { attribute: 'Strength', skill: 'Survival' },
				defender: { attribute: 'Strength', skillOrAttribute: 'Athletics' }
			},
			system:
				'Make one Rouse check and spend a standard action to target a character within your line of sight that is standing on any type of ground covering, including dirt, concrete, rock, metal, plastic, or wood. If you succeed in the opposed challenge, you cause your target to become Grappled, as she sinks into the ground to a depth reaching just below her knees. While your opponent suffers the Grappled Condition in this way, you can move and act normally without ending the effects of the Grapple; this is an exception to the rules limiting your ability to move farther than one step or target other characters while maintaining a Grapple. If an individual Grappled by this power attempts to escape, she must succeed in a static challenge using her Strength + Brawl or, if appropriately armed, Strength + Melee vs. your Strength + Survival.\nIn addition, you can target inanimate objects with Abrupt Internment, provided they do not contain living or undead creatures. Make one Rouse check and use a simple action to cause an object, or a cache of objects no larger than a small car, to sink completely into the earth. You may spend a simple action to return the melded objects to the surface. While melded, the objects exist in a semi-tangible state. If returned to the surface or manually unearthed, the objects show no ill effects for having been interred.\nIf Abrupt Internment is used on a target who possesses the Protean power Earth Meld, that character can activate Earth Meld (as long as she meets all the requirements to do so) normally on her initiative, effectively escaping the Grapple at the end of their turn. This is not a transformative power; characters using or successfully affected by Abrupt Internment who are also currently using transformative powers are not forced to assume their true forms to activate or when targeted by Abrupt Internment.',
			duration: 'Until the Grapple is broken or until dawn for inanimate objects'
		},
		'Horrid Form': {
			level: 4,
			prerequisite: 'Vicissitude',
			cost: 'One Rouse check',
			system:
				'Make one Rouse check, and spend your simple and standard action to take on the Horrid Form. You elongate and distort your physical mass to grow to between eight and nine feet tall, becoming obviously monstrous in appearance as long as this power is active. Any previously-made alterations from Vicissitude may remain in effect or may be immediately removed at your discretion, allowing you to instantly regain any Physical Attributes you may have spent for extra alterations.\nWhen Horrid Form is active, your Brawl attacks do Aggravated Damage. Horrid Form also allows you to immediately benefit from two different alterations from the list below. These alterations do not cause the loss of Physical Attributes and may only be gained through Horrid Form. You may select different alterations each time you activate this power.\n▷ Defensive Spikes: Grappling you is extremely dangerous, as bony spikes protrude from your form. When someone initiates a Grapple with you, they suffer one Normal Damage.\n▷ Chiropteran Wings: By connecting your limbs to your body with thin membranes, you can achieve flight in a limited fashion. If someone with Chiropteran Wings falls from height, they can spread their arms and use these proto-wings to glide safely to the ground. In addition, they may fly three steps per turn by spending both a simple and standard action.\n▷ Thermal Vision: Your eyes are optimized for hunting all sorts of prey. You may see infrared or thermal signs within 30 steps of you. You can detect heat signatures in this radius, including body heat. Vampires who are not using the Blush of Life show up as cold, but still visible—thus the Second Inquisition calling them ‘blank-bodies’.\n▷ Horrific Maw: Your mouth becomes oversized and alien, possibly with a cephalopod’s beak or an insect-like proboscis. You are unable to speak, but you may Slake one additional Hunger when feeding. If your target has a Hunger track, they gain an additional Hunger when fed upon.\n▷ Deadened Nerves: You do not suffer wound penalties.\n▷ Skittering Legs: You modify your lower torso to accommodate additional legs. These legs increase your movement rate by one additional step per action spent on movement.\nWhile Horrid Form is active, the difficulty of your Frenzy tests are +2. You are subject to Messy Criticals regardless of your current Hunger level.',
			duration: 'Transformative'
		},
		'Heart of Darkness': {
			level: 5,
			amalgam: { name: 'Fortitude', value: 2 },
			cost: 'Two Rouse checks',
			system:
				'Make one Rouse check, deal two Aggravated Damage that cannot be mitigated in any way, and spend 30 minutes performing a complex ritual in order to remove your heart from your body. After being separated from its body, a heart removed with this power remains intact. Having your heart removed has the following effects:\n▷ You are immune to Staking. However, if your heart is found and staked, your body falls into a torpor-like state regardless of where it is in relation to your removed heart.\n▷ While removed from your body, your heart becomes immune to all powers that could view it remotely, such as the Auspex power Clairvoyance.\n▷ While removed from your body, you may choose to use the Obfuscate power of Conceal on your Heart. This does not end when your heart is no longer on your person.\n▷ You gain a +2 bonus to resist all types of Frenzy.\n▷ You suffer a -2 penalty to all Remorse tests.\n▷ Your heart has the same number of health levels as the character it was removed from. If it is reduced to zero health levels, its owner falls to torpor. If a heart is completely consumed by fire or sunlight for three rounds, both the heart and its owner are destroyed utterly.\n▷ Your heart may be fed blood and be fed from as if it were a vampire of your Blood Potency. This means a vampire may commit diablerie upon you through your removed heart. Vampires feeding from your heart are subject to the Blood Bond.\nYou can replace your heart by making two Rouse checks and spending 30 minutes reversing the process. Replacing your heart in this way only causes one Aggravated Damage that cannot be mitigated in any way. You cannot place a heart in any body except the one it was removed from.',
			duration: 'Indefinite until destroyed or returned'
		},
		'Form of Mist': {
			level: 5,
			cost: 'Two Rouse checks',
			system:
				'Expend a standard action to transform into a cloud of mist. While in Form of Mist, you fly at normal speed and remain aware of your immediate surroundings, seeing and hearing normally. You cannot make Rouse checks, talk, activate powers, or physically attack, and you are immune to Physical attacks from sources other than fire and sunlight. You can still be harmed by Bane (Fire) melee weapons, such as a torch or a road flare; however, Bane (Fire) ranged weapons (excepting Flamethrowers) using incendiary rounds pass through your form too quickly to inflict damage. You are also immune to all powers that require you to have a physical form or that require Gaze and Focus. However, you may still be affected by certain powers, such as Clairvoyance, and certain Rituals, such as Illuminate the Trail of Prey, which rely on your mere presence, not physical substance.\nWhile in Form of Mist, you are a semi-solid, fluctuating cloud of water vapor. You can pass through any crack, hole, or aperture that mist could normally traverse. You cannot pass through solid objects or airtight passages, nor can you travel through panes of glass, as you do not condense. If you manage to become trapped inside an object or space which cannot house the normal size of your physical form, when this power ends, you are ejected out in a burst of condensed water vapor before reforming tangibly, doing no damage to the container. Form of Mist is a transformative power and cannot be combined with other transformative powers.',
			duration: 'Transformative'
		},
		'Shape Mastery': {
			level: 5,
			amalgam: { name: 'Presence', value: 2 },
			cost: 'Two Rouse checks',
			challengePool: {
				attacker: { attribute: 'Strength', skill: 'Survival' },
				defender: { attribute: 'Composure', skillOrAttribute: 'Resolve' }
			},
			system:
				'Make two Rouse checks, spend your standard action, roleplay a show of dominance (a roar, a vicious glare, or other predatory gesture) toward a target in your line of sight, and make an opposed challenge using your Strength + Survival vs. the target’s Composure + Resolve. If successful, you force your target to immediately return to her natural form. Further, she cannot use transformative powers for the next hour.\nShape Mastery ends the effects of a transformative power, such as Shape Change and Horrid Form. It also ends the natural shape-changing ability of other supernatural creatures such as werewolves. It cannot affect powers that alter only a small portion of the body, such as Feral Weapons, or powers that alter the body but are not transformative, such as Earth Meld.',
			duration: 'One hour'
		}
	}
};
