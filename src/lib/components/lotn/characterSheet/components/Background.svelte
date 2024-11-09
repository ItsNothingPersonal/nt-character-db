<script lang="ts">
	import type { PlayerBackground } from '$lib/zod/lotn/playerCharacter/playerBackground';
	import { Ratings } from '@skeletonlabs/skeleton';
	import { getBackgroundConfig } from '../../util/backgroundUtil';
	import { interactiveModeStore } from '../interactiveModeStore';
	import BackgroundAdvantage from './BackgroundAdvantage/BackgroundAdvantage.svelte';
	import BackgroundDisadvantage from './BackgroundDisadvantage/BackgroundDisadvantage.svelte';
	import BackgroundSphereOfInfluence from './BackgroundSphereOfInfluence.svelte';
	import HelpText from './HelpText.svelte';

	export let background: PlayerBackground & { id: string };

	const config = getBackgroundConfig(background.name);

	function getValueDescription(value: number) {
		switch (value) {
			case 1:
				return config.level1;
			case 2:
				return config.level2;
			case 3:
				return config.level3;
			default:
				return '';
		}
	}
</script>

<div class="card flex flex-col rounded-sm p-4">
	<label class="label grid w-full grid-cols-2 grid-rows-1" for={background.id}>
		<HelpText id={background.id}>
			<span id={background.name} class="font-bold">{background.name}</span>
			<svelte:fragment slot="helpText">
				<p class="whitespace-pre-line">
					<span class="font-bold">Description:</span>
					{config.description}
				</p>
			</svelte:fragment>
		</HelpText>
		<HelpText id="{background.id}-value">
			<Ratings
				interactive={$interactiveModeStore}
				justify="justify-left"
				max={3}
				bind:value={background.value}
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
					{getValueDescription(background.value)}
				</p>
			</svelte:fragment>
		</HelpText>
	</label>
	{#if background.sphereOfInfluence}
		<BackgroundSphereOfInfluence sphereOfInfluence={background.sphereOfInfluence} />
	{/if}
	{#if background.advantages}
		<span class="underline underline-offset-1">Vorteile</span>
		{#each background.advantages as advantage}
			<BackgroundAdvantage {advantage} {background} {config} />
		{/each}
	{/if}
	{#if background.disadvantages}
		<span class="underline underline-offset-1">Nachteile</span>
		{#each background.disadvantages as disadvantage}
			<BackgroundDisadvantage {background} {config} {disadvantage} />
		{/each}
	{/if}
</div>
