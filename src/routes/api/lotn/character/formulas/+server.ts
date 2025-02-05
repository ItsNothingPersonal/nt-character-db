import HttpStatusCode from '$lib/httpStatusCode';
import { validateIdParameter } from '$lib/server/util';
import {
	playerFormula,
	playerFormulaRequestBodyDB,
	playerFormulaUpdateRequestBody,
	type PlayerFormula,
	type PlayerFormulaRequestBodyDB
} from '$lib/zod/lotn/playerCharacter/playerFormula.js';
import { error, json } from '@sveltejs/kit';
import { ClientResponseError } from 'pocketbase';

export async function GET({ url, locals }) {
	const id = validateIdParameter(url);

	// Daten aus DB laden
	const playerFormulasDB = await locals.pb
		.collection('lotn_player_character_thinblood_formula')
		.getFullList<PlayerFormula>({ filter: `character_id='${id}'` })
		.catch(() => {
			return undefined;
		});

	// Daten-Schema validieren
	const playerFormulasParsed = playerFormula.array().safeParse(playerFormulasDB);

	if (playerFormulasParsed.success) {
		return playerFormulasParsed.data && playerFormulasParsed.data?.length > 0
			? json(playerFormulasParsed.data)
			: new Response(undefined, { status: 204 });
	} else {
		error(
			HttpStatusCode.INTERNAL_SERVER_ERROR,
			'LotN-Charakter-ThinBlood-Formulas in Datenbank entsprechen nicht dem korrekten Schema'
		);
	}
}

export async function POST({ locals, request }) {
	if (!locals.user) {
		error(HttpStatusCode.UNAUTHORIZED, 'Nicht eingeloggt');
	}
	const requestJson = await request.json();
	const playerFormulasCreateBodyParsed = playerFormulaRequestBodyDB.safeParse(requestJson);

	if (playerFormulasCreateBodyParsed.success) {
		// Parsen insgesamt erfolgreich
		const globalResult: PlayerFormulaRequestBodyDB[] = [];
		for (const formula of playerFormulasCreateBodyParsed.data.formulas) {
			try {
				const formulaResult = await locals.pb
					.collection('lotn_player_character_thinblood_formula')
					.create<PlayerFormulaRequestBodyDB>({
						...formula,
						character_id: playerFormulasCreateBodyParsed.data.character_id
					});
				globalResult.push(formulaResult);
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

		return new Response(JSON.stringify(playerFormula.array().parse(globalResult)), {
			status: HttpStatusCode.OK
		});
	} else {
		error(HttpStatusCode.BAD_REQUEST, 'Der Requestbody ist nicht korrekt formatiert');
	}
}

export async function PUT({ locals, request }) {
	if (!locals.user) {
		error(HttpStatusCode.UNAUTHORIZED, 'Nicht eingeloggt');
	}
	const requestJson = await request.json();
	const updateBodyParsed = playerFormulaUpdateRequestBody.safeParse(requestJson);

	if (updateBodyParsed.success) {
		// Parsen insgesamt erfolgreich
		let result: PlayerFormula;
		try {
			result = await locals.pb
				.collection('lotn_player_character_thinblood_formula')
				.update<PlayerFormula>(updateBodyParsed.data.id, updateBodyParsed.data.updateData);
		} catch (e) {
			if (e instanceof ClientResponseError) {
				error(HttpStatusCode.INTERNAL_SERVER_ERROR, `Datenbankupdate fehlgeschlagen: ${e.message}`);
			}
			error(
				HttpStatusCode.INTERNAL_SERVER_ERROR,
				`Unbekannter Fehler aufgetreten: ${JSON.stringify(e)}`
			);
		}

		return new Response(JSON.stringify(playerFormula.parse(result)), {
			status: HttpStatusCode.OK
		});
	} else {
		error(HttpStatusCode.BAD_REQUEST, 'Der Requestbody ist nicht korrekt formatiert');
	}
}
