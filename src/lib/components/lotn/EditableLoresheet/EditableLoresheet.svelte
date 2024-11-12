<script lang="ts">
	import { characterCreationStore } from '$lib/stores/characterCreationStore';
	import { clanName } from '$lib/zod/lotn/enums/clanName';
	import { loresheetName, type LoresheetName } from '$lib/zod/lotn/enums/loresheetName';
	import { sectName } from '$lib/zod/lotn/enums/sectName';
	import { Ratings } from '@skeletonlabs/skeleton';
	import { createEventDispatcher } from 'svelte';
	import HelpText from '../characterSheet/components/HelpText.svelte';
	import { loresheetConfig } from '../config/loresheetConfig';

	export let selectedLoresheet: LoresheetName | undefined = undefined;
	export let enableLoresheetSelection: boolean = true;
	export let disableFirstOption: boolean = false;
	export let disableSecondOption: boolean = false;
	export let disableThirdOption: boolean = false;

	const dispatchChange = createEventDispatcher<{
		loresheetChange: { name: LoresheetName | undefined };
		toggleLoreSheetLevel: { level: 1 | 2 | 3 };
	}>();

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
</script>

<div class="flex gap-4">
	{#if enableLoresheetSelection}
		<div class="flex flex-col">
			<h3 class="h3">Loresheet</h3>
			{#key $characterCreationStore.loresheet}
				<select
					class="select rounded-lg"
					bind:value={selectedLoresheet}
					on:change={() => dispatchChange('loresheetChange', { name: selectedLoresheet })}
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
		<HelpText id={selectedLoresheet}>
			<h3 class="h3">Loresheet: {selectedLoresheet}</h3>
			<svelte:fragment slot="helpText">
				<p class="whitespace-pre-line">
					{loresheetConfig[selectedLoresheet].description}
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
			<h2 class="text-lg font-bold">{loresheetConfig[selectedLoresheet].level1.title}</h2>
			<div class="whitespace-pre-line text-justify">
				{loresheetConfig[selectedLoresheet].level1.description}
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
			<h2 class="text-lg font-bold">{loresheetConfig[selectedLoresheet].level2.title}</h2>
			<div class="whitespace-pre-line text-justify">
				{loresheetConfig[selectedLoresheet].level2.description}
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
			<h2 class="text-lg font-bold">{loresheetConfig[selectedLoresheet].level3.title}</h2>
			<div class="whitespace-pre-line text-justify">
				{loresheetConfig[selectedLoresheet].level3.description}
			</div>
		</div>
	</div>
{/if}
