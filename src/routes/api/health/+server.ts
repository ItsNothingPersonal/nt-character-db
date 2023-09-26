import { json } from '@sveltejs/kit';

export async function GET({ locals }) {
	const status = await locals.pb.health.check();

	return json(status);
}
