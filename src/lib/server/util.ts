import { error } from '@sveltejs/kit';
import HttpStatusCode from '../httpStatusCode';

export function validateIdParameter(url: URL): string {
	const id = url.searchParams.get('id');

	if (!id || id.length === null || id.length <= 0) {
		error(HttpStatusCode.BAD_REQUEST, 'Keine ID vorhanden');
	}

	return id;
}
