import type { PlayerCharacter } from '$lib/zod/playerCharacter/playerCharacter';
import { beforeEach, describe, expect, test } from 'vitest';
import {
	calculateAttributeCosts,
	calculateBackgroundCost,
	calculateFlawCost,
	calculateInClanDisciplineCosts,
	calculateMeritCost,
	calculateMoralityCosts,
	calculateNecromancyOrThaumaturgyRitualCost,
	calculateOutOfClanDisciplineCosts,
	calculateSkillCost,
	calculateTechniqueCosts
} from './costCalculations';

let testCharacter: PlayerCharacter;

beforeEach(async () => {
	testCharacter = createTestCharacter();
});

describe('attribute cost calculations', () => {
	test('raise attribute by one costs 3 exp', () => {
		const pc = calculateAttributeCosts(testCharacter, 'Physical', 'add', false, 7, 8);

		expect(pc.experience[1].type).toBe('substract');
		expect(pc.experience[1].value).toBe(3);
	});

	test('reduce attribute by one returns 3 exp if refund is enabled', () => {
		const pc = calculateAttributeCosts(testCharacter, 'Physical', 'remove', true, 8, 7);

		expect(pc.experience[1].type).toBe('add');
		expect(pc.experience[1].value).toBe(3);
	});

	test('reduce attribute does not change anything if refund is disabled', () => {
		const pc = calculateAttributeCosts(testCharacter, 'Physical', 'remove', false, 8, 7);

		expect(pc.experience[1]).toBeUndefined();
		expect(pc.experience.length).toBe(1);
	});
});

describe('discipline cost calculations', () => {
	describe('inclan disciplines', () => {
		test('raise inclan discipline from 2 to 3 costs 9 exp', () => {
			const pc = calculateInClanDisciplineCosts(testCharacter, 'Potence', 'add', false, 2, 3);

			expect(pc.experience[1].type).toBe('substract');
			expect(pc.experience[1].value).toBe(9);
		});

		test('reduce inclan discipline from  3 to 2 returns 9 exp if refund is enabled', () => {
			const pc = calculateInClanDisciplineCosts(testCharacter, 'Potence', 'remove', true, 3, 2);

			expect(pc.experience[1].type).toBe('add');
			expect(pc.experience[1].value).toBe(9);
		});

		test('reduce inclan discipline does not change anything if refund is disabled', () => {
			const pc = calculateInClanDisciplineCosts(testCharacter, 'Potence', 'remove', false, 3, 2);
			expect(pc.experience[1]).toBeUndefined();
			expect(pc.experience.length).toBe(1);
		});

		test('raise inclan discipline from 2 to 4 costs 21 exp', () => {
			const pc = calculateInClanDisciplineCosts(testCharacter, 'Potence', 'add', false, 2, 4);

			expect(pc.experience[1].type).toBe('substract');
			expect(pc.experience[1].value).toBe(21);
		});

		test('reduce inclan discipline from 4 to 2 returns 21 exp if refund is enabled', () => {
			const pc = calculateInClanDisciplineCosts(testCharacter, 'Potence', 'remove', true, 4, 2);

			expect(pc.experience[1].type).toBe('add');
			expect(pc.experience[1].value).toBe(21);
		});
	});

	describe('outofclan disciplines', () => {
		test('raise outofclan discipline from 2 to 3 costs 12 exp', () => {
			const pc = calculateOutOfClanDisciplineCosts(testCharacter, 'Potence', 'add', false, 2, 3);

			expect(pc.experience[1].type).toBe('substract');
			expect(pc.experience[1].value).toBe(12);
		});

		test('reduce outofclan discipline from  3 to 2 returns 12 exp if refund is enabled', () => {
			const pc = calculateOutOfClanDisciplineCosts(testCharacter, 'Potence', 'remove', true, 3, 2);

			expect(pc.experience[1].type).toBe('add');
			expect(pc.experience[1].value).toBe(12);
		});

		test('reduce outofclan discipline does not change anything if refund is disabled', () => {
			const pc = calculateOutOfClanDisciplineCosts(testCharacter, 'Potence', 'remove', false, 3, 2);
			expect(pc.experience[1]).toBeUndefined();
			expect(pc.experience.length).toBe(1);
		});

		test('raise outofclan discipline from 2 to 4 costs 28 exp', () => {
			const pc = calculateOutOfClanDisciplineCosts(testCharacter, 'Potence', 'add', false, 2, 4);

			expect(pc.experience[1].type).toBe('substract');
			expect(pc.experience[1].value).toBe(28);
		});

		test('reduce outofclan discipline from 4 to 2 returns 28 exp if refund is enabled', () => {
			const pc = calculateOutOfClanDisciplineCosts(testCharacter, 'Potence', 'remove', true, 4, 2);

			expect(pc.experience[1].type).toBe('add');
			expect(pc.experience[1].value).toBe(28);
		});
	});
});

describe('morality cost calculations', () => {
	test('raise morality by one costs 10 exp', () => {
		const pc = calculateMoralityCosts(testCharacter, 'Humanity', 'add', false, 5, 6);

		expect(pc.experience[1].type).toBe('substract');
		expect(pc.experience[1].value).toBe(10);
	});

	test('reduce humanity by one returns 10 exp if refund is enabled', () => {
		const pc = calculateMoralityCosts(testCharacter, 'Humanity', 'remove', true, 6, 5);

		expect(pc.experience[1].type).toBe('add');
		expect(pc.experience[1].value).toBe(10);
	});

	test('reduce humanity does not change anything if refund is disabled', () => {
		const pc = calculateMoralityCosts(testCharacter, 'Humanity', 'remove', false, 6, 5);

		expect(pc.experience[1]).toBeUndefined();
		expect(pc.experience.length).toBe(1);
	});
});

describe('technique cost calculations', () => {
	test('add technique costs 12 exp for gen 9', () => {
		const pc = calculateTechniqueCosts(testCharacter, 'Second Wind', 'add', false);

		expect(pc.experience[1].type).toBe('substract');
		expect(pc.experience[1].value).toBe(12);
	});

	test('remove technique returns 12 exp for gen 9 if refund is enabled', () => {
		const pc = calculateTechniqueCosts(testCharacter, 'Second Wind', 'remove', true);

		expect(pc.experience[1].type).toBe('add');
		expect(pc.experience[1].value).toBe(12);
	});

	test('remove techniquey does not change anything if refund is disabled', () => {
		const pc = calculateTechniqueCosts(testCharacter, 'Second Wind', 'remove', false);

		expect(pc.experience[1]).toBeUndefined();
		expect(pc.experience.length).toBe(1);
	});

	test('add technique costs 20 exp for gen 8', () => {
		testCharacter.generation = 8;
		const pc = calculateTechniqueCosts(testCharacter, 'Second Wind', 'add', false);

		expect(pc.experience[1].type).toBe('substract');
		expect(pc.experience[1].value).toBe(20);
	});

	test('master elders (gen 7) cannot learn techniques', () => {
		testCharacter.generation = 7;
		const pc = calculateTechniqueCosts(testCharacter, 'Second Wind', 'add', false);

		expect(pc.experience[1]).toBeUndefined();
		expect(pc.experience.length).toBe(1);
	});

	test('luminary elders (gen 6) cannot learn techniques', () => {
		testCharacter.generation = 6;
		const pc = calculateTechniqueCosts(testCharacter, 'Second Wind', 'add', false);

		expect(pc.experience[1]).toBeUndefined();
		expect(pc.experience.length).toBe(1);
	});
});

describe('necromancy / thaumaturgy ritual cost calculations', () => {
	test('add a level 1 ritual costs 2 xp', () => {
		const pc = calculateNecromancyOrThaumaturgyRitualCost(
			testCharacter,
			'Blood Mastery',
			'add',
			false,
			1
		);

		expect(pc.experience[1].type).toBe('substract');
		expect(pc.experience[1].value).toBe(2);
	});

	test('remove a level 1 ritual returns 2 xp if refund is enabled', () => {
		const pc = calculateNecromancyOrThaumaturgyRitualCost(
			testCharacter,
			'Blood Mastery',
			'remove',
			true,
			1
		);

		expect(pc.experience[1].type).toBe('add');
		expect(pc.experience[1].value).toBe(2);
	});

	test('remove techniquey does not change anything if refund is disabled', () => {
		const pc = calculateNecromancyOrThaumaturgyRitualCost(
			testCharacter,
			'Blood Mastery',
			'remove',
			false,
			1
		);

		expect(pc.experience[1]).toBeUndefined();
		expect(pc.experience.length).toBe(1);
	});

	test('add a level 3 ritual costs 6 xp', () => {
		const pc = calculateNecromancyOrThaumaturgyRitualCost(
			testCharacter,
			'Incorporeal Passage',
			'add',
			false,
			3
		);

		expect(pc.experience[1].type).toBe('substract');
		expect(pc.experience[1].value).toBe(6);
	});

	test('remove a level 1 ritual returns 2 xp if refund is enabled', () => {
		const pc = calculateNecromancyOrThaumaturgyRitualCost(
			testCharacter,
			'Incorporeal Passage',
			'remove',
			true,
			3
		);

		expect(pc.experience[1].type).toBe('add');
		expect(pc.experience[1].value).toBe(6);
	});
});

describe('merit cost calculations', () => {
	test('add merit costs its value in exp', () => {
		const pc = calculateMeritCost(testCharacter, 'Burning Wrath', 'add', false, 2);

		expect(pc.experience[1].type).toBe('substract');
		expect(pc.experience[1].value).toBe(2);
	});

	test('remove merit returns its value in exp if refund is enabled', () => {
		const pc = calculateMeritCost(testCharacter, 'Burning Wrath', 'remove', true, 2);

		expect(pc.experience[1].type).toBe('add');
		expect(pc.experience[1].value).toBe(2);
	});

	test('remove merit does not change anything if refund is disabled', () => {
		const pc = calculateMeritCost(testCharacter, 'Burning Wrath', 'remove', false, 2);

		expect(pc.experience[1]).toBeUndefined();
		expect(pc.experience.length).toBe(1);
	});
});

describe('flaw cost calculations', () => {
	test('add flaw returns its value in exp', () => {
		const pc = calculateFlawCost(testCharacter, 'Accused of Heresy', 'add', false, 2);

		expect(pc.experience[1].type).toBe('add');
		expect(pc.experience[1].value).toBe(2);
	});

	test('remove flaw adds its value if refund is enabled', () => {
		const pc = calculateFlawCost(testCharacter, 'Accused of Heresy', 'remove', true, 2);

		expect(pc.experience[1].type).toBe('substract');
		expect(pc.experience[1].value).toBe(2);
	});

	test('remove flaw does not change anything if refund is disabled', () => {
		const pc = calculateFlawCost(testCharacter, 'Accused of Heresy', 'remove', false, 2);

		expect(pc.experience[1]).toBeUndefined();
		expect(pc.experience.length).toBe(1);
	});
});

describe('skill cost calculations', () => {
	describe('neonate', () => {
		beforeEach(async () => {
			testCharacter.generation = 11;
		});

		test('raise skill from 2 to 3 costs 3 exp', () => {
			const pc = calculateSkillCost(testCharacter, 'Dodge', 'add', false, 2, 3);

			expect(pc.experience[1].type).toBe('substract');
			expect(pc.experience[1].value).toBe(3);
		});

		test('reduce skill from 3 to 2 returns 3 exp if refund is enabled', () => {
			const pc = calculateSkillCost(testCharacter, 'Dodge', 'remove', true, 3, 2);

			expect(pc.experience[1].type).toBe('add');
			expect(pc.experience[1].value).toBe(3);
		});

		test('reduce skill does not change anything if refund is disabled', () => {
			const pc = calculateSkillCost(testCharacter, 'Dodge', 'remove', false, 3, 2);
			expect(pc.experience[1]).toBeUndefined();
			expect(pc.experience.length).toBe(1);
		});

		test('raise skill from 2 to 4 costs 7 exp', () => {
			const pc = calculateSkillCost(testCharacter, 'Dodge', 'add', false, 2, 4);

			expect(pc.experience[1].type).toBe('substract');
			expect(pc.experience[1].value).toBe(7);
		});

		test('reduce skill from 4 to 2 returns 7 exp if refund is enabled', () => {
			const pc = calculateSkillCost(testCharacter, 'Potence', 'remove', true, 4, 2);

			expect(pc.experience[1].type).toBe('add');
			expect(pc.experience[1].value).toBe(7);
		});
	});

	describe('non-neonate', () => {
		test('raise skill from 2 to 3 costs 6 exp', () => {
			const pc = calculateSkillCost(testCharacter, 'Dodge', 'add', false, 2, 3);

			expect(pc.experience[1].type).toBe('substract');
			expect(pc.experience[1].value).toBe(6);
		});

		test('reduce skill from 3 to 2 returns 6 exp if refund is enabled', () => {
			const pc = calculateSkillCost(testCharacter, 'Dodge', 'remove', true, 3, 2);

			expect(pc.experience[1].type).toBe('add');
			expect(pc.experience[1].value).toBe(6);
		});

		test('reduce skill does not change anything if refund is disabled', () => {
			const pc = calculateSkillCost(testCharacter, 'Dodge', 'remove', false, 3, 2);
			expect(pc.experience[1]).toBeUndefined();
			expect(pc.experience.length).toBe(1);
		});

		test('raise skill from 2 to 4 costs 14 exp', () => {
			const pc = calculateSkillCost(testCharacter, 'Dodge', 'add', false, 2, 4);

			expect(pc.experience[1].type).toBe('substract');
			expect(pc.experience[1].value).toBe(14);
		});

		test('reduce skill from 4 to 2 returns 14 exp if refund is enabled', () => {
			const pc = calculateSkillCost(testCharacter, 'Dodge', 'remove', true, 4, 2);

			expect(pc.experience[1].type).toBe('add');
			expect(pc.experience[1].value).toBe(14);
		});
	});
});

describe('background cost calculations', () => {
	describe('neonate', () => {
		beforeEach(async () => {
			testCharacter.generation = 11;
		});

		test('raise background from 2 to 3 costs 3 exp', () => {
			const pc = calculateBackgroundCost(testCharacter, 'Contacts', 'add', false, 2, 3);

			expect(pc.experience[1].type).toBe('substract');
			expect(pc.experience[1].value).toBe(3);
		});

		test('reduce background from 3 to 2 returns 3 exp if refund is enabled', () => {
			const pc = calculateBackgroundCost(testCharacter, 'Contacts', 'remove', true, 3, 2);

			expect(pc.experience[1].type).toBe('add');
			expect(pc.experience[1].value).toBe(3);
		});

		test('reduce background does not change anything if refund is disabled', () => {
			const pc = calculateBackgroundCost(testCharacter, 'Contacts', 'remove', false, 3, 2);

			expect(pc.experience[1]).toBeUndefined();
			expect(pc.experience.length).toBe(1);
		});

		test('raise background from 2 to 4 costs 7 exp', () => {
			const pc = calculateBackgroundCost(testCharacter, 'Contacts', 'add', false, 2, 4);

			expect(pc.experience[1].type).toBe('substract');
			expect(pc.experience[1].value).toBe(7);
		});

		test('reduce background from 4 to 2 returns 7 exp if refund is enabled', () => {
			const pc = calculateBackgroundCost(testCharacter, 'Contacts', 'remove', true, 4, 2);

			expect(pc.experience[1].type).toBe('add');
			expect(pc.experience[1].value).toBe(7);
		});
	});

	describe('non-neonate', () => {
		test('raise background from 2 to 3 costs 6 exp', () => {
			const pc = calculateBackgroundCost(testCharacter, 'Contacts', 'add', false, 2, 3);

			expect(pc.experience[1].type).toBe('substract');
			expect(pc.experience[1].value).toBe(6);
		});

		test('reduce background from 3 to 2 returns 6 exp if refund is enabled', () => {
			const pc = calculateBackgroundCost(testCharacter, 'Contacts', 'remove', true, 3, 2);

			expect(pc.experience[1].type).toBe('add');
			expect(pc.experience[1].value).toBe(6);
		});

		test('reduce background does not change anything if refund is disabled', () => {
			const pc = calculateBackgroundCost(testCharacter, 'Contacts', 'remove', false, 3, 2);
			expect(pc.experience[1]).toBeUndefined();
			expect(pc.experience.length).toBe(1);
		});

		test('raise background from 2 to 4 costs 14 exp', () => {
			const pc = calculateBackgroundCost(testCharacter, 'Contacts', 'add', false, 2, 4);

			expect(pc.experience[1].type).toBe('substract');
			expect(pc.experience[1].value).toBe(14);
		});

		test('reduce background from 4 to 2 returns 14 exp if refund is enabled', () => {
			const pc = calculateBackgroundCost(testCharacter, 'Contacts', 'remove', true, 4, 2);

			expect(pc.experience[1].type).toBe('add');
			expect(pc.experience[1].value).toBe(14);
		});
	});
});

function createTestCharacter(): PlayerCharacter {
	return {
		id: '-1',
		name: 'Jimmy Bates',
		clan: 'Brujah',
		generation: 9,
		archetype: 'Troublemaker',
		status: 'draft',
		attributes: {
			physical_value: 7,
			physical_specialization: ['Strength'],
			social_value: 3,
			social_specialization: ['Manipulation'],
			mental_value: 5,
			mental_specialization: ['Perception']
		},
		skills: [
			{ name: 'Brawl', value: 4 },
			{ name: 'Dodge', value: 3 },
			{ name: 'Melee', value: 3 },
			{ name: 'Security', value: 2 },
			{ name: 'Streetwise', value: 2 },
			{ name: 'Investigation', value: 2 },
			{ name: 'Subterfuge', value: 1 },
			{ name: 'Linguistics', value: 1 },
			{ name: 'Stealth', value: 1 },
			{ name: 'Empathy', value: 1 }
		],
		disciplines: [
			{ name: 'Celerity', value: 1, inclan: true },
			{ name: 'Potence', value: 2, inclan: true },
			{ name: 'Presence', value: 1, inclan: true }
		],
		morality: { name: 'Humanity', value: 5 },
		backgrounds: [
			{ name: 'Generation', value: 2 },
			{ name: 'Contacts', value: 3 },
			{ name: 'Haven', value: 1 }
		],
		experience: [
			{
				date: new Date(),
				value: 0,
				type: 'add',
				reason: 'Initial Experience Bonus'
			}
		],
		blood: { value: 10 },
		willpower: { value: 6 },
		damageTaken: { normal: 0, aggrevated: 0 },
		beastTraits: { value: 0 }
	};
}
