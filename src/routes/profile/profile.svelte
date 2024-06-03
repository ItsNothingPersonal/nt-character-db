<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import { getImageURL, isNotNullOrUndefined } from '$lib/util';
	import Icon from '@iconify/svelte';
	import { Avatar } from '@skeletonlabs/skeleton';
	import type { ActionResult } from '@sveltejs/kit';
	import type { PageData } from './$types';

	export let data: PageData;

	let loading: boolean;
	$: loading = false;

	let previewUrl: string | undefined = undefined;

	const showPreview = (event: Event) => {
		const target = event.target as HTMLInputElement;
		const files = target?.files;

		if (isNotNullOrUndefined(files) && files.length > 0) {
			previewUrl = URL.createObjectURL(files[0]);
		}
	};

	const submitUpdateProfile = () => {
		loading = true;
		return async ({ result }: { result: ActionResult }) => {
			switch (result.type) {
				case 'success':
					await invalidateAll();
					previewUrl = undefined;
					break;
				case 'error':
					break;
				default:
					await applyAction(result);
			}
			loading = false;
		};
	};
</script>

<form
	class="flex w-full flex-col gap-2 sm:max-w-screen-sm"
	action="?/updateProfile"
	enctype="multipart/form-data"
	method="post"
	use:enhance={submitUpdateProfile}
>
	<label class="label pb-1 font-medium" for="avatar"> Profil Bild </label>
	<div class="group relative max-w-[128px]">
		<label
			class="absolute bottom-0 left-20 z-10 w-32 text-primary-500 mix-blend-hard-light hover:cursor-pointer"
			for="avatar"
		>
			<Icon icon="material-symbols:edit-document-outline" width={32} />
		</label>
		<Avatar
			initials={data.user?.username.slice(0, 2)}
			rounded="rounded-full"
			src={previewUrl
				? previewUrl
				: data.user && data.user.avatar.length > 0
					? getImageURL(data.user.collectionId, data.user.id, data.user.avatar, '128x128')
					: undefined}
			width="w-32"
		/>
	</div>

	<input
		id="avatar"
		name="avatar"
		class="input variant-form-material"
		accept="image/*"
		disabled={loading}
		hidden
		type="file"
		on:change={showPreview}
	/>

	<label>
		Name
		<input
			id="name"
			name="name"
			class="input variant-form-material"
			disabled={loading}
			value={data.user?.name}
		/>
	</label>

	<button class="variant-filled btn rounded-none" disabled={loading} type="submit">
		Profil aktualisieren
	</button>
</form>
