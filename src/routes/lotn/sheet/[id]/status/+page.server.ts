import { characterStore } from '$lib/components/lotn/characterSheet/characterStore';
import type { FormStatusDecreaseUpdate } from '$lib/server/zod/formStatusDecreaseUpdate';
import type { FormStatusIncreaseUpdate } from '$lib/server/zod/formStatusIncreaseUpdate';
import type { FormStatusUpdate } from '$lib/server/zod/formStatusUpdate';
import { playerStatus } from '$lib/zod/lotn/playerCharacter/playerStatus';
import { idSchema } from '$lib/zod/lotn/util';
import { get } from 'svelte/store';
import type { Actions } from './$types';

export async function load({ locals }) {
	return {
		userId: locals.user?.id
	};
}

export const actions: Actions = {
	updateStatus: async ({ request, fetch, locals }) => {
		const formData = await request.formData();
		const data: FormStatusUpdate = Object.fromEntries(formData) as FormStatusUpdate;
		const characterId = get(characterStore).id;

		try {
			const responseOldDB = await fetch(`/api/lotn/character/status?id=${characterId}`);
			const responseOldDBParsed = playerStatus
				.merge(idSchema)
				.array()
				.parse(await responseOldDB.json());
			const entryForSect = responseOldDBParsed.find(
				(entry: { sect: string }) => entry.sect === data.sect
			);

			if (!entryForSect) {
				return {
					success: false
				};
			}

			switch (data.statusChange) {
				case 'Support':
					if (entryForSect.support) {
						if (entryForSect.support.includes(data.characterId)) {
							return {
								success: false
							};
						}
						if (entryForSect.opposition?.includes(data.characterId)) {
							entryForSect.opposition = entryForSect.opposition.filter(
								(e) => e !== data.characterId
							);
						} else {
							entryForSect.support = [...entryForSect.support, data.characterId];
						}
					} else {
						entryForSect.support = [data.characterId];
					}
					break;
				case 'Opposition':
					if (entryForSect.opposition) {
						if (entryForSect.opposition.includes(data.characterId)) {
							return {
								success: false
							};
						}
						if (entryForSect.support?.includes(data.characterId)) {
							entryForSect.support = entryForSect.support.filter((e) => e !== data.characterId);
						} else {
							entryForSect.opposition = [...entryForSect.opposition, data.characterId];
						}
					} else {
						entryForSect.opposition = [data.characterId];
					}
					break;
			}

			await locals.pb
				.collection('lotn_player_character_status')
				.update(entryForSect.id, entryForSect);

			//update the character
			const otherStatus = responseOldDBParsed.filter((e) => e.sect !== data.sect);
			const newStatus = [...otherStatus, entryForSect];
			characterStore.update((store) => {
				return {
					...store,
					characterStatus: newStatus
				};
			});

			return {
				success: true
			};
		} catch (err) {
			return {
				success: false
			};
		}
	},
	decreaseStatus: async ({ request, fetch, locals }) => {
		const formData = await request.formData();
		const data: FormStatusDecreaseUpdate = Object.fromEntries(formData) as FormStatusDecreaseUpdate;
		const characterId = get(characterStore).id;

		try {
			const responseOldDB = await fetch(`/api/lotn/character/status?id=${characterId}`);
			const responseOldDBParsed = playerStatus
				.merge(idSchema)
				.array()
				.parse(await responseOldDB.json());
			const entryForSect = responseOldDBParsed.find(
				(entry: { sect: string }) => entry.sect === data.sect
			);

			if (!entryForSect) {
				return {
					success: false
				};
			}

			//Remove all opposition and decrease the value
			entryForSect.opposition = [];
			entryForSect.value--;
			const monikersAsArray = entryForSect.monikers?.split(',').map((e) => e.trim());

			if (!monikersAsArray || monikersAsArray.length <= 0) {
				return {
					success: false
				};
			}

			// remove the last moniker
			monikersAsArray.pop();
			entryForSect.monikers = monikersAsArray.join(',');

			await locals.pb
				.collection('lotn_player_character_status')
				.update(entryForSect.id, entryForSect);

			//update the character
			const otherStatus = responseOldDBParsed.filter((e) => e.sect !== data.sect);
			const newStatus = [...otherStatus, entryForSect];
			characterStore.update((store) => {
				return {
					...store,
					characterStatus: newStatus
				};
			});

			return {
				success: true
			};
		} catch (err) {
			return {
				success: false
			};
		}
	},
	increaseStatus: async ({ request, fetch, locals }) => {
		const formData = await request.formData();
		const data: FormStatusIncreaseUpdate = Object.fromEntries(formData) as FormStatusIncreaseUpdate;
		const characterId = get(characterStore).id;

		try {
			const responseOldDB = await fetch(`/api/lotn/character/status?id=${characterId}`);
			const responseOldDBParsed = playerStatus
				.merge(idSchema)
				.array()
				.parse(await responseOldDB.json());
			const entryForSect = responseOldDBParsed.find(
				(entry: { sect: string }) => entry.sect === data.sect
			);

			if (!entryForSect) {
				return {
					success: false
				};
			}

			//Remove all support, increase the value and add the new moniker
			entryForSect.support = [];
			entryForSect.value++;
			entryForSect.monikers = entryForSect.monikers
				?.concat(`, ${data.moniker}`)
				.split(',')
				.map((e) => e.trim())
				.join(',');

			await locals.pb
				.collection('lotn_player_character_status')
				.update(entryForSect.id, entryForSect);

			//update the character
			const otherStatus = responseOldDBParsed.filter((e) => e.sect !== data.sect);
			const newStatus = [...otherStatus, entryForSect];
			characterStore.update((store) => {
				return {
					...store,
					characterStatus: newStatus
				};
			});

			return {
				success: true
			};
		} catch (err) {
			return {
				success: false
			};
		}
	}
};
