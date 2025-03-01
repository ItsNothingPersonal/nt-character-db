import HttpStatusCode from '$lib/httpStatusCode';
import { playerCharacterSelection } from '$lib/zod/lotn/types/playerCharacterSelection';
import type { ProjectName } from '$lib/zod/projectName.js';
import { pbUser } from '$lib/zod/user.js';
import { error } from '@sveltejs/kit';
import { z } from 'zod';

export async function load({ fetch, parent }) {
	const parentData = await parent();
	const user = pbUser.parse(parentData.user);

	let projectName: ProjectName;
	switch (user.role) {
		case 'Storyteller Protektorat':
			projectName = 'Protektorat';
			break;
		case 'Storyteller Anarchen':
			projectName = 'Anarchen';
			break;
		default:
			error(HttpStatusCode.FORBIDDEN, 'Nicht berechtigt');
	}

	const loadCharacterReviewResponse = await fetch(`/api/lotn/loadReview`, {
		method: 'POST',
		body: JSON.stringify({ project: projectName })
	});

	const loadCharacterAcceptedResponse = await fetch(`/api/lotn/loadCharacters`, {
		method: 'POST',
		body: JSON.stringify({ mode: 'all' })
	});

	const json = await loadCharacterAcceptedResponse.json();

	return {
		charactersReview: playerCharacterSelection
			.extend({ username: z.string() })
			.array()
			.parse(await loadCharacterReviewResponse.json()),
		charactersAccepted: playerCharacterSelection
			.extend({ username: z.string() })
			.array()
			.parse(json)
	};
}
