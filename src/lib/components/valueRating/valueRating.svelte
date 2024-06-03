<script lang="ts">
	import { interactiveModeStore } from '$lib/components/classic/characterSheet/interactiveModeStore';
	import { Ratings } from '@skeletonlabs/skeleton';
	import { createEventDispatcher } from 'svelte';

	export let label: string;
	export let value: number;
	export let specialization: string[] | string | undefined = undefined;
	export let href: string | undefined = undefined;
	export let max = 5;
	export let showInput: boolean = false;
	export let start = 0;

	const dispatch = createEventDispatcher<{
		change: { label: string; old: number; new: number };
	}>();

	function iconClick(event: CustomEvent<{ index: number }>): void {
		if (value === event.detail.index) {
			return;
		}

		const valueOld = value;

		if (event.detail.index < start) {
			value = start;
		} else {
			value = event.detail.index;
		}

		dispatch('change', { label, old: valueOld, new: value });
	}
</script>

<div class="flex flex-col">
	<label class="label grid grid-cols-1 grid-rows-2" for="clan">
		{#if href}
			<a class="underline decoration-dotted underline-offset-4" {href}>
				<span class="font-bold">{label}</span>
			</a>
		{:else}
			<span class="font-bold">{label}</span>
		{/if}

		<p id="clan">
			<Ratings
				interactive={$interactiveModeStore}
				justify="justify-left"
				{max}
				bind:value
				on:icon={iconClick}
			>
				<svelte:fragment slot="empty">
					<iconify-icon icon="prime:circle"></iconify-icon>
				</svelte:fragment>
				<svelte:fragment slot="full">
					<iconify-icon icon="prime:circle-fill"></iconify-icon>
				</svelte:fragment>
			</Ratings>
		</p>
	</label>
	{#if specialization && showInput === false}
		<p class="text-sm">
			{Array.isArray(specialization) ? specialization.join(', ') : specialization}
		</p>
	{:else if showInput}
		<input class="input variant-form-material" bind:value={specialization} />
	{/if}
</div>
