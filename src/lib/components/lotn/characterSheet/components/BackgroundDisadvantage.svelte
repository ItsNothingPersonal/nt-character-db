<script lang="ts">
	import type { AlliesConfigSchema } from '$lib/zod/lotn/background/allies';
	import type { ContactsConfigSchema } from '$lib/zod/lotn/background/contacts';
	import type { FameConfigSchema } from '$lib/zod/lotn/background/fame';
	import type { FamiliarConfigSchema } from '$lib/zod/lotn/background/familiar';
	import type { HavenConfigSchema } from '$lib/zod/lotn/background/haven';
	import type { HerdConfigSchema } from '$lib/zod/lotn/background/herd';
	import type { MaskConfigSchema } from '$lib/zod/lotn/background/mask';
	import type { ResourcesConfigSchema } from '$lib/zod/lotn/background/resources';
	import type { BackgroundDisadvantageName } from '$lib/zod/lotn/enums/backgroundDisadvantageName';
	import type { PlayerBackground } from '$lib/zod/lotn/playerCharacter/playerBackground';
	import type { PlayerBackgroundDisadvantage } from '$lib/zod/lotn/playerCharacter/playerBackgroundDisdvantage';
	import { Ratings } from '@skeletonlabs/skeleton';
	import { interactiveModeStore } from '../interactiveModeStore';
	import HelpText from './HelpText.svelte';

	export let background: PlayerBackground & { id: string };
	export let disadvantage: PlayerBackgroundDisadvantage;
	export let config:
		| AlliesConfigSchema
		| ContactsConfigSchema
		| FameConfigSchema
		| FamiliarConfigSchema
		| HavenConfigSchema
		| HavenConfigSchema
		| HerdConfigSchema
		| MaskConfigSchema
		| ResourcesConfigSchema;

	const description = getDescription(disadvantage.name);
	const valueDescription = getValueDescription(disadvantage.name, disadvantage.value);
	const prerequisite = getPrerequisite(disadvantage.name);

	function getDescription(disadvantageName: BackgroundDisadvantageName) {
		if (
			config.disadvantages &&
			config.disadvantages[disadvantageName] &&
			disadvantageName &&
			'description' in (config.disadvantages[disadvantageName] ?? {}) &&
			config.disadvantages[disadvantageName]?.description
		) {
			return config.disadvantages[disadvantageName]?.description;
		} else return undefined;
	}

	function getValueDescription(disadvantageName: BackgroundDisadvantageName, value: number) {
		if (!config.disadvantages || !config.disadvantages[disadvantageName]) return;

		switch (value) {
			case 1:
				if ('level1' in (config.disadvantages[disadvantageName] ?? {})) {
					return config.disadvantages[disadvantageName]?.level1;
				}
				return undefined;
			case 2:
				if ('level2' in (config.disadvantages[disadvantageName] ?? {})) {
					return config.disadvantages[disadvantageName]?.level2;
				}
				return undefined;
			default:
				return '';
		}
	}

	function getPrerequisite(disadvantageName: BackgroundDisadvantageName) {
		if (
			!config.disadvantages ||
			!config.disadvantages[disadvantageName] ||
			!config.disadvantages[disadvantageName]?.prerequisite
		)
			return;

		return config.disadvantages[disadvantageName]?.prerequisite;
	}
</script>

<label
	class="label grid w-full grid-cols-2 grid-rows-1"
	for={`${background.id}-${disadvantage.name}`}
>
	{#if description}
		<HelpText id={`${background.id}-${disadvantage.name}`}>
			<span id={`${background.id}-${disadvantage.name}`}>
				{disadvantage.name}
			</span>
			<svelte:fragment slot="helpText">
				{#if prerequisite}
					<p class="whitespace-pre-line">
						<span class="font-bold">Prerequisite:</span>
						{prerequisite.name}
						{prerequisite.value}
					</p>
					<br />
				{/if}
				<p class="whitespace-pre-line">
					{description}
				</p>
			</svelte:fragment>
		</HelpText>
	{:else if valueDescription}
		<HelpText id={`${background.id}-${disadvantage.name}`}>
			<span id={`${background.id}-${disadvantage.name}`}>
				{disadvantage.name}
			</span>
			<svelte:fragment slot="helpText">
				{#if prerequisite}
					<p class="whitespace-pre-line">
						<span class="font-bold">Prerequisite:</span>
						{prerequisite.name}
						{prerequisite.value}
					</p>
					<br />
				{/if}
				<p class="whitespace-pre-line">
					{valueDescription}
				</p>
			</svelte:fragment>
		</HelpText>
	{:else if prerequisite}
		<HelpText id={`${background.id}-${disadvantage.name}`}>
			<span id={`${background.id}-${disadvantage.name}`}>
				{disadvantage.name}
			</span>
			<svelte:fragment slot="helpText">
				<p class="whitespace-pre-line">
					<span class="font-bold">Prerequisite:</span>
					{prerequisite.name}
					{prerequisite.value}
				</p>
			</svelte:fragment>
		</HelpText>
	{:else}
		<span id={`${background.id}-${disadvantage.name}`}>
			{disadvantage.name}
		</span>
	{/if}
	<p id={`${background.id}-${disadvantage.name}-value`}>
		<HelpText id={`${background.id}-${disadvantage.name}-value`}>
			<Ratings
				interactive={$interactiveModeStore}
				justify="justify-left"
				max={3}
				bind:value={disadvantage.value}
			>
				<svelte:fragment slot="empty">
					<iconify-icon icon="prime:circle" />
				</svelte:fragment>
				<svelte:fragment slot="full">
					<iconify-icon icon="prime:circle-fill" />
				</svelte:fragment>
			</Ratings>
			<svelte:fragment slot="helpText">
				{#if valueDescription}
					<p class="whitespace-pre-line">
						{valueDescription}
					</p>
				{/if}
			</svelte:fragment>
		</HelpText>
	</p>
</label>
