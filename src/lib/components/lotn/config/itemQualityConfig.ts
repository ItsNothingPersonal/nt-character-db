import type { ItemQualityName } from '$lib/zod/lotn/enums/itemQualityName';
import type { ItemTypeName } from '$lib/zod/lotn/enums/itemTypeName';

export const itemQualityConfig: Record<
	ItemQualityName,
	{ description: string; type: ItemTypeName }[]
> = {
	Artisan: [
		{
			description:
				'This piece of equipment gives you a +3 bonus to your test pool when used for its intended purpose. For example, an Artisan sports car gives you a +3 bonus when using the Driving Skill. You must have at least two dots in the Skill for this equipment to gain the bonus.',
			type: 'miscellaneous'
		}
	],
	'Automatic Fire': [
		{
			description:
				'By expending multiple rounds of ammunition in a single burst, you can spray an area rather than targeting an individual. Choose up to two targets within one step of each other. When targeting multiple enemies with this quality, you must make a separate opposed challenge against each of the defenders. A weapon with this trait must be reloaded after three attacks.',
			type: 'ranged'
		}
	],
	Ballistic: [
		{
			description:
				'This armor is not bulky or sturdy, but it does deflect projectile attacks, protecting you from critical damage. When checking to see if an opponent has achieved an critical success against you with a ranged weapon (using their Marksmanship Skill), add +1 to your defensive pool.',
			type: 'protective'
		}
	],
	'Bane - Fire': [
		{
			description:
				'This weapon is made out of (or enhanced) by a substance that a particular supernatural creature considers to be a Bane. When used against the appropriate creature, this weapon does Aggravated Damage instead of Normal Damage. The following substances are considered Banes for the listed creatures:\nFire: All creatures unless otherwise stated in their description. Vampires wielding a Bane (Fire) weapon must test each turn for Terror Frenzy (difficulty 2, see page 128).',
			type: 'melee'
		},
		{
			description:
				'This uses ammunition that a particular supernatural creature considers to be a Bane. When used against the appropriate creature this weapon does Aggravated Damage instead of Normal Damage. The following substances are considered Banes for the listed creatures\nSpecial: Flamethrowers have a range of six steps and must be reloaded after three attacks.\nAll creatures unless otherwise stated in their description. Vampires wielding a Bane (Fire) weapon must test each turn for Terror Frenzy (difficulty 2, see page 331).',
			type: 'ranged'
		}
	],
	'Bane - Silver': [
		{
			description:
				'This weapon is made out of (or enhanced) by a substance that a particular supernatural creature considers to be a Bane. When used against the appropriate creature, this weapon does Aggravated Damage instead of Normal Damage. The following substances are considered Banes for the listed creatures:\nWerewolves and other Gaian shifters.',
			type: 'melee'
		},
		{
			description:
				'This uses ammunition that a particular supernatural creature considers to be a Bane. When used against the appropriate creature this weapon does Aggravated Damage instead of Normal Damage. The following substances are considered Banes for the listed creatures\nSpecial: Flamethrowers have a range of six steps and must be reloaded after three attacks.\nWerewolves and other Gaian shifters.',
			type: 'ranged'
		}
	],
	'Bane - Cold Iron': [
		{
			description:
				'This weapon is made out of (or enhanced) by a substance that a particular supernatural creature considers to be a Bane. When used against the appropriate creature, this weapon does Aggravated Damage instead of Normal Damage. The following substances are considered Banes for the listed creatures:\nChangeling and other Fae creatures native to the Dreaming.',
			type: 'melee'
		},
		{
			description:
				'This uses ammunition that a particular supernatural creature considers to be a Bane. When used against the appropriate creature this weapon does Aggravated Damage instead of Normal Damage. The following substances are considered Banes for the listed creatures\nSpecial: Flamethrowers have a range of six steps and must be reloaded after three attacks.\nChangeling and other Fae creatures native to the Dreaming.',
			type: 'ranged'
		}
	],
	Blasting: [
		{
			description:
				'You can blast a small area rather than targeting an individual. Choose up to two targets within three steps of each other and no further than 10 steps from you. When targeting multiple enemies with this weapon, you must make a separate opposed challenge against each of the defenders. A weapon with this trait must be reloaded after each attack and require two hands to use (except in the case of thrown explosives, like grenades).',
			type: 'ranged'
		}
	],
	Compact: [
		{
			description:
				"A weapon with this trait can be easily concealed on your person and drawn without requiring an action. In addition, weapons with this quality may be used to attack an opponent you are grappling. Finally, unlike larger weapons, a supernatural creature successfully struck by weapons with this quality is not an immediate Masquerade breach, if they are not wearing protective gear.\nA character doing a physical search may notice compact firearms by successfully making a Wits + Investigation test vs. the concealing character's Wits + Larceny.",
			type: 'ranged'
		}
	],
	Concealable: [
		{
			description:
				"A weapon with this trait can be easily concealed on your person and drawn without requiring an action. When attacking with a weapon with the Conceable trait, you gain +1 to your Initiative. You may use this weapon to attack your opponent while you are grappling them. Finally, unlike larger weapons, using a concealable weapon to strike a supernatural creature without armor is not an immediate Masquerade breach.\nA character doing a physical search may notice Concealable weapons by successfully making a Wits + Investigation test vs. the concealing character's Wits + Larceny.",
			type: 'melee'
		}
	],
	Deflecting: [
		{
			description:
				'This armor is not bulky or sturdy but it does deflect attacks protecting you from critical damage. When checking to see if an opponent has achieved an exceptional success against you with a melee weapon or brawl attack add +1 to your defensive pool.',
			type: 'protective'
		}
	],
	Destructive: [
		{
			description:
				'This weapon does +1 damage when used against structures and objects. This applies only to inanimate objects. In addition, weapons with this quality ignore the benefits of protective gear. Weapons with this quality require two hands to use.',
			type: 'melee'
		},
		{
			description:
				'This weapon does +1 damage when used against structures and objects. In addition, weapons with this quality ignore the benefits of protective gear. Ranged weapons with this quality can only affect targets within five steps of you. Weapons with this quality require two hands to use.',
			type: 'ranged'
		}
	],
	Devastating: [
		{
			description:
				'When checking to see if you have achieved an exceptional success against your target, add +1 to your melee pool when using a weapon with this quality. Weapons with this quality require two hands to use.',
			type: 'melee'
		}
	],
	Environmental: [
		{
			description:
				'This quality indicates that the equipment is specifically designed to shield against a certain type of hazardous environment. When you create this armor, choose one perilous circumstance, such as extreme cold, heat (not fire), or deep-water pressure. While wearing this gear, you are protected from this type of environmental hazard. If you are successfully hit with an attack that does damage, this quality ceases to function until the gear is repaired.',
			type: 'protective'
		}
	],
	Inconspicuous: [
		{
			description:
				"Armor with this quality is not immediately noticeable on your person. When you are attacked, it becomes obvious you are wearing protective gear. A character doing a visual search may notice Inconspicuous armor by successfully making a Wits + Investigation test vs. the concealing character's Wits + Larceny.",
			type: 'protective'
		}
	],
	'Long Range': [
		{
			description:
				'Ranged Weapons with this quality can target individuals at any range as long as you have line of sight. Ranged weapons with this quality require two hands.',
			type: 'ranged'
		}
	],
	Proficient: [
		{
			description:
				'This piece of equipment gives you a +1 bonus to your test pool when used for its intended purpose. For example, a Proficient set of lock-picks gives you a +1 bonus when using the Larceny skill to pick a lock.',
			type: 'miscellaneous'
		}
	],
	Reach: [
		{
			description:
				'This weapon can be used to attack a target from up to three steps away instead of the normal one step. Weapons with this quality require two hands to use.',
			type: 'melee'
		}
	],
	Silenced: [
		{
			description:
				'Ranged Weapons with this quality make almost no noise when fired and will not draw the attention of other people around you.',
			type: 'ranged'
		}
	],
	Staking: [
		{
			description:
				'This weapon is made out of wood and can be used to Stake a target (see page 130).',
			type: 'melee'
		}
	],
	Sturdy: [
		{
			description:
				'While worn, this armor provides one additional health level. Once this health level has been filled with damage, the armor must be repaired before it can function again.',
			type: 'protective'
		}
	],
	Superior: [
		{
			description:
				'This piece of equipment gives you a +2 bonus to your test pool when used for its intended purpose. A Superior computer gives you a +2 bonus when performing any standard computer related Technology (or other appropriate) Skill test, such as hacking.',
			type: 'miscellaneous'
		}
	]
};
