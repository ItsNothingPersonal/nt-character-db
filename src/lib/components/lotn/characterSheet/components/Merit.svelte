<script lang="ts">
	import { type PlayerMerit } from '$lib/zod/lotn/playerCharacter/playerMerit';
	import { Ratings } from '@skeletonlabs/skeleton';
	import { createEventDispatcher } from 'svelte';
	import { meritConfig } from '../../config/meritsConfig';
	import { getMeritValueDescription } from '../../util/meritUtil';
	import { interactiveModeStore } from '../interactiveModeStore';
	import HelpText from './HelpText.svelte';

	export let merit: PlayerMerit & { id: string };
	export let showDeleteButton: boolean = false;
	export let disableDeleteButton: boolean = false;
	export let displayFormat: 'row' | 'column' = 'row';
	export let showDescriptionInput: boolean = false;

	const config = meritConfig[merit.name];

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
	for={`${merit.name}-${merit.id}`}
>
	<div
		class={merit.value > 0
			? `grid w-full ${getDisplayFormatString()}`
			: `grid w-full auto-rows-auto grid-cols-[2fr_auto]`}
	>
		<div class={`label flex ${displayFormat === 'row' ? 'flex-row gap-x-2' : 'flex-col '}`}>
			{#if config && config.prerequisite}
				<HelpText id={`${merit.name}-${merit.id}`} placement="bottom-start">
					<span id={`${merit.name}-${merit.id}`} class="whitespace-pre-line">{merit.name}</span>
					<svelte:fragment slot="helpText">
						{#if config && config.prerequisite}
							<p class="whitespace-pre-line">
								<span class="font-bold">Prerequisite:</span>
								{#if Array.isArray(config.prerequisite)}
									{#each config.prerequisite as prerequisite}
										{#if typeof prerequisite === 'string'}
											{prerequisite}
										{:else}
											{prerequisite.name}
											{prerequisite.value}
										{/if}
									{/each}
								{:else if typeof config.prerequisite === 'string'}
									{config.prerequisite}
								{:else}
									{config.prerequisite.name}
									{config.prerequisite.value}
								{/if}
							</p>
						{/if}
					</svelte:fragment>
				</HelpText>
			{:else if config}
				<HelpText id={`${merit.name}-${merit.id}`} placement="bottom-start">
					<span id={`${merit.name}-${merit.id}`} class="whitespace-pre-line">{merit.name}</span>
					<svelte:fragment slot="helpText">
						<p class="whitespace-pre-line">
							{getMeritValueDescription(merit.name, merit.value)}
						</p>
					</svelte:fragment>
				</HelpText>
			{:else}
				<span id={`${merit.name}-${merit.id}`} class="whitespace-pre-line">{merit.name}</span>
			{/if}
			{#if merit.value > 0}
				<HelpText id={`${merit.name}-${merit.id}-value`}>
					<Ratings
						id={`${merit.name}-${merit.id}-value`}
						interactive={$interactiveModeStore}
						justify="justify-left"
						bind:value={merit.value}
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
							{getMeritValueDescription(merit.name, merit.value)}
						</p>
					</svelte:fragment>
				</HelpText>
			{/if}
			{#if merit.linkedSkill}
				<p class="col-span-2 whitespace-pre-line text-sm">
					{merit.linkedSkill}
				</p>
			{/if}
		</div>
		{#if showDeleteButton}
			<div class="grid h-full items-center">
				<button
					class="variant-filled-primary btn h-full w-4 rounded-lg text-sm"
					disabled={disableDeleteButton}
					type="button"
					on:click={() => {
						dispatchChange('deleteClick', { id: merit.id });
					}}
				>
					<iconify-icon height="16" icon="mdi:remove" />
				</button>
			</div>
		{/if}
	</div>
	{#if showDescriptionInput}
		<input
			class="input variant-form-material mt-2"
			type="text"
			bind:value={merit.description}
			on:change={() => {
				dispatchChange('descriptionChange', { id: merit.id, description: merit.description });
			}}
		/>
	{/if}
</label>
