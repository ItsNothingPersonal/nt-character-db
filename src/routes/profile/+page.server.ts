import type { UpdatePassword } from '$lib/server/updatePassword';
import type { UpdateUser } from '$lib/server/updateUser';
import { isNotNullOrUndefined, isNullOrUndefined } from '$lib/util';
import type { PBUser } from '$lib/zod/user';
import { error, redirect } from '@sveltejs/kit';
import type { ClientResponseError } from 'pocketbase';
import type { Actions, PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
	if (!locals.pb.authStore.isValid) {
		throw redirect(303, '/login');
	}
}) satisfies PageServerLoad;

export const actions: Actions = {
	updateProfile: async ({ request, locals }) => {
		if (isNullOrUndefined(locals.user)) redirect(303, '/login');

		const formData = await request.formData();
		const userAvatar: File = formData.get('avatar') as File;
		if (isNotNullOrUndefined(userAvatar) && userAvatar.size === 0) {
			formData.delete('avatar');
		}

		try {
			const { name, avatar } = await locals.pb
				.collection('users')
				.update<PBUser>(locals.user.id, formData);
			if (isNotNullOrUndefined(locals.user)) {
				locals.user.name = name;
				locals.user.avatar = avatar;
			}
		} catch (err) {
			console.error(err);
			error(400, 'Etwas ist beim Updaten des Profils schief gegangen');
		}

		return {
			success: true
		};
	},
	updateEMail: async ({ request, locals }) => {
		const formData = await request.formData();
		const data: UpdateUser = Object.fromEntries(formData) as UpdateUser;

		try {
			await locals.pb.collection('users').requestEmailChange(data.email);
		} catch (err) {
			const clientError = err as ClientResponseError;
			error(clientError.status, clientError.message);
		}

		return {
			success: true,
			data: {
				username: data.username,
				email: data.email
			}
		};
	},
	updateUsername: async ({ request, locals }) => {
		if (isNullOrUndefined(locals.user)) redirect(303, '/login');

		const formData = await request.formData();
		const data: UpdateUser = Object.fromEntries(formData) as UpdateUser;

		try {
			await locals.pb.collection('users').getFirstListItem(`username = "${data.username}"`);
		} catch (err) {
			const clientError = err as ClientResponseError;
			if (clientError.status === 404) {
				try {
					const { username } = await locals.pb
						.collection('users')
						.update(locals.user?.id, { username: data.username });
					if (isNotNullOrUndefined(locals.user)) {
						locals.user.username = username;

						return {
							success: true,
							data: {
								username: locals.user.username,
								email: data.email
							}
						};
					}

					error(400, 'Etwas ging bei der Aktualisierung des Benutzernamen schief');
				} catch (err) {
					const clientError = err as ClientResponseError;
					console.error(clientError);

					error(clientError.status, clientError.message);
				}
			}
			console.error(clientError);
			error(clientError.status, clientError.message);
		}

		return {
			success: false,
			data: {
				username: data.username,
				email: data.email
			}
		};
	},
	updatePassword: async ({ request, locals }) => {
		if (isNullOrUndefined(locals.user)) redirect(303, '/login');

		const formData = await request.formData();
		const data: UpdatePassword = Object.fromEntries(formData) as UpdatePassword;

		try {
			await locals.pb.collection('users').update(locals.user.id, data);
			locals.pb.authStore.clear();
		} catch (err) {
			const clientError = err as ClientResponseError;
			console.error(clientError);
			error(clientError.status, clientError.message);
		}

		redirect(303, '/login');
	}
};
