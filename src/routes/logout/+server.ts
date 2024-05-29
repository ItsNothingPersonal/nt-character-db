import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ locals }) => {
	locals.pb.authStore.clear();
	locals.user = undefined;

	redirect(303, '/login');
};
