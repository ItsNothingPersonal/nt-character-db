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
	action="?/updateEMail"
	method="post"
	class="mb-4 flex w-full flex-col gap-2 sm:max-w-screen-sm"
	use:enhance={submitUpdateForm}
>
	<label>
		Gib deine neue E-Mail-Adresse ein
		<input
			id="email"
			name="email"
			type="email"
			value={form?.data?.email ?? data.user?.email}
			class="input variant-form-material"
			disabled={loading}
			placeholder={data.user?.email}
			required
		/>
	</label>
	<button type="submit" class="variant-filled btn rounded-none" disabled={loading}>
		E-Mail-Adresse ändern
	</button>
</form>

<h3 class="text-2xl font-medium">Benutzernamen ändern</h3>
<form
	action="?/updateUsername"
	method="post"
	class="flex w-full flex-col gap-2 sm:max-w-screen-sm"
	use:enhance={submitUpdateForm}
>
	<label>
		Gib deinen neuen Benutzernamen ein
		<input
			id="username"
			name="username"
			type="text"
			value={data.user?.username}
			class="input variant-form-material"
			disabled={loading}
			placeholder={data.user?.username}
			required
		/>
	</label>
	<button type="submit" class="variant-filled btn rounded-none" disabled={loading}>
		Benutzernamen ändern
	</button>
</form>
