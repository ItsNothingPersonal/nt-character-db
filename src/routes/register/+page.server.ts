import type { CreateUser } from '$lib/server/zod/createUser';
import type { FormUserCreate } from '$lib/server/zod/formUserCreate';
import { serializeNonPOJOs } from '$lib/util';
import { redirect } from '@sveltejs/kit';
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
			passwordConfirm: data.passwordConfirm
		};

		try {
			await locals.pb.collection('users').create(userToCreate);
			await locals.pb.collection('users').requestVerification(data.email);

			locals.pb.authStore.clear();
		} catch (error) {
			console.error(error);
			return {
				error: true,
				message: serializeNonPOJOs(error)
			};
		}

		redirect(303, '/login');
	}
};
