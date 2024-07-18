<script lang="ts">
	import type { PlayerFlaw } from '$lib/zod/lotn/playerCharacter/playerFlaw';
	import { Ratings } from '@skeletonlabs/skeleton';
	import { flawConfig } from '../../config/flawsConfig';
	import { interactiveModeStore } from '../interactiveModeStore';
	import HelpText from './HelpText.svelte';

	export let flaw: PlayerFlaw & { id: string };

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
</script>

<label
	class={flaw.value > 0
		? 'card label grid w-full auto-rows-auto grid-cols-2 rounded-sm p-4'
		: 'card label grid w-full auto-rows-auto grid-cols-1 rounded-sm p-4'}
	for={`${flaw.name}-${flaw.id}`}
>
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
	{#if flaw.description}
		<p class="col-span-2 whitespace-pre-line text-sm">
			{flaw.description}
		</p>
	{/if}
</label>
