import type { XpConfigBody } from '$lib/zod/classic/validation/xpChartConfigBody';

export const xpChartConfig = new Map<number, XpConfigBody>([
	[13, { background: 1, skill: 1, outOfClanDiscipline: 4, technique: 12 }],
	[12, { background: 1, skill: 1, outOfClanDiscipline: 4, technique: 12 }],
	[11, { background: 1, skill: 1, outOfClanDiscipline: 4, technique: 12 }],
	[10, { background: 2, skill: 2, outOfClanDiscipline: 4, technique: 12 }],
	[9, { background: 2, skill: 2, outOfClanDiscipline: 4, technique: 12 }],
	[
		8,
		{
			background: 2,
			skill: 2,
			outOfClanDiscipline: 4,
			technique: 20,
			inClanElderPower: 18,
			outOfClanElderPower: 24
		}
	],
	[
		7,
		{
			background: 2,
			skill: 2,
			outOfClanDiscipline: 4,
			inClanElderPower: 18,
			outOfClanElderPower: 24
		}
	],
	[
		6,
		{
			background: 2,
			skill: 2,
			outOfClanDiscipline: 5,
			inClanElderPower: 18,
			outOfClanElderPower: 30
		}
	]
]);
