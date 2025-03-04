<script lang="ts">
	import { enhance } from '$app/forms';
	import { detectTouchscreen, isDesktopSize } from '$lib/util.js';
	import { changeTypeName, type ChangeTypeName } from '$lib/zod/lotn/enums/changeTypeName';
	import { popup } from '@skeletonlabs/skeleton';
	import { writable } from 'svelte/store';

	export let data;

	let innerWidth = 0;
	let xpToGive = 0;
	let reason = '';
	let type: ChangeTypeName = 'add';

	const selectedCharacters = writable<string[]>([]);

	function toggleSelectedCharacter(characterId: string) {
		selectedCharacters.update((store) => {
			if (store.includes(characterId)) {
				store = store.filter((id) => id !== characterId);
				return store;
			}
			store.push(characterId);
			return store;
		});
	}
</script>

<svelte:window bind:innerWidth />

<div class="mb-2 flex justify-between">
	<h1 class="h1">Charakter-Übersicht</h1>
	<button
		class={`variant-filled-primary btn rounded-lg ${!isDesktopSize(innerWidth) ? 'max-w-10' : ''}`}
		disabled={$selectedCharacters.length === 0}
		use:popup={{
			event: 'click',
			target: 'popupHover-experience',
			placement: 'bottom'
		}}
	>
		{#if isDesktopSize(innerWidth)}
			Change Experience
		{:else}
			<iconify-icon height="28" icon="mdi:edit" />
		{/if}
	</button>
</div>
<div class="table-container mb-6 rounded-lg">
	<table class="table table-hover rounded-lg">
		<thead>
			<tr>
				<th>Select</th>
				<th>Name</th>
				{#if isDesktopSize(innerWidth) || !detectTouchscreen()}
					<th>Clan</th>
					<th>Status</th>
				{/if}
				<th>Username</th>
				<th>{isDesktopSize(innerWidth) ? 'Actions' : ''}</th>
			</tr>
		</thead>
		<tbody>
			{#each data.charactersAccepted ?? [] as entry}
				<tr>
					<td class={!isDesktopSize(innerWidth) || detectTouchscreen() ? 'max-w-10' : ''}>
						<input
							class="checkbox"
							checked={$selectedCharacters.includes(entry.id)}
							type="checkbox"
							on:change={() => {
								toggleSelectedCharacter(entry.id);
							}}
						/>
					</td>
					<td class={!isDesktopSize(innerWidth) || detectTouchscreen() ? 'max-w-10' : ''}>
						<a class="text-wrap text-lg" href={`/lotn/sheet/${entry.id}`}>
							{entry.name}
						</a>
					</td>
					{#if isDesktopSize(innerWidth) || !detectTouchscreen()}
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
					{/if}
					<td>
						<a class="text-lg capitalize" href={`/lotn/sheet/${entry.id}`}>
							{entry.username}
						</a>
					</td>
					<td class="flex gap-2">
						<form action="?/archiveCharacter" method="POST" use:enhance>
							<input name="characterId" type="hidden" value={entry.id} />

							<button
								class={`variant-filled-primary btn rounded-lg ${!isDesktopSize(innerWidth) ? 'max-w-10' : ''}`}
								type="submit"
							>
								{#if isDesktopSize(innerWidth)}
									Archive
								{:else}
									<iconify-icon height="28" icon="mdi:archive" />
								{/if}
							</button>
						</form>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<div class="card variant-filled max-w-lg rounded-lg p-4" data-popup="popupHover-experience">
	<form
		class="grid grid-cols-1 grid-rows-[1fr_1fr_1fr_auto] gap-2"
		action="?/giveExperience"
		method="POST"
		use:enhance={() => {
			return async ({ result }) => {
				if (result.type === 'success') {
					selectedCharacters.set([]);
					xpToGive = 0;
					reason = '';
				}
			};
		}}
	>
		<p>
			You can set an amount of experience points and a reason to hand out to every currently
			selected player.
		</p>
		<input name="selectedCharacters" type="hidden" value={JSON.stringify($selectedCharacters)} />

		<label class="label">
			<span>Amount of Experience</span>
			<input
				name="amountExp"
				class="input variant-form-material"
				required
				type="number"
				bind:value={xpToGive}
			/>
		</label>

		<label class="label">
			<span>Type</span>
			<select
				name="typeExp"
				class="select variant-form-material rounded-lg capitalize"
				bind:value={type}
			>
				{#each changeTypeName.options as typeName}
					<option
						class="!variant-form-material capitalize"
						selected={typeName === type}
						value={typeName}
					>
						{typeName}
					</option>
				{/each}
			</select>
		</label>

		<label class="label">
			<span>Reason</span>
			<input
				name="reasonExp"
				class="input variant-form-material"
				required
				type="text"
				bind:value={reason}
			/>
		</label>
		<button
			id="will-close"
			class="variant-filled-primary btn rounded-lg"
			disabled={$selectedCharacters.length === 0 || !xpToGive || !reason}
			type="submit"
		>
			Save
		</button>

		<div class="variant-filled arrow" />
	</form>
</div>
