<script lang="ts">
	import { interactiveModeStore } from '$lib/components/classic/characterSheet/interactiveModeStore';
	import { Ratings, popup } from '@skeletonlabs/skeleton';
	import { createEventDispatcher } from 'svelte';

	export let label: string;
	export let value: number;
	export let specialization: string[] | string | undefined | null = undefined;
	export let max = 5;
	export let showInput: boolean = false;
	export let start = 0;
	export let helpText: string | undefined = undefined;
	export let labelBold: boolean = true;
	export let fitContent: boolean = false;

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

<div class={`card flex ${fitContent ? undefined : 'min-h-32'} } flex-col rounded-sm p-4`}>
	<label
		class={`label grid grid-cols-1 grid-rows-2 [&>*]:pointer-events-none ${helpText === undefined ? 'cursor-default' : 'cursor-help'}`}
		for={label}
		use:popup={{ event: 'click', target: 'popupHover-' + label, placement: 'bottom' }}
	>
		<span class={labelBold ? 'font-bold' : ''}>{label}</span>

		<p id={label}>
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
{#if helpText}
	<div class="card variant-filled-secondary max-w-lg p-4" data-popup="popupHover-{label}">
		<p class="whitespace-pre-line">{helpText}</p>
		<div class="variant-filled-secondary arrow" />
	</div>
{/if}
