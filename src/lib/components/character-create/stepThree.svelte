<script lang="ts">
	import { isNullOrUndefined, typedObjectKeys } from '$lib/util';
	import { inClanDisciplineConfig } from '$lib/validation/config/inClanDisciplineConfig';
	import { clanName, type ClanName } from '$lib/zod/enums/clanName';
	import type { DisciplineName } from '$lib/zod/enums/disciplineName';
	import type { PlayerCharacter } from '$lib/zod/playerCharacter/playerCharacter';
	import { Step } from '@skeletonlabs/skeleton';

	export let playerCharacter: Partial<PlayerCharacter>;

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

		playerCharacter.disciplines = [];

		for (const discipline of selectedConfigEntry) {
			playerCharacter.disciplines?.push({ name: discipline, inclan: true, value: 0 });
		}
	}
</script>

<Step>
	<svelte:fragment slot="header">Step 3: Choose a Clan</svelte:fragment>
	<div class="grid auto-rows-auto grid-cols-1">
		<label>
			Clan
			<select
				class="select rounded-none"
				bind:value={playerCharacter.clan}
				on:change={() => setInClanDisciplines(playerCharacter.clan)}
			>
				{#each validClanNames as entry}
					<option value={entry}>{entry}</option>
				{/each}
			</select>
		</label>
	</div>

	{#if selectedConfigEntry}
		<div class="card mt-6 rounded-none">
			<header class="card-header">
				<h4 class="h4">In-Clan Disziplinen</h4>
			</header>
			<section class="p-4">
				<ul>
					{#each selectedConfigEntry as discipline}
						<li>
							<a href="{baseUrl}/{discipline.toLowerCase()}" class="underline decoration-dotted">
								<span class="flex-auto">{discipline}</span>
							</a>
						</li>
					{/each}
				</ul>
			</section>
		</div>
	{/if}
</Step>
