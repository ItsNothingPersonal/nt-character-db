<script lang="ts">
	import { isNullOrUndefined, typedObjectKeys } from '$lib/util';
	import { addFlaw, maxFlaws, removeFlaw } from '$lib/validation/mutations/flaws';
	import { addMerit, maxMerits, removeMerit } from '$lib/validation/mutations/merits';
	import { flawName, type FlawName } from '$lib/zod/enums/flawName';
	import { meritName, type MeritName } from '$lib/zod/enums/meritName';
	import type { PlayerCharacterCreate } from '$lib/zod/playerCharacter/playerCharacter';
	import { Step } from '@skeletonlabs/skeleton';

	export let playerCharacter: PlayerCharacterCreate;

	const baseUrl = 'https://vamp.bynightstudios.com/vampire/disciplines';
	const validMerits = typedObjectKeys(meritName.Values);
	const validFlaws = typedObjectKeys(flawName.Values);

	let selectedMerit: MeritName;
	let selectedFlaw: FlawName;

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
			<label>
				Merits
				<select class="select rounded-none" bind:value={selectedMerit}>
					{#each validMerits as merit}
						<option value={merit}>{merit}</option>
					{/each}
				</select>
			</label>
			<button
				type="button"
				class="variant-filled btn rounded-none"
				on:click={() => (playerCharacter = addMerit(playerCharacter, selectedMerit))}
				disabled={!isNullOrUndefined(playerCharacter.merits?.find((e) => e.name === selectedMerit))}
			>
				Add Merit
			</button>
			<button
				type="button"
				class="variant-filled btn col-start-1 row-start-2 rounded-none"
				on:click={() => (playerCharacter = removeMerit(playerCharacter, selectedMerit))}
				disabled={playerCharacter.merits
					? playerCharacter.merits.length === 0 ||
					  isNullOrUndefined(playerCharacter.merits.find((e) => e.name === selectedMerit))
					: true}
			>
				Remove Merit
			</button>

			{#if playerCharacter.merits && playerCharacter.merits.length > 0}
				<div class="card mt-4 rounded-none">
					<header class="card-header">
						<h4 class="h4">Merits</h4>
					</header>
					<section class="p-4">
						<ul>
							{#each playerCharacter.merits as merit}
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
			<label>
				Flaws
				<select class="select rounded-none" bind:value={selectedFlaw}>
					{#each validFlaws as flaw}
						<option value={flaw}>{flaw}</option>
					{/each}
				</select>
			</label>
			<button
				type="button"
				class="variant-filled btn rounded-none"
				on:click={() => (playerCharacter = addFlaw(playerCharacter, selectedFlaw))}
				disabled={!isNullOrUndefined(playerCharacter.flaws?.find((e) => e.name === selectedFlaw))}
			>
				Add Flaw
			</button>
			<button
				type="button"
				class="variant-filled btn col-start-1 row-start-2 rounded-none"
				on:click={() => (playerCharacter = removeFlaw(playerCharacter, selectedFlaw))}
				disabled={playerCharacter.flaws
					? playerCharacter.flaws.length === 0 ||
					  isNullOrUndefined(playerCharacter.flaws.find((e) => e.name === selectedFlaw))
					: true}
			>
				Remove Flaw
			</button>

			{#if playerCharacter.flaws && playerCharacter.flaws.length > 0}
				<div class="card mt-4 rounded-none">
					<header class="card-header">
						<h4 class="h4">Flaws</h4>
					</header>
					<section class="p-4">
						<ul>
							{#each playerCharacter.flaws as flaw}
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
