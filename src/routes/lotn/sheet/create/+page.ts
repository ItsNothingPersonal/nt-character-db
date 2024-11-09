import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load = (async () => {
	redirect(302, '/lotn/sheet/create/step_01');
}) satisfies PageLoad;