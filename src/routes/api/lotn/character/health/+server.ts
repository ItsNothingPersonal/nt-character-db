import HttpStatusCode from '$lib/httpStatusCode';
import { validateIdParameter } from '$lib/server/util';
import {
	playerHealth,
	playerHealthRequestBodyDB,
	playerHealthUpdateRequestBody,
	type PlayerHealth,
	type PlayerHealthRequestBodyDB
} from '$lib/zod/lotn/playerCharacter/playerHealth';
import { type PlayerHealthServer } from '$lib/zod/lotn/types/playerHealthServer';
import { error, json } from '@sveltejs/kit';
import { ClientResponseError } from 'pocketbase';

export async function GET({ url, locals }) {
	const id = validateIdParameter(url);

	// Daten aus DB laden
	const playerCharacterHealthDB = await locals.pb
		.collection('lotn_player_character_health')
		.getFirstListItem<PlayerHealth>(`character_id='${id}'`);

	// Daten-Schema validieren
	const playerCharacterHealthParsed = playerHealth.safeParse(playerCharacterHealthDB);

	if (playerCharacterHealthParsed.success) {
		return json(playerCharacterHealthParsed.data);
	} else {
		error(
			HttpStatusCode.INTERNAL_SERVER_ERROR,
			'LoTN-Charakter-Health in Datenbank entsprechen nicht dem korrekten Schema'
		);
	}
}

export async function POST({ locals, request }) {
	if (!locals.user) {
		error(HttpStatusCode.UNAUTHORIZED, 'Nicht eingeloggt');
	}
	const requestJson = await request.json();
	const playerHealthCreateBodyParsed = playerHealthRequestBodyDB.safeParse(requestJson);

	if (playerHealthCreateBodyParsed.success) {
		// Parsen insgesamt erfolgreich
		let result: PlayerHealthRequestBodyDB;
		try {
			result = await locals.pb
				.collection('lotn_player_character_health')
				.create<PlayerHealthRequestBodyDB>({
					normal: playerHealthCreateBodyParsed.data.normal,
					aggrevated: playerHealthCreateBodyParsed.data.aggrevated,
					character_id: playerHealthCreateBodyParsed.data.character_id
				});
		} catch (e) {
			if (e instanceof ClientResponseError) {
				error(HttpStatusCode.INTERNAL_SERVER_ERROR, `Datenbankupdate fehlgeschlagen: ${e.message}`);
			} else {
				error(
					HttpStatusCode.INTERNAL_SERVER_ERROR,
					`Unbekannter Fehler aufgetreten: ${JSON.stringify(e)}`
				);
			}
		}

		return new Response(JSON.stringify(playerHealth.parse(result)), {
			status: HttpStatusCode.OK
		});
	} else {
		console.error(playerHealthCreateBodyParsed.error.issues);
		error(HttpStatusCode.BAD_REQUEST, 'Der Requestbody ist nicht korrekt formatiert');
	}
}

export async function PUT({ locals, request }) {
	if (!locals.user) {
		error(HttpStatusCode.UNAUTHORIZED, 'Nicht eingeloggt');
	}
	const requestJson = await request.json();
	const updateBodyParsed = playerHealthUpdateRequestBody.safeParse(requestJson);

	if (updateBodyParsed.success) {
		const oldDataDB = await locals.pb
			.collection('lotn_player_character_health')
			.getFirstListItem<PlayerHealthServer>(`character_id='${updateBodyParsed.data.character_id}'`);

		if (!oldDataDB.id) {
			error(HttpStatusCode.BAD_REQUEST, 'Eintrag nicht gefunden');
		}

		// Parsen insgesamt erfolgreich
		let result: PlayerHealth;
		try {
			let updateString: Partial<PlayerHealth>;
			switch (updateBodyParsed.data.updateData.damageType) {
				case 'normal':
					updateString = {
						normal:
							updateBodyParsed.data.updateData.type === 'add'
								? oldDataDB.normal + updateBodyParsed.data.updateData.value
								: oldDataDB.normal - updateBodyParsed.data.updateData.value
					};
					break;
				case 'aggrevated':
					updateString = {
						aggrevated:
							updateBodyParsed.data.updateData.type === 'add'
								? oldDataDB.aggrevated + updateBodyParsed.data.updateData.value
								: oldDataDB.aggrevated - updateBodyParsed.data.updateData.value
					};
					break;
				default:
					updateString = {};
			}
			result = await locals.pb
				.collection('lotn_player_character_health')
				.update(oldDataDB.id, updateString);
		} catch (e) {
			if (e instanceof ClientResponseError) {
				error(HttpStatusCode.INTERNAL_SERVER_ERROR, `Datenbankupdate fehlgeschlagen: ${e.message}`);
			}
			error(
				HttpStatusCode.INTERNAL_SERVER_ERROR,
				`Unbekannter Fehler aufgetreten: ${JSON.stringify(e)}`
			);
		}

		return new Response(JSON.stringify(playerHealth.parse(result)), {
			status: HttpStatusCode.OK
		});
	} else {
		error(HttpStatusCode.BAD_REQUEST, 'Der Requestbody ist nicht korrekt formatiert');
	}
}
