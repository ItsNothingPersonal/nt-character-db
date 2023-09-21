import type { AttackMode } from '$lib/zod/enums/attackMode';
import type { ItemQualityName } from '$lib/zod/enums/itemQualityName';
import type { ItemQualityBonus } from '$lib/zod/validation/itemQualityBonus';

export const itemQualityBonusConfig = new Map<ItemQualityName, ItemQualityBonus[]>([
	[
		'Accurate',
		[
			{ skillName: 'Firearms', bonus: 2 },
			{ skillName: 'Melee', bonus: 2 }
		]
	],
	[
		'Ballistic',
		[
			{
				skillName: 'Dodge',
				bonus: 1,
				condition: (attackMode: AttackMode) => {
					return attackMode === 'Melee';
				}
			},
			{
				skillName: 'Dodge',
				bonus: 3,
				condition: (attackMode: AttackMode) => {
					return attackMode === 'Ranged';
				}
			}
		]
	],
	[
		'Hardened',
		[
			{
				skillName: 'Dodge',
				bonus: 3,
				condition: (attackMode: AttackMode) => {
					return attackMode === 'Melee';
				}
			},
			{
				skillName: 'Dodge',
				bonus: 1,
				condition: (attackMode: AttackMode) => {
					return attackMode === 'Ranged';
				}
			}
		]
	],
	[
		'Full Body',
		[
			{
				skillName: 'Dodge',
				bonus: 3
			}
		]
	]
]);
