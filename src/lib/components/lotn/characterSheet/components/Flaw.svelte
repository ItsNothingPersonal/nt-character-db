<script lang="ts">
	import type { PlayerFlaw } from '$lib/zod/lotn/playerCharacter/playerFlaw';
	import { Ratings } from '@skeletonlabs/skeleton';
	import { createEventDispatcher } from 'svelte';
	import { flawConfig } from '../../config/flawsConfig';
	import { interactiveModeStore } from '../interactiveModeStore';
	import HelpText from './HelpText.svelte';

	export let flaw: PlayerFlaw & { id: string };
	export let showDeleteButton: boolean = false;
	export let disableDeleteButton: boolean = false;
	export let displayFormat: 'row' | 'column' = 'row';
	export let showDescriptionInput: boolean = false;
	export let disableDescriptionInput: boolean = false;

	const config = flawConfig[flaw.name];

	function getValueDescription(value: number) {
		if (!config) return undefined;

		if ('levelVariable' in config && config.levelVariable) {
			return config.levelVariable;
		} else if (
			'level1' in config ||
			'level2' in config ||
			'level3' in config ||
			'level4' in config ||
			'level5' in config
		) {
			switch (value) {
				case 1:
					return config.level1;
				case 2:
					return config.level2;
				case 3:
					return config.level3;
				case 4:
					return config.level4;
				case 5:
					return config.level5;
				default:
					return '';
			}
		}
	}

	const dispatchChange = createEventDispatcher<{
		deleteClick: { id: string };
		descriptionChange: { id: string; description: string | undefined };
	}>();

	function getDisplayFormatString() {
		let resultString: string;

		switch (displayFormat) {
			case 'row':
				if (showDeleteButton) {
					resultString = 'grid-cols-[2fr_auto_auto] grid-rows-1 gap-2';
				} else {
					resultString = 'grid-cols-[2fr_auto] grid-rows-1';
				}
				break;
			case 'column':
				if (showDeleteButton) {
					resultString = 'grid-cols-[1fr_auto] grid-rows-1 gap-2';
				} else {
					resultString = 'grid-cols-[1fr_auto] grid-rows-1';
				}
				break;
		}

		return resultString;
	}
</script>

<label
	class={`card grid w-full grid-cols-1 ${!showDescriptionInput ? 'grid-rows-1' : 'grid-rows-2'} rounded-sm p-2`}
	for={`${flaw.name}-${flaw.id}`}
>
	<div
		class={flaw.value > 0
			? `grid w-full ${getDisplayFormatString()}`
			: `grid w-full auto-rows-auto grid-cols-[2fr_auto]`}
	>
		<div class={`label flex ${displayFormat === 'row' ? 'flex-row gap-x-2' : 'flex-col '}`}>
			{#if config && 'prerequisite' in config && config.prerequisite}
				<HelpText id={`${flaw.name}-${flaw.id}`} placement="bottom-start">
					<span id={`${flaw.name}-${flaw.id}`} class="whitespace-pre-line">{flaw.name}</span>
					<svelte:fragment slot="helpText">
						<p class="whitespace-pre-line">
							<span class="font-bold">Prerequisite:</span>
							{config.prerequisite.name}
							{config.prerequisite.value}
						</p>
					</svelte:fragment>
				</HelpText>
			{:else if config && 'description' in config && config.description}
				<HelpText id={`${flaw.name}-${flaw.id}`} placement="bottom-start">
					<span id={`${flaw.name}-${flaw.id}`} class="whitespace-pre-line">{flaw.name}</span>
					<svelte:fragment slot="helpText">
						<p class="whitespace-pre-line">
							{config.description}
						</p>
					</svelte:fragment>
				</HelpText>
			{:else if config}
				<HelpText id={`${flaw.name}-${flaw.id}`} placement="bottom-start">
					<span id={`${flaw.name}-${flaw.id}`} class="whitespace-pre-line">{flaw.name}</span>
					<svelte:fragment slot="helpText">
						<p class="whitespace-pre-line">
							{getValueDescription(flaw.value)}
						</p>
					</svelte:fragment>
				</HelpText>
			{:else}
				<span id={flaw.name} class="whitespace-pre-line">{flaw.name}</span>
			{/if}
			{#if flaw.value > 0}
				<HelpText id={`${flaw.name}-${flaw.id}-value`}>
					<Ratings
						id={`${flaw.name}-${flaw.id}-value`}
						interactive={$interactiveModeStore}
						justify="justify-left"
						bind:value={flaw.value}
					>
						<svelte:fragment slot="empty">
							<iconify-icon icon="prime:circle" />
						</svelte:fragment>
						<svelte:fragment slot="full">
							<iconify-icon icon="prime:circle-fill" />
						</svelte:fragment>
					</Ratings>
					<svelte:fragment slot="helpText">
						<p class="whitespace-pre-line">
							{getValueDescription(flaw.value)}
						</p>
					</svelte:fragment>
				</HelpText>
			{/if}
			{#if flaw.description && !showDescriptionInput}
				<p class="col-span-2 whitespace-pre-line text-sm">
					{flaw.description}
				</p>
			{/if}
		</div>
		{#if showDeleteButton}
			<button
				class="variant-filled-primary btn ml-auto w-4 rounded-lg text-sm"
				disabled={disableDeleteButton}
				type="button"
				on:click={() => {
					dispatchChange('deleteClick', { id: flaw.id });
				}}
			>
				<iconify-icon height="16" icon="mdi:remove" />
			</button>
		{/if}
	</div>
	{#if showDescriptionInput}
		<input
			class="input variant-form-material mt-2"
			disabled={disableDescriptionInput}
			type="text"
			bind:value={flaw.description}
			on:change={() => {
				dispatchChange('descriptionChange', { id: flaw.id, description: flaw.description });
			}}
		/>
	{/if}
</label>
