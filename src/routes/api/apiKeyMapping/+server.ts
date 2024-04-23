import HttpStatusCode from '$lib/server/httpStatusCode';
import { apiKeyMapping, type ApiKeyMapping } from '$lib/zod/apiKey/apiKeyMapping';
import { apiKeyRequestBody } from '$lib/zod/apiKey/apiKeyRequestBody';
import { error, json } from '@sveltejs/kit';
import { ClientResponseError } from 'pocketbase';

export async function POST({ locals, request }) {
	const requestJson = await request.json();

	const apiKeyRequestParsed = apiKeyRequestBody.safeParse(requestJson);

	if (apiKeyRequestParsed.success) {
		// Parsen insgesamt erfolgreich

		let apiMappingDB: ApiKeyMapping;

		try {
			apiMappingDB = await locals.pb
				.collection('api_key_mapping')
				.getFirstListItem<ApiKeyMapping>(`api_key='${apiKeyRequestParsed.data.apiKey}'`);
		} catch (e) {
			if (e instanceof ClientResponseError) {
				error(HttpStatusCode.NOT_FOUND, `API-Key existiert nicht: ${e.message}`);
			}
			error(
				HttpStatusCode.INTERNAL_SERVER_ERROR,
				`Unbekannter Fehler aufgetreten: ${JSON.stringify(e)}`
			);
		}

		const apiKeyMappingParsed = apiKeyMapping.safeParse(apiMappingDB);

		if (apiKeyMappingParsed.success) {
			return json(apiKeyMappingParsed.data);
		} else {
			error(
				HttpStatusCode.INTERNAL_SERVER_ERROR,
				'API-Key-Eintrag in Datenbank entspricht nicht dem korrekten Schema'
			);
		}
	} else {
		error(HttpStatusCode.BAD_REQUEST, 'Der Requestbody ist nicht korrekt formatiert');
	}
}
