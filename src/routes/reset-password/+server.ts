import { isNullOrUndefined } from '$lib/util';
import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ locals }) => {
	if (isNullOrUndefined(locals.user)) redirect(303, '/login');

	await locals.pb.collection('users').requestPasswordReset(locals.user.email);
	locals.pb.authStore.clear();
	locals.user = undefined;

	redirect(303, '/login');
};
