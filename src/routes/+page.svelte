<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import { downloadCharacterSheet } from '$lib/pdfUtils';
	import { characterCreationStore } from '$lib/stores/characterCreationStore';
	import { pdfOptionsStore } from '$lib/stores/pdfOptionsStore';
	import { playerCharacterSelectionStore } from '$lib/stores/selectionStore';
	import type { PlayerCharacterSelection } from '$lib/zod/lotn/types/playerCharacterSelection';
	import { Accordion, AccordionItem, popup } from '@skeletonlabs/skeleton';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { onMount } from 'svelte';
	import { get, writable, type Writable } from 'svelte/store';

	let isSubmitting = false;
	const selectedCharacter: Writable<PlayerCharacterSelection | undefined> = writable(undefined);
	let templates: string[] = [];
	let unsubscribe: () => void;

	const submitForm: SubmitFunction = () => {
		isSubmitting = true;

		return async ({ result }) => {
			if (result.type === 'success') {
				playerCharacterSelectionStore.update((store) => {
					store.characters = undefined;
					store.drafts = undefined;
					return store;
				});
			}

			await applyAction(result);
			invalidateAll();
			isSubmitting = false;
		};
	};

	onMount(() => {
		unsubscribe = pdfOptionsStore.subscribe(async () => {
			const response = await fetch(`/api/lotn/pdf?color=${$pdfOptionsStore.color}`);
			const { templates: newTemplates } = await response.json();
			templates = newTemplates;
		});

		return () => {
			unsubscribe?.();
		};
	});

	function toggleColor() {
		pdfOptionsStore.update((store) => {
			store.color = !store.color;
			return store;
		});
	}
</script>

<div class="mx-auto max-w-2xl">
	<h1
		class="font-comorantBold h1 mb-4 bg-gradient-to-br from-black to-red-800 box-decoration-clone bg-clip-text stroke-slate-500 text-center font-bold text-transparent dark:from-white dark:to-red-800"
	>
		Character-Sheet
	</h1>

	<Accordion autocollapse>
		{#if $playerCharacterSelectionStore.characters}
			<AccordionItem open rounded="container rounded-lg !px-0" spacing="space-y-1">
				<svelte:fragment slot="summary">
					<h2 class="h2">Accepted</h2>
				</svelte:fragment>
				<svelte:fragment slot="content">
					<div class="table-container mb-6 rounded-lg">
						<table class="table table-hover rounded-lg">
							<thead>
								<tr>
									<th class="w-1/3">Name</th>
									<th class="w-1/3">Clan</th>
									<th class="w-1/4">Project</th>
									<th class="w-auto">Actions</th>
								</tr>
							</thead>
							<tbody>
								{#each $playerCharacterSelectionStore.characters as entry}
									<tr>
										<td>
											<a class="text-lg" href={`/lotn/sheet/${entry.id}`}>
												{entry.name}
											</a>
										</td>
										<td>
											<a
												class="whitespace-nowrap text-nowrap text-lg"
												href={`/lotn/sheet/${entry.id}`}
											>
												{entry.clan}
											</a>
										</td>
										<td>
											<a class="text-lg" href={`/lotn/sheet/${entry.id}`}>
												{entry.project}
											</a>
										</td>
										<td class="w-fit whitespace-nowrap">
											<div class="flex gap-2">
												<form action="?/archiveCharacter" method="POST" use:enhance={submitForm}>
													<input name="characterId" type="hidden" value={entry.id} />
													<button
														class="variant-filled-primary btn h-full rounded-lg"
														disabled={isSubmitting}
														type="submit"
													>
														Archive
													</button>
												</form>
												<button
													class="variant-filled-primary btn rounded-lg p-1"
													disabled={isSubmitting}
													on:click={() => selectedCharacter.set(entry)}
													use:popup={{
														event: 'click',
														target: 'popupHover-pdf',
														placement: 'bottom'
													}}
												>
													<iconify-icon height="40" icon="carbon:generate-pdf" width="40" />
												</button>
											</div>
										</td>
									</tr>
								{/each}
							</tbody>
						</table>
					</div>
				</svelte:fragment>
			</AccordionItem>
		{/if}
		{#if $playerCharacterSelectionStore.drafts}
			{#if $playerCharacterSelectionStore.drafts.filter((d) => d.status === 'draft').length > 0}
				<AccordionItem rounded="container rounded-lg !px-0" spacing="space-y-2">
					<svelte:fragment slot="summary">
						<h2 class="h2">Drafts</h2>
					</svelte:fragment>
					<svelte:fragment slot="content">
						<div class="table-container rounded-lg">
							<table class="table table-hover rounded-lg">
								<thead>
									<tr>
										<th class="w-1/3">Name</th>
										<th class="w-1/3">Clan</th>
										<th class="w-1/4">Project</th>
										<th class="w-auto">Actions</th>
									</tr>
								</thead>
								<tbody>
									{#each $playerCharacterSelectionStore.drafts.filter((d) => d.status === 'draft') as entry}
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
												<a class="text-lg" href={`/lotn/sheet/${entry.id}`}>
													{entry.project}
												</a>
											</td>
											<td class="w-fit whitespace-nowrap">
												<div class="flex gap-2">
													<form action="?/reviewCharacter" method="POST" use:enhance={submitForm}>
														<input name="characterId" type="hidden" value={entry.id} />
														<button
															class="variant-filled-primary btn h-full rounded-lg"
															disabled={isSubmitting}
															type="submit"
														>
															Review
														</button>
													</form>
													<form action="?/archiveCharacter" method="POST" use:enhance={submitForm}>
														<input name="characterId" type="hidden" value={entry.id} />
														<button
															class="variant-filled-primary btn h-full rounded-lg"
															disabled={isSubmitting}
															type="submit"
														>
															Archive
														</button>
													</form>
													<button
														class="variant-filled-primary btn rounded-lg p-1"
														disabled={isSubmitting}
														on:click={() => selectedCharacter.set(entry)}
														use:popup={{
															event: 'click',
															target: 'popupHover-pdf',
															placement: 'bottom'
														}}
													>
														<iconify-icon height="40" icon="carbon:generate-pdf" width="40" />
													</button>
												</div>
											</td>
										</tr>
									{/each}
								</tbody>
							</table>
						</div>
					</svelte:fragment>
				</AccordionItem>
			{/if}
			{#if $playerCharacterSelectionStore.drafts.filter((d) => d.status === 'review').length > 0}
				<AccordionItem rounded="container rounded-lg !px-0" spacing="space-y-2">
					<svelte:fragment slot="summary">
						<h2 class="h2">Reviews</h2>
					</svelte:fragment>
					<svelte:fragment slot="content">
						<div class="table-container rounded-lg">
							<table class="table table-hover rounded-lg">
								<thead>
									<tr>
										<th class="w-1/3">Name</th>
										<th class="w-1/3">Clan</th>
										<th class="w-1/4">Project</th>
										<th class="w-auto">Actions</th>
									</tr>
								</thead>
								<tbody>
									{#each $playerCharacterSelectionStore.drafts.filter((d) => d.status === 'review') as entry}
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
												<a class="text-lg" href={`/lotn/sheet/${entry.id}`}>
													{entry.project}
												</a>
											</td>
											<td class="w-fit whitespace-nowrap">
												<div class="flex gap-2">
													<form action="?/archiveCharacter" method="POST" use:enhance={submitForm}>
														<input name="characterId" type="hidden" value={entry.id} />
														<button
															class="variant-filled-primary btn h-full rounded-lg"
															disabled={isSubmitting}
															type="submit"
														>
															Archive
														</button>
													</form>
													<button
														class="variant-filled-primary btn rounded-lg p-1"
														disabled={isSubmitting}
														on:click={() => selectedCharacter.set(entry)}
														use:popup={{
															event: 'click',
															target: 'popupHover-pdf',
															placement: 'bottom'
														}}
													>
														<iconify-icon height="40" icon="carbon:generate-pdf" width="40" />
													</button>
												</div>
											</td>
										</tr>
									{/each}
								</tbody>
							</table>
						</div>
					</svelte:fragment>
				</AccordionItem>
			{/if}
			{#if $playerCharacterSelectionStore.drafts.filter((d) => d.status === 'rejected').length > 0}
				<AccordionItem rounded="container rounded-lg !px-0" spacing="space-y-2">
					<svelte:fragment slot="summary">
						<h2 class="h2">Rejected</h2>
					</svelte:fragment>
					<svelte:fragment slot="content">
						<div class="table-container rounded-lg">
							<table class="table table-hover rounded-lg">
								<thead>
									<tr>
										<th class="w-1/3">Name</th>
										<th class="w-1/3">Clan</th>
										<th class="w-1/4">Project</th>
										<th class="w-auto">Actions</th>
									</tr>
								</thead>
								<tbody>
									{#each $playerCharacterSelectionStore.drafts.filter((d) => d.status === 'rejected') as entry}
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
												<a class="text-lg" href={`/lotn/sheet/${entry.id}`}>
													{entry.project}
												</a>
											</td>
											<td class="w-fit whitespace-nowrap">
												<div class="flex gap-2">
													<form action="?/archiveCharacter" method="POST" use:enhance={submitForm}>
														<input name="characterId" type="hidden" value={entry.id} />
														<button
															class="variant-filled-primary btn h-full rounded-lg"
															disabled={isSubmitting}
															type="submit"
														>
															Archive
														</button>
													</form>
													<button
														class="variant-filled-primary btn rounded-lg p-1"
														disabled={isSubmitting}
														on:click={() => selectedCharacter.set(entry)}
														use:popup={{
															event: 'click',
															target: 'popupHover-pdf',
															placement: 'bottom'
														}}
													>
														<iconify-icon height="40" icon="carbon:generate-pdf" width="40" />
													</button>
												</div>
											</td>
										</tr>
									{/each}
								</tbody>
							</table>
						</div>
					</svelte:fragment>
				</AccordionItem>
			{/if}
			{#if $playerCharacterSelectionStore.drafts.filter((d) => d.status === 'archived').length > 0}
				<AccordionItem rounded="container rounded-lg !px-0" spacing="space-y-2">
					<svelte:fragment slot="summary">
						<h2 class="h2">Archived</h2>
					</svelte:fragment>
					<svelte:fragment slot="content">
						<div class="table-container rounded-lg">
							<table class="table table-hover rounded-lg">
								<thead>
									<tr>
										<th class="w-1/3">Name</th>
										<th class="w-1/3">Clan</th>
										<th class="w-1/4">Project</th>
										<th class="w-auto">Actions</th>
									</tr>
								</thead>
								<tbody>
									{#each $playerCharacterSelectionStore.drafts.filter((d) => d.status === 'archived') as entry}
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
												<a class="text-lg" href={`/lotn/sheet/${entry.id}`}>
													{entry.project}
												</a>
											</td>
											<td class="w-fit whitespace-nowrap">
												<button
													class="variant-filled-primary btn rounded-lg p-1"
													disabled={isSubmitting}
													on:click={() => selectedCharacter.set(entry)}
													use:popup={{
														event: 'click',
														target: 'popupHover-pdf',
														placement: 'bottom'
													}}
												>
													<iconify-icon height="40" icon="carbon:generate-pdf" width="40" />
												</button>
											</td>
										</tr>
									{/each}
								</tbody>
							</table>
						</div>
					</svelte:fragment>
				</AccordionItem>
			{/if}
		{/if}
	</Accordion>

	<div class="grid grid-cols-1 grid-rows-1 gap-2">
		{#if get(characterCreationStore).project}
			<a
				class="variant-filled-primary btn mt-2 rounded-lg"
				href="/lotn/sheet/create/step_01"
				type="button"
			>
				Charakter erstellen
			</a>
		{:else}
			<a
				class="variant-filled-primary btn mt-2 rounded-lg"
				href="/lotn/sheet/create/step_00"
				type="button"
			>
				Charakter erstellen
			</a>
		{/if}
	</div>
</div>

<div class="card variant-filled max-w-lg rounded-lg p-4" data-popup="popupHover-pdf">
	<div class="flex flex-col gap-2">
		<label class="label">
			Color:
			<input
				class="checkbox"
				checked={$pdfOptionsStore.color}
				type="checkbox"
				on:change={() => {
					toggleColor();
				}}
			/>
		</label>
		<label>
			PDF-Template
			<select
				class="select variant-form-material rounded-lg"
				disabled={templates?.length <= 0}
				bind:value={$pdfOptionsStore.pdfName}
			>
				<option disabled selected>Select a pdf template</option>
				{#if templates?.length > 0}
					{#each templates as pdf}
						<option class="!variant-form-material" value={pdf}>{pdf}</option>
					{/each}
				{/if}
			</select>
		</label>
		<button
			id="will-close"
			class="variant-filled-primary btn rounded-lg"
			disabled={!$pdfOptionsStore.pdfName}
			on:click={() =>
				downloadCharacterSheet(
					$selectedCharacter?.id,
					$pdfOptionsStore.color,
					$pdfOptionsStore.pdfName
				)}
		>
			Download
		</button>
	</div>
</div>
