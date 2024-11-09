<script lang="ts">
	import { predatorTypeConfig } from '$lib/components/lotn/config/predatorTypeConfig';
	import { characterCreationStore } from '$lib/stores/characterCreationStore';
	import { flawPaymentStore } from '$lib/stores/flawPaymentStore';
	import { meritPaymentStore } from '$lib/stores/meritPaymentStore';
	import { flawName, type FlawName } from '$lib/zod/lotn/enums/flawName';
	import { meritName, type MeritName } from '$lib/zod/lotn/enums/meritName';
	import { predatorType, type PredatorType } from '$lib/zod/lotn/enums/predatorType';
	import { get } from 'svelte/store';

	$: selectionForFlaws = getSelectionNeededFlaws();
	let selectedRadio: 'Mythical' | 'Enemy' | undefined = undefined;

	$: {
		if (
			$characterCreationStore.predatorType === 'Scene Queen' &&
			flawPaymentStore.getPredatorFlaws().some((flaw) => flaw.name === 'Enemy')
		) {
			selectedRadio = 'Enemy';
		} else if (flawPaymentStore.getRequiredMythicalFlaws() > 0) {
			selectedRadio = 'Mythical';
		}
	}

	function setPredatorType(predatorType: PredatorType) {
		applyHumanityChanges(predatorType);
		applyMeritChanges(predatorType);
		applyFlawChanges(predatorType);

		characterCreationStore.update((store) => {
			store.predatorType = predatorType;
			return store;
		});

		selectionForFlaws = getSelectionNeededFlaws();
	}

	function applyHumanityChanges(predatorType: PredatorType) {
		if ($characterCreationStore.predatorType) {
			const humanityChangesUndo = getHumanityChanges($characterCreationStore.predatorType);
			humanityChangesUndo.forEach((change) => {
				if (change.style === 'add') {
					updateHumanity($characterCreationStore.humanity.value - change.value);
				} else {
					updateHumanity($characterCreationStore.humanity.value + change.value);
				}
			});
		}

		const humanityChangesDo = getHumanityChanges(predatorType);
		humanityChangesDo.forEach((change) => {
			if (change.style === 'add') {
				updateHumanity($characterCreationStore.humanity.value + change.value);
			} else {
				updateHumanity($characterCreationStore.humanity.value - change.value);
			}
		});
	}

	function applyMeritChanges(predatorType: PredatorType) {
		if ($characterCreationStore.predatorType) {
			meritPaymentStore.deletePredatorMerits();
		}

		const meritChangesDo = getMeritChanges(predatorType);
		meritChangesDo.forEach((change) => {
			if (!change.name) return;
			const merit = meritName.safeParse(change.name);
			if (!merit.success) return;

			const id = meritPaymentStore.addPredatorMerit(merit.data, change.value);
			updateMerit(merit.data, change.value, 'add', id);
		});
	}

	function applyFlawChanges(predatorType: PredatorType) {
		if ($characterCreationStore.predatorType) {
			flawPaymentStore.deletePredatorFlaws();
		}

		const flawChangesDo = getFlawChanges(predatorType);
		flawChangesDo.forEach((change) => {
			if (!change.name) return;
			const flaw = flawName.safeParse(change.name);
			if (!flaw.success) return;

			const id = flawPaymentStore.addPredatorFlaw(
				flaw.data,
				change.value,
				change.description ? true : false
			);
			updateFlaw(flaw.data, change.value, 'add', id, change.description);
		});
	}

	function getHumanityChanges(predatorType: PredatorType) {
		return predatorTypeConfig[predatorType].changes.filter((change) => change.kind === 'Humanity');
	}

	function getMeritChanges(predatorType: PredatorType) {
		return predatorTypeConfig[predatorType].changes.filter((change) => change.kind === 'Merit');
	}

	function getFlawChanges(predatorType: PredatorType) {
		return predatorTypeConfig[predatorType].changes.filter(
			(change) => change.kind === 'Flaw' && change.flawKind === undefined
		);
	}

	function updateHumanity(value: number) {
		characterCreationStore.update((store) => {
			store.humanity.value = value;
			return store;
		});
	}

	function updateMerit(name: MeritName, value: number, style: 'add' | 'remove', id: string) {
		characterCreationStore.update((store) => {
			if (style === 'add') {
				if (!store.merits) {
					store.merits = [];
				}
				store.merits.push({
					id,
					name,
					value
				});
			} else {
				if (!store.merits || !id) {
					return store;
				}
				store.merits = store.merits.filter((m) => m.id !== id);
			}
			return store;
		});
	}

	function updateFlaw(
		name: FlawName,
		value: number,
		style: 'add' | 'remove',
		id: string,
		description?: string
	) {
		characterCreationStore.update((store) => {
			if (style === 'add') {
				if (!store.flaws) {
					store.flaws = [];
				}
				store.flaws.push({
					id,
					name,
					value,
					description
				});
			} else {
				if (!store.flaws || !id) {
					return store;
				}
				store.flaws = store.flaws.filter((m) => m.id !== id);
			}
			return store;
		});
	}

	function getSelectionNeededFlaws() {
		if (!$characterCreationStore.predatorType) return undefined;

		const result = predatorTypeConfig[$characterCreationStore.predatorType].changes.find(
			(change) =>
				change.flawKind !== undefined && change.kind === 'Flaw' && change.name !== undefined
		);

		if (!result) return undefined;
		return { options: [result.name, result.flawKind], value: result.value };
	}

	function getValidPredatorTypes() {
		return predatorType.options.filter((predatorType) => {
			const config = predatorTypeConfig[predatorType];

			const maxBloodPotency = config.maxBloodPotency;
			if (maxBloodPotency) {
				if (get(characterCreationStore).bloodPotency > maxBloodPotency) {
					return false;
				}
			}
			return true;
		});
	}
</script>

<div class="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-[auto_2fr]">
	{#if !get(characterCreationStore).ghoul}
		<div class="flex flex-col gap-2">
			{#each getValidPredatorTypes() as predatorTypeEntry}
				<button
					class={`variant-filled-primary btn rounded-lg ${$characterCreationStore.predatorType === predatorTypeEntry ? 'ring-2 ring-black dark:ring-white' : ''}`}
					type="button"
					on:click={() => setPredatorType(predatorTypeEntry)}
				>
					{predatorTypeEntry}
				</button>
			{/each}
		</div>
	{/if}
	{#if $characterCreationStore.predatorType}
		<div class="flex flex-col gap-2">
			<p class="whitespace-pre-line">
				{predatorTypeConfig[$characterCreationStore.predatorType].description}
			</p>

			<p class="whitespace-pre-line">
				{predatorTypeConfig[$characterCreationStore.predatorType].changeDescription}
			</p>

			{#if selectionForFlaws}
				{#key selectionForFlaws.options}
					<div class="space-y-2">
						<label class="flex items-center space-x-2">
							<input
								name="radio-direct"
								class="radio"
								type="radio"
								value={selectionForFlaws.options[0]}
								bind:group={selectedRadio}
								on:click={() => {
									flawPaymentStore.deletePredatorFlaws();
									const id = flawPaymentStore.addPredatorFlaw(
										flawName.parse(selectionForFlaws?.options[0]),
										selectionForFlaws?.value ?? 0
									);
									updateFlaw(
										flawName.parse(selectionForFlaws?.options[0]),
										selectionForFlaws?.value ?? 0,
										'add',
										id
									);
								}}
							/>
							<p>{selectionForFlaws.options[0]}</p>
						</label>
						<label class="flex items-center space-x-2">
							<input
								name="radio-direct"
								class="radio"
								type="radio"
								value={selectionForFlaws.options[1]}
								bind:group={selectedRadio}
								on:click={() => {
									flawPaymentStore.deletePredatorFlaws();
									if (selectionForFlaws?.options[1] === 'Mythical') {
										flawPaymentStore.addRequiredMythicalFlaws(selectionForFlaws.value);
									} else {
										console.error('Cannot handle this yet, please inform the admin!');
									}
								}}
							/>
							<p>{selectionForFlaws.options[1]}</p>
						</label>
					</div>
				{/key}
			{/if}
		</div>
	{:else if get(characterCreationStore).ghoul}
		<aside class="alert variant-ghost col-span-2 rounded-lg">
			<div>
				<iconify-icon height="48" icon="mdi:warning" />
			</div>
			<div class="alert-message">
				<h3 class="h3">Ghouls do not have a Predator Type</h3>
			</div>
		</aside>
	{:else}
		<aside class="alert variant-ghost rounded-lg">
			<div>
				<iconify-icon height="48" icon="mdi:warning" />
			</div>
			<div class="alert-message">
				<h3 class="h3">Please select a Predator Type</h3>
			</div>
		</aside>
	{/if}
</div>
