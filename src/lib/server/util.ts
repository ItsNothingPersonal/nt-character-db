import { error } from '@sveltejs/kit';
import HttpStatusCode from '../httpStatusCode';

export function validateIdParameter(url: URL): string {
	const id = url.searchParams.get('id');

	if (!id || id.length === null || id.length <= 0) {
		error(HttpStatusCode.BAD_REQUEST, 'Keine ID vorhanden');
	}

	return id;
}

export type ApiResponse = Response | null;

export async function fetchWithCatch(
	url: string,
	fetch: {
		(input: RequestInfo | URL, init?: RequestInit): Promise<Response>;
		(input: string | URL | globalThis.Request, init?: RequestInit): Promise<Response>;
	}
) {
	try {
		const response = await fetch(url);
		if (!response.ok) {
			throw new Error(`Failed to fetch ${url}, Status: ${response.status}`);
		}
		return response;
	} catch (error) {
		throw new Error(
			`Something went wrong while fetching ${url}:\n${JSON.stringify(error, undefined, 2)}`
		);
	}
}

export async function parseJson(response: ApiResponse) {
	if (response === null || response.status !== HttpStatusCode.OK) {
		return null;
	}
	return response.json();
}
