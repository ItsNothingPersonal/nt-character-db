<script lang="ts">
	import { bloodPotencyConfig } from '$lib/components/lotn/config/bloodPotencyConfig';
	import Tracker from '$lib/components/lotn/trackers/tracker/tracker.svelte';
	import Checkbox from '$lib/components/typography/checkbox.svelte';
	import { characterCreationStore } from '$lib/stores/characterCreationStore';
	import { flawPaymentStore } from '$lib/stores/flawPaymentStore';
	import { meritPaymentStore } from '$lib/stores/meritPaymentStore';
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';

	const validGenerations = [9, 10, 11, 12, 13, 14, 15, 16];
	$: selectedGeneration = 16;
	$: selectedBloodPotency = 0;
	$: selectedBloodPotencyConfig = getBloodPotencies(selectedGeneration);

	const validBloodPotencyPerGeneration: { [k: number]: { min: number; max: number } } = {
		9: { min: 2, max: 5 },
		10: { min: 1, max: 4 },
		11: { min: 1, max: 4 },
		12: { min: 1, max: 3 },
		13: { min: 1, max: 3 },
		14: { min: 0, max: 0 },
		15: { min: 0, max: 0 },
		16: { min: 0, max: 0 }
	};

	function getBloodPotencies(generation: number) {
		const { min, max } = validBloodPotencyPerGeneration[generation];
		return Array.from({ length: max - min + 1 }, (_, i) => min + i);
	}

	onMount(() => {
		if (!$characterCreationStore.clan) {
			$characterCreationStore.clan = 'Banu Haqim';
		}
		selectedBloodPotency = $characterCreationStore.bloodPotency;
		selectedGeneration = $characterCreationStore.generation;
	});

	function updateGeneration() {
		characterCreationStore.update((store) => {
			store.generation = selectedGeneration;
			return store;
		});

		selectedBloodPotency = validBloodPotencyPerGeneration[selectedGeneration].min;
		updateBloodPotency();
	}

	function updateBloodPotency() {
		characterCreationStore.update((store) => {
			store.bloodPotency = selectedBloodPotency;
			if (selectedBloodPotency === 2) {
				store.experience = [
					{ date: new Date(), value: 20, reason: 'Blood Potency', type: 'substract' }
				];
			} else {
				store.experience = [];
			}
			return store;
		});
	}

	function updateGhoulStatus() {
		characterCreationStore.update((store) => {
			store.ghoul = !store.ghoul;
			store.predatorType = undefined;
			store.experience = [];
			return store;
		});
		meritPaymentStore.deletePredatorMerits();
		flawPaymentStore.deletePredatorFlaws();
		if (!$characterCreationStore.ghoul) {
			updateBloodPotency();
		}
	}
</script>

{#if !$characterCreationStore.ghoul}
	<div class="mb-2 grid auto-rows-auto grid-cols-1 gap-2 sm:grid-cols-2">
		<label class="label">
			<span>Generation</span>
			<select
				class="select rounded-lg"
				bind:value={selectedGeneration}
				on:change={updateGeneration}
			>
				{#each validGenerations as generation}
					<option selected={selectedGeneration === generation} value={generation}>
						{generation}
					</option>
				{/each}
			</select>
		</label>

		<label class="label">
			<span>Blood Potency</span>

			<select
				class="select rounded-lg"
				disabled={selectedBloodPotencyConfig.length <= 1}
				bind:value={selectedBloodPotency}
				on:change={updateBloodPotency}
			>
				{#each selectedBloodPotencyConfig as bloodPotency}
					<option selected={selectedBloodPotency === bloodPotency} value={bloodPotency}>
						{bloodPotency}
					</option>
				{/each}
			</select>
		</label>
		{#if selectedBloodPotency > 2}
			<aside class="alert variant-filled-warning col-span-2 rounded-lg">
				<div>
					<iconify-icon height="48" icon="mdi:warning" />
				</div>
				<div class="alert-message">
					<h3 class="h3">Blood Potency is too high (at character creation)</h3>
					<p>
						This Blood Potency is valid but cannot be bought at character creation because of
						experience point restraints. Please change your Blood Potency to 2 or lower.
					</p>
				</div>
			</aside>
		{/if}
	</div>
{/if}
{#if $characterCreationStore.clan !== 'Thin-Blooded' || ($characterCreationStore.clan === 'Thin-Blooded' && $characterCreationStore.merits?.some((e) => e.name === 'Catenating Blood'))}
	<Checkbox checked={get(characterCreationStore).ghoul} onChange={updateGhoulStatus}>
		Ghoul
	</Checkbox>
{/if}
{#if !$characterCreationStore.ghoul}
	<div class="mb-4 mt-2 grid auto-rows-auto grid-cols-1 gap-2 sm:grid-cols-4">
		<Tracker
			title="Blood Surge Bonus"
			value={bloodPotencyConfig[$characterCreationStore.bloodPotency].bloodSurgeBonus}
		/>
		<Tracker
			title="Damage Healed"
			value={bloodPotencyConfig[$characterCreationStore.bloodPotency].mendingDamage}
		/>
		<Tracker
			title="Discipline Defense Bonus"
			value={bloodPotencyConfig[$characterCreationStore.bloodPotency].disciplineDefenseBonus}
		/>
		<Tracker
			title="Discipline Rousing Bonus"
			value={bloodPotencyConfig[$characterCreationStore.bloodPotency].disciplineRousingBonus}
		/>
		<Tracker
			title="Bane Severity"
			value={bloodPotencyConfig[$characterCreationStore.bloodPotency].baneSeverity}
		/>
		<div class="col-span-1 flex flex-col sm:col-span-3">
			<p class="text-left font-bold">Feeding Penalty</p>
			<p class="pb-2 text-left">
				{bloodPotencyConfig[$characterCreationStore.bloodPotency].feedingPenalty}
			</p>
		</div>
	</div>
{/if}

{#if $characterCreationStore.ghoul}
	<aside class="alert variant-filled-warning mt-4 rounded-lg">
		<div>
			<iconify-icon height="48" icon="mdi:alert" />
		</div>
		<div class="alert-message">
			<h3 class="h3">About Ghouls, Generation & Blood Potency</h3>
			<p>Ghouls have no Generation or Blood Potency like a vampire!</p>
		</div>
	</aside>
{/if}
