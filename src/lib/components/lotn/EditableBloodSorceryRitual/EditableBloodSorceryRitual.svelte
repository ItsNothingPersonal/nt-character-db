<script lang="ts">
	import { characterCreationStore } from '$lib/stores/characterCreationStore';
	import type { BloodSorceryRitualName } from '$lib/zod/lotn/enums/bloodSorceryRitualName';
	import { createEventDispatcher } from 'svelte';
	import HelpText from '../characterSheet/components/HelpText.svelte';
	import { bloodSorceryRitualConfig } from '../config/bloodSorceryRitualsConfig';
	import { getBloodSorceryRitualPowers } from '../util/disciplines';
	import EditableBloodSorceryRitualPower from './EditableBloodSorceryRitualPower.svelte';

	export let existingBloodSorceryRituals: BloodSorceryRitualName[];
	export let maxLevel: number;
	export let showDeleteButton: boolean = false;
	export let enableEdit: boolean = false;
	export let maxNumberOfRituals: number | undefined = undefined;
	export let lockFirstRitual: boolean = true;
	export let hideAddButton: boolean = false;

	let selectedBloodSorceryRitualPower: BloodSorceryRitualName | undefined = undefined;

	const dispatchChange = createEventDispatcher<{
		addRitualPower: { new: BloodSorceryRitualName };
		changeRitualPower: {
			old: BloodSorceryRitualName | undefined;
			new: BloodSorceryRitualName;
		};
		deleteRitualPower: { name: BloodSorceryRitualName };
	}>();
</script>

<div class="flex flex-col gap-2">
	<HelpText id="blood-sorcery-ritual-titel">
		<h3 class="h3">Blood Sorcery Rituals</h3>
		<svelte:fragment slot="helpText">
			<p class="whitespace-pre-line">
				<strong>Description: </strong>{bloodSorceryRitualConfig.characteristics.description}
			</p>
			<p class="whitespace-pre-line">
				<strong>Wards: </strong>{bloodSorceryRitualConfig.characteristics.wards}
			</p>
			<p class="whitespace-pre-line">
				<strong>Warding Circles: </strong>{bloodSorceryRitualConfig.characteristics.wardingCircles}
			</p>
		</svelte:fragment>
	</HelpText>

	{#if !maxNumberOfRituals || $characterCreationStore.rituals.length < maxNumberOfRituals || !hideAddButton}
		<label class="label">
			<span>What Ritual do you want to add?</span>
			<select
				class="select rounded-lg"
				disabled={maxNumberOfRituals
					? $characterCreationStore.rituals.length >= maxNumberOfRituals
					: false}
				bind:value={selectedBloodSorceryRitualPower}
				on:change={() => {
					if (selectedBloodSorceryRitualPower) {
						dispatchChange('addRitualPower', {
							new: selectedBloodSorceryRitualPower
						});
					}
				}}
			>
				<option disabled selected value={undefined}> Please select a blood sorcery ritual </option>
				{#each getBloodSorceryRitualPowers(maxLevel, existingBloodSorceryRituals, selectedBloodSorceryRitualPower) as bloodSorceryRitualPower}
					{#if bloodSorceryRitualPower.data?.level}
						<option
							selected={selectedBloodSorceryRitualPower === bloodSorceryRitualPower.name}
							value={bloodSorceryRitualPower.name}
						>
							{bloodSorceryRitualPower.name} (Level: {bloodSorceryRitualPower.data?.level})
						</option>
					{:else}
						<option
							selected={selectedBloodSorceryRitualPower === bloodSorceryRitualPower.name}
							value={bloodSorceryRitualPower.name}
						>
							{bloodSorceryRitualPower.name}
						</option>
					{/if}
				{/each}
			</select>
		</label>
	{/if}

	{#each $characterCreationStore.rituals as ritual, index}
		<EditableBloodSorceryRitualPower
			enableEdit={(index === 0 && !lockFirstRitual && enableEdit) || (index > 0 && enableEdit)}
			{existingBloodSorceryRituals}
			{maxLevel}
			number={index + 1}
			selectedBloodSorceryRitualPower={ritual}
			{showDeleteButton}
			on:changeRitualPower={(e) => dispatchChange('changeRitualPower', e.detail)}
			on:deleteRitualPower={(e) => dispatchChange('deleteRitualPower', e.detail)}
		/>
	{/each}
</div>
