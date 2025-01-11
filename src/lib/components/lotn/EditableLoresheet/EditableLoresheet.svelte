<script lang="ts">
	import { characterCreationStore } from '$lib/stores/characterCreationStore';
	import { clanName } from '$lib/zod/lotn/enums/clanName';
	import { loresheetName, type LoresheetName } from '$lib/zod/lotn/enums/loresheetName';
	import { sectName } from '$lib/zod/lotn/enums/sectName';
	import type { PlayerLoresheet } from '$lib/zod/lotn/playerCharacter/playerLoresheet';
	import { Ratings } from '@skeletonlabs/skeleton';
	import { createEventDispatcher } from 'svelte';
	import HelpText from '../characterSheet/components/HelpText.svelte';
	import { interactiveModeStore } from '../characterSheet/interactiveModeStore';
	import { loresheetConfig } from '../config/loresheetConfig';

	export let selectedLoresheet: PlayerLoresheet | undefined;
	export let enableLoresheetSelection: boolean = true;
	export let editModeEnabled: boolean = false;
	export let disableFirstOption: boolean = false;
	export let disableSecondOption: boolean = false;
	export let disableThirdOption: boolean = false;

	const dispatchChange = createEventDispatcher<{
		loresheetChange: { name: LoresheetName | undefined };
		toggleLoreSheetLevel: { level: 1 | 2 | 3 };
	}>();

	const config = selectedLoresheet ? loresheetConfig[selectedLoresheet.name] : undefined;

	function getRelevantLoresheets() {
		const loresheets = loresheetName.options;

		return loresheets
			.filter((loresheet) => {
				const config = loresheetConfig[loresheet];
				if (!config.prerequisite) return true;

				if (clanName.safeParse(config.prerequisite).success) {
					return $characterCreationStore.clan === clanName.safeParse(config.prerequisite).data;
				} else {
					return $characterCreationStore.sect === sectName.safeParse(config.prerequisite).data;
				}
			})
			.toSorted();
	}

	function getValueDescription(value: number) {
		if (!config) return undefined;

		switch (value) {
			case 1:
				return config.level1;
			case 2:
				return config.level2;
			case 3:
				return config.level3;
		}
	}
</script>

{#if editModeEnabled}
	<div class="flex gap-4">
		{#if enableLoresheetSelection}
			<div class="flex flex-col">
				<h3 class="h3">Loresheet</h3>
				{#key $characterCreationStore.loresheet}
					<select
						class="select rounded-lg"
						on:change={(event) =>
							dispatchChange('loresheetChange', {
								name: loresheetName.parse(event.currentTarget.value)
							})}
					>
						<option disabled selected value={undefined}>Select a Loresheet (optional)</option>
						{#each getRelevantLoresheets() as loresheet}
							<option value={loresheet}>{loresheet}</option>
						{/each}
					</select>
				{/key}
			</div>
			<button
				class="variant-filled-primary btn rounded-lg"
				type="button"
				on:click={() => {
					dispatchChange('loresheetChange', { name: undefined });
					selectedLoresheet = undefined;
				}}
			>
				<iconify-icon height="20" icon="mdi:remove" />
			</button>
		{:else if selectedLoresheet}
			<HelpText id={selectedLoresheet.name}>
				<h3 class="h3">Loresheet: {selectedLoresheet.name}</h3>
				<svelte:fragment slot="helpText">
					<p class="whitespace-pre-line">
						{loresheetConfig[selectedLoresheet.name].description}
					</p>
				</svelte:fragment>
			</HelpText>
		{/if}
	</div>
	{#if selectedLoresheet}
		<div class="mt-4 flex flex-col gap-3">
			<div class="rounded-lg">
				<button
					class={`variant-filled-primary btn float-left mr-4 flex h-24 w-24 items-center justify-center rounded-lg bg-primary-500 ${$characterCreationStore.loresheet?.values.includes(1) ? 'ring-2 ring-black dark:ring-white' : ''}`}
					disabled={disableFirstOption}
					on:click={() => dispatchChange('toggleLoreSheetLevel', { level: 1 })}
				>
					<Ratings max={3} value={1}>
						<svelte:fragment slot="empty">
							<iconify-icon height="20" icon="prime:circle" />
						</svelte:fragment>
						<svelte:fragment slot="full">
							<iconify-icon height="20" icon="prime:circle-fill" />
						</svelte:fragment>
					</Ratings>
				</button>
				<h2 class="text-lg font-bold">{loresheetConfig[selectedLoresheet.name].level1.title}</h2>
				<div class="whitespace-pre-line text-justify">
					{loresheetConfig[selectedLoresheet.name].level1.description}
				</div>
			</div>

			<hr />

			<div class="rounded-lg">
				<button
					class={`variant-filled-primary btn float-left mr-4 flex h-24 w-24 items-center justify-center rounded-lg bg-primary-500 ${$characterCreationStore.loresheet?.values.includes(2) ? 'ring-2 ring-black dark:ring-white' : ''}`}
					disabled={disableSecondOption}
					on:click={() => dispatchChange('toggleLoreSheetLevel', { level: 2 })}
				>
					<Ratings max={3} value={2}>
						<svelte:fragment slot="empty">
							<iconify-icon height="20" icon="prime:circle" />
						</svelte:fragment>
						<svelte:fragment slot="full">
							<iconify-icon height="20" icon="prime:circle-fill" />
						</svelte:fragment>
					</Ratings>
				</button>
				<h2 class="text-lg font-bold">{loresheetConfig[selectedLoresheet.name].level2.title}</h2>
				<div class="whitespace-pre-line text-justify">
					{loresheetConfig[selectedLoresheet.name].level2.description}
				</div>
			</div>

			<hr />

			<div class="rounded-lg">
				<button
					class={`variant-filled-primary btn float-left mr-4 flex h-24 w-24 items-center justify-center rounded-lg bg-primary-500 ${$characterCreationStore.loresheet?.values.includes(3) ? 'ring-2 ring-black dark:ring-white' : ''}`}
					disabled={disableThirdOption}
					on:click={() => dispatchChange('toggleLoreSheetLevel', { level: 3 })}
				>
					<Ratings max={3} value={3}>
						<svelte:fragment slot="empty">
							<iconify-icon height="20" icon="prime:circle" />
						</svelte:fragment>
						<svelte:fragment slot="full">
							<iconify-icon height="20" icon="prime:circle-fill" />
						</svelte:fragment>
					</Ratings>
				</button>
				<h2 class="text-lg font-bold">{loresheetConfig[selectedLoresheet.name].level3.title}</h2>
				<div class="whitespace-pre-line text-justify">
					{loresheetConfig[selectedLoresheet.name].level3.description}
				</div>
			</div>
		</div>
	{/if}
{:else if selectedLoresheet}
	<label
		class="label grid w-full auto-rows-auto grid-cols-1"
		for={`${selectedLoresheet.name}-helptext`}
	>
		<HelpText id={`${selectedLoresheet.name}-helptext`} placement="bottom-start">
			<span id={selectedLoresheet.name} class="whitespace-pre-line">
				<h3 class="h3">{selectedLoresheet.name}</h3>
			</span>
			<svelte:fragment slot="helpText">
				{#if config}
					{#if config.prerequisite}
						<p class="whitespace-pre-line">
							<span class="font-bold">Prerequisite:</span>
							{config.prerequisite}
						</p>
					{/if}

					<p class="whitespace-pre-line">
						{config.description}
					</p>
				{/if}
			</svelte:fragment>
		</HelpText>

		<div class="grid auto-rows-auto grid-cols-1 gap-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-5">
			{#each selectedLoresheet.values.sort() as loreSheetLevel}
				<div class="card rounded-lg p-4">
					<label
						class="label grid w-full grid-cols-[3fr_1fr] grid-rows-1 gap-x-2"
						for={`${selectedLoresheet.name}-${loreSheetLevel}-name`}
					>
						<HelpText id={`${selectedLoresheet.name}-${loreSheetLevel}-name`}>
							<span
								id={`${selectedLoresheet.name}-${loreSheetLevel}`}
								class="text-nowrap font-bold"
							>
								{getValueDescription(loreSheetLevel)?.title}
							</span>
							<svelte:fragment slot="helpText">
								<p class="whitespace-pre-line">
									{getValueDescription(loreSheetLevel)?.description}
								</p>
							</svelte:fragment>
						</HelpText>

						<HelpText id={`${selectedLoresheet.name}-${loreSheetLevel}-value`}>
							<Ratings
								id={`${selectedLoresheet.name}-${loreSheetLevel}-value`}
								interactive={$interactiveModeStore}
								justify="justify-left"
								max={3}
								bind:value={loreSheetLevel}
							>
								<svelte:fragment slot="empty">
									<iconify-icon icon="prime:circle" />
								</svelte:fragment>
								<svelte:fragment slot="full">
									<iconify-icon icon="prime:circle-fill" />
								</svelte:fragment>
							</Ratings>
							<svelte:fragment slot="helpText">
								<p class="whitespace-pre-line">
									{getValueDescription(loreSheetLevel)?.description}
								</p>
							</svelte:fragment>
						</HelpText>
					</label>
				</div>
			{/each}
		</div>
	</label>
{/if}
