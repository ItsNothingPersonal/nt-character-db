<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import type { ActionResult } from '@sveltejs/kit';
	import type { ActionData, PageData } from './$types';

	export let form: ActionData;
	export let data: PageData;

	let loading: boolean;
	$: loading = false;

	const submitUpdateForm = () => {
		loading = true;

		return async ({ result }: { result: ActionResult }) => {
			switch (result.type) {
				case 'success':
					await invalidateAll();
					break;
				case 'error':
					break;
				default:
					applyAction(result);
					break;
			}
			loading = false;
		};
	};
</script>

<h3 class="text-2xl font-medium">EMail ändern</h3>
<form
	class="mb-4 flex w-full flex-col gap-2 sm:max-w-screen-sm"
	action="?/updateEMail"
	method="post"
	use:enhance={submitUpdateForm}
>
	<label>
		Gib deine neue E-Mail-Adresse ein
		<input
			id="email"
			name="email"
			class="input variant-form-material"
			disabled={loading}
			placeholder={data.user?.email}
			required
			type="email"
			value={form?.data?.email ?? data.user?.email}
		/>
	</label>
	<button class="variant-filled btn rounded-none" disabled={loading} type="submit">
		E-Mail-Adresse ändern
	</button>
</form>

<h3 class="text-2xl font-medium">Benutzernamen ändern</h3>
<form
	class="flex w-full flex-col gap-2 sm:max-w-screen-sm"
	action="?/updateUsername"
	method="post"
	use:enhance={submitUpdateForm}
>
	<label>
		Gib deinen neuen Benutzernamen ein
		<input
			id="username"
			name="username"
			class="input variant-form-material"
			disabled={loading}
			placeholder={data.user?.username}
			required
			type="text"
			value={data.user?.username}
		/>
	</label>
	<button class="variant-filled btn rounded-none" disabled={loading} type="submit">
		Benutzernamen ändern
	</button>
</form>
