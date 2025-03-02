import { describe, expect, it } from 'vitest';
import { pbUser } from './user';

describe('user defaults', () => {
	it('an default user without a role should work', () => {
		const emptyObject = {
			avatar: '',
			collectionId: '12345',
			email: 'demo@test.de',
			id: '12345',
			name: 'testi',
			username: 'testi',
			role: ''
		};
		const user = pbUser.safeParse(emptyObject);
		expect(user.success).toBe(true);
	});
});
