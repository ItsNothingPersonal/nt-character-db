import type { FormUserLogin } from '$lib/server/zod/formUserLogin';
import { error, redirect } from '@sveltejs/kit';
import type { ClientResponseError } from 'pocketbase';
import type { Actions, PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
	const authMethods = await locals.pb.collection('users').listAuthMethods();
	return {
		authProviders: authMethods.authProviders.sort((a: { name: string }, b: { name: string }) =>
			a.name.localeCompare(b.name)
		)
	};
}) satisfies PageServerLoad;

export const actions: Actions = {
	login: async ({ request, locals }) => {
		const formData = await request.formData();
		const data: FormUserLogin = Object.fromEntries(formData) as FormUserLogin;

		try {
			await locals.pb.collection('users').authWithPassword(data.email, data.password);
			if (!locals.pb.authStore.model?.verified) {
				locals.pb.authStore.clear();
				return {
					success: false,
					notVerified: true
				};
			}
		} catch (err) {
			return {
				success: false,
				notVerified: false
			};
		}

		redirect(303, '/');
	},
	resetPassword: async ({ request, locals }) => {
		const formData = await request.formData();

		try {
			const email = formData.get('email');
			if (email) {
				await locals.pb.collection('users').requestPasswordReset(email.toString());
			}
		} catch (err) {
			const clientError = err as ClientResponseError;
			error(clientError.status, clientError.message);
		}

		return {
			success: true,
			notVerified: false
		};
	}
};
