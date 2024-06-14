import HttpStatusCode from '$lib/server/httpStatusCode';
import { validateIdParameter } from '$lib/server/util';
import {
	playerMorality,
	playerMoralityRequestBodyDB,
	type PlayerMorality,
	type PlayerMoralitySingleRequestBodyDB
} from '$lib/zod/lotn/playerCharacter/playerMorality';
import { error, json } from '@sveltejs/kit';
import { ClientResponseError } from 'pocketbase';

export async function GET({ url, locals }) {
	const id = validateIdParameter(url);

	// Daten aus DB laden
	const playerMoralityDB = await locals.pb
		.collection('lotn_player_character_morality')
		.getFullList<PlayerMorality>({ filter: `character_id='${id}'` });

	// Daten-Schema validieren
	const playerMoralityParsed = playerMorality.array().nonempty().safeParse(playerMoralityDB);

	if (playerMoralityParsed.success) {
		return json(playerMoralityParsed.data);
	} else {
		error(
			HttpStatusCode.INTERNAL_SERVER_ERROR,
			'LotN-Charakter-Morality in Datenbank entsprechen nicht dem korrekten Schema'
		);
	}
}

export async function POST({ locals, request }) {
	if (!locals.user) {
		error(HttpStatusCode.UNAUTHORIZED, 'Nicht eingeloggt');
	}
	const requestJson = await request.json();
	const playerMoralityCreateBodyParsed = playerMoralityRequestBodyDB.safeParse(requestJson);

	if (playerMoralityCreateBodyParsed.success) {
		// Parsen insgesamt erfolgreich
		const globalResult: PlayerMoralitySingleRequestBodyDB[] = [];
		for (const morality of playerMoralityCreateBodyParsed.data.morality) {
			try {
				const result = await locals.pb
					.collection('lotn_player_character_morality')
					.create<PlayerMoralitySingleRequestBodyDB>({
						...morality,
						character_id: playerMoralityCreateBodyParsed.data.character_id
					});
				globalResult.push(result);
			} catch (e) {
				if (e instanceof ClientResponseError) {
					error(
						HttpStatusCode.INTERNAL_SERVER_ERROR,
						`Datenbankupdate fehlgeschlagen: ${e.message}`
					);
				} else {
					error(
						HttpStatusCode.INTERNAL_SERVER_ERROR,
						`Unbekannter Fehler aufgetreten: ${JSON.stringify(e)}`
					);
				}
			}
		}
		const returnResult: PlayerMorality[] = globalResult.map((result) => {
			return { conviction: result.conviction, touchstone: result.touchstone };
		});

		return new Response(JSON.stringify(playerMorality.array().parse(returnResult)), {
			status: HttpStatusCode.OK
		});
	} else {
		console.error(playerMoralityCreateBodyParsed.error.issues);
		error(HttpStatusCode.BAD_REQUEST, 'Der Requestbody ist nicht korrekt formatiert');
	}
}
