<script lang="ts">
	import { apiKeyStore } from '$lib/stores/apiKeyStore';
	import { selectedCharacterIdStore } from '$lib/stores/selectedCharacterIdStore';
	import { isNullOrUndefined } from '$lib/util';
	import { apiKeyMapping } from '$lib/zod/apiKeyMapping';
	import type { ApiKeyRequestBody } from '$lib/zod/apiKeyRequestBody';
	import { playerCharacterBase, type PlayerCharacterBase } from '$lib/zod/playerCharacterBase';

	let selectedCharacter: string;
	let selectionValues: { id: string; value: string; name: string }[] = [];

	async function loadCharacters(apiKey: string | undefined) {
		if (isNullOrUndefined(apiKey) || apiKey.trim().length === 0) {
			return;
		}

		const requestBody: ApiKeyRequestBody = { apiKey };
		const apiKeyResponse = await fetch(`/api/apiKeyMapping`, {
			method: 'POST',
			body: JSON.stringify(requestBody)
		});

		const apiKeyResponseParsed = apiKeyMapping.parse(await apiKeyResponse.json());

		$apiKeyStore = apiKey;
		apiKeyResponseParsed.characters.forEach(async (value) => {
			const playerCharacter = await getCharacterNameById(value);

			// kein push, da svelte sonst updates nicht mitbekommt
			// siehe https://learn.svelte.dev/tutorial/updating-arrays-and-objects
			selectionValues = [
				...selectionValues,
				{ id: playerCharacter.id, name: playerCharacter.name, value }
			];

			$selectedCharacterIdStore = selectionValues[0].id;
		});
	}

	async function getCharacterNameById(characterId: string): Promise<PlayerCharacterBase> {
		const apiKeyResponse = await fetch(`/api/character/base?id=${characterId}`);
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
			class="bg-gradient-to-br from-red-500 to-black box-decoration-clone bg-clip-text text-center text-transparent"
		>
			Character-Sheet
		</span>
	</h1>

	<div class="mt-6 grid grid-cols-1 grid-rows-2 gap-2">
		<input class="input variant-form-material" bind:value={$apiKeyStore} />
		<button
			type="button"
			class="variant-filled btn rounded-none"
			on:click={() => loadCharacters($apiKeyStore)}
		>
			Verfügbare Charaktere laden
		</button>
	</div>

	{#if selectionValues.length > 0}
		<hr class="mb-4 mt-4" />
		<div class="grid grid-cols-1 grid-rows-2 gap-2">
			<select
				class="select"
				bind:value={selectedCharacter}
				on:change={() => setSelectedCharacterStore(selectedCharacter)}
			>
				{#each selectionValues as entry (entry.id)}
					<option value={entry.value}>{entry.name}</option>
				{/each}
			</select>

			<button type="button" class="variant-filled btn rounded-none">
				<a href={`/sheet/${selectedCharacter}`} class="w-full"> Charakter-Sheet öffnen </a>
			</button>
		</div>
	{/if}
</div>
