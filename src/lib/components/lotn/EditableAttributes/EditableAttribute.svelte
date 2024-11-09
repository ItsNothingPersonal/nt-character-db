<script lang="ts">
	import type { AttributeName } from '$lib/zod/lotn/enums/attributeName';
	import { Ratings } from '@skeletonlabs/skeleton';
	import { createEventDispatcher } from 'svelte';
	import HelpText from '../characterSheet/components/HelpText.svelte';
	import { attributeConfig } from '../config/attributeConfig';
	import {
		getAttributeHelpText,
		mapAttributeNameToAttributeCategory
	} from '../util/attributesUtil';
	import { createNumberList } from '../util/generalUtils';

	export let attributeName: AttributeName;
	export let attributeValue: number;

	export let minValue: number = 1;
	export let displayStyle: 'numbers' | 'dots' = 'numbers';
	export let displayValue: 'below' | 'beside' = 'below';
	export let editModeEnabled: boolean = false;

	const dispatchChange = createEventDispatcher<{
		valueChange: { label: AttributeName; value: number };
	}>();

	function iconClick(event: CustomEvent<{ index: number }>) {
		if (event.detail.index > minValue) {
			return dispatchChange('valueChange', { label: attributeName, value: event.detail.index });
		}

		return dispatchChange('valueChange', { label: attributeName, value: minValue });
	}
</script>

<div class="card rounded-lg">
	<header class="card-header pb-4">
		{#if displayValue === 'below'}
			<HelpText id={attributeName}>
				<h3 class="h3">{attributeName}</h3>
				<svelte:fragment slot="helpText">
					<p class="whitespace-pre-line">
						{getAttributeHelpText(
							attributeConfig,
							mapAttributeNameToAttributeCategory(attributeName),
							attributeName
						)}
					</p>
				</svelte:fragment>
			</HelpText>
			{#if displayStyle === 'numbers'}
				<label class="label">
					{#if editModeEnabled}
						<span>Value</span>
						<select
							class="select rounded-lg"
							value={attributeValue}
							on:change={() =>
								dispatchChange('valueChange', { label: attributeName, value: attributeValue })}
						>
							<option disabled selected value={undefined}>
								Please select a rating for that skill
							</option>

							{#each createNumberList(5, minValue) as rating}
								<option selected={rating === attributeValue} value={rating}>
									{rating}
								</option>
							{/each}
						</select>
					{:else}
						<span>Value: {attributeValue}</span>
					{/if}
				</label>
			{:else}
				<Ratings
					interactive={editModeEnabled}
					justify="justify-left"
					max={5}
					value={attributeValue}
					on:icon={iconClick}
				>
					<svelte:fragment slot="empty">
						<iconify-icon style="vertical-align: -0.225em" icon="prime:circle" />
					</svelte:fragment>
					<svelte:fragment slot="full">
						<iconify-icon style="vertical-align: -0.225em" icon="prime:circle-fill" />
					</svelte:fragment>
				</Ratings>
			{/if}
		{:else}
			<div class="grid grid-cols-[45%_auto] grid-rows-1 gap-2">
				<HelpText id={attributeName}>
					<h3 class="h3">{attributeName}</h3>
					<svelte:fragment slot="helpText">
						<p class="whitespace-pre-line">
							{getAttributeHelpText(
								attributeConfig,
								mapAttributeNameToAttributeCategory(attributeName),
								attributeName
							)}
						</p>
					</svelte:fragment>
				</HelpText>
				{#if displayStyle === 'numbers'}
					{#if editModeEnabled}
						<select
							class="select rounded-lg"
							value={attributeValue}
							on:change={() =>
								dispatchChange('valueChange', { label: attributeName, value: attributeValue })}
						>
							<option disabled selected value={undefined}>
								Please select a rating for that skill
							</option>

							{#each createNumberList(5, minValue) as rating}
								<option selected={rating === attributeValue} value={rating}>
									{rating}
								</option>
							{/each}
						</select>
					{:else}
						<span class="text-2xl">{attributeValue}</span>
					{/if}
				{:else}
					<Ratings
						interactive={editModeEnabled}
						justify="justify-left"
						max={5}
						value={attributeValue}
						on:icon={iconClick}
					>
						<svelte:fragment slot="empty">
							<iconify-icon style="vertical-align: -0.225em" icon="prime:circle" />
						</svelte:fragment>
						<svelte:fragment slot="full">
							<iconify-icon style="vertical-align: -0.225em" icon="prime:circle-fill" />
						</svelte:fragment>
					</Ratings>
				{/if}
			</div>
		{/if}
	</header>
</div>
