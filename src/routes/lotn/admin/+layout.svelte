<script lang="ts">
	import { page } from '$app/stores';
	import { detectTouchscreen, isDesktopSize } from '$lib/util';

	let innerWidth: number = 0;
</script>

<svelte:window bind:innerWidth />

<div
	class={`mt-4 grid gap-2 ${isDesktopSize(innerWidth) && !detectTouchscreen() ? 'grid-cols-1 sm:grid-cols-[auto_2fr]' : 'grid-cols-1'}`}
>
	{#if isDesktopSize(innerWidth) && !detectTouchscreen()}
		<div class="flex flex-col gap-2">
			<a
				class={`variant-filled-primary btn rounded-lg ${$page.url.pathname.match(/\/lotn\/admin$/) ? 'ring-2 ring-black dark:ring-white' : ''} `}
				href="/lotn/admin"
				type="button"
			>
				Charakterübersicht
			</a>
			<a
				class={`variant-filled-primary btn rounded-lg ${$page.url.pathname.match(/\/lotn\/admin\/review$/) ? 'ring-2 ring-black dark:ring-white' : ''} `}
				href="/lotn/admin/review"
				type="button"
			>
				Review
			</a>
		</div>
	{/if}
	<div class="card rounded-lg p-4">
		<slot />
	</div>
</div>
