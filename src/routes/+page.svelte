<script lang="ts">
	import {
		selectedCharacterIdStoreClassic,
		selectedCharacterIdStoreLotN
	} from '$lib/stores/selectedCharacterIdStore';
	import {
		playerCharacterBase as playerCharacterBaseClassic,
		type PlayerCharacterBase as PlayerCharacterBaseClassic
	} from '$lib/zod/classic/playerCharacter/playerCharacterBase';
	import { playerCharacterSelection } from '$lib/zod/classic/playerCharacterSelection/playerCharacterSelection';
	import {
		playerCharacterBase as playerCharacterBaseLotN,
		type PlayerCharacterBase as PlayerCharacterBaseLotN
	} from '$lib/zod/lotn/playerCharacter/playerCharacterBase';
	import { onMount } from 'svelte';

	let selectedCharacterClassic: string;
	let selectionValuesClassic: { id: string; value: string; name: string }[] = [];
	let selectedCharacterLotN: string;
	let selectionValuesLotN: { id: string; value: string; name: string }[] = [];

	onMount(async () => {
		await loadLotNCharacters();
		await loadClassicCharacters();
	});

	async function loadClassicCharacters() {
		const loadCharacterResponse = await fetch(`/api/classic/loadCharacters`, {
			method: 'POST'
		});

		const loadCharacterResponseParsed = playerCharacterSelection
			.array()
			.parse(await loadCharacterResponse.json());

		loadCharacterResponseParsed.forEach(async (value) => {
			const playerCharacter = await getClassicCharacterNameById(value.id);

			// kein push, da svelte sonst updates nicht mitbekommt
			// siehe https://learn.svelte.dev/tutorial/updating-arrays-and-objects
			selectionValuesClassic = [
				...selectionValuesClassic,
				{ id: playerCharacter.id, name: playerCharacter.name, value: value.id }
			];

			$selectedCharacterIdStoreClassic = selectionValuesClassic[0].id;
		});
	}

	async function getClassicCharacterNameById(
		characterId: string
	): Promise<PlayerCharacterBaseClassic> {
		const apiKeyResponse = await fetch(`/api/classic/character/base?id=${characterId}`);
		const playerCharacterBaseParsed = playerCharacterBaseClassic.parse(await apiKeyResponse.json());

		return playerCharacterBaseParsed;
	}

	function setSelectedCharacterStore(id: string) {
		$selectedCharacterIdStoreClassic = id;
	}

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
				...selectionValuesClassic,
				{ id: playerCharacter.id, name: playerCharacter.name, value: value.id }
			];

			$selectedCharacterIdStoreLotN = selectionValuesClassic[0].id;
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
		<div>
			<h2 class="h2 text-center">Protektorat</h2>
			{#if selectionValuesLotN.length > 0}
				<div class="grid auto-rows-auto grid-cols-1 gap-2">
					<select
						class="select rounded-none"
						bind:value={selectedCharacterLotN}
						on:change={() => setSelectedCharacterStore(selectedCharacterClassic)}
					>
						{#each selectionValuesLotN as entry (entry.id)}
							<option value={entry.value}> {entry.name} </option>
						{/each}
					</select>

					<button class="variant-filled-primary btn rounded-none" type="button">
						<a class="w-full" href={`/lotn/sheet/${selectedCharacterLotN}`}>
							Charakter-Sheet öffnen
						</a>
					</button>
				</div>
			{/if}

			<div class="grid grid-cols-1 grid-rows-1 gap-2">
				<button class="variant-filled-secondary btn mt-2 rounded-none" type="button">
					<a class="w-full" href="/sheet/create"> Charakter erstellen </a>
				</button>
			</div>
		</div>
		<div>
			<h2 class="h2 text-center">Sabbat</h2>
			{#if selectionValuesClassic.length > 0}
				<div class="grid auto-rows-auto grid-cols-1 gap-2">
					<select
						class="select rounded-none"
						bind:value={selectedCharacterClassic}
						on:change={() => setSelectedCharacterStore(selectedCharacterClassic)}
					>
						{#each selectionValuesClassic as entry (entry.id)}
							<option value={entry.value}> {entry.name} </option>
						{/each}
					</select>

					<button class="variant-filled-primary btn rounded-none" type="button">
						<a class="w-full" href={`/classic/sheet/${selectedCharacterClassic}`}>
							Charakter-Sheet öffnen
						</a>
					</button>
				</div>
			{/if}

			<div class="grid grid-cols-1 grid-rows-1 gap-2">
				<button class="variant-filled-secondary btn mt-2 rounded-none" type="button">
					<a class="w-full" href="/sheet/create"> Charakter erstellen </a>
				</button>
			</div>
		</div>
	</div>
</div>
