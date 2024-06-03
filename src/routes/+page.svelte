<script lang="ts">
	import { selectedCharacterIdStore } from '$lib/stores/selectedCharacterIdStore';
	import {
		playerCharacterBase,
		type PlayerCharacterBase
	} from '$lib/zod/classic/playerCharacter/playerCharacterBase';
	import { playerCharacterSelection } from '$lib/zod/classic/playerCharacterSelection/playerCharacterSelection';
	import { onMount } from 'svelte';

	let selectedCharacter: string;
	let selectionValues: { id: string; value: string; name: string }[] = [];

	onMount(async () => {
		await loadCharacters();
	});

	async function loadCharacters() {
		const loadCharacterResponse = await fetch(`/api/classic/loadCharacters`, {
			method: 'POST'
		});

		const loadCharacterResponseParsed = playerCharacterSelection
			.array()
			.parse(await loadCharacterResponse.json());

		loadCharacterResponseParsed.forEach(async (value) => {
			const playerCharacter = await getCharacterNameById(value.id);

			// kein push, da svelte sonst updates nicht mitbekommt
			// siehe https://learn.svelte.dev/tutorial/updating-arrays-and-objects
			selectionValues = [
				...selectionValues,
				{ id: playerCharacter.id, name: playerCharacter.name, value: value.id }
			];

			$selectedCharacterIdStore = selectionValues[0].id;
		});
	}

	async function getCharacterNameById(characterId: string): Promise<PlayerCharacterBase> {
		const apiKeyResponse = await fetch(`/api/classic/character/base?id=${characterId}`);
		const playerCharacterBaseParsed = playerCharacterBase.parse(await apiKeyResponse.json());

		return playerCharacterBaseParsed;
	}

	function setSelectedCharacterStore(id: string) {
		$selectedCharacterIdStore = id;
	}
</script>

<div class="mx-auto max-w-lg">
	<h1 class="h1 text-center">
		<span
			class="bg-gradient-to-br from-black to-red-800 box-decoration-clone bg-clip-text stroke-slate-500 text-center text-transparent dark:from-white dark:to-red-800"
		>
			Character-Sheet
		</span>
	</h1>

	{#if selectionValues.length > 0}
		<hr class="mb-4 mt-4" />
		<div class="grid grid-cols-1 grid-rows-2 gap-2">
			<select
				class="select rounded-none"
				bind:value={selectedCharacter}
				on:change={() => setSelectedCharacterStore(selectedCharacter)}
			>
				{#each selectionValues as entry (entry.id)}
					<option value={entry.value}> {entry.name} </option>
				{/each}
			</select>

			<button class="variant-filled-primary btn rounded-none" type="button">
				<a class="w-full" href={`/classic/sheet/${selectedCharacter}`}> Charakter-Sheet öffnen </a>
			</button>
		</div>
	{/if}

	<div class="grid grid-cols-1 grid-rows-1 gap-2">
		<button class="variant-filled-secondary btn mt-2 rounded-none" type="button">
			<a class="w-full" href="/sheet/create"> Charakter erstellen </a>
		</button>
	</div>
</div>
