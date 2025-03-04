import type { PlayerCharacterBaseUpdateRequestBody } from '$lib/zod/lotn/playerCharacter/playerCharacterBase';
import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
	acceptCharacter: async ({ fetch, request }) => {
		const formData = await request.formData();
		const characterId = formData.get('characterId');

		if (!characterId) {
			return fail(400, { message: 'Character ID missing' });
		}

		const requestBody: PlayerCharacterBaseUpdateRequestBody = {
			id: characterId.toString(),
			updateData: {
				status: 'accepted'
			}
		};

		try {
			const response = await fetch(`/api/lotn/character/base`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(requestBody)
			});

			if (!response.ok) {
				return fail(400, { message: 'Failed to accept character' });
			}

			return { success: true };
		} catch (e) {
			return fail(500, { message: 'Failed to process request' });
		}
	},
	rejectCharacter: async ({ fetch, request }) => {
		const formData = await request.formData();
		const characterId = formData.get('characterId');

		if (!characterId) {
			return fail(400, { message: 'Character ID missing' });
		}

		const requestBody: PlayerCharacterBaseUpdateRequestBody = {
			id: characterId.toString(),
			updateData: {
				status: 'rejected'
			}
		};

		try {
			const response = await fetch(`/api/lotn/character/base`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(requestBody)
			});

			if (!response.ok) {
				return fail(400, { message: 'Failed to reject character' });
			}

			return { success: true };
		} catch (e) {
			return fail(500, { message: 'Failed to process request' });
		}
	},
	archiveCharacter: async ({ fetch, request }) => {
		const formData = await request.formData();
		const characterId = formData.get('characterId');

		if (!characterId) {
			return fail(400, { message: 'Character ID missing' });
		}

		const requestBody: PlayerCharacterBaseUpdateRequestBody = {
			id: characterId.toString(),
			updateData: {
				status: 'archived'
			}
		};

		try {
			const response = await fetch(`/api/lotn/character/base`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(requestBody)
			});

			if (!response.ok) {
				return fail(400, { message: 'Failed to archive character' });
			}

			return { success: true };
		} catch (e) {
			return fail(500, { message: 'Failed to process request' });
		}
	}
};
