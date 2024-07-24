import type { BloodSorceryRitualConfigSchema } from '$lib/zod/lotn/rituals/bloodSorceryRituals';

export const bloodSorceryRitualConfig: BloodSorceryRitualConfigSchema = {
	name: 'Blood Sorcery Rituals',
	characteristics: {
		description:
			'Unlocked by learning Blood Sorcery, Rituals are additional magical effects that must usually be prepared in advance. Unless otherwise noted, performing any Ritual requires uninterrupted concentration for five minutes per level, as well as a quantity of the caster’s Blood equal to one Rouse check. Some Rituals require more extensive ingredients or challenges to complete the casting; these are listed in the Ritual’s description along with the process by which to use those ingredients.\nRituals that affect other characters are considered mental attacks. In addition, any Ritual effects immediately end if their caster dies. Unless otherwise stated, the caster can only perform Rituals upon herself or a location where she is physically standing.',
		wards:
			"A ward is a magical glyph or line of script placed on an object with the intention of repelling a single type of supernatural creature referred to as “the trespasser.” Any glyph or script will do; the methodology remains the same, regardless of the language or style used. For example, Tremere use hermetic sigils, while Banu Haqim use gematria. When the trespasser touches the warded object, a supernatural force of energy that feels much like an electric shock burns through the trespasser's body. Wielding warded items and striking trespassers does not trigger the effects of the ward.\nSimilarly, Attacking or using a Combat Maneuver against someone who has warded armor does not trigger the ward. However, if the trespasser were to disarm a combatant of a warded sword, then tried to pick it up, this would trigger the ward. Wards can only cover objects no larger than three square feet or an area that would take only one step to cross. You could not ward an entire door, for example, but you could ward the door handle. The caster pours one Rouse check worth of blood, mixed with any required ingredients, on the object and traces the glyph with her bare finger. Once the casting time is complete, she may wipe away the Blood, rendering the ward invisible to mundane senses. Sense the Unseen can detect a ward if the Auspex user wins a contest challenge using her Wits + Awareness vs. the Ritual caster’s Intelligence + Occult. The ward lasts until the object is physically destroyed. Most objects that are warded only have one Structure, but particularly rugged items may have more. A character may only maintain a number of wards equal to twice her dots in the Occult Skill. If she creates a new ward in excess of her limit, the first (chronologically) ward she created ceases to function permanently.\nWhen a trespasser touches a ward (gloves or other garments offer no protection), she immediately takes one point of Aggravated Damage and must immediately release the object unless she activates a power such as Uncanny Grip, which protects her from being disarmed. She must then make a test to avoid Terror Frenzy, with a difficulty equal to the caster’s dots in the Occult Skill. Further attempts by the trespasser to touch the object require a Stamina + Resolve (difficulty 5) challenge before being able to. Successful contact again causes one Aggravated Damage, but does not risk sending the trespasser into a Terror Frenzy. If the trespasser is a creature that does not normally Frenzy, she still makes this test and, if they fail, must flee, directly away from the warded object for five minutes.",
		wardingCircles:
			'Warding circles are similar to wards but are much larger and are painted on the ground or floor. Trespassers who attempt to cross the boundary of a warding circle suffer the same effects as if they had touched a warded object. Instead of letting go of the warded object, they instead cease their movement at the warding circles boundary. Should the trespasser wish, and presuming she has not succumbed to a Terror Frenzy, she may attempt to cross the boundary again by making a successful Stamina + Resolve (difficulty 7). Each subsequent attempt to cross the boundary (successful or not) of a warding circle results in one point of Aggravated Damage but does not cause the trespasser to risk Frenzy. Once inside a warding circle, leaving its boundaries causes no ill effect.\nA ritualist may choose to inscribe a warding circle pointing inward around a trespasser (who has likely been incapacitated prior to the casting of the warding circle). In this case entering into the circle causes no ill effect but any trespassers trying to leave the circle suffer the effects of the ward.\nWarding circles differ from wards in the following ways:\n▷ A warding circle requires three Rouse checks to cast. If any of these cause the vampire to Frenzy, the ward cannot be completed.\n▷ Warding circles are considered enclosed columns with a radius up to 18 feet (six steps of movement). Warding circles cast indoors extend from floor to ceiling. Warding circles cast outdoors extend from ground level to 18 feet (six steps of movement).\n▷ A warding circle exists only on the plane of existence it was cast in. However, creatures attempting to circumnavigate a warding circle by crossing into (or out of) it from one realm are blocked in the same way as if they had encountered the border of the warding circle. In addition to the normal costs, creatures must repay any cost to cross the boundary between worlds on each subsequent attempt to bypass the warding circle in this way.\n▷ Unlike normal wards, a warding circle can activate with forcible contact.\n▷ Warding circles cost three Rouse checks worth of Blood to paint the necessary sigils and one full night to cast. This does not cost a Downtime Action.\n▷ Warding circles last for a year and a day after casting. Once in place, nothing short of complete removal of all solid material 18 feet below the surface of the warding circle will end a warding circle early.\n▷ A character may only maintain a number of warding circles equal to her Occult Skill. If she creates a new warding circle in excess of her limit the first (chronologically) Warding circle she created ceases to function permanently.'
	},
	rituals: {
		'Blood Walk': {
			level: 1,
			prerequisite: 'A Taste for Blood',
			ingredients: ['A silver cup with one Rouse check’s worth of Blood from the subject'],
			process:
				"The ritualist mixes her Blood and the subject's Blood in the silver cup while repeating magical incantations for 15 minutes.",
			system:
				'Once the casting time has ended, the ritualist must activate A Taste For Blood against the target subject. In addition to the information provided by that power, the caster also learns the name of the subject, their sire, and any Blood Bonds (and who they involve) active on the subject. In all cases, this simply reveals the most common name of the individuals in question; it does not show you their face or reveal false identities. The Storyteller is the final arbiter on what constitutes the “common” name for any of the characters revealed. Blood Walk has no effect on non-vampire subjects.',
			duration: 'Until Taste for Blood is next activated on the subject'
		},
		'Cling of the Arachnid': {
			level: 1,
			ingredients: ['A living spider'],
			process:
				'The ritualist crushes the living spider and combines its remains with a vial of her Blood. She then smears both her hands and bare feet with the mixture, letting it dry.',
			system:
				'For the remainder of the night, the user may cling to and move across any semi-solid surface. When moving on a surface she could not normally walk upon, such as the ceiling, vertical wall or silk drapes, it requires the ritualist to use both hands and feet to stay attached. She may only spend actions for movement, taking one fewer step per action spent on movement. While clinging to a surface, she may not engage in offensive physical challenges but may defend herself normally.',
			duration: 'One night'
		},
		'Craft Bloodstone': {
			level: 1,
			ingredients: [
				'A pebble of magnetized iron ore',
				'an additional Rouse check worth of blood that can be from any source except the caster (who still contributes their own Blood as well).'
			],
			process:
				'The ritualist submerges the pebble in the mixture of blood while repeating a mystical chant once every 10 minutes for the next hour. The pebble slowly absorbs the blood, taking on a deep red color.',
			system:
				'Once the Bloodstone Ritual is complete, you have a mystical connection to the stone. You can tell its relative position and distance from you at all times. A caster can create a number of Bloodstones equal to the number of dots of Resolve she has. If a Bloodstone is Obfuscated or otherwise supernaturally hidden, the caster can follow the trail until she reaches the general location of the stone (within 15 steps). The connection becomes blurred at that point, and she can no longer feel the Bloodstone’s precise location beyond that point until it is no longer under the effects of Obfuscate. A Bloodstone lasts for one month and one day before the red color fades and the pebble becomes inert.',
			duration: 'One month and one day'
		},
		'Wake With Evening’s Freshness': {
			level: 1,
			ingredients: ['The ashes from the burnt bones and feathers of a rooster.'],
			process:
				'After mixing the ashes of the rooster with her Blood the caster inscribes a circle around her day-time resting place. The circle need only encapsulate a location large enough for her to fit inside.',
			system:
				'For a month and a day, as long as the caster rests where she cast this Ritual; if the caster is endangered during the day, she immediately wakes up with no challenge, cost, or Rouse check. She may freely stay awake as long as she is in immediate danger. Three turns after the immediate danger has ceased, she follows the normal rules (page 126) for staying awake during the day.',
			duration: 'One month and one day'
		},
		'Ward Against Ghouls': {
			level: 1,
			ingredients: ['None aside from the caster’s own Blood'],
			processAndSystem:
				'This Ritual uses the standard rules for wards and considers any ghoul to be a trespasser.',
			duration: 'Until destroyed'
		},
		'Illuminate the Trail of Prey': {
			level: 2,
			ingredients: ['A white satin ribbon'],
			process:
				'The ritualist soaks the ribbon in her own Blood, then sets it on fire while envisioning a character she has met at least once or possesses a personal item from, such as their wedding ring or part of a vampire’s remains.',
			challengePool: {
				attacker: { attribute: 'Wits', skill: 'Occult' },
				defender: { attribute: 'Composure', skillOrAttribute: 'Resolve' }
			},
			system:
				"This Ritual must be cast at a location that the target character has spent at least five minutes at during the evening of the casting. Make a contested test vs. your target. If successful, the ash from the burning ribbon illuminates a set of ghostly footprints that only the ritualist can see. These footprints show the entire path traveled by the target character since the last sunset. As long as the target character remained on the ground, the ghostly footprints mimic her travels, even if she gets into a vehicle or uses Obfuscate. If the character took flight or entered a body of water, the trail ends; finding where the footprints begin again is impossible unless the point where her target's feet hit solid ground again is within line of sight. The use of this Ritual does not give the caster any ability to break any power used to supernaturally conceal her target. It only allows the caster to follow her path of travel.\nThis Ritual immediately ceases to work if the target character dies during its use or changes planes of existence. If the target died prior to the casting of this Ritual, the Ritual fails to activate.",
			duration: 'Until Dawn'
		},
		'Instantaneous Materialization': {
			level: 2,
			ingredients: [
				'One item no larger than a guitar case',
				'enough leaves from an ash tree to cover the object'
			],
			process:
				'The ritualist covers the target item with the mixture of blood and leaves. She then must light the leaves on fire and continuously blow on the resulting flames for the entirety of the casting time. The flames burn a bright blue and do not give off heat, cause damage to the vampire or the target object, or induce Frenzy. At the end of the casting, the flames die down, leaving behind only a pile of mundane ash.',
			system:
				'At any time on the night of casting, the ritualist may Rouse the Blood. The target item used in this Ritual will appear to rapidly coalesce out of Blood in his dominant hand. If the item has not been called forth by sunrise, it reappears at the exact location of the casting of the Ritual. A character may only have one item enchanted by this Ritual at a time.',
			duration: 'One night'
		},
		'Phantom Whispers': {
			level: 2,
			ingredients: ['Ground-up dust of a conch shell'],
			process:
				'Mixing together the Blood and shell dust, the ritualist smears the resulting paste on an object no larger than three square feet or an area of ground that would take only one step to cross. While doing so, the ritualist repeats a message no longer than 5 sentences and that takes 30 seconds or less to speak aloud.',
			system:
				"Once the casting is done, the blood mixture is absorbed into the object completely. For the next month and a day, the phrase spoken by the ritualist repeats whenever a character touches or steps on the object or area enchanted with this Ritual. The phrase will only repeat itself once per character, and the phrase will be heard as if someone was whispering in the character's ear. Any attempt to record the phenomenon results only in distortion. The ritualist may choose to have this Ritual only triggered by one specific character she names during casting.\nA character can maintain a number of castings of Phantom Whisper equal to her dots in the Occult Skill.",
			duration: 'Until canceled or one month and a day after first triggered.'
		},
		'Ward Against Spirits': {
			level: 2,
			ingredients: ['A handful of salt'],
			processAndSystem:
				'This Ritual uses the standard rules for wards and considers any spirit, including ghosts, wraiths, elementals, and umbral spirits, to be a trespasser.',
			duration: 'Until destroyed'
		},
		'Warding Circle Against Ghouls': {
			level: 2,
			ingredients: [
				'The caster uses a human bone, dipped in the Blood, to inscribe the warding circle'
			],
			processAndSystem:
				'This Ritual uses the standard rules for warding circles and considers any ghoul to be a trespasser.',
			duration: 'Until destroyed'
		},
		"Dagon's Call": {
			level: 3,
			ingredients: ['A Ritual dagger inlaid with gold leaf'],
			process:
				"Before enacting this Ritual, the intended target must be exposed to some of the caster’s Blood during the same night this Ritual is cast. This is easiest to accomplish by successfully affecting the intended target with the effects of either Scorpion’s Touch or Baal’s Caress. The caster may also unnoticeably touch the bare skin of their target by making a Dexterity + Larceny check vs. the target's Wits + Awareness. If successful, the target doesn’t notice being touched and the caster is able to smear a minuscule amount of Blood on her. The same check can be utilized to disguise the transfer of blood even if the touching was obvious such as from a handshake. If the caster fails this challenge, her target notices the attempt to transfer blood in time to prevent it. Once the target has been exposed to the caster’s Blood (even if the Blood is removed), the caster can cast this Ritual by plunging the ceremonial dagger into her own body and concentrating on her target for five minutes.",
			challengePool: {
				attacker: { attribute: 'Resolve', skill: 'Occult' },
				defender: { attribute: 'Stamina', skillOrAttribute: 'Resolve' }
			},
			system:
				'After five minutes of concentration, at any time during the remainder of the night that the Ritual was cast, the ritualist may spend a Standard action to make a contested challenge against his target. He may repeat this action once a turn for a number of turns equal to his dots in the Occult Skill. These turns do not have to happen immediately and consecutively. Each successful challenge inflicts one Normal Damage to a vampire and one Aggravated Damage to a mortal or ghoul. A character can only be affected by one casting of Dagon’s Call per night.',
			duration: 'One night'
		},
		Firewalker: {
			level: 3,
			ingredients: ['One of the caster’s fingertips', 'a chalice inlaid with gold'],
			process:
				'First, the caster must cut off her own fingertip (causing no appreciable damage) and mix the resulting ash with her Blood in a golden chalice. She must then bring the contents of the chalice to a boil and inhale the fumes.',
			system:
				'After the casting is complete, the ritualist will automatically succeed on her next attempt to resist Terror Frenzy triggered by fire of any size. In addition, the next three sources of fire damage she takes are downgraded from Aggravated Damage to Normal Damage. The benefits of Firewalker end at dawn.',
			duration: 'One night'
		},
		'Perfect Forgery': {
			level: 3,
			ingredients: ['Liquid silver', 'a mirror ground to dust'],
			process:
				'The ritualist combines the liquid silver, ground mirror dust, and her Blood into a thick paste. She then must dip one of her hands into the mixture.',
			system:
				'For the rest of the night, after the caster touches an object no larger than three square feet, she may Rouse the Blood and spend 15 minutes meditating in the lotus position. During the 15 minutes, the coating on her hand will slowly arc over to her other hand, taking the shape of the object that was touched like a mystical 3-D printer. The object is an exact replica of the object touched. However, it lacks any supernatural qualities, and, if the object is a receptacle of any kind, it is empty. The forgery lasts until sunrise. Once you create one forgery, the silver coating on your hand disappears and you must cast the Ritual again.',
			duration: 'One night'
		},
		'Ward Against Shifters': {
			level: 3,
			ingredients: ['A handful of silver dust'],
			processAndSystem:
				'This Ritual uses the standard rules for wards and considers any werewolf or were-creature shifter to be a trespasser.',
			duration: 'Until destroyed'
		},
		'Warding Circle Against Spirits': {
			level: 3,
			ingredients: [
				'The caster uses a human bone, dipped in the Blood, to inscribe the warding circle'
			],
			processAndSystem:
				'This Ritual uses the standard rules for warding circles and considers any spirit, including ghosts, wraiths, elementals, or umbral spirits, to be a trespasser.',
			duration: 'Until destroyed'
		},
		'Defense of the Sacred Haven': {
			level: 4,
			ingredients: [
				'The user must use a number of Rouse checks of her Blood equal to the dots of the Haven she wishes to defend.'
			],
			process:
				'The ritualist must use her Blood to inscribe sigils and glyphs on every entrance to a Haven she has dots spent in.',
			system:
				'After the Ritual is complete, the Blood seeps into the structure and disappears. The effects of this Ritual can be seen with powers such as Sense the Unseen.\nFor a year and a day, sunlight cannot penetrate the building, even if new openings are made in the structure. In addition, any character who has not invested dots in the protected Haven will trigger a psychic alarm in the mind of the caster if they attempt to enter the building through any of the doors and windows, even while under the effects of Obfuscate. Animals under supernatural effects such as Atavism, Unliving Hive, or Subsume the Spirit also trigger the psychic alarm. The caster is also notified if a character who has not invested dots in the protected Haven uses Clairvoyance on the Haven or anything therein.\nIf the caster is asleep, the psychic alarm begins the Awakening process.',
			duration: 'One year and one day'
		},
		'Incorporeal Passage': {
			level: 4,
			ingredients: ['A mirror'],
			process:
				'The ritualist spills her Blood on the mirror, then cracks it while mystically chanting.',
			system:
				'By looking into the cracked mirror while intoning this Ritual’s chant, you become completely incorporeal. While under the effects of this Ritual, you are immune to physical attacks as they pass through you. In addition, you move unhindered through any solid barrier as long as you keep looking into the mirror and continue moving in a straight line without turning. The Ritual lasts for five minutes, but you may end it early simply by looking away from the piece of mirror. While under the effects of Incorporeal Passage, opponents can still target you with Mental or Social attacks. Once you invoke Incorporeal Passage, you can only move forward or stand still. The magic involved in the Ritual prevents you from engaging in any form of other action, and you may not Rouse the Blood or activate powers.\nIf Incorporeal Passage ends while you are in contact with a solid object, you take one point of Aggravated Damage. If your entire body is still inside a solid object, you must fill all of your health levels with Aggravated Damage. In either case, your body is then ejected to the closest open space that can contain your body.',
			duration: 'Five minutes or until ended'
		},
		'Splinter Servant': {
			level: 4,
			ingredients: [
				'A mundane stake from a tree planted in a cemetery',
				'wax',
				'twine steeped in nightshade'
			],
			process:
				"The stake must be encased in a sheath made from the twine. The stake is dipped in the user's Blood, then placed into the sheath which must be sealed with wax.",
			system:
				'When the caster next draws the stake from the sheath, the stake animates, growing eight spider-like wooden appengages. The splinter servant moves on its own and has the following statistics:\n▷ Three health levels\n▷ Attack and Dodge Pools and Initiative score equal to the user’s dots in the Occult Skill\n▷ Immune to Mental and Social powers\n▷ Can move three steps per action\nThe Splinter Servant attacks the closest vampire, other than its creator, unless the caster spends a simple action concentrating to direct it toward another target. Its attacks do one level of Normal Damage (two levels on a critical win). The Splinter Servant may use a Staking combat maneuver instead of an attack.',
			duration: 'Until destroyed or rendered inert (simple action) by its caster'
		},
		'Ward Against Cainites': {
			level: 4,
			ingredients: ['Ash warm from a still-burning fire'],
			processAndSystem:
				'In order to gather the ash ingredient for this Ritual, a vampire takes one Aggravated Damage and must test for Terror Frenzy at difficulty 2 because of the proximity to fire. If this causes a Frenzy, the ritualist may not attempt to cast this Ritual again the same night. This Ritual uses the standard rules for wards and considers any vampire except the caster to be a trespasser.',
			duration: 'Until destroyed'
		},
		'Warding Circle Against Shifters': {
			level: 4,
			ingredients: [
				'A silver knife dipped in a mixture of Blood and wolfsbane to inscribe the warding circle'
			],
			processAndSystem:
				'This Ritual uses the standard rules for warding circles and considers any werewolf or fera shifter to be a trespasser.',
			duration: 'Until destroyed'
		},
		'Blade of Eternal Thirst': {
			level: 5,
			ingredients: [
				'A dagger carved from a human bone',
				'three Rouse checks worth of the caster’s Blood'
			],
			process: 'The caster must submerge the bone dagger in a pool of his own Blood for one hour.',
			system:
				'Once the Ritual is complete, any time the bladed Melee weapon successfully strikes an enemy, the blade consumes enough blood to raise the victim’s Hunger by one. The blood consumed is magically preserved inside the weapon.\nA Blade of Eternal Thirst can store enough blood to Slake up to three Hunger, which will retain all supernatural properties. By spending a simple action while wielding the weapon, the caster can feed from the stored blood, lowering his Hunger by one (to the minimum allowed by his Blood Potency without draining a human). However, the caster is subject to any effects the blood has, such as drugs, toxins, or powers such as Cobra’s Favor. You may force the blood out of the blade to and into a container if so desired by spending a standard action.\nYou may only create one Blade of Eternal Thirst. If you create another, the previous one is destroyed along with any blood it contains. Only the creator of a given Blade can utilize its benefits. A Blade of Eternal Thirst remains enchanted for one month, but, each month after its creation, you may soak it in one Rouse check’s worth of Blood to extend its enchantment by another 30 days. If a Blade of Eternal Thirst loses its enchantment for any reason, or the weapon is broken, any blood stored within it is destroyed and cannot be recovered.',
			duration: 'Thirty days or until destroyed'
		},
		"Cobra's Favor": {
			level: 5,
			ingredients: ['An herbal poultice', 'the venom of a snake'],
			process:
				'Mixing the herbs, venom, and the caster’s Blood creates a jet-black viscous liquid. Speaking a magical incantation, the caster then consumes the liquid.',
			system:
				'After consuming the vile liquid, anyone who consumes your Blood suffers one point of Aggravated Damage per round spent Slaking Blood from you. This damage cannot be reduced or negated. Your Blood is only damaging to others when someone is feeding directly from you or using a power that transfers your Blood directly to another character, such as Theft of Vitae. You cannot spill your own Blood into vials and poison characters’ drinks surreptitiously. Cobra’s Favor remains in effect for one month.',
			duration: 'One month'
		},
		'Escape to True Sanctuary': {
			level: 5,
			ingredients: [
				'Two charred circles, drawn three feet in diameter, consecrated in Blood over three days'
			],
			process:
				'The caster must burn two circles into the ground with an open flame. She must then consecrate each circle with her Blood over the span of three days. If the user succumbs to Frenzy while performing this Ritual, it fails and must be started again the next night. These two locations can be anywhere on stable, stationary ground, such as the bare earth or the floor of a building. The Ritual circles cannot be burned into sand (unstable) or the floor of a vehicle (non-stationary). When burning the circles and consecrating them with her Blood, she must designate one circle as the departure circle and one as the arrival circle. The entire process as described above takes one downtime and three Rouse checks and must be completed within one lunar cycle. If the user succumbs to Frenzy from any of these three Rouse checks, the Ritual fails and must be started again the next night from scratch.',
			system:
				'Once the circles are complete, the caster needs only to step into the departure circle and spend one standard action to immediately appear in the arrival circle. The caster can transport one willing character or a number of objects roughly equal to the mass of a normal-sized human. The circles will remain empowered as long as the surface they are burned into remains relatively unchanged, up to a year. Excavating the dirt of a basement and covering it with concrete would destroy the Ritual, but throwing a carpet over the circles would not. If an object is placed on top of the circle in an attempt to bar travel, the object is harmlessly pushed out of the way as the traveler(s) emerge.',
			duration: 'One year'
		},
		'Shaft of Belated Dissolution': {
			level: 5,
			ingredients: [
				'A mundane stake carved from rowan wood, imbued with baneful runes, and soaked in two Rouse checks worth of Blood'
			],
			process:
				'The caster continuously drenches the stake in Blood as he holds it within the hot coals from a burnt oak tree; he chants mystical incantations as it slowly blackens over one hour. This process does not cause a Fear Frenzy check.',
			system:
				"The stake created in this Ritual can be used in melee or fired from a crossbow. When the caster attempts to make a Staking Combat Maneuver (see page 130), and does not successfully stake their target, the tip of the stake splinters off and stays lodged in the victim's body. Once an hour, the Storyteller will perform a contested ‘burrowing’ challenge using the caster’s Resolve + Occult roll versus the target's Stamina + Survival. If the caster wins three of these challenges the target is considered staked and suffers the Helpless Condition. This will continue until the character is staked or the splinter is removed.\nThe splinter is undetectable until either the caster or the victim wins two of the above listed challenges. At this point, the victim can feel the splinter moving inside her, possibly nearing her heart (if the caster has won two challenges). The splinter can be surgically removed by winning three static challenges using her Dexterity + Medicine vs. a difficulty of 6. Each challenge represents five minutes of uninterrupted exploratory surgery. Each time a character fails one of these surgical challenges, the splinter gets to make an extra burrowing challenge (this is in addition to the challenge made hourly). Once removed from the body, the splinter becomes inert. A character who is immune to staking or who has had her heart removed is immune to this power.\nCharacters immune to Staking are immune to the effects of this Ritual. Powers that increase the number of challenges required to stake you are ineffective versus this power.",
			duration: 'Until destroyed or rendered inert'
		},
		'Warding Circle Against Cainites': {
			level: 5,
			ingredients: [
				'The ritualist inscribes the warding circle with a rowan stick dipped in a mixture of Blood and warm ash from a still-burning fire.'
			],
			processAndSystem:
				'In order to gather the ash ingredient for this Ritual, a vampire takes one level of Aggravated Damage and must test for Terror Frenzy at difficulty 2 because of the proximity to fire. If this causes a Frenzy, the ritualist may not attempt to cast this Ritual again the same night. This Ritual uses the standard rules for warding circles and considers any vampire other than the caster to be a trespasser.',
			duration: 'Until destroyed'
		}
	}
};
