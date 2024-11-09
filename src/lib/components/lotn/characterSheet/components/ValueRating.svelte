<script lang="ts">
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

	const dispatch = createEventDispatcher();

	// eslint-disable-next-line no-undef, @typescript-eslint/no-unused-vars
	function handleBlur(event: FocusEvent) {
		dispatch('blur', { label: label, value: value, specialization: specialization });
	}

	const dispatchChange = createEventDispatcher<{
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

		dispatchChange('change', { label, old: valueOld, new: value });
	}
</script>

<div class={`card flex ${showInput ? 'min-h-32' : undefined} } flex-col rounded-sm p-2`}>
	<label
		class={`label grid grid-cols-1 grid-rows-2 [&>*]:pointer-events-none ${helpText === undefined ? 'cursor-default' : 'cursor-help'}`}
		for={label}
		use:popup={{ event: 'click', target: 'popupHover-' + label, placement: 'bottom' }}
	>
		<span class={labelBold ? 'font-bold' : ''}>{label}</span>

		<p id={label}>
			<Ratings justify="justify-left" {max} bind:value on:icon={iconClick}>
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
	{:else if specialization && showInput}
		<input class="input variant-form-material" bind:value={specialization} on:blur={handleBlur} />
	{/if}
</div>
{#if helpText}
	<div class="card variant-filled z-10 max-w-lg rounded-lg p-4" data-popup="popupHover-{label}">
		<p class="whitespace-pre-line">{helpText}</p>
		<div class="variant-filled-secondary arrow" />
	</div>
{/if}
