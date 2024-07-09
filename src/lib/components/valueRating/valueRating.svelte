<script lang="ts">
	import { interactiveModeStore } from '$lib/components/classic/characterSheet/interactiveModeStore';
	import { Ratings } from '@skeletonlabs/skeleton';
	import { createEventDispatcher } from 'svelte';
	import HelpText from '../lotn/characterSheet/components/HelpText.svelte';

	export let label: string;
	export let value: number;
	export let specialization: string[] | string | undefined | null = undefined;
	export let max = 5;
	export let showInput: boolean = false;
	export let start = 0;
	export let labelBold: boolean = true;

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
	<label class="label grid grid-cols-2 grid-rows-1" for={label}>
		<HelpText id={label}>
			<span id={label} class={labelBold ? 'text-bold' : ''}>{label}</span>
			<svelte:fragment slot="helpText">
				<slot name="helpContent" />
			</svelte:fragment>
		</HelpText>
		<p id="clan">
			<Ratings
				interactive={$interactiveModeStore}
				justify="justify-left"
				{max}
				bind:value
				on:icon={iconClick}
			>
				<svelte:fragment slot="empty">
					<iconify-icon icon="prime:circle" />
				</svelte:fragment>
				<svelte:fragment slot="full">
					<iconify-icon icon="prime:circle-fill" />
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
