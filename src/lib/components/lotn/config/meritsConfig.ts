import type { MeritsConfigSchema } from '$lib/zod/lotn/merits/merits';

export const meritConfig: MeritsConfigSchema = {
	'Bond Resistance': {
		name: 'Bond Resistance',
		levelVariable:
			'It is easier for you to resist the Blood Bond (see page 133 for mechanics). For each dot of this Merit, reduce the difficulty of Defiance checks by one.',
		max: 3
	},
	'Short Bond': {
		name: 'Short Bond',
		level2:
			'The Bond decays more quickly for you. Reduce the Bond Strength of your Blood Bond by two for each month you go without feeding from your regnant. You must still succeed in at least one Defiance check during the month.'
	},
	'Sympathy Pains': {
		name: 'Sympathy Pains',
		level2:
			'Whenever any of your thralls take Aggravated Damage, you feel a twinge in the back of your skull signaling they are in danger.'
	},
	Unbondable: {
		name: 'Unbondable',
		level5: 'You cannot be Blood Bound. This must be purchased at character creation.'
	},
	Linguistics: {
		name: 'Linguistics',
		max: 5,
		levelVariable:
			'Each character may naturally speak and write their own native language and the most common language in the location where the game is set. Each dot of this Merit provides two extra languages the character may speak and/or write.'
	},
	Cobbler: {
		name: 'Cobbler',
		level1:
			'You have studied the mortal systems enough to be able to create Masks for yourself and others. Creating a Mask (see Mask, page 153) requires you to spend Downtime Actions equal to two plus the number of dots of the Mask you are trying to make. Masks take time to build, and a solid identity must have a solid foundation. You may also improve an existing mask; improvement requires you to spend two + the difference between the old and new Mask dots’ worth of Downtime Actions. In addition, if you are creating or improving a Mask for anothercharacter, that character may spend one Downtime Action per month aiding you in the creation (or improvement) of their Mask, reducing the total Downtime Actions needed by one for each Downtime Action spent.',
		prerequisite: {
			name: 'Mask',
			value: 2
		}
	},
	Phenom: {
		name: 'Phenom',
		level2:
			'You are extremely talented as a performer, academic, or craftsperson. When purchasing this Merit you must choose one of the following Skills: Academics, Crafts, or Performance. You gain an additional specialty for each dot of the chosen Skill that you possess. You may purchase this Merit once for each of the listed Skills.'
	},
	Zeroed: {
		name: 'Zeroed',
		level2:
			'According to any sort of record-keeping system, you do not exist. Someone has gone in and zeroed you out. For your true vampiric identity, there are no fingerprints or DNA on file, your face is recognized nowhere, and searches for your name come up empty. You may not take both Zeroed and Known Blankbody.',
		prerequisite: {
			name: 'Mask',
			value: 3
		}
	},
	Bloodhound: {
		name: 'Bloodhound',
		level1:
			'You may identify the Resonance of a mortal within five steps by spending a simple action to sniff them, then making a Resolve + Awareness check with a difficulty of 3. Ghouls may purchase this Merit.'
	},
	'Iron Gullet': {
		name: 'Iron Gullet',
		level3:
			'You can feed from stale, rancid, and bagged blood. You may feed off blood after it has been removed from the body for longer than 30-minutes, or blood from a corpse that has been dead longer than an hour. No matter what processes have been done to fragment or preserve the bagged blood, you may still Slake normally. Ventrue cannot take this Merit. Vampires with Blood Potency of 3 or higher may not benefit from this Merit.'
	},
	Viscosity: {
		name: 'Viscosity',
		levelVariable:
			'Unlike other vampires, your Blood does not become diluted once you tap a Dyscrasia. For each dot in this Merit you may tap Dyscrasias one additional time per game session. You may still only have one Dyscrasia at a single time.',
		max: 3
	},
	'Blood Empathy': {
		name: 'Blood Empathy',
		level2:
			'You share a stronger bond to your regnant than most ghouls. You are able to sense their emotional and psychological state innately while in their presence (communicating this likely requires out-of-character interaction). In addition, whenever your regnant takes aggravated damage, you feel a twinge in the back of your skull that signals to you that they are in danger.'
	},
	'Vampiric Visage': {
		name: 'Vampiric Visage',
		level1:
			"While most ghouls maintain an aura vibrant and full of mortal potential, yours has become muted and gray. Your aura is indistinguishable from a vampiric aura. In addition, your heartbeat is incredibly hard to detect without medical equipment, your teeth have a fang-like appearance, and your breath is so shallow that it's hard to notice you inhale. While in some situations this can be dangerous, in vampiric society, it can be invaluable."
	},
	Loremaster: {
		name: 'Loremaster',
		level2:
			'You are an encyclopedia of supernatural knowledge. You gain a +2 bonus to all Lore checks (page 89).'
	},
	Medium: {
		name: 'Medium',
		level2:
			'You are a channel to the Shadowlands, and you possess the natural affinity to sense and hear ghosts within 15 steps of you. In addition, ghosts are naturally aware of your ability to sense them; they may choose to become visible to you—and only you—without spending a Pathos to manifest'
	},
	Ambidextrous: {
		name: 'Ambidextrous',
		level1:
			'You may utilize both your hands with equal dexterity. You may choose to hold and wield a weapon in both hands, though you may only strike with one at a time. However, when holding two weapons, you can choose the benefits of either without having to spend a simple action to draw a separate weapon. In addition, when using firearms with both hands, you have to reload only when both of your guns are empty. Finally, if someone attempts to disarm you, they must choose one of your weapons; they may not disarm both held weapons with only one disarm attack.'
	},
	'Eat Food': {
		name: 'Eat Food',
		level2:
			'Regardless of your Humanity, you may consume food and drink that is not blood. While you can taste and enjoy what you eat, it provides no nourishment. You must also expel anything you have eaten or drank prior to resting for the evening.'
	},
	'Light Sleeper': {
		name: 'Light Sleeper',
		level2:
			'You automatically wake up when you find yourself in dangerous situations. No test is required. You may remain awake for free for 30 minutes. Afterwards, spend a point of Willpower to remain awake for up to one additional hour.'
	},
	'Calm Heart': {
		name: 'Calm Heart',
		level3:
			'You have a great deal of control over your emotions and can maintain your calm even in outrageous situations. Reduce the difficulty of all Frenzy triggers by two. You must still test for Frenzy even if this means the difficulty is zero or less. Brujah who purchase this Merit do not gain its benefits for Fury Frenzy triggers.'
	},
	'Common Sense': {
		name: 'Common Sense',
		level4:
			"Your character knows how to assess risks and dangers. Twice per game, as a simple action, you may ask the Storyteller one of the following questions and receive a truthful answer:\n▷ What is the most dangerous choice in this situation?\n▷ What is the least dangerous choice in this situation?\n▷ What might I lose in this situation?\n▷ Am I on the right track by pursuing this lead?\nStorytellers should not weigh in on player character motivations. It might be ok to tell a character using this Merit that insulting the Prince would be the worst choice, simply because insulting a Prince is usually always a bad idea. But the Storyteller shouldn’t reveal things that aren’t public knowledge, such as ‘You shouldn’t attack that mortal because it's a character's Touchstone.’"
	},
	'Anarch Comrades': {
		name: 'Anarch Comrades',
		levelVariable:
			'As open and accepting as the Movement is, most still do not trust the thin-bloods. With this Merit, you have developed a decent relationship with your local Anarch vampires, enough that they are willing to exchange more than just minor and trivial boons with you. You may gain and hold major boons and life boons with Anarch characters of your city. Without this Merit, other non-thin-blood Anarch vampire characters can freely refuse to grant Major Boons or Life Boons to thin-blood characters.'
	},
	'Camarilla Contact': {
		name: 'Camarilla Contact',
		levelVariable:
			'At some point, you caught the eye of a Camarilla member and survived the ordeal. As long as you keep your eyes open and report in periodically, this Camarilla vampire will remain friendly—at least in private. If this Camarilla member is an NPC Vampire, your Storyteller should add the NPC to her Relationship Map. If this vampire is portrayed by another player, they are not required to reveal their tie to you, nor treat you fairly in public settings. Your Camarilla Contact will negotiate and hold minor and trivial boons on your behalf, keeping your thin-blood nature a secret. Because your boons are in the hands of another, you better keep them happy. Without this Merit, Camarilla characters can freely refuse to grant boons to thin-bloods without repercussions.'
	},
	'Catenating Blood': {
		name: 'Catenating Blood',
		levelVariable:
			'Unlike other thin-bloods, your Blood is strong enough to create Blood Bonds, create ghouls, and perform the Embrace. Any vampire you create through the embrace is also a thin-blood.'
	},
	'Day Drinker': {
		name: 'Day Drinker',
		levelVariable:
			'You do not take damage when subjected to sunlight. Instead, whenever you are subjected to sunlight, reduce the number of health boxes you have in half (rounded up). Any wounds you possess stay the same. If this causes all your health boxes to be full of damage, you immediately fall to Torpor until you are removed from direct sunlight. You regain your normal amount of health boxes as soon as you spend five minutes away from direct sunlight (covering up with thick clothes does not count). In addition, any time you would normally be taking damage from operating in sunlight, you may not benefit from any vampiric abilities, including Disciplines and Thin-Blood Alchemy. You still suffer from Hunger and you must eventually sleep. Every day you go without sleep beyond two days costs you one Willpower.'
	},
	'Discipline Affinity': {
		name: 'Discipline Affinity',
		levelVariable:
			'You have an affinity for one Discipline. You gain one dot in this Discipline for free and can learn and purchase additional dots of this Discipline through the expenditure of XP at out-of-clan costs. This Discipline is in addition to the one Discipline you gain each time you feed on blood that contains Resonance.'
	},
	Lifelike: {
		name: 'Lifelike',
		levelVariable:
			'At all times, even during the day, you are biologically identical to a normal mortal. You can eat food, feel your heartbeat, etc. No mundane, nor supernatural power, effect, or ability (except taking damage from the sun), will reveal you to be anything but human.'
	},
	'Thin-Blood Alchemist': {
		name: 'Thin-Blood Alchemist',
		levelVariable:
			'You have learned the craft of ThinBlood Alchemy. Gain the first dot for free and choose one free Formula. You may then spend experience points to purchase additional dots of Alchemy and research additional Formulae.'
	},
	'Vampiric Resilience': {
		name: 'Vampiric Resilience',
		levelVariable:
			'Despite being a thin-blood, you are closer to a vampire than a human when it comes to your biology. Instead of taking damage as a mortal, you now take damage as if you were a true vampire.'
	}
};
