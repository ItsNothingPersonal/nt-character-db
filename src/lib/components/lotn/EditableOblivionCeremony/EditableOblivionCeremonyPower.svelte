<script lang="ts">
	import type { OblivionCeremonyName } from '$lib/zod/lotn/enums/oblivionCeremonyName';
	import { createEventDispatcher, onMount } from 'svelte';
	import HelpText from '../characterSheet/components/HelpText.svelte';
	import { ceremoniesConfig } from '../config/ceremoniesConfig';
	import { getOblivionCeremonyPowers } from '../util/disciplines';

	export let number: number;
	export let maxLevel: number;

	export let selectedOblivionCeremonyPower: OblivionCeremonyName | undefined = undefined;
	export let existingOblivionCeremonies: OblivionCeremonyName[] = [];
	export let disableOblivionCeremonyPowerSelection: boolean = false;
	export let showDeleteButton: boolean = false;
	export let enableEdit: boolean = false;

	let previousOblivionCeremonyPower: OblivionCeremonyName | undefined = undefined;

	const dispatchChange = createEventDispatcher<{
		changeCeremonyPower: {
			old: OblivionCeremonyName | undefined;
			new: OblivionCeremonyName;
		};
		deleteCeremonyPower: { name: OblivionCeremonyName };
	}>();

	$: config = selectedOblivionCeremonyPower
		? ceremoniesConfig.ceremonies[selectedOblivionCeremonyPower]
		: undefined;

	onMount(() => {
		previousOblivionCeremonyPower = selectedOblivionCeremonyPower;
	});
</script>

{#if enableEdit}
	<label class="label">
		<span>Ceremony {number}</span>
		<select
			class="select rounded-lg"
			disabled={disableOblivionCeremonyPowerSelection}
			bind:value={selectedOblivionCeremonyPower}
			on:change={() => {
				if (selectedOblivionCeremonyPower) {
					dispatchChange('changeCeremonyPower', {
						old: previousOblivionCeremonyPower,
						new: selectedOblivionCeremonyPower
					});

					previousOblivionCeremonyPower = selectedOblivionCeremonyPower;
				}
			}}
		>
			<option disabled selected value={undefined}> Please select an Oblivion ceremony </option>

			{#each getOblivionCeremonyPowers(maxLevel, existingOblivionCeremonies, selectedOblivionCeremonyPower) as oblivionCeremonyPower}
				{#if oblivionCeremonyPower.data?.level}
					<option
						selected={selectedOblivionCeremonyPower === oblivionCeremonyPower.name}
						value={oblivionCeremonyPower.name}
					>
						{oblivionCeremonyPower.name} (Level: {oblivionCeremonyPower.data?.level})
					</option>
				{:else}
					<option
						selected={selectedOblivionCeremonyPower === oblivionCeremonyPower.name}
						value={oblivionCeremonyPower.name}
					>
						{oblivionCeremonyPower.name}
					</option>
				{/if}
			{/each}
		</select>
		{#if config && selectedOblivionCeremonyPower}
			<div class="flex">
				<HelpText id={selectedOblivionCeremonyPower}>
					<p class="underline decoration-dotted">Ceremony-Description</p>
					<svelte:fragment slot="helpText">
						<p class="whitespace-pre-line">
							<span class="font-bold">Ingredients:</span>
							{config.ingredients.join(', ')}
						</p>
						{#if config.process}
							<p class="whitespace-pre-line">
								<span class="font-bold">Process:</span>
								{config.process}
							</p>
						{/if}

						{#if config.system}
							<p class="whitespace-pre-line">
								<span class="font-bold">System:</span>
								{config.system}
							</p>
						{/if}

						<p class="whitespace-pre-line">
							<span class="font-bold">Duration:</span>
							{config.duration}
						</p>

						{#if config.statblock}
							<p class="whitespace-pre-line">
								<span class="font-bold">Statblock: {config.statblock.name}</span>
								{config.statblock.description}
							</p>
						{/if}
					</svelte:fragment>
				</HelpText>
				{#if showDeleteButton}
					<button
						class="variant-filled-primary btn ml-auto w-3 rounded-lg"
						type="button"
						on:click={() => {
							if (selectedOblivionCeremonyPower) {
								dispatchChange('deleteCeremonyPower', {
									name: selectedOblivionCeremonyPower
								});
								selectedOblivionCeremonyPower = undefined;
								previousOblivionCeremonyPower = undefined;
							}
						}}
					>
						<iconify-icon height="12" icon="mdi:remove" />
					</button>
				{/if}
			</div>
		{/if}
	</label>
{:else if config && selectedOblivionCeremonyPower}
	<div class="card rounded-lg">
		<header class="card-header mb-4">
			<HelpText id={selectedOblivionCeremonyPower}>
				<h3 class="h3">{selectedOblivionCeremonyPower}</h3>
				<p>Level: {config.level}</p>
				<svelte:fragment slot="helpText">
					<p class="whitespace-pre-line">
						<span class="font-bold">Ingredients:</span>
						{config.ingredients.join(', ')}
					</p>
					{#if config.process}
						<p class="whitespace-pre-line">
							<span class="font-bold">Process:</span>
							{config.process}
						</p>
					{/if}

					{#if config.system}
						<p class="whitespace-pre-line">
							<span class="font-bold">System:</span>
							{config.system}
						</p>
					{/if}

					<p class="whitespace-pre-line">
						<span class="font-bold">Duration:</span>
						{config.duration}
					</p>

					{#if config.statblock}
						<p class="whitespace-pre-line">
							<span class="font-bold">Statblock: {config.statblock.name}</span>
							{config.statblock.description}
						</p>
					{/if}
				</svelte:fragment>
			</HelpText>
		</header>
	</div>
{/if}
