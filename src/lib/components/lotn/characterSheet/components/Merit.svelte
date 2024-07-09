<script lang="ts">
	import { type PlayerMerit } from '$lib/zod/lotn/playerCharacter/playerMerit';
	import { Ratings } from '@skeletonlabs/skeleton';
	import { meritConfig } from '../../config/meritsConfig';
	import { interactiveModeStore } from '../interactiveModeStore';
	import HelpText from './HelpText.svelte';

	export let merit: PlayerMerit & { id: string };

	const config = meritConfig[merit.name];

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
	class={merit.value > 0
		? 'label grid w-full auto-rows-auto grid-cols-2'
		: 'label grid w-full auto-rows-auto grid-cols-1'}
	for={`${merit.name}-${merit.id}`}
>
	{#if config && config.prerequisite}
		<HelpText id={`${merit.name}-${merit.id}`} placement="bottom-start">
			<span id={`${merit.name}-${merit.id}`} class="whitespace-pre-line">{merit.name}</span>
			<svelte:fragment slot="helpText">
				{#if config && config.prerequisite}
					<p class="whitespace-pre-line">
						<span class="font-bold">Prerequisite:</span>
						{config.prerequisite.name}
						{config.prerequisite.value}
					</p>
				{/if}
			</svelte:fragment>
		</HelpText>
	{:else if config}
		<HelpText id={`${merit.name}-${merit.id}`} placement="bottom-start">
			<span id={`${merit.name}-${merit.id}`} class="whitespace-pre-line">{merit.name}</span>
			<svelte:fragment slot="helpText">
				<p class="whitespace-pre-line">
					{getValueDescription(merit.value)}
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
					{getValueDescription(merit.value)}
				</p>
			</svelte:fragment>
		</HelpText>
	{/if}
	{#if merit.linkedSkill}
		<p class="col-span-2 whitespace-pre-line text-sm">
			{merit.linkedSkill}
		</p>{/if}
</label>
