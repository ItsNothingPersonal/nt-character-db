<script lang="ts">
	import Flaw from '$lib/components/lotn/characterSheet/components/Flaw.svelte';
	import HelpText from '$lib/components/lotn/characterSheet/components/HelpText.svelte';
	import Merit from '$lib/components/lotn/characterSheet/components/Merit.svelte';
	import { flawConfig } from '$lib/components/lotn/config/flawsConfig';
	import { meritConfig } from '$lib/components/lotn/config/meritsConfig';
	import { predatorTypeConfig } from '$lib/components/lotn/config/predatorTypeConfig';
	import {
		getApplicableFlawLevels,
		getFlawValueDescription,
		isThinBloodFlaw
	} from '$lib/components/lotn/util/flawUtil';
	import {
		displaySpecificMeritDescription,
		getApplicableMeritLevels,
		getMeritValueDescription,
		getValidFlaws,
		getValidMerits,
		getValidMythicalFlaws,
		isThinBloodMerit
	} from '$lib/components/lotn/util/meritUtil';
	import {
		backgroundPaymentStore,
		characterCreationStore
	} from '$lib/stores/characterCreationStore';
	import { flawPaymentStore } from '$lib/stores/flawPaymentStore';
	import { meritPaymentStore } from '$lib/stores/meritPaymentStore';
	import { type FlawName } from '$lib/zod/lotn/enums/flawName';
	import { type MeritName } from '$lib/zod/lotn/enums/meritName';
	import type { PlayerFlaw } from '$lib/zod/lotn/playerCharacter/playerFlaw';
	import type { PlayerMerit } from '$lib/zod/lotn/playerCharacter/playerMerit';
	import { onDestroy, onMount } from 'svelte';
	import { get } from 'svelte/store';

	let selectedMerit: MeritName;
	let selectedMeritValue: number;
	let selectedFlaw: FlawName;
	let selectedFlawValue: number;
	let selectedMythicalFlaw: FlawName;
	let selectedMythicalFlawValue: number;

	let meritButtonDisabled = true;
	let flawButtonDisabled = true;
	let mythicalFlawButtonDisabled = true;

	const debugSub = characterCreationStore.subscribe((value) =>
		console.warn(JSON.stringify(value, undefined, 2))
	);

	onDestroy(() => {
		debugSub();
	});

	onMount(() => {
		selectMeritMinDotValue();
		selectFlawMinDotValue();
		selectedMythicalFlawMinDotValue();
		meritButtonDisabled = disableMeritButton();
		flawButtonDisabled = disableFlawButton();
		mythicalFlawButtonDisabled = disableMythicalFlawButton();
	});

	function getMeritsTotal() {
		const paidMerits = meritPaymentStore.getChosenMerits();
		return paidMerits.reduce((acc, merit) => acc + merit.freebies, 0);
	}

	function getNumberOfThinBloodMerits() {
		return (
			get(characterCreationStore).merits?.filter((merit) => isThinBloodMerit(merit.name)).length ??
			0
		);
	}

	function getFlawsTotal() {
		const chosenFlaws = flawPaymentStore.getChosenFlaws();
		return chosenFlaws.reduce((acc, flaw) => acc + flaw.freebies, 0);
	}

	function getNumberOfThinBloodFlaws() {
		return (
			get(characterCreationStore).flaws?.filter((flaw) => isThinBloodFlaw(flaw.name)).length ?? 0
		);
	}

	function selectMeritMinDotValue() {
		const levels = getApplicableMeritLevels(selectedMerit);
		selectedMeritValue = levels ? levels[0] : 0;
		meritButtonDisabled = disableMeritButton();
	}

	function selectFlawMinDotValue() {
		const levels = getApplicableFlawLevels(selectedFlaw);
		selectedFlawValue = levels ? levels[0] : 0;
	}

	function selectedMythicalFlawMinDotValue() {
		const levels = getApplicableFlawLevels(selectedMythicalFlaw);
		selectedMythicalFlawValue = levels ? levels[0] : 0;
	}

	function addMerit() {
		const id = meritPaymentStore.addGenericMerit(selectedMerit, selectedMeritValue, 0);
		characterCreationStore.update((store) => {
			if (!store.merits) store.merits = [];

			store.merits.push({
				id,
				name: selectedMerit,
				value: selectedMeritValue
			});
			return store;
		});
		selectedMerit = getValidMerits()[0];
		selectMeritMinDotValue();
		selectFlawMinDotValue();
		meritButtonDisabled = disableMeritButton();
	}

	function deleteMerit(id: string) {
		meritPaymentStore.deleteMerit(id);

		characterCreationStore.update((store) => {
			if (!store.merits) return store;

			const meritToRemove = store.merits.find((merit) => merit.id === id);
			if (meritToRemove?.name === 'Catenating Blood') {
				$characterCreationStore.ghoul = false;
			}

			store.merits = store.merits.filter((merit) => merit.id !== id);

			if (store.merits.length === 0) {
				store.merits = undefined;
			}

			return store;
		});

		selectedMerit = getValidMerits()[0];
		selectMeritMinDotValue();
		meritButtonDisabled = disableMeritButton();
	}

	function addFlaw() {
		const id = flawPaymentStore.addGenericFlaw(selectedFlaw, selectedFlawValue, 0);
		characterCreationStore.update((store) => {
			if (!store.flaws) store.flaws = [];

			store.flaws.push({
				id,
				name: selectedFlaw,
				value: selectedFlawValue
			});
			return store;
		});
		selectedFlaw = getValidFlaws()[0];
		selectFlawMinDotValue();
		meritButtonDisabled = disableMeritButton();
		flawButtonDisabled = disableFlawButton();
	}

	function addMythicalFlaw() {
		const id = flawPaymentStore.addPredatorFlaw(selectedMythicalFlaw, selectedMythicalFlawValue);
		characterCreationStore.update((store) => {
			if (!store.flaws) store.flaws = [];

			store.flaws.push({
				id,
				name: selectedMythicalFlaw,
				value: selectedMythicalFlawValue
			});
			return store;
		});
		selectedMythicalFlaw = getValidMythicalFlaws()[0];
		selectedMythicalFlawMinDotValue();
		mythicalFlawButtonDisabled = disableMythicalFlawButton();
	}

	function deleteFlaw(id: string) {
		flawPaymentStore.deleteFlaw(id);

		characterCreationStore.update((store) => {
			if (!store.flaws) return store;

			store.flaws = store.flaws.filter((flaw) => flaw.id !== id);

			if (store.flaws.length === 0) {
				store.flaws = undefined;
			}

			return store;
		});

		flawButtonDisabled = disableFlawButton();
		mythicalFlawButtonDisabled = disableMythicalFlawButton();
	}

	function disableMeritButton() {
		const costTooMuch = getFlawsTotal() - getMeritsTotal() - selectedMeritValue < 0;
		const multiPurchase = meritConfig[selectedMerit]?.multiPurchase ?? false;
		const alreadyExists =
			get(characterCreationStore).merits?.some(
				(merit) => merit.name === selectedMerit && !multiPurchase
			) ?? false;

		return costTooMuch || alreadyExists;
	}

	function disableFlawButton() {
		const tooManyFlaws = getFlawsTotal() + selectedFlawValue > 10;
		const alreadyExists =
			get(characterCreationStore).flaws?.some((flaw) => flaw.name === selectedFlaw) ?? false;

		return tooManyFlaws || alreadyExists;
	}

	function disableMythicalFlawButton() {
		const tooManyFlaws =
			flawPaymentStore.getMythicalPredatorFlawsTotalValue() + selectedMythicalFlawValue >
			flawPaymentStore.getRequiredMythicalFlaws();
		const alreadyExists =
			get(characterCreationStore).flaws?.some((flaw) => flaw.name === selectedMythicalFlaw) ??
			false;

		return tooManyFlaws || alreadyExists;
	}

	function isPredatorFlaw(flaw: PlayerFlaw & { id: string }) {
		return flawPaymentStore.getPredatorFlaws().some((e) => e.id === flaw.id);
	}

	function isMythicalPredatorFlaw(flaw: PlayerFlaw & { id: string }) {
		return isPredatorFlaw(flaw) && flawConfig[flaw.name]?.category === 'Mythical';
	}

	function disableDeleteFlaw(flaw: PlayerFlaw & { id: string }) {
		if (isMythicalPredatorFlaw(flaw)) return false;

		return getFlawsTotal() - getMeritsTotal() - flaw.value < 0;
	}

	function displaySpecificFlawDescription(flaw: PlayerFlaw & { id: string }) {
		return (
			flawPaymentStore
				.getPredatorFlaws()
				.some(
					(e) =>
						e.id === flaw.id &&
						!e.hasPredeterminedDescription &&
						flawConfig[flaw.name]?.hasSpecificDescription === true
				) ||
			(!flawPaymentStore.getPredatorFlaws().some((e) => e.id === flaw.id) &&
				flawConfig[flaw.name]?.hasSpecificDescription === true)
		);
	}

	function isPredatorMerit(merit: PlayerMerit & { id: string }) {
		return meritPaymentStore.getPredatorMerits().some((e) => e.id === merit.id);
	}

	function isLoresheetMerit(merit: PlayerMerit & { id: string }) {
		return backgroundPaymentStore.isLoresheetMerit(merit.id);
	}

	function updateFlawDescription(id: string, description: string | undefined) {
		if (!description) return;

		characterCreationStore.update((store) => {
			if (!store.flaws) return store;

			const flaw = store.flaws.find((flaw) => flaw.id === id);
			if (!flaw) return store;

			flaw.description = description;
			return store;
		});
	}

	function updateMeritescription(id: string, description: string | undefined) {
		if (!description) return;

		characterCreationStore.update((store) => {
			if (!store.merits) return store;

			const merit = store.merits.find((merit) => merit.id === id);
			if (!merit) return store;

			merit.description = description;
			return store;
		});
	}

	function disableFlawDescriptionInput(flaw: PlayerFlaw & { id: string }) {
		return flawPaymentStore
			.getPredatorFlaws()
			.some((e) => e.id === flaw.id && e.hasPredeterminedDescription);
	}
</script>

<div class="flex flex-col gap-4">
	<div class="flex gap-2">
		{#key $characterCreationStore.flaws}
			<p>{getMeritsTotal()} Merit Dots / {getFlawsTotal()} Flaw Dots</p>
		{/key}
		{#if $characterCreationStore.clan === 'Thin-Blooded'}
			<div class="border-l border-black dark:border-gray-300" />
			{#key $characterCreationStore.merits || $characterCreationStore.flaws}
				<p>
					{getNumberOfThinBloodMerits()} Thin-Blood Merits / {getNumberOfThinBloodFlaws()} Thin-Blood
					Flaws
				</p>
			{/key}
		{/if}
	</div>

	<div class="flex flex-col gap-2">
		<div class="flex flex-col gap-2">
			<div class="flex gap-4">
				<div class="flex min-w-72 flex-col gap-2">
					<label class="label">
						<span>Choose a Merit</span>
						{#key $characterCreationStore.merits}
							<select
								class="select rounded-lg"
								bind:value={selectedMerit}
								on:change={selectMeritMinDotValue}
							>
								{#each getValidMerits() as merit}
									<option value={merit}>
										{merit}
									</option>
								{/each}
							</select>
						{/key}
					</label>
					<label class="label">
						<span>Dots</span>
						<select
							class="select rounded-lg"
							disabled={(getApplicableMeritLevels(selectedMerit) ?? []).length < 2}
							bind:value={selectedMeritValue}
						>
							{#each getApplicableMeritLevels(selectedMerit) ?? [] as point}
								<option selected={point === selectedMeritValue} value={point}>
									{point}
								</option>
							{/each}
						</select>
					</label>
					<button
						class="variant-filled-primary btn rounded-lg"
						disabled={meritButtonDisabled}
						type="button"
						on:click={addMerit}
					>
						Add Merit
					</button>
				</div>
				<p class="whitespace-pre-line">
					{getMeritValueDescription(selectedMerit, selectedMeritValue)}
				</p>
			</div>
		</div>
		{#if $characterCreationStore.merits && $characterCreationStore.merits.length > 0}
			<div class="flex flex-col">
				<h3 class="h3">Merits</h3>
				<div class="grid grid-cols-4 gap-2">
					{#each $characterCreationStore.merits as merit}
						<Merit
							displayFormat="column"
							{merit}
							showDeleteButton={!isPredatorMerit(merit) && !isLoresheetMerit(merit)}
							showDescriptionInput={displaySpecificMeritDescription(merit)}
							on:deleteClick={(event) => deleteMerit(event.detail.id)}
							on:descriptionChange={(event) =>
								updateMeritescription(event.detail.id, event.detail.description)}
						/>
					{/each}
				</div>
			</div>
		{/if}
	</div>

	<div class="flex flex-col gap-2">
		<div class="flex gap-4">
			<div class="flex min-w-72 flex-col gap-2">
				<label class="label">
					<span>Choose a Flaw</span>
					{#key $characterCreationStore.flaws}
						<select
							class="select rounded-lg"
							bind:value={selectedFlaw}
							on:change={selectFlawMinDotValue}
						>
							{#each getValidFlaws() as flaw}
								<option value={flaw}>
									{flaw}
								</option>
							{/each}
						</select>
					{/key}
				</label>
				<label class="label">
					<span>Dots</span>
					<select
						class="select rounded-lg"
						disabled={(getApplicableFlawLevels(selectedFlaw) ?? []).length < 2}
						bind:value={selectedFlawValue}
					>
						{#each getApplicableFlawLevels(selectedFlaw) ?? [] as point}
							<option selected={point === selectedFlawValue} value={point}>
								{point}
							</option>
						{/each}
					</select>
				</label>
				<button
					class="variant-filled-primary btn rounded-lg"
					disabled={flawButtonDisabled}
					type="button"
					on:click={addFlaw}
				>
					Add Flaw
				</button>
			</div>
			<p class="whitespace-pre-line">
				{getFlawValueDescription(selectedFlaw, selectedFlawValue)}
			</p>
		</div>
	</div>
	{#if $characterCreationStore.flaws && $characterCreationStore.flaws.length > 0}
		<div class="flex flex-col">
			<h3 class="h3">Flaws</h3>
			<div class="grid grid-cols-4 gap-2">
				{#each $characterCreationStore.flaws as flaw}
					<Flaw
						disableDeleteButton={disableDeleteFlaw(flaw)}
						disableDescriptionInput={disableFlawDescriptionInput(flaw)}
						displayFormat="column"
						{flaw}
						showDeleteButton={!isPredatorFlaw(flaw) || isMythicalPredatorFlaw(flaw)}
						showDescriptionInput={displaySpecificFlawDescription(flaw)}
						on:deleteClick={(event) => deleteFlaw(event.detail.id)}
						on:descriptionChange={(event) =>
							updateFlawDescription(event.detail.id, event.detail.description)}
					/>
				{/each}
			</div>
		</div>
	{/if}
</div>
{#if flawPaymentStore.getRequiredMythicalFlaws() > 0 && $characterCreationStore.predatorType}
	<div class="mt-4 flex flex-col">
		<HelpText id={$characterCreationStore.predatorType}>
			<h3 class="h3">Predator Type: {$characterCreationStore.predatorType}</h3>
			<svelte:fragment slot="helpText">
				{#if $characterCreationStore.predatorType && predatorTypeConfig[$characterCreationStore.predatorType]}
					<p class="whitespace-pre-line">
						{predatorTypeConfig[$characterCreationStore.predatorType].description}
					</p>

					<p class="whitespace-pre-line">
						{predatorTypeConfig[$characterCreationStore.predatorType].changeDescription}
					</p>
				{/if}
			</svelte:fragment>
		</HelpText>
		{#key $characterCreationStore.flaws}
			<h4 class="h4">
				Required Mythical Flaws: {flawPaymentStore.getMythicalPredatorFlawsTotalValue()} / {flawPaymentStore.getRequiredMythicalFlaws()}
			</h4>
		{/key}
		<div class="flex gap-4">
			<div class="flex min-w-72 flex-col gap-2">
				<label class="label">
					<span>Choose a Mythical Flaw</span>
					{#key $characterCreationStore.flaws}
						<select
							class="select rounded-lg"
							bind:value={selectedMythicalFlaw}
							on:change={selectedMythicalFlawMinDotValue}
						>
							{#each getValidMythicalFlaws() as flaw}
								<option value={flaw}>
									{flaw}
								</option>
							{/each}
						</select>
					{/key}
				</label>
				<label class="label">
					<span>Dots</span>
					<select
						class="select rounded-lg"
						disabled={(getApplicableFlawLevels(selectedMythicalFlaw) ?? []).length < 2}
						bind:value={selectedMythicalFlawValue}
					>
						{#each getApplicableFlawLevels(selectedMythicalFlaw) ?? [] as point}
							<option selected={point === selectedMythicalFlawValue} value={point}>
								{point}
							</option>
						{/each}
					</select>
				</label>
				<button
					class="variant-filled-primary btn rounded-lg"
					disabled={mythicalFlawButtonDisabled}
					type="button"
					on:click={addMythicalFlaw}
				>
					Add Mythical Flaw
				</button>
			</div>
			<p class="whitespace-pre-line">
				{getFlawValueDescription(selectedMythicalFlaw, selectedMythicalFlawValue)}
			</p>
		</div>
	</div>
{/if}
