import type { FlawsConfigSchema } from '$lib/zod/lotn/flaw/flaws';

export const flawConfig: FlawsConfigSchema = {
	'Bond at First Taste': {
		name: 'Bond at First Taste',
		level3:
			'You bond at the first drink of vampire Blood. Instead of becoming a thrall after your third drink, you are considered a thrall after only one drink, and your Bond Strength begins at one.'
	},
	'Bond Junkie': {
		name: 'Bond Junkie',
		levelVariable:
			'The Bond feels sweeter to you, and it is harder for you to resist its effects. Increase the difficulty of all Defiance checks by the number of dots of this Flaw.',
		max: 3
	},
	'Long Bond': {
		name: 'Long Bond',
		level2:
			'The Bond takes more time to decay for you. Reduce the Bond Strength of your Blood Bonds by one for every three months you go without feeding from your regnant. You must still succeed in at least one Defiance check during those three months.'
	},
	'Symbiotic Dependency': {
		name: 'Symbiotic Dependency',
		level4:
			'For you, the Blood Bond is a physical connection to your regnant. For every two damage your regnant takes, you take one damage of the same type. This damage is suffered no matter where you are in relationship to your regnant. If your regnant suffers their Final Death, you die of internal hemorrhaging within minutes. This damage cannot be prevented.'
	},
	Enemy: {
		name: 'Enemy',
		description:
			'You have rubbed someone the wrong way. Maybe you cheated them at poker, stole their parking spot, killed their friend, or committed various slights on every scale. Work with the storyteller to define your Enemy and which Sphere of Influence they are within. Your Storyteller will then make a character sheet for this enemy that you are not privy to. The enemy will attempt to thwart you and your allies with an intensity depending on your Flaw level. You may take this Flaw more than once. Each Enemy must be assigned to a Sphere of Influence.',
		level1:
			'You have minorly offended this person, perhaps repeatedly, and your presence irritates them. If they cross your path, they’ll make sure you encounter some hassle or stress. An enemy of this level will only harass you if they accidentally run across you or anyone associated with you.',
		level2:
			'Something you did or something about you seriously upset this person. They will go out of their way to cause you trouble, so long as it does not cause them too much inconvenience. They may not actively try to cause your death, but they would not be upset if it were to happen. An enemy of this level will actively try and make your life difficult by searching for you and your allies to cause hardship. However, they will not try to personally physically harm you.',
		level3:
			'This person completely detests you. They would love to see you ruined or dead and will go out of their way to make that happen. An enemy of this level will seek you out, and when they can’t find you, they will go after your allies, friends, and family. There is no line they won’t cross, including assault or murder.'
	},
	Infamy: {
		name: 'Infamy',
		description:
			'You are famous, but for something horrible that no one should want to be known for. Everyone who recognizes your face is likely to recoil with at least some level of distaste. Upon taking this Flaw, work out exactly what your character did with your Storyteller. Are you still doing the things that earned your reputation, or have you tried to reform from past crimes? Choose a Sphere of Influence in which you are exceptionally well known and more likely to be recognized. For each level of this Flaw, you receive a -2 cumulative penalty to any mundane,  non-Intimidation social interaction with someone who recognizes you; you must work to convince them to stick around long enough to hear you out.',
		level1:
			'People in your town see you walking and go the other direction, but, outside of that, you’ve managed to stay fairly under the radar.',
		level2:
			'You’re quite well-known among anyone who stays up to date with related topics. Unless controlled or approached very safely, people who recognize your Infamy are likely to cause a scene to escape your presence.',
		level3:
			'You are incredibly well-known around the city, and that is not a good thing. You’ve been in the news or a similar forum, and even those outside of your selected Sphere are likely to know who you are. Everyone within that Sphere knows, without a doubt, and will alert authorities or cause a scene if not controlled.'
	},
	Poor: {
		name: 'Poor',
		description:
			'Even without significant Resources, someone may live a comfortable life, but you are even worse off than most lower-middle class people. With any level of this Flaw, you may not buy any dots in the Resources Mortal Connection or its respective Advantages.',
		level1:
			'You are living paycheck-to-paycheck. You can afford your rent and bills, but you have only $100 per month of disposable income. You may not purchase more than one dot in the Haven Mortal Connection and may only apply one advantage to that Haven while having this Flaw.',
		level2:
			'You are probably behind on rent and getting by through sheer luck, but you have not been evicted yet and have a comfortable place to sleep at least. If something costs over ten dollars, you are unable to buy it without assistance. You may not purchase more than one dot in the Haven Mortal Connection and may not apply any advantages to that Haven while having this Flaw.',
		level3:
			'You have no job, no money, no home, no way to pay off your debts, and your friends are done letting you crash with them. You may not buy any dots in Haven with this Flaw. However, you are not required to take the No Haven Flaw; you may still benefit from access to another character’s Haven but not its advantages.'
	},
	'No Haven': {
		name: 'No Haven',
		level2:
			'You have nowhere, not even the smallest cubby, to consistently rest during the day. Even friends don’t let you couch-surf for longer than a couple nights. Each night before dawn, you must spend some time finding a safe place to rest. You have one less Downtime action than normal and may not purchase or benefit from dots in the Haven Background.'
	},
	'Obvious Predator': {
		name: 'Obvious Predator',
		level2:
			'You look downright scary. While it is not instantly clear that you are a vampire, you give off vibes that, if someone were to let you near them with anything sharp, they would be dead. You are unable to purchase dots in the Herd Background and suffer a -1 penalty to any challenges involving non-violent attempts to feed.'
	},
	Illiterate: {
		name: 'Illiterate',
		level2:
			'You cannot read or write. Maybe you never learned, or perhaps there is something that never “clicked” about it. Even street names can be too much, though you can match letters on familiar signs that you recognize and memorize the names that go with them. Even texting isn’t a viable option unless you have a friend sending messages for you.'
	},
	'Known Corpse': {
		name: 'Known Corpse',
		prerequisite: { name: 'Mask', value: 0 },
		level2:
			'You have not been dead long and are known to be deceased by local humans. Your family and friends are still around and still remember you. They went to your funeral. Maybe they even got a call to identify your body. People who knew you will react appropriately horrified, like they have just seen a ghost. They may even call the police on you for impersonating their dead loved one.'
	},
	'Known Blankbody': {
		name: 'Known Blankbody',
		prerequisite: { name: 'Mask', value: 0 },
		level4:
			'You have managed to get yourself included in high-level government databases, marked as someone to watch. You must spend one Downtime Action a month covering the tracks of your monthly activities. Failure to spend this Downtime Action will cause an encounter with Hunters run by your Storyteller prior or during the next game. In addition, whenever you fail a Hunting challenge, your failed feeding attempt is noticed by a Hunter. A Known Blankbody may not purchase the Zeroed Merit. The Second Inquisition has tagged you.'
	},
	Farmer: {
		name: 'Farmer',
		level2:
			'You choose to feed exclusively from animals. In order to feed from any other blood source, you must spend two points of Willpower. Vampires with Blood Potency 3 or higher may not take or possess this Flaw.'
	},
	"Methuselah's Thirst": {
		name: "Methuselah's Thirst",
		level5:
			'Your Hunger can only be fully Slaked by the blood of supernatural creatures. Instead of having to drain a mortal dry, you must drain a supernatural creature dry, killing it outright (unless it possesses a supernatural quality to survive such an ordeal), to Slake your Hunger below 1.'
	},
	Organovore: {
		name: 'Organovore',
		level3:
			'You may only Slake Hunger from eating human flesh and organs from a live body or one that has been dead for no longer than 30 minutes. Only major organs such as the heart, liver, lungs, and spleen are rich enough in blood to hold Resonance. You may choose to eat these whole, or you may process them into a liquid first. Instead of having to drain a mortal dry, you must kill a living mortal and eat a majority of the organs and flesh to Slake your Hunger below 1.'
	},
	'Prey Exclusion': {
		name: 'Prey Exclusion',
		level1:
			'You refuse to feed from a certain class of mortals. This could include drug users, women, police, humans you consider to be innocent, etc. If you willingly or unknowingly feed from your Prey Exclusion, you gain Stains as if you violated a Chronicle Tenet. Ventrue with this Flaw gain an additional restriction, making their choice of vessels extremely narrow.'
	},
	'Weak Stomach': {
		name: 'Weak Stomach',
		level3:
			'You are squeamish around the sight of blood. Consuming it turns your stomach. For one hour after you feed, you have the Weakened Condition. Characters with this Flaw start every game session with the Weakened Condition. Ghouls may purchase this Flaw.'
	},
	'Baneful Blood': {
		name: 'Baneful Blood',
		description:
			'The first time you were fed Blood and became a ghoul, something strange happened. The Bane suffered by your regnant was transferred through the Blood to you. Even if your regnant changes, you continue to suffer the same Bane.',
		level2: 'You experience the regnant’s Bane at Bane Severity 1.',
		level3: 'You experience the regnant’s Bane at Bane Severity 2.',
		level4: 'You experience the regnant’s Bane at Bane Severity 3.'
	},
	"Crone's Curse": {
		name: "Crone's Curse",
		level4:
			'When you became ghouled to your first regnant, the vitae shocked your system, aging you unnaturally. You appear ten years older than you should. In addition, the damage to your circulatory system causes you to have one fewer health box.'
	},
	'Distressing Fangs': {
		name: 'Distressing Fangs',
		level1:
			'Your regnant’s Blood has mystically sharpened your teeth. No amount of dental surgery can fix them. They mystically resharpen themselves overnight. They are extremely off-putting to most other humans. They may be probable cause for the Second Inquisition to stop you for questioning.'
	},
	'Bound to the Earth': {
		name: 'Bound to the Earth',
		level1:
			'ou must rest near natural soil. Older vampires with this Flaw often find themselves hoarding soil from their country of origin if they have moved since being Embraced. If a vampire with this Flaw does not rest in the proximity of two handfuls of natural soil, they do not regain Willpower upon Awakening.'
	},
	'Eerie Presence': {
		name: 'Eerie Presence',
		level1:
			'You radiate an otherworldly air that causes nervousness and unease in the people around you. The exact nature of this Eerie Presence is specific to each vampire and can take many different forms, but there must be a noticeable visual (glowing eyes), olfactory (smell of the grave) or tactile (cold breeze) effect on observers or your surroundings. Whatever you choose for your Eerie Presence, it should always be disconcerting and can potentially be a breach of the Masquerade.'
	},
	'Folkloric Bane': {
		name: 'Folkloric Bane',
		level3:
			'You radiate an otherworldly air that causes nervousness and unease in the people around you. The exact nature of this Eerie Presence is specific to each vampire and can take many different forms, but there must be a noticeable visual (glowing eyes), olfactory (smell of the grave) or tactile (cold breeze) effect on observers or your surroundings. Whatever you choose for your Eerie Presence, it should always be disconcerting and can potentially be a breach of the Masquerade.'
	},
	'Folkloric Block': {
		name: 'Folkloric Block',
		level2:
			'You abhor the sight of a specific object. Most often, this is an item from folklore, such as a holy symbol, garlic, or wild roses. You may not come within five steps of your chosen Folkloric Block, and, if you ever find yourself within five steps of your chosen Block, you gain the Frightened Condition until you move away. In this way, skillful enemies may herd you away if they know your weaknesses.\nIn addition, you may choose something slightly more esoteric than a physical object, such as holy ground, running water, or requiring an invitation to enter a place. If this type of Folkloric Block is chosen, you may not willingly enter such an area and, if forced to, you will immediately gain the Frightened Condition until you can flee back the way you came. You will never flee into or through your Folkloric Block.'
	},
	Haunted: {
		name: 'Haunted',
		levelVariable:
			'This Flaw works identically to the Enemy Background. However, in this case, your enemy is a ghost who will make your life difficult in different ways. Your Storyteller will build your ghostly enemy using rules in Chapter 8: Storytelling.',
		max: 3
	},
	'Stake Bait': {
		name: 'Stake Bait',
		level5:
			'While the rest of your body is undead, your heart remains mortal. You meet Final Death when you are successfully staked.'
	},
	Stigmata: {
		name: 'Stigmata',
		level1:
			'Whenever you reach Hunger 4, you begin to bleed from open wounds on your hands, feet, and forehead. This blood loss is not significant enough to cause you additional Hunger, but it is noticeable enough to attract a great deal of attention.'
	},
	'Trouble Magnet': {
		name: 'Trouble Magnet',
		level1:
			'Whenever weird stuff occurs, it happens to you. You have terrible luck, and misfortune follows at your heels, tearing you down whenever it has an opportunity. Whenever the Storyteller needs to randomly determine a negative result, such as determining which character is hit by a falling rock, or where the beat cop is patrolling at any given time, no test is made. You always suffer the consequence of bad luck. If multiple characters in the same scene have this Flaw and it is possible for both to be affected by the random negative result, all characters with Trouble Magnet are affected. A gun fired blindly can ricochet, possibly hitting multiple characters with this Flaw, necessitating a dodge challenge from all Trouble Magnets. Multiple beat cops might stumble upon Trouble Magnets in different areas of a warehouse. If it is not feasible to affect multiple Trouble Magnets, determine which one is affected randomly.'
	},
	'Awkward Mobility': {
		name: 'Awkward Mobility',
		level2:
			'You have difficulty moving quickly or keeping up with those around you. You might be short, possess a club foot, have a hunchback, or walk with a limp. You take two steps per action spent on movement instead of the standard three.'
	},
	'Deep Sleeper': {
		name: 'Deep Sleeper',
		level2:
			'You may not spend a Willpower point to stay awake when the sun rises unless falling asleep would cause you danger. In addition, whenever you spend a Willpower to Awaken (even if in danger), you must spend an additional one. Failing to do so prevents you from Awakening.'
	},
	'Low Pain Threshold': {
		name: 'Low Pain Threshold',
		levelVariable:
			'You are particularly sensitive to pain and wounds easily. For each dot of this Flaw, your wound penalties start one box earlier. Normally a character only suffers wound penalties when she takes damage in her last three damage boxes. A character with two dots in this Flaw would suffer the Injured Condition when she has damage in her last five damage boxes. You may only take a number of dots of this Flaw equal to your total health boxes -3.'
	},
	'Slow Healing': {
		name: 'Slow Healing',
		level3:
			'While in combat, when you Rouse the Blood to mend damage, the mending does not take place until the end of the round, after the Storyteller has performed the Mass Challenge for Rousing. Mending outside of a combat scenario remains the same.'
	},
	Archaic: {
		name: 'Archaic',
		level2:
			'The constant evolution of technology confuses and enrages you. Modern things signal an increase in mortal power and a palpable shift away from the world you understand. You cannot purchase the following skills: Driving, Science (any modern science), or Technology. Further, you cannot operate machinery or technology invented in the last 100 years. Players with this Flaw should roleplay ancient or archaic perspectives on other skills where appropriate, such as the use of herbs and poultices when performing the Medicine skill, rather than modern drugs and equipment. Only characters who are 9th Generation and have spent at least 100 years Embraced may take this Flaw.\nPlayers must ensure the themes and perspectives they wish to explore are appropriate for their game space, and Storytellers have absolute discretion to decide which archaic perspectives are permissible within their game.'
	},
	'Dark Secret': {
		name: 'Dark Secret',
		level1:
			'You have a secret which would cause great embarrassment if uncovered by your enemies. If your secret is publicly revealed, you must buy off this Flaw, per the rules for removing Flaws. Like all Flaws, a Dark Secret should not be allowed if it does not impact the character’s possible survival if revealed or if it copies a difficulty inherent to the character type. A character cannot have more than one Dark Secret.'
	},
	'Death Sight': {
		name: 'Death Sight',
		level1:
			"While your body remains in limbo between life and death, you view the world as if everything around you is dead. Humans appear to be rotting zombies, vampires are withered and decaying. Buildings are decrepit and falling apart. You find no beauty in the world anymore. In addition to the roleplay aspects of this Flaw, you are incapable of determining another character's creature type or mood, even with the aid of supernatural powers such as Scry the Soul."
	},
	'Living on the Edge': {
		name: 'Living on the Edge',
		level2:
			'Your incredible curiosity and “devil-may care” attitude often overrides your common sense. You cannot help it! There are so many wonderful things in the world, so many secrets to uncover, and so many thrills to experience. If you actively deny yourself the opportunity to explore or experience something new or unknown, you lose one point of Willpower. You do not have to immediately explore this new experience, but if the opportunity passes and you are no longer able to experience it, you lose one Willpower. You may only lose one point of Willpower per opportunity. However, each different opportunity costs you one point of Willpower. If you run out of Willpower from this Flaw, you gain the Impaired Condition (see page 111).'
	},
	Impatient: {
		name: 'Impatient',
		level2:
			'You have no patience for standing around and waiting. You want to do things now—forget the slowpokes trying to hold you back. You vastly prefer acting on impulse without caring about the consequences. Every time you are forced to be patient instead of acting immediately, you must spend one Willpower to wait without acting for five minutes. If you do not spend this Willpower, you react with extreme anger, lashing out at the source of your delay.'
	},
	'Weak Willed': {
		name: 'Weak Willed',
		level4:
			'Your mind is weak, easily disturbed, or confused. You rely on others to survive and tend to be a follower, rarely speaking up for yourself. If you suffer from the Distracted, Disoriented, Staggered, or Prone Condition, you cannot resolve them unless another character spends a simple action to aid you. You may not benefit from any powers that alter how these Conditions affect your character.'
	},
	'Baby Teeth': {
		name: 'Baby Teeth',
		levelVariable:
			'After your embrace you never developed fangs. In order to feed directly, you must either cut your victims open or extract blood with a syringe. You may not Sip from a human. In order to benefit from a Non-Harmful drink from a mortal you must first succeed in Strength + Brawl (or Weaponry) to knock your target out, or otherwise render them unconscious.'
	},
	'Bestial Temper': {
		name: 'Bestial Temper',
		levelVariable:
			'Unlike the muted Beast of other thin-bloods, yours is as powerful as a full vampire. You must test for Terror and Rage Frenzy as if you were a full-blooded vampire.'
	},
	'Branded by the Camarilla': {
		name: 'Branded by the Camarilla',
		levelVariable:
			'While you may not be killed on sight on Camarilla territory, your continued existence comes with a price, usually an ongoing subscription-based fee. In order to even be seen in the presence of Camarilla members, you must pay at least a trivial boon to any that ask of you. Camarilla characters who hear your name automatically know your branded nature and will be inclined to extort you, lest they call the Sheriff to have you removed from their presence. You may still take the Camarilla Contact Merit when choosing this Flaw. Storytellers may disallow the choice of this Flaw if the game is not primarily Camarilla-based.'
	},
	'Clan Curse': {
		name: 'Clan Curse',
		levelVariable:
			'Your sire’s Blood still flows through your veins, levying their clan’s curse upon you. Pick a Clan Bane you suffer from at Bane Severity 1. If you have also chosen the Bestial Temper Flaw, you must choose either the Brujah or Gangrel Bane. If you have chosen the Catenating Blood Merit, you must choose the Tremere Bane.'
	},
	'Dead Flesh': {
		name: 'Dead Flesh',
		levelVariable:
			'Your body and your Blood are in a constant battle. Your flesh continues to die slowly despite the undead qualities of your Blood. Without a supernatural power such as Obfuscate, you are a Masquerade breach. You carry a faint stench of rot and decay, and, up close, your flesh bears a greenish tint. Any cursory medical exam will identify you as deceased, and mortals shun you immediately. You may not take Lifelike if you take this Flaw.'
	},
	'Mortal Frailty': {
		name: 'Mortal Frailty',
		levelVariable:
			'The resiliency of your body is the same as a mortals. Not even Rousing the Blood can mend you. You heal as a normal mortal and may not Rouse the Blood to mend wounds. You may not take Vampiric Resilience if you take this Flaw.'
	},
	'Shunned by the Anarchs': {
		name: 'Shunned by the Anarchs',
		levelVariable:
			'It should be easy to avoid pissing off the Anarch Movement. Yet you have broken some rule or courtesy, and now they want nothing to do with you. Anarch characters who hear your name automatically know your shunned nature and will not exchange any level of boons with you. Any sort of unwanted behavior might cause the arrival of an Enforcer who will have you removed from the premises. You may not take the Anarch Comrades Merit when choosing this Flaw. Storytellers may disallow the choice of this Flaw if the game is not primarily Anarch-based.'
	},
	'Vitae Dependency': {
		name: 'Vitae Dependency',
		levelVariable:
			'The supernatural properties of your Blood  are unreliable. Unless you Slake at least one Hunger a week from a vampire you are unable to use Disciplines or Thin-Blood Alchemy. You regain these abilities immediately after Slaking at least one Hunger from vampire Blood.'
	}
};
