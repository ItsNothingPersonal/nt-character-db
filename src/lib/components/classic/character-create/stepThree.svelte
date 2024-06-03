<script lang="ts">
	import { characterCreateStore } from '$lib/components/classic/characterSheet/characterStore';
	import Selectionbox from '$lib/components/selectionbox/selectionbox.svelte';
	import { isNullOrUndefined, typedObjectKeys } from '$lib/util';
	import { inClanDisciplineConfig } from '$lib/validation/config/inClanDisciplineConfig';
	import { clanName, type ClanName } from '$lib/zod/classic/enums/clanName';
	import type { DisciplineName } from '$lib/zod/classic/enums/disciplineName';
	import { Step } from '@skeletonlabs/skeleton';

	const validClanNames = typedObjectKeys(clanName.Values);
	const baseUrl = 'https://vamp.bynightstudios.com/vampire/disciplines';
	let selectedConfigEntry: DisciplineName[];

	function setInClanDisciplines(clan: ClanName | undefined) {
		if (isNullOrUndefined(clan)) {
			return;
		}

		const config = inClanDisciplineConfig.get(clan);
		if (isNullOrUndefined(config)) {
			return;
		}
		selectedConfigEntry = config;

		$characterCreateStore.disciplines = [];

		for (const discipline of selectedConfigEntry) {
			$characterCreateStore.disciplines?.push({ name: discipline, inclan: true, value: 0 });
		}
	}

	$: locked =
		isNullOrUndefined($characterCreateStore.clan) ||
		isNullOrUndefined($characterCreateStore.disciplines) ||
		$characterCreateStore.disciplines.length === 0;
</script>

<Step {locked}>
	<svelte:fragment slot="header">Step 3: Choose a Clan</svelte:fragment>
	<Selectionbox
		label="Clan"
		onChange={() => setInClanDisciplines($characterCreateStore.clan)}
		selectableValues={validClanNames}
		bind:value={$characterCreateStore.clan}
	/>

	{#if selectedConfigEntry}
		<div class="card mt-6 rounded-none">
			<header class="card-header">
				<h4 class="h4">In-Clan Disziplinen</h4>
			</header>
			<section class="p-4">
				<ul>
					{#each selectedConfigEntry as discipline}
						<li>
							<a class="underline decoration-dotted" href="{baseUrl}/{discipline.toLowerCase()}">
								<span class="flex-auto">{discipline}</span>
							</a>
						</li>
					{/each}
				</ul>
			</section>
		</div>
	{/if}
</Step>
