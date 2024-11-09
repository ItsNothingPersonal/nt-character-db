<script lang="ts">
	import type { BloodSorceryRitualName } from '$lib/zod/lotn/enums/bloodSorceryRitualName';
	import { createEventDispatcher, onMount } from 'svelte';
	import HelpText from '../characterSheet/components/HelpText.svelte';
	import { bloodSorceryRitualConfig } from '../config/bloodSorceryRitualsConfig';
	import { getBloodSorceryRitualPowers } from '../util/disciplines';

	export let number: number;
	export let maxLevel: number;

	export let selectedBloodSorceryRitualPower: BloodSorceryRitualName | undefined = undefined;
	export let existingBloodSorceryRituals: BloodSorceryRitualName[] = [];
	export let disableBloodSorceryRitualPowerSelection: boolean = false;
	export let showDeleteButton: boolean = false;
	export let enableEdit: boolean = false;

	let previousBloodSorceryRitualPower: BloodSorceryRitualName | undefined = undefined;

	const dispatchChange = createEventDispatcher<{
		changeRitualPower: {
			old: BloodSorceryRitualName | undefined;
			new: BloodSorceryRitualName;
		};
		deleteRitualPower: { name: BloodSorceryRitualName };
	}>();

	$: config = selectedBloodSorceryRitualPower
		? bloodSorceryRitualConfig.rituals[selectedBloodSorceryRitualPower]
		: undefined;

	onMount(() => {
		previousBloodSorceryRitualPower = selectedBloodSorceryRitualPower;
	});
</script>

{#if enableEdit}
	<label class="label">
		<span>Ritual {number}</span>
		<select
			class="select rounded-lg"
			disabled={disableBloodSorceryRitualPowerSelection}
			bind:value={selectedBloodSorceryRitualPower}
			on:change={() => {
				if (selectedBloodSorceryRitualPower) {
					dispatchChange('changeRitualPower', {
						old: previousBloodSorceryRitualPower,
						new: selectedBloodSorceryRitualPower
					});

					previousBloodSorceryRitualPower = selectedBloodSorceryRitualPower;
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
		{#if config && selectedBloodSorceryRitualPower}
			<div class="flex">
				<HelpText id={selectedBloodSorceryRitualPower}>
					<p class="underline decoration-dotted">Ritual-Description</p>
					<svelte:fragment slot="helpText">
						{#if config.prerequisite}
							<p class="whitespace-pre-line">
								<span class="font-bold">Prerequisite:</span>
								{config.prerequisite}
							</p>
						{/if}

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

						{#if config.challengePool}
							<p class="whitespace-pre-line">
								<span class="font-bold">Challenge Pool:</span>
								{config.challengePool.attacker.attribute} + {config.challengePool.attacker.skill} vs{' '}
								{config.challengePool.defender}
							</p>
						{/if}
						{#if config.system}
							<p class="whitespace-pre-line">
								<span class="font-bold">System:</span>
								{config.system}
							</p>
						{/if}

						{#if config.processAndSystem}
							<p class="whitespace-pre-line">
								<span class="font-bold">Process and System:</span>
								{config.processAndSystem}
							</p>
						{/if}

						<p class="whitespace-pre-line">
							<span class="font-bold">Duration:</span>
							{config.duration}
						</p>
					</svelte:fragment>
				</HelpText>
				{#if showDeleteButton}
					<button
						class="variant-filled-primary btn ml-auto w-3 rounded-lg"
						type="button"
						on:click={() => {
							if (selectedBloodSorceryRitualPower) {
								dispatchChange('deleteRitualPower', {
									name: selectedBloodSorceryRitualPower
								});
								selectedBloodSorceryRitualPower = undefined;
								previousBloodSorceryRitualPower = undefined;
							}
						}}
					>
						<iconify-icon height="12" icon="mdi:remove" />
					</button>
				{/if}
			</div>
		{/if}
	</label>
{:else if config && selectedBloodSorceryRitualPower}
	<div class="card rounded-lg">
		<header class="card-header mb-4">
			<HelpText id={selectedBloodSorceryRitualPower}>
				<h3 class="h3">{selectedBloodSorceryRitualPower}</h3>
				<p>Level: {config.level}</p>
				<svelte:fragment slot="helpText">
					{#if config.prerequisite}
						<p class="whitespace-pre-line">
							<span class="font-bold">Prerequisite:</span>
							{config.prerequisite}
						</p>
					{/if}

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

					{#if config.challengePool}
						<p class="whitespace-pre-line">
							<span class="font-bold">Challenge Pool:</span>
							{config.challengePool.attacker.attribute} + {config.challengePool.attacker.skill} vs{' '}
							{config.challengePool.defender}
						</p>
					{/if}
					{#if config.system}
						<p class="whitespace-pre-line">
							<span class="font-bold">System:</span>
							{config.system}
						</p>
					{/if}

					{#if config.processAndSystem}
						<p class="whitespace-pre-line">
							<span class="font-bold">Process and System:</span>
							{config.processAndSystem}
						</p>
					{/if}

					<p class="whitespace-pre-line">
						<span class="font-bold">Duration:</span>
						{config.duration}
					</p>
				</svelte:fragment>
			</HelpText>
		</header>
	</div>
{/if}
