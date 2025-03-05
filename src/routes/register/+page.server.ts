import type { CreateUser } from '$lib/server/zod/createUser';
import type { FormUserCreate } from '$lib/server/zod/formUserCreate';
import { registrationError } from '$lib/zod/registrationError';
import { error, fail, redirect } from '@sveltejs/kit';
import { ClientResponseError } from 'pocketbase';
import type { Actions } from './$types';

export const actions: Actions = {
	register: async ({ locals, request }) => {
		const formData = await request.formData();
		const data: FormUserCreate = Object.fromEntries(formData) as FormUserCreate;
		const userToCreate: CreateUser = {
			username: data.username,
			name: data.username,
			email: data.email,
			password: data.password,
			passwordConfirm: data.passwordConfirm,
			role: 'User',
			emailVisibility: false
		};

		try {
			await locals.pb.collection('users').create(userToCreate);
			await locals.pb.collection('users').requestVerification(data.email);

			locals.pb.authStore.clear();
		} catch (err: unknown) {
			if (err instanceof ClientResponseError) {
				const errObject = JSON.parse(JSON.stringify(err.data.data));

				const errArray: { field: string; message: string }[] = [];

				if (errObject.email) {
					errArray.push({ field: 'email', message: errObject.email.message });
				}
				if (errObject.password) {
					errArray.push({ field: 'password', message: errObject.password.message });
				}
				if (errObject.username) {
					errArray.push({ field: 'username', message: errObject.username.message });
				}

				if (errArray.length > 0) {
					return fail(err.status, {
						errors: registrationError.array().parse(
							errArray.map((e) => {
								return { field: e.field, message: e.message };
							})
						)
					});
				}
				error(err.status, err.message);
			}
		}

		redirect(303, '/login');
	}
};
