<script lang="ts">
	import { playerCharacterSelectionStore } from '$lib/stores/selectionStore';
</script>

<div class="mx-auto max-w-lg">
	<h1
		class="font-comorantBold h1 mb-4 bg-gradient-to-br from-black to-red-800 box-decoration-clone bg-clip-text stroke-slate-500 text-center font-bold text-transparent dark:from-white dark:to-red-800"
	>
		Character-Sheet
	</h1>
	<div class="table-container mb-6 rounded-lg">
		<table class="table table-hover rounded-lg">
			<thead>
				<tr>
					<th>Name</th>
					<th>Clan</th>
					<th>Status</th>
				</tr>
			</thead>
			<tbody>
				{#each $playerCharacterSelectionStore.characters ?? [] as entry}
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

	{#if ($playerCharacterSelectionStore.drafts ?? []).length > 0}
		<h2
			class="font-comorantBold h2 mb-4 bg-gradient-to-br from-black to-red-800 box-decoration-clone bg-clip-text stroke-slate-500 text-center font-bold text-transparent dark:from-white dark:to-red-800"
		>
			Entwürfe
		</h2>

		<div class="table-container rounded-lg">
			<table class="table table-hover rounded-lg">
				<thead>
					<tr>
						<th>Name</th>
						<th>Clan</th>
						<th>Status</th>
					</tr>
				</thead>
				<tbody>
					{#each $playerCharacterSelectionStore.drafts ?? [] as entry}
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
		<a
			class="variant-filled-secondary btn mt-2 rounded-lg"
			href="/lotn/sheet/create/step_01"
			type="button"
		>
			Charakter erstellen
		</a>
	</div>
</div>
