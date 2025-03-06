import type { PlayerCharacterBaseUpdateRequestBody } from '$lib/zod/lotn/playerCharacter/playerCharacterBase';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
	if (!locals.pb.authStore.isValid) {
		throw redirect(303, '/login');
	}
}) satisfies PageServerLoad;

export const actions: Actions = {
	reviewCharacter: async ({ fetch, request }) => {
		const formData = await request.formData();
		const characterId = formData.get('characterId');

		if (!characterId) {
			return fail(400, { message: 'Character ID missing' });
		}

		const requestBody: PlayerCharacterBaseUpdateRequestBody = {
			id: characterId.toString(),
			updateData: {
				status: 'review'
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
				return fail(400, { message: 'Failed to review character' });
			}

			return { type: 'review', characterId: characterId.toString() };
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

			return { type: 'review', characterId: characterId.toString() };
		} catch (e) {
			return fail(500, { message: 'Failed to process request' });
		}
	}
};
