import {
	checkForApplicableItemAttackBonus,
	checkForApplicableItemDefenseBonus
} from '$lib/validation/items';
import { describe, expect, test } from 'vitest';

describe('defense item bonuses', () => {
	test('ballistic (range)', () => {
		const bonus = checkForApplicableItemDefenseBonus(['Ballistic'], 'Ranged');
		expect(bonus).toBe(3);
	});

	test('ballistic (melee)', () => {
		const bonus = checkForApplicableItemDefenseBonus(['Ballistic'], 'Melee');
		expect(bonus).toBe(1);
	});

	test('hardened (ranged)', () => {
		const bonus = checkForApplicableItemDefenseBonus(['Hardened'], 'Ranged');
		expect(bonus).toBe(1);
	});

	test('hardened (melee)', () => {
		const bonus = checkForApplicableItemDefenseBonus(['Hardened'], 'Melee');
		expect(bonus).toBe(3);
	});

	test('full body (ranged)', () => {
		const bonus = checkForApplicableItemDefenseBonus(['Full Body'], 'Ranged');
		expect(bonus).toBe(3);
	});

	test('full body (melee)', () => {
		const bonus = checkForApplicableItemDefenseBonus(['Full Body'], 'Melee');
		expect(bonus).toBe(3);
	});

	test('ballistic + hardened (ranged)', () => {
		const bonus = checkForApplicableItemDefenseBonus(['Ballistic', 'Hardened'], 'Ranged');
		expect(bonus).toBe(4);
	});

	test('ballistic + hardened (melee)', () => {
		const bonus = checkForApplicableItemDefenseBonus(['Ballistic', 'Hardened'], 'Melee');
		expect(bonus).toBe(4);
	});

	test('ballistic + hardened + full body (melee)', () => {
		const bonus = checkForApplicableItemDefenseBonus(
			['Ballistic', 'Hardened', 'Full Body'],
			'Melee'
		);
		expect(bonus).toBe(7);
	});

	test('ballistic + hardened + full body (ranged)', () => {
		const bonus = checkForApplicableItemDefenseBonus(
			['Ballistic', 'Hardened', 'Full Body'],
			'Ranged'
		);
		expect(bonus).toBe(7);
	});

	test('no defense quality', () => {
		const bonus = checkForApplicableItemDefenseBonus(['Antique', 'Chest Plate'], 'Ranged');
		expect(bonus).toBe(0);
	});
});

describe('attack item bonuses', () => {
	test('accurate (range)', () => {
		const bonus = checkForApplicableItemAttackBonus(['Accurate'], 'Firearms');
		expect(bonus).toBe(2);
	});

	test('brawl cannot be affacted with item bonuses', () => {
		const bonus = checkForApplicableItemAttackBonus(['Accurate'], 'Brawl');
		expect(bonus).toBe(0);
	});

	test('no attack quality', () => {
		const bonus = checkForApplicableItemAttackBonus(
			['Ammo Capacity I', 'Armor Piercing'],
			'Firearms'
		);
		expect(bonus).toBe(0);
	});
});
