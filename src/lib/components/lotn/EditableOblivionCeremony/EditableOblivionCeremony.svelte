<script lang="ts">
	import { characterCreationStore } from '$lib/stores/characterCreationStore';
	import type { OblivionCeremonyName } from '$lib/zod/lotn/enums/oblivionCeremonyName';
	import { createEventDispatcher } from 'svelte';
	import HelpText from '../characterSheet/components/HelpText.svelte';
	import { ceremoniesConfig } from '../config/ceremoniesConfig';
	import { getOblivionCeremonyPowers } from '../util/disciplines';
	import EditableOblivionCeremonyPower from './EditableOblivionCeremonyPower.svelte';

	export let existingOblivionCeremonies: OblivionCeremonyName[];
	export let maxLevel: number;
	export let showDeleteButton: boolean = false;
	export let enableEdit: boolean = false;
	export let maxNumberOfCeremonies: number | undefined = undefined;
	export let lockFirstCeremony: boolean = true;
	export let hideAddButton: boolean = false;

	let selectedOblivionCeremonyPower: OblivionCeremonyName | undefined = undefined;

	const dispatchChange = createEventDispatcher<{
		addCeremonyPower: { new: OblivionCeremonyName };
		changeCeremonyPower: {
			old: OblivionCeremonyName | undefined;
			new: OblivionCeremonyName;
		};
		deleteCeremonyPower: { name: OblivionCeremonyName };
	}>();
</script>

<div class="flex flex-col gap-2">
	<HelpText id="blood-sorcery-ritual-titel">
		<h3 class="h3">Oblivion Ceremonies</h3>
		<svelte:fragment slot="helpText">
			<p class="whitespace-pre-line">
				<strong>Characteristics: </strong>{ceremoniesConfig.characteristics}
			</p>
		</svelte:fragment>
	</HelpText>

	{#if !maxNumberOfCeremonies || $characterCreationStore.ceremonies.length < maxNumberOfCeremonies || !hideAddButton}
		<label class="label">
			<span>What Ceremony do you want to add?</span>
			<select
				class="select rounded-lg"
				disabled={maxNumberOfCeremonies
					? $characterCreationStore.ceremonies.length >= maxNumberOfCeremonies
					: false}
				bind:value={selectedOblivionCeremonyPower}
				on:change={() => {
					if (selectedOblivionCeremonyPower) {
						dispatchChange('addCeremonyPower', {
							new: selectedOblivionCeremonyPower
						});
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
		</label>
	{/if}

	{#each $characterCreationStore.ceremonies as ceremony, index}
		<EditableOblivionCeremonyPower
			enableEdit={(index === 0 && !lockFirstCeremony && enableEdit) || (index > 0 && enableEdit)}
			{existingOblivionCeremonies}
			{maxLevel}
			number={index + 1}
			selectedOblivionCeremonyPower={ceremony}
			{showDeleteButton}
			on:changeCeremonyPower={(e) => dispatchChange('changeCeremonyPower', e.detail)}
			on:deleteCeremonyPower={(e) => dispatchChange('deleteCeremonyPower', e.detail)}
		/>
	{/each}
</div>
