<script lang="ts">
	import {
		characterCreateStore,
		characterStore
	} from '$lib/components/classic/characterSheet/characterStore';
	import Selectionbox from '$lib/components/selectionbox/selectionbox.svelte';
	import { isNullOrUndefined, typedObjectKeys } from '$lib/util';
	import { addFlaw, maxFlaws, removeFlaw } from '$lib/validation/mutations/flaws';
	import { addMerit, maxMerits, removeMerit } from '$lib/validation/mutations/merits';
	import { flawName, type FlawName } from '$lib/zod/classic/enums/flawName';
	import { meritName, type MeritName } from '$lib/zod/classic/enums/meritName';
	import { playerCharacter } from '$lib/zod/classic/playerCharacter/playerCharacter';
	import { Step } from '@skeletonlabs/skeleton';

	const baseUrl = 'https://vamp.bynightstudios.com/vampire/disciplines';
	const validMerits = typedObjectKeys(meritName.Values);
	const validFlaws = typedObjectKeys(flawName.Values);

	let selectedMerit: MeritName;
	let selectedFlaw: FlawName;

	$: {
		//warum kann er die vorhandenen disziplinen nicht erkennen? die sind drin! nach hmr ist er sichtbar
		const characterData = playerCharacter.safeParse($characterCreateStore);
		if (characterData.success) {
			characterStore.set(characterData.data);
		}
	}

	$: locked = $maxMerits < 0 || $maxFlaws < 0;
</script>

<Step {locked}>
	<svelte:fragment slot="header">Step 8: Choose Merits and Flaws</svelte:fragment>
	<div class="grid auto-rows-auto grid-cols-2 gap-2">
		<div class="flex flex-col gap-y-2">
			<label for="maxMerits">
				Available Merit Points
				<p id="maxMerits">{$maxMerits}</p>
			</label>
			<Selectionbox
				addButton={{
					onClick: () => characterCreateStore.set(addMerit($characterCreateStore, selectedMerit)),
					disabled: !isNullOrUndefined(
						$characterCreateStore.merits?.find((e) => e.name === selectedMerit)
					)
				}}
				label="Merit"
				removeButton={{
					onClick: () =>
						characterCreateStore.set(removeMerit($characterCreateStore, selectedMerit)),
					disabled: $characterCreateStore.merits
						? $characterCreateStore.merits.length === 0 ||
							isNullOrUndefined($characterCreateStore.merits.find((e) => e.name === selectedMerit))
						: true
				}}
				selectableValues={validMerits}
				bind:value={selectedMerit}
			/>

			{#if $characterCreateStore.merits && $characterCreateStore.merits.length > 0}
				<div class="card mt-4 rounded-none">
					<header class="card-header">
						<h4 class="h4">Merits</h4>
					</header>
					<section class="p-4">
						<ul>
							{#each $characterCreateStore.merits as merit}
								<li>
									<a
										class="underline decoration-dotted"
										href="{baseUrl}/{merit.name.toLowerCase()}"
									>
										<span class="flex-auto">{merit.name}</span>
									</a>
								</li>
							{/each}
						</ul>
					</section>
				</div>
			{/if}
		</div>
		<div class="flex flex-col gap-y-2">
			<label for="maxFlaws">
				Available Flaw Points
				<p id="maxFlaws">{$maxFlaws}</p>
			</label>
			<Selectionbox
				addButton={{
					onClick: () => ($characterCreateStore = addFlaw($characterCreateStore, selectedFlaw)),
					disabled: !isNullOrUndefined(
						$characterCreateStore.flaws?.find((e) => e.name === selectedFlaw)
					)
				}}
				label="Flaw"
				removeButton={{
					onClick: () => ($characterCreateStore = removeFlaw($characterCreateStore, selectedFlaw)),
					disabled: $characterCreateStore.flaws
						? $characterCreateStore.flaws.length === 0 ||
							isNullOrUndefined($characterCreateStore.flaws.find((e) => e.name === selectedFlaw))
						: true
				}}
				selectableValues={validFlaws}
				bind:value={selectedFlaw}
			/>

			{#if $characterCreateStore.flaws && $characterCreateStore.flaws.length > 0}
				<div class="card mt-4 rounded-none">
					<header class="card-header">
						<h4 class="h4">Flaws</h4>
					</header>
					<section class="p-4">
						<ul>
							{#each $characterCreateStore.flaws as flaw}
								<li>
									<a class="underline decoration-dotted" href="{baseUrl}/{flaw.name.toLowerCase()}">
										<span class="flex-auto">{flaw.name}</span>
									</a>
								</li>
							{/each}
						</ul>
					</section>
				</div>
			{/if}
		</div>
	</div>
</Step>
