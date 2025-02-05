import { describe, expect, it } from 'vitest';
import { getDefenderTestPool } from './testPools';

describe('getDefenderTestPool', () => {
	it('gets the correct testpool for Compel', () => {
		expect(getDefenderTestPool('Dominate', 'Compel')).toBe('Intelligence + Resolve');
	});

	it('gets the correct testpool for Dementation', () => {
		expect(getDefenderTestPool('Dominate', 'Dementation')).toBe('Intelligence + Composure');
	});
});
