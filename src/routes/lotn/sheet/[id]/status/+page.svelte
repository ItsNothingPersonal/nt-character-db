<script lang="ts">
	import { characterStore } from '$lib/components/lotn/characterSheet/characterStore';
	import Tracker from '$lib/components/lotn/trackers/tracker/tracker.svelte';
	import HttpStatusCode from '$lib/httpStatusCode';
	import { playerCharacterSelectionStore } from '$lib/stores/selectionStore';
	import type { SectName } from '$lib/zod/lotn/enums/sectName';
	import { statusChange, type StatusChange } from '$lib/zod/lotn/enums/statusChange';
	import { playerCharacterName } from '$lib/zod/lotn/playerCharacter/playerCharacterName';
	import { error } from '@sveltejs/kit';
	import { z } from 'zod';

	let selectedNameId: string | undefined = undefined;
	let selectedStatusOption: StatusChange | undefined = undefined;
	$: isSubmitDisabled =
		selectedNameId === undefined ||
		selectedStatusOption === undefined ||
		checkIfNameAlreadyPresent();

	async function getCharacterName(id: string) {
		const playerCharacterBaseDB = await fetch(`/api/lotn/character/name?id=${id}`);

		if (playerCharacterBaseDB.status !== HttpStatusCode.OK) {
			error(
				HttpStatusCode.INTERNAL_SERVER_ERROR,
				'LotN-Charakter konnte in Datenbank nicht gefunden werden'
			);
		}

		return playerCharacterBaseDB.json();
	}

	async function loadNames() {
		const playerNamesDB = await fetch(`/api/lotn/loadNames`);

		if (playerNamesDB.status !== HttpStatusCode.OK) {
			error(
				HttpStatusCode.INTERNAL_SERVER_ERROR,
				'LotN-Charakter konnte in Datenbank nicht gefunden werden'
			);
		}

		const playerCharacterNames = playerCharacterName
			.merge(z.object({ character_id: z.string() }))
			.array()
			.parse(await playerNamesDB.json());

		const allCharacters = $playerCharacterSelectionStore.characters?.concat(
			$playerCharacterSelectionStore.drafts ?? []
		);

		return playerCharacterNames.filter((e) => !allCharacters?.find((s) => s.id === e.character_id));
	}

	function checkIfNameAlreadyPresent() {
		if (!selectedStatusOption) return false;

		switch (selectedStatusOption) {
			case 'Support':
				return (
					$characterStore.characterStatus?.some((e) =>
						selectedNameId ? e.support?.includes(selectedNameId) : false
					) ?? false
				);
			case 'Opposition':
				return (
					$characterStore.characterStatus?.some((e) =>
						selectedNameId ? e.opposition?.includes(selectedNameId) : false
					) ?? false
				);
		}
	}

	function doesStatusRise(sect: SectName) {
		const sectEntry = $characterStore.characterStatus?.find((e) => e.sect === sect);
		const amountSupport = sectEntry?.support?.length ?? 0;
		if (!sectEntry?.value) return false;

		if (sectEntry.value === 1) {
			return amountSupport >= 6;
		} else if (sectEntry.value === 2) {
			return amountSupport >= 9;
		} else if (sectEntry.value === 3) {
			return amountSupport >= 12;
		} else if (sectEntry.value === 4) {
			return amountSupport >= 15;
		}
		return false;
	}

	function doesStatusFall(sect: SectName) {
		const sectEntry = $characterStore.characterStatus?.find((e) => e.sect === sect);
		const amountOpposition = sectEntry?.opposition?.length ?? 0;
		if (!sectEntry?.value) return false;

		if (sectEntry.value === 5) {
			return amountOpposition >= 12;
		} else if (sectEntry.value === 4) {
			return amountOpposition >= 9;
		} else if (sectEntry.value === 3) {
			return amountOpposition >= 6;
		} else if (sectEntry.value === 2) {
			return amountOpposition >= 3;
		}

		return false;
	}

	function canGiveSupportOrOpposition() {
		const acceptedMonikers = ['Acknowledged', 'Committed', 'Initiated', 'Accepted'];

		let isAccepted = false;

		$characterStore.characterStatus?.forEach((sect) => {
			if (
				acceptedMonikers.some((searchString) => sect.monikers?.includes(searchString)) &&
				sect.value >= 1
			) {
				isAccepted = true;
				return;
			}
		});

		return isAccepted;
	}
</script>

<h1 class="h1">Status-Overview</h1>
{#if $characterStore.characterStatus}
	<div class="grid auto-rows-auto grid-cols-1 gap-2 sm:grid-cols-3">
		{#each $characterStore.characterStatus as status}
			<div>
				<h2 class="h2">{status.sect}</h2>
				<div class="card rounded-sm p-4">
					<Tracker title="Status" value={status.value} />
					{#if canGiveSupportOrOpposition()}
						<label class="label mt-2" for="monikers">
							Monikers
							<p id="monikers">{status.monikers}</p>
						</label>
						{#if doesStatusRise(status.sect)}
							<div class="alert variant-filled-success mt-2 rounded-lg">
								<iconify-icon height="48" icon="mdi:arrow-up-bold" />
								<div class="alert-message">
									<h3 class="h3">Status increase</h3>
									<p>
										You have enough support to rise in status! By pressing the button below, you can
										enter the moniker the ones who supported you gave you (which also increases the
										status value). For moniker examples, see the Monikers section on p. 298).
									</p>

									<div class="alert-actions">
										<form action="?/increaseStatus" method="POST">
											<input name="sect" type="hidden" value={status.sect} />
											<input
												name="moniker"
												class="input form-input rounded-lg"
												placeholder="Add your new moniker here"
												title="New moniker"
												type="text"
											/>
											<button class="variant-filled-secondary btn mt-2 rounded-lg" type="submit">
												Save moniker
											</button>
										</form>
									</div>
								</div>
							</div>
						{/if}
						{#if doesStatusFall(status.sect)}
							<div class="alert variant-filled-error mt-2 rounded-lg">
								<iconify-icon height="48" icon="mdi:arrow-down-bold" />
								<div class="alert-message">
									<h3 class="h3">Status decrease</h3>
									<p>
										You have enough opposition to fall in status! By pressing the button below, the
										moniker associated with your current status will be removed, and the status
										value decreased.
									</p>

									<div class="alert-actions">
										<form action="?/decreaseStatus" method="POST">
											<input name="sect" type="hidden" value={status.sect} />
											<button class="variant-filled-secondary btn mt-2 rounded-lg" type="submit">
												Remove moniker
											</button>
										</form>
									</div>
								</div>
							</div>
						{/if}
						{#if (status.support && status.support.length > 0) || (status.opposition && status.opposition.length > 0)}
							<hr class="my-2" />
							<div class="mt-2 grid auto-rows-auto grid-cols-1 gap-2 sm:grid-cols-2">
								{#if status.support && status.support.length > 0}
									<div class="flex flex-col">
										<h3 class="h3">Support</h3>
										<ul class="list">
											{#each status.support as support}
												{#await getCharacterName(support)}
													<li>
														<span> Loading... </span>
													</li>
												{:then supporter}
													<li>
														<span> {supporter.name} </span>
													</li>
												{/await}
											{/each}
										</ul>
									</div>
								{/if}
								{#if status.opposition && status.opposition.length > 0}
									<div class="flex flex-col">
										<h3 class="h3">Opposition</h3>
										<ul class="list">
											{#each status.opposition as opposition}
												{#await getCharacterName(opposition)}
													<li>
														<span> Loading... </span>
													</li>
												{:then detractor}
													<li>
														<span> {detractor.name} </span>
													</li>
												{/await}
											{/each}
										</ul>
									</div>
								{/if}
							</div>
						{/if}

						{#if !doesStatusRise(status.sect) && !doesStatusFall(status.sect)}
							<hr class="my-2" />
							<h3 class="h3">Changing Status</h3>
							<form class="flex flex-col gap-2" action="?/updateStatus" method="POST">
								<input name="sect" type="hidden" value={status.sect} />
								<label class="label">
									<span>Kind</span>
									<select
										name="statusChange"
										class="select rounded-lg"
										bind:value={selectedStatusOption}
									>
										<option disabled selected value={undefined}>
											What kind of status do you mean?
										</option>
										{#each statusChange.options as change}
											<option value={change}>{change}</option>
										{/each}
									</select>
								</label>
								<label class="label">
									<span>Involved Player</span>
									<select name="characterId" class="select rounded-lg" bind:value={selectedNameId}>
										<option disabled selected value={undefined}>
											Who is giving you this status change?
										</option>
										{#await loadNames()}
											<span> Loading... </span>
										{:then names}
											{#each names.filter((e) => e.character_id !== $characterStore.id) as name}
												<option value={name.character_id}>{name.name}</option>
											{/each}
										{/await}
									</select>
								</label>

								<button
									class="variant-filled-primary btn mt-2 rounded-lg"
									disabled={isSubmitDisabled}
									type="submit"
								>
									Save
								</button>
							</form>
						{/if}
					{:else}
						<aside class="alert variant-filled-warning mt-2 rounded-lg">
							<div>
								<iconify-icon height="48" icon="mdi:alert" />
							</div>
							<div class="alert-message">
								<h3 class="h3">You are not accepted (yet)!</h3>
								<p>
									Your character is not accepted within this city and can therefore not give support
									or opposition!
								</p>
							</div>
						</aside>
					{/if}
				</div>
			</div>
		{/each}
	</div>
{:else}
	<aside class="alert variant-filled-warning rounded-lg">
		<div>
			<iconify-icon height="48" icon="mdi:alert" />
		</div>
		<div class="alert-message">
			<h3 class="h3">Keine Status-Eintragung vorhanden</h3>
		</div>
	</aside>
{/if}
