import { characterCreationStore } from '$lib/stores/characterCreationStore';
import { isNullOrUndefined } from '$lib/util';
import { redirect } from '@sveltejs/kit';
import { get } from 'svelte/store';
import type { PageLoad } from './$types';

export const load = (async () => {
	if (isNullOrUndefined(get(characterCreationStore).project)) {
		redirect(302, '/lotn/sheet/create/step_00');
	}
}) satisfies PageLoad;
