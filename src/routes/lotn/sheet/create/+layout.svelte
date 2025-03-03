<script lang="ts">
	import { goto } from '$app/navigation';
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

	async function resetStore() {
		characterCreationStore.clear();
		await goto('/lotn/sheet/create/step_00');
	}

	$: stepDisabled = !$characterCreationStore.project;
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
				class={`variant-filled-primary btn rounded-lg ${$page.url.pathname.match('/lotn/sheet/create/step_01') ? 'ring-2 ring-black dark:ring-white' : ''} ${stepDisabled ? 'pointer-events-none cursor-not-allowed opacity-50' : ''}`}
				href="/lotn/sheet/create/step_01"
				tabindex={stepDisabled ? -1 : undefined}
				type="button"
			>
				Who are they?
			</a>
			<a
				class={`variant-filled-primary btn rounded-lg ${$page.url.pathname.match('/lotn/sheet/create/step_02') ? 'ring-2 ring-black dark:ring-white' : ''} ${stepDisabled ? 'pointer-events-none cursor-not-allowed opacity-50' : ''}`}
				href="/lotn/sheet/create/step_02"
				tabindex={stepDisabled ? -1 : undefined}
				type="button"
			>
				Choose A Clan
			</a>
			<a
				class={`variant-filled-primary btn rounded-lg ${$page.url.pathname.match('/lotn/sheet/create/step_03') ? 'ring-2 ring-black dark:ring-white' : ''} ${stepDisabled ? 'pointer-events-none cursor-not-allowed opacity-50' : ''}`}
				href="/lotn/sheet/create/step_03"
				tabindex={stepDisabled ? -1 : undefined}
				type="button"
			>
				Assign Generation & Blood Potency
			</a>
			<a
				class={`variant-filled-primary btn rounded-lg ${$page.url.pathname.match('/lotn/sheet/create/step_04') ? 'ring-2 ring-black dark:ring-white' : ''} ${stepDisabled ? 'pointer-events-none cursor-not-allowed opacity-50' : ''}`}
				href="/lotn/sheet/create/step_04"
				tabindex={stepDisabled ? -1 : undefined}
				type="button"
			>
				Assign Initial Attributes
			</a>
			<a
				class={`variant-filled-primary btn rounded-lg ${$page.url.pathname.match('/lotn/sheet/create/step_05') ? 'ring-2 ring-black dark:ring-white' : ''} ${stepDisabled ? 'pointer-events-none cursor-not-allowed opacity-50' : ''}`}
				href="/lotn/sheet/create/step_05"
				tabindex={stepDisabled ? -1 : undefined}
				type="button"
			>
				Assign Initial Skills
			</a>
			{#if !$characterCreationStore.ghoul}
				<a
					class={`variant-filled-primary btn rounded-lg ${$page.url.pathname.match('/lotn/sheet/create/step_06') ? 'ring-2 ring-black dark:ring-white' : ''} ${stepDisabled ? 'pointer-events-none cursor-not-allowed opacity-50' : ''}`}
					href="/lotn/sheet/create/step_06"
					tabindex={stepDisabled ? -1 : undefined}
					type="button"
				>
					Choose a Predator Type
				</a>
			{/if}
			<a
				class={`variant-filled-primary btn rounded-lg ${$page.url.pathname.match('/lotn/sheet/create/step_07') ? 'ring-2 ring-black dark:ring-white' : ''} ${stepDisabled ? 'pointer-events-none cursor-not-allowed opacity-50' : ''}`}
				href="/lotn/sheet/create/step_07"
				tabindex={stepDisabled ? -1 : undefined}
				type="button"
			>
				Starting Backgrounds & Loresheets
			</a>
			<a
				class={`variant-filled-primary btn rounded-lg ${$page.url.pathname.match('/lotn/sheet/create/step_08') ? 'ring-2 ring-black dark:ring-white' : ''} ${stepDisabled ? 'pointer-events-none cursor-not-allowed opacity-50' : ''}`}
				href="/lotn/sheet/create/step_08"
				tabindex={stepDisabled ? -1 : undefined}
				type="button"
			>
				Merits & Flaws
			</a>
			<a
				class={`variant-filled-primary btn rounded-lg ${$page.url.pathname.match('/lotn/sheet/create/step_09') ? 'ring-2 ring-black dark:ring-white' : ''} ${stepDisabled ? 'pointer-events-none cursor-not-allowed opacity-50' : ''}`}
				href="/lotn/sheet/create/step_09"
				tabindex={stepDisabled ? -1 : undefined}
				type="button"
			>
				Assign Initial Disciplines
			</a>
			<a
				class={`variant-filled-primary btn rounded-lg ${$page.url.pathname.match('/lotn/sheet/create/step_10') ? 'ring-2 ring-black dark:ring-white' : ''} ${stepDisabled ? 'pointer-events-none cursor-not-allowed opacity-50' : ''}`}
				href="/lotn/sheet/create/step_10"
				tabindex={stepDisabled ? -1 : undefined}
				type="button"
			>
				Spending Initial XP
			</a>
			<a
				class={`variant-filled-primary btn rounded-lg ${$page.url.pathname.match('/lotn/sheet/create/step_11') ? 'ring-2 ring-black dark:ring-white' : ''} ${stepDisabled ? 'pointer-events-none cursor-not-allowed opacity-50' : ''}`}
				href="/lotn/sheet/create/step_11"
				tabindex={stepDisabled ? -1 : undefined}
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
