<script lang="ts">
	import { selectedCharacterIdStoreLotN } from '$lib/stores/selectedCharacterIdStore';
	import {
		playerCharacterSelection,
		type PlayerCharacterSelection
	} from '$lib/zod/lotn/types/playerCharacterSelection';
	import { onMount } from 'svelte';

	let selectionValuesLotN: PlayerCharacterSelection[] = [];
	let selectionDraftValuesLotN: PlayerCharacterSelection[] = [];

	onMount(async () => {
		await loadLotNCharacters();
		await loadLotNDrafts();
	});

	async function loadLotNCharacters() {
		const loadCharacterResponse = await fetch(`/api/lotn/loadCharacters`, {
			method: 'POST'
		});

		selectionValuesLotN = playerCharacterSelection
			.array()
			.parse(await loadCharacterResponse.json());

		$selectedCharacterIdStoreLotN = selectionValuesLotN[0].id;
	}

	async function loadLotNDrafts() {
		const loadCharacterResponse = await fetch(`/api/lotn/loadDrafts`, {
			method: 'POST'
		});

		selectionDraftValuesLotN = playerCharacterSelection
			.array()
			.parse(await loadCharacterResponse.json());
	}
</script>

<div class="mx-auto max-w-lg">
	<h1
		class="font-comorantBold h1 mb-4 bg-gradient-to-br from-black to-red-800 box-decoration-clone bg-clip-text stroke-slate-500 text-center font-bold text-transparent dark:from-white dark:to-red-800"
	>
		Character-Sheet
	</h1>
	<div class="table-container mb-6 rounded-lg">
		<!-- Native Table Element -->
		<table class="table table-hover rounded-lg">
			<thead>
				<tr>
					<th>Name</th>
					<th>Clan</th>
					<th>Status</th>
				</tr>
			</thead>
			<tbody>
				{#each selectionValuesLotN as entry}
					<tr>
						<td>
							<a class="text-lg" href={`/lotn/sheet/${entry.id}`}>
								{entry.name}
							</a>
						</td>
						<td><a class="text-lg" href={`/lotn/sheet/${entry.id}`}>{entry.clan}</a></td>
						<td>
							<a class="text-lg capitalize" href={`/lotn/sheet/${entry.id}`}>{entry.status}</a>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>

	{#if selectionDraftValuesLotN.length > 0}
		<h2
			class="font-comorantBold h2 mb-4 bg-gradient-to-br from-black to-red-800 box-decoration-clone bg-clip-text stroke-slate-500 text-center font-bold text-transparent dark:from-white dark:to-red-800"
		>
			Entwürfe
		</h2>

		<div class="table-container rounded-lg">
			<!-- Native Table Element -->
			<table class="table table-hover rounded-lg">
				<thead>
					<tr>
						<th>Name</th>
						<th>Clan</th>
						<th>Status</th>
					</tr>
				</thead>
				<tbody>
					{#each selectionDraftValuesLotN as entry}
						<tr>
							<td>
								<a class="text-lg" href={`/lotn/sheet/${entry.id}`}>
									{entry.name}
								</a>
							</td>
							<td><a class="text-lg" href={`/lotn/sheet/${entry.id}`}>{entry.clan}</a></td>
							<td>
								<a class="text-lg capitalize" href={`/lotn/sheet/${entry.id}`}>{entry.status}</a>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	{/if}

	<div class="grid grid-cols-1 grid-rows-1 gap-2">
		<button class="variant-filled-secondary btn mt-2 rounded-none" disabled type="button">
			Charakter erstellen
		</button>
	</div>
</div>
