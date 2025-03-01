<script lang="ts">
	import { enhance } from '$app/forms';
	import { detectTouchscreen, isDesktopSize } from '$lib/util.js';

	export let data;

	let innerWidth = 0;
</script>

<svelte:window bind:innerWidth />

<h1 class="h1">Review</h1>
<div class="table-container mb-6 rounded-lg">
	<table class="table table-hover rounded-lg">
		<thead>
			<tr>
				<th>Name</th>
				{#if isDesktopSize(innerWidth) || !detectTouchscreen()}
					<th>Clan</th>
					<th>Status</th>
				{/if}
				<th>Username</th>
				<th>Actions</th>
			</tr>
		</thead>
		<tbody>
			{#each data.charactersReview ?? [] as entry}
				<tr>
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
						<form action="?/acceptCharacter" method="POST" use:enhance>
							<input name="characterId" type="hidden" value={entry.id} />
							<button
								class={`variant-filled-primary btn rounded-lg ${!isDesktopSize(innerWidth) ? 'max-w-10' : ''}`}
								type="submit"
							>
								{#if isDesktopSize(innerWidth)}
									Accept
								{:else}
									<iconify-icon height="28" icon="mdi:plus" />
								{/if}
							</button>
						</form>

						<form action="?/rejectCharacter" method="POST" use:enhance>
							<input name="characterId" type="hidden" value={entry.id} />
							<button
								class={`variant-filled-primary btn rounded-lg ${!isDesktopSize(innerWidth) ? 'max-w-10' : ''}`}
								type="submit"
							>
								{#if isDesktopSize(innerWidth)}
									Reject
								{:else}
									<iconify-icon height="28" icon="mdi:remove" />
								{/if}
							</button>
						</form>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<h1 class="h1">Accepted</h1>
<div class="table-container mb-6 rounded-lg">
	<table class="table table-hover rounded-lg">
		<thead>
			<tr>
				<th>Name</th>
				{#if isDesktopSize(innerWidth) || !detectTouchscreen()}
					<th>Clan</th>
					<th>Status</th>
				{/if}
				<th>Username</th>
				<th>Actions</th>
			</tr>
		</thead>
		<tbody>
			{#each data.charactersAccepted ?? [] as entry}
				<tr>
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
