import HttpStatusCode from '$lib/server/httpStatusCode';
import { validateIdParameter } from '$lib/server/util';
import {
	playerBackground,
	type PlayerBackground
} from '$lib/zod/lotn/playerCharacter/playerBackground';
import { playerBackgroundAdvantage } from '$lib/zod/lotn/playerCharacter/playerBackgroundAdvantage';
import { playerBackgroundDisadvantage } from '$lib/zod/lotn/playerCharacter/playerBackgroundDisdvantage.js';
import { error, json } from '@sveltejs/kit';
import { z } from 'zod';

export async function GET({ url, locals, fetch }) {
	const id = validateIdParameter(url);

	// Daten aus DB laden
	const playerBackgroundsDB = await locals.pb
		.collection('lotn_player_character_background')
		.getFullList<PlayerBackground>({ filter: `character_id='${id}'` });

	// Daten-Schema validieren
	const playerBackgroundsParsed = playerBackground
		.extend({ id: z.string() })
		.array()
		.nonempty()
		.safeParse(playerBackgroundsDB);

	if (playerBackgroundsParsed.success) {
		const updatedBackgrounds = await Promise.all(
			playerBackgroundsParsed.data.map(async (background) => {
				const playerBackgroundsAdvantageDB = await fetch(
					`/api/lotn/character/backgrounds/advantages?id=${background.id}`
				);
				const advantages = playerBackgroundAdvantage
					.array()
					.parse(await playerBackgroundsAdvantageDB.json());

				const playerBackgroundsDisadvantageDB = await fetch(
					`/api/lotn/character/backgrounds/disadvantages?id=${background.id}`
				);
				const disadvantages = playerBackgroundDisadvantage
					.array()
					.parse(await playerBackgroundsDisadvantageDB.json());

				return {
					...background,
					advantages: advantages.length > 0 ? advantages : undefined,
					disadvantages: disadvantages.length > 0 ? disadvantages : undefined
				};
			})
		);

		return json(playerBackground.array().nonempty().parse(updatedBackgrounds));
	} else {
		error(
			HttpStatusCode.INTERNAL_SERVER_ERROR,
			'LotN-Charakter-Backgrounds in Datenbank entsprechen nicht dem korrekten Schema'
		);
	}
}
