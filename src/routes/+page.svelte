<script lang="ts">
	import { selectedCharacterIdStoreLotN } from '$lib/stores/selectedCharacterIdStore';
	import { playerCharacterSelection } from '$lib/zod/classic/playerCharacterSelection/playerCharacterSelection';
	import {
		playerCharacterBase as playerCharacterBaseLotN,
		type PlayerCharacterBase as PlayerCharacterBaseLotN
	} from '$lib/zod/lotn/playerCharacter/playerCharacterBase';
	import { onMount } from 'svelte';

	let selectionValuesLotN: { id: string; value: string; name: string }[] = [];

	onMount(async () => {
		await loadLotNCharacters();
	});

	async function loadLotNCharacters() {
		const loadCharacterResponse = await fetch(`/api/lotn/loadCharacters`, {
			method: 'POST'
		});

		const loadCharacterResponseParsed = playerCharacterSelection
			.array()
			.parse(await loadCharacterResponse.json());

		loadCharacterResponseParsed.forEach(async (value) => {
			const playerCharacter = await getLotNCharacterNameById(value.id);

			// kein push, da svelte sonst updates nicht mitbekommt
			// siehe https://learn.svelte.dev/tutorial/updating-arrays-and-objects
			selectionValuesLotN = [
				...selectionValuesLotN,
				{ id: playerCharacter.id, name: playerCharacter.name, value: value.id }
			];

			$selectedCharacterIdStoreLotN = selectionValuesLotN[0].id;
		});
	}

	async function getLotNCharacterNameById(characterId: string): Promise<PlayerCharacterBaseLotN> {
		const apiKeyResponse = await fetch(`/api/lotn/character/base?id=${characterId}`);
		const playerCharacterBaseParsed = playerCharacterBaseLotN.parse(await apiKeyResponse.json());

		return playerCharacterBaseParsed;
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

	<hr class="mb-4 mt-4" />
	<div class="flex flex-row justify-center gap-4">
		<div class="flex w-full flex-col gap-2">
			<h2 class="h2 text-center">Protektorat</h2>

			{#each selectionValuesLotN as entry}
				<a
					class="variant-filled-primary btn rounded-none"
					href={`/lotn/sheet/${entry.id}`}
					type="button">{entry.name}</a
				>
			{/each}

			<div class="grid grid-cols-1 grid-rows-1 gap-2">
				<button class="variant-filled-secondary btn mt-2 rounded-none" type="button">
					<a class="w-full" href="/sheet/create"> Charakter erstellen </a>
				</button>
			</div>
		</div>
	</div>
</div>
