export const bloodPotencyConfig: Record<
	number,
	{
		bloodSurgeBonus: number;
		mendingDamage: number;
		disciplineDefenseBonus: number;
		disciplineRousingBonus: number;
		baneSeverity: number;
		feedingPenalty: string;
	}
> = {
	0: {
		bloodSurgeBonus: 1,
		mendingDamage: 1,
		disciplineDefenseBonus: 0,
		disciplineRousingBonus: 0,
		baneSeverity: 0,
		feedingPenalty: 'No penalty'
	},
	1: {
		bloodSurgeBonus: 1,
		mendingDamage: 1,
		disciplineDefenseBonus: 0,
		disciplineRousingBonus: 1,
		baneSeverity: 1,
		feedingPenalty: 'No penalty'
	},
	2: {
		bloodSurgeBonus: 1,
		mendingDamage: 2,
		disciplineDefenseBonus: 0,
		disciplineRousingBonus: 1,
		baneSeverity: 1,
		feedingPenalty: 'Can only Slake 1 Hunger and must Slake from Large animals'
	},
	3: {
		bloodSurgeBonus: 2,
		mendingDamage: 2,
		disciplineDefenseBonus: 0,
		disciplineRousingBonus: 2,
		baneSeverity: 2,
		feedingPenalty: 'Animal and bagged blood Slakes no Hunger'
	},
	4: {
		bloodSurgeBonus: 2,
		mendingDamage: 3,
		disciplineDefenseBonus: 1,
		disciplineRousingBonus: 2,
		baneSeverity: 2,
		feedingPenalty:
			'Cannot Slake blood from Sipping from a human\nCan only Slake 1 Hunger per Non Harmful drink'
	},
	5: {
		bloodSurgeBonus: 3,
		mendingDamage: 3,
		disciplineDefenseBonus: 1,
		disciplineRousingBonus: 3,
		baneSeverity: 3,
		feedingPenalty: 'Must drain and kill a human to reduce Hunger below 2'
	},
	6: {
		bloodSurgeBonus: 3,
		mendingDamage: 4,
		disciplineDefenseBonus: 1,
		disciplineRousingBonus: 3,
		baneSeverity: 4,
		feedingPenalty: 'Must drain and kill a human to reduce Hunger below 2'
	},
	7: {
		bloodSurgeBonus: 4,
		mendingDamage: 4,
		disciplineDefenseBonus: 2,
		disciplineRousingBonus: 4,
		baneSeverity: 5,
		feedingPenalty: 'Must drain and kill a human to reduce Hunger below 2'
	}
};
