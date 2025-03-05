import { changeTypeName } from '$lib/zod/lotn/enums/changeTypeName';
import type { PlayerCharacterBaseUpdateRequestBody } from '$lib/zod/lotn/playerCharacter/playerCharacterBase';
import type { PlayerExperienceRequestBodyDB } from '$lib/zod/lotn/playerCharacter/playerExperience';
import { fail } from '@sveltejs/kit';
import { z } from 'zod';
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
	},
	giveExperience: async ({ request, fetch }) => {
		const data = await request.formData();
		const selectedCharacters = z
			.string()
			.array()
			.parse(JSON.parse(data.get('selectedCharacters') as string));
		const value = Number(data.get('amountExp'));
		const reason = String(data.get('reasonExp'));
		const type = changeTypeName.parse(data.get('typeExp'));

		try {
			for (const characterId of selectedCharacters) {
				const requestBody: PlayerExperienceRequestBodyDB = {
					character_id: characterId,
					experience: [
						{
							date: new Date(),
							value,
							type,
							reason
						}
					]
				};

				try {
					const response = await fetch(`/api/lotn/character/experience`, {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify(requestBody)
					});

					if (!response.ok) {
						return fail(400, {
							message: `Failed to add xp to character with id ${characterId}`
						});
					}
				} catch (e) {
					return fail(500, { message: 'Failed to process request' });
				}
			}

			return { success: true };
		} catch (error) {
			return { success: false, error: 'Failed to distribute experience' };
		}
	}
};
