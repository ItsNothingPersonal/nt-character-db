<script lang="ts">
	import { page } from '$app/stores';
	import { characterCreationStore } from '$lib/stores/characterCreationStore';
	import { detectTouchscreen, generateId, isDesktopSize } from '$lib/util';
	import { onMount } from 'svelte';

	let innerWidth: number = 0;

	onMount(() => {
		characterCreationStore.update((store) => {
			if (!store.merits?.find((merit) => merit.name === 'Linguistics')) {
				if (!store.merits) store.merits = [];

				store.merits = [
					...store.merits,
					{
						id: generateId(),
						name: 'Linguistics',
						value: 0
					}
				];
			}
			return store;
		});
	});

	function resetStore() {
		characterCreationStore.clear();
	}
</script>

<svelte:window bind:innerWidth />

<div class="flex justify-between">
	<h1 class="h1">Character-Creation</h1>

	<button class="btn" type="button" on:click={resetStore}>
		<iconify-icon height="24" icon="mdi:restart" width="24"></iconify-icon>
		Reset
	</button>
</div>

<div
	class={`mt-4 grid gap-2 ${isDesktopSize(innerWidth) && !detectTouchscreen() ? 'grid-cols-1 sm:grid-cols-[auto_2fr]' : 'grid-cols-1'}`}
>
	{#if isDesktopSize(innerWidth) && !detectTouchscreen()}
		<div class="flex flex-col gap-2">
			<a
				class={`variant-filled-primary btn rounded-lg ${$page.url.pathname.match('/lotn/sheet/create/step_01') ? 'ring-2 ring-black dark:ring-white' : ''}`}
				href="/lotn/sheet/create/step_01"
				type="button"
			>
				Who are they?
			</a>
			<a
				class={`variant-filled-primary btn rounded-lg ${$page.url.pathname.match('/lotn/sheet/create/step_02') ? 'ring-2 ring-black dark:ring-white' : ''}`}
				href="/lotn/sheet/create/step_02"
				type="button"
			>
				Choose A Clan
			</a>
			<a
				class={`variant-filled-primary btn rounded-lg ${$page.url.pathname.match('/lotn/sheet/create/step_03') ? 'ring-2 ring-black dark:ring-white' : ''}`}
				href="/lotn/sheet/create/step_03"
				type="button"
			>
				Assign Generation & Blood Potency
			</a>
			<a
				class={`variant-filled-primary btn rounded-lg ${$page.url.pathname.match('/lotn/sheet/create/step_04') ? 'ring-2 ring-black dark:ring-white' : ''}`}
				href="/lotn/sheet/create/step_04"
				type="button"
			>
				Assign Initial Attributes
			</a>
			<a
				class={`variant-filled-primary btn rounded-lg ${$page.url.pathname.match('/lotn/sheet/create/step_05') ? 'ring-2 ring-black dark:ring-white' : ''}`}
				href="/lotn/sheet/create/step_05"
				type="button"
			>
				Assign Initial Skills
			</a>
			{#if !$characterCreationStore.ghoul}
				<a
					class={`variant-filled-primary btn rounded-lg ${$page.url.pathname.match('/lotn/sheet/create/step_06') ? 'ring-2 ring-black dark:ring-white' : ''}`}
					href="/lotn/sheet/create/step_06"
					type="button"
				>
					Choose a Predator Type
				</a>
			{/if}
			<a
				class={`variant-filled-primary btn rounded-lg ${$page.url.pathname.match('/lotn/sheet/create/step_07') ? 'ring-2 ring-black dark:ring-white' : ''}`}
				href="/lotn/sheet/create/step_07"
				type="button"
			>
				Starting Backgrounds & Loresheets
			</a>
			<a
				class={`variant-filled-primary btn rounded-lg ${$page.url.pathname.match('/lotn/sheet/create/step_08') ? 'ring-2 ring-black dark:ring-white' : ''}`}
				href="/lotn/sheet/create/step_08"
				type="button"
			>
				Merits & Flaws
			</a>
			<a
				class={`variant-filled-primary btn rounded-lg ${$page.url.pathname.match('/lotn/sheet/create/step_09') ? 'ring-2 ring-black dark:ring-white' : ''}`}
				href="/lotn/sheet/create/step_09"
				type="button"
			>
				Assign Initial Disciplines
			</a>
			<a
				class={`variant-filled-primary btn rounded-lg ${$page.url.pathname.match('/lotn/sheet/create/step_10') ? 'ring-2 ring-black dark:ring-white' : ''}`}
				href="/lotn/sheet/create/step_10"
				type="button"
			>
				Spending Initial XP
			</a>
			<a
				class={`variant-filled-primary btn rounded-lg ${$page.url.pathname.match('/lotn/sheet/create/step_11') ? 'ring-2 ring-black dark:ring-white' : ''}`}
				href="/lotn/sheet/create/step_11"
				type="button"
			>
				Finishing Touches
			</a>
		</div>
	{/if}
	<div class="card rounded-lg p-4">
		<slot />
	</div>
</div>
