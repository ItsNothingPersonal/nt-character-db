<script lang="ts">
	import type { AlliesConfigSchema } from '$lib/zod/lotn/background/allies';
	import type { ContactsConfigSchema } from '$lib/zod/lotn/background/contacts';
	import type { FameConfigSchema } from '$lib/zod/lotn/background/fame';
	import type { FamiliarConfigSchema } from '$lib/zod/lotn/background/familiar';
	import type { HavenConfigSchema } from '$lib/zod/lotn/background/haven';
	import type { HerdConfigSchema } from '$lib/zod/lotn/background/herd';
	import type { MaskConfigSchema } from '$lib/zod/lotn/background/mask';
	import type { ResourcesConfigSchema } from '$lib/zod/lotn/background/resources';
	import type { BackgroundAdvantageName } from '$lib/zod/lotn/enums/backgroundAdvantageName';
	import type { PlayerBackground } from '$lib/zod/lotn/playerCharacter/playerBackground';
	import type { PlayerBackgroundAdvantage } from '$lib/zod/lotn/playerCharacter/playerBackgroundAdvantage';
	import { Ratings } from '@skeletonlabs/skeleton';
	import { createEventDispatcher } from 'svelte';
	import { interactiveModeStore } from '../../interactiveModeStore';
	import HelpText from '../HelpText.svelte';
	import type { BackgroundAdvantageDeleteEvent } from './BackgroundAdvantageDeleteEvent';

	export let background: PlayerBackground & { id: string };
	export let advantage: PlayerBackgroundAdvantage;
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
	export let showDeleteButton: boolean = false;

	const description = getDescription(advantage.name);
	const valueDescription = getValueDescription(advantage.name, advantage.value);

	const dispatchChange = createEventDispatcher<{
		deleteClick: BackgroundAdvantageDeleteEvent;
	}>();

	function getDescription(advantageName: BackgroundAdvantageName) {
		if (!config.advantages) return;
		const advantages = config.advantages[advantageName];

		if (advantages?.description) {
			return advantages.description;
		} else return undefined;
	}

	function getValueDescription(advantageName: BackgroundAdvantageName, value: number) {
		if (!config.advantages) return;
		const advantages = config.advantages[advantageName];
		if (!advantages) return;

		if (advantages.levelVariable) {
			return advantages.levelVariable;
		} else {
			switch (value) {
				case 1:
					if (!advantages.level1) return;
					return advantages.level1;
				case 2:
					if (!advantages.level2) return;
					return advantages.level2;
				default:
					return '';
			}
		}
	}
</script>

<label
	class={`label grid w-full grid-cols-[1fr_1fr_45px] grid-rows-1 gap-2`}
	for={`${background.id}-${advantage.name}`}
>
	{#if description}
		<HelpText id={`${background.id}-${advantage.name}`}>
			<span id={`${background.id}-${advantage.name}`}>
				{advantage.name}
			</span>
			<svelte:fragment slot="helpText">
				<p class="whitespace-pre-line">
					{description}
				</p>
			</svelte:fragment>
		</HelpText>
	{:else if valueDescription}
		<HelpText id={`${background.id}-${advantage.name}`}>
			<span id={`${background.id}-${advantage.name}`}>
				{advantage.name}
			</span>
			<svelte:fragment slot="helpText">
				<p class="whitespace-pre-line">
					{valueDescription}
				</p>
			</svelte:fragment>
		</HelpText>
	{:else}
		<span id={`${background.id}-${advantage.name}`}>
			{advantage.name}
		</span>
	{/if}
	<p id={`${background.id}-${advantage.name}-value`}>
		<HelpText id={`${background.id}-${advantage.name}-value`}>
			<Ratings
				interactive={$interactiveModeStore}
				justify="justify-left"
				max={3}
				bind:value={advantage.value}
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
					{valueDescription}
				</p>
			</svelte:fragment>
		</HelpText>
	</p>
	{#if showDeleteButton}
		<button
			class="variant-filled-primary btn ml-auto w-4 rounded-lg text-sm"
			type="button"
			on:click={() => {
				dispatchChange('deleteClick', { id: background.id, advantageName: advantage.name });
			}}
		>
			<iconify-icon height="16" icon="mdi:remove" />
		</button>
	{/if}
</label>
