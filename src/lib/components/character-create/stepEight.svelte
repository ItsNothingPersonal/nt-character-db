<script lang="ts">
	import { isNullOrUndefined, typedObjectKeys } from '$lib/util';
	import { addFlaw, maxFlaws, removeFlaw } from '$lib/validation/mutations/flaws';
	import { addMerit, maxMerits, removeMerit } from '$lib/validation/mutations/merits';
	import { flawName, type FlawName } from '$lib/zod/enums/flawName';
	import { meritName, type MeritName } from '$lib/zod/enums/meritName';
	import { playerCharacter } from '$lib/zod/playerCharacter/playerCharacter';
	import { Step } from '@skeletonlabs/skeleton';
	import { characterCreateStore, characterStore } from '../characterSheet/characterStore';
	import Selectionbox from '../selectionbox/selectionbox.svelte';

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
				label="Merit"
				selectableValues={validMerits}
				bind:value={selectedMerit}
				addButton={{
					onClick: () => characterCreateStore.set(addMerit($characterCreateStore, selectedMerit)),
					disabled: !isNullOrUndefined(
						$characterCreateStore.merits?.find((e) => e.name === selectedMerit)
					)
				}}
				removeButton={{
					onClick: () =>
						characterCreateStore.set(removeMerit($characterCreateStore, selectedMerit)),
					disabled: $characterCreateStore.merits
						? $characterCreateStore.merits.length === 0 ||
						  isNullOrUndefined($characterCreateStore.merits.find((e) => e.name === selectedMerit))
						: true
				}}
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
										href="{baseUrl}/{merit.name.toLowerCase()}"
										class="underline decoration-dotted"
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
				label="Flaw"
				selectableValues={validFlaws}
				bind:value={selectedFlaw}
				addButton={{
					onClick: () => ($characterCreateStore = addFlaw($characterCreateStore, selectedFlaw)),
					disabled: !isNullOrUndefined(
						$characterCreateStore.flaws?.find((e) => e.name === selectedFlaw)
					)
				}}
				removeButton={{
					onClick: () => ($characterCreateStore = removeFlaw($characterCreateStore, selectedFlaw)),
					disabled: $characterCreateStore.flaws
						? $characterCreateStore.flaws.length === 0 ||
						  isNullOrUndefined($characterCreateStore.flaws.find((e) => e.name === selectedFlaw))
						: true
				}}
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
									<a href="{baseUrl}/{flaw.name.toLowerCase()}" class="underline decoration-dotted">
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
