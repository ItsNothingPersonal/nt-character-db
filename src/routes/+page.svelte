<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import { playerCharacterSelectionStore } from '$lib/stores/selectionStore';
	import type { SubmitFunction } from '@sveltejs/kit';

	let isSubmitting = false;

	const submitForm: SubmitFunction = () => {
		isSubmitting = true;

		return async ({ result }) => {
			if (result.type === 'success') {
				playerCharacterSelectionStore.update((store) => {
					const edit = store.drafts?.find((draft) => draft.id === result.data?.characterId);
					if (edit) {
						edit.status = result.data?.type;
					}
					return store;
				});
			}

			await applyAction(result);

			isSubmitting = false;
		};
	};
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
						<th>Actions</th>
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
							<td>
								<a class="text-lg" href={`/lotn/sheet/${entry.id}`}>
									{entry.clan}
								</a>
							</td>
							<td>
								<a class="text-lg capitalize" href={`/lotn/sheet/${entry.id}`}>
									{entry.status}
								</a>
							</td>
							<td class="flex gap-2">
								<form action="?/reviewCharacter" method="POST" use:enhance={submitForm}>
									<input name="characterId" type="hidden" value={entry.id} />
									<button
										class="variant-filled-primary btn rounded-lg"
										disabled={isSubmitting}
										type="submit"
									>
										Review
									</button>
								</form>
								<form action="?/archiveCharacter" method="POST" use:enhance={submitForm}>
									<input name="characterId" type="hidden" value={entry.id} />
									<button
										class="variant-filled-primary btn rounded-lg"
										disabled={isSubmitting}
										type="submit"
									>
										Archive
									</button>
								</form>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	{/if}

	<div class="grid grid-cols-1 grid-rows-1 gap-2">
		<a
			class="variant-filled-primary btn mt-2 rounded-lg"
			href="/lotn/sheet/create/step_01"
			type="button"
		>
			Charakter erstellen
		</a>
	</div>
</div>
