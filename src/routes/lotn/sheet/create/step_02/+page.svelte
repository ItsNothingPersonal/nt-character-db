<script lang="ts">
	import { clanConfig } from '$lib/components/lotn/config/clanConfig';
	import { projectsDefinition } from '$lib/components/lotn/config/projectsDefinition';
	import { ScreenSize } from '$lib/sceenSize';
	import { characterCreationStore } from '$lib/stores/characterCreationStore';
	import { clanName, type ClanName } from '$lib/zod/lotn/enums/clanName';
	import type { ProjectName } from '$lib/zod/projectName';
	import { cloneDeep } from 'lodash';
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';

	onMount(() => {
		if (!$characterCreationStore.clan) {
			characterCreationStore.update((store) => {
				store.clan = 'Banu Haqim';
				return store;
			});
		}
	});

	let innerWidth = 0;

	function updateClan(clanName: ClanName) {
		const characterName = cloneDeep(get(characterCreationStore).name);
		const characterSect = cloneDeep(get(characterCreationStore).sect);
		const characterMorality = cloneDeep(get(characterCreationStore).morality);
		const project = cloneDeep(get(characterCreationStore).project);
		characterCreationStore.clear();

		characterCreationStore.update((store) => {
			store.project = project;
			store.name = characterName;
			store.sect = characterSect;
			store.morality = characterMorality;
			store.clan = clanName;
			return store;
		});
	}

	function isDefaultClan(clanName: ClanName, project: ProjectName | undefined) {
		if (!project) return false;
		return projectsDefinition[project]
			? projectsDefinition[project].defaultClans.includes(clanName)
			: false;
	}
</script>

<svelte:window bind:innerWidth />

<aside class="alert variant-filled mb-4 rounded-lg">
	<div class="alert-message">
		<h3 class="h3 font-bold">Clan Selection</h3>
		<p>
			Here you can set your clan which has implications regarding what your in clan disciplines are,
			what Loresheets you have access to and more.
		</p>
		<p>
			<strong>IMPORTANT:</strong> Changing the clan resets the character selections for anything that's
			not defined in step 1 "Who Are They?".
		</p>
	</div>
</aside>

<div class="mt-2 grid gap-4 sm:grid-cols-[auto_2fr]">
	<div class="grid auto-rows-auto grid-cols-2 gap-2 sm:flex sm:flex-col">
		{#each clanName.options as clanNameEntry}
			<button
				class={`${isDefaultClan(clanNameEntry, get(characterCreationStore).project) ? 'variant-filled-primary' : 'variant-filled-warning'} btn rounded-lg ${$characterCreationStore.clan === clanNameEntry ? 'ring-2 ring-black dark:ring-white' : ''}`}
				type="button"
				on:click={() => updateClan(clanNameEntry)}
			>
				{clanNameEntry}
			</button>
		{/each}
	</div>

	{#if innerWidth < ScreenSize.SM}
		<hr />
	{/if}

	<div class="flex flex-col">
		{#if $characterCreationStore.clan}
			{#if !isDefaultClan($characterCreationStore.clan, get(characterCreationStore).project)}
				<aside class="alert variant-filled mb-4 rounded-lg">
					<div class="alert-message">
						<p>
							This clan is not in the default list of clans for this project, so its selection is
							subject to more scrutiny.
						</p>
					</div>
				</aside>
			{/if}
			<p class="whitespace-pre-line">
				{@html clanConfig[$characterCreationStore.clan].description}
			</p>

			<h3 class="h3 mt-2">Disciplines</h3>
			{#each clanConfig[$characterCreationStore.clan].inclan as discipline}
				<div>
					<span class="flex-auto">
						<dt class="font-bold">{discipline}</dt>
						<dd class="whitespace-pre-line">
							{clanConfig[$characterCreationStore.clan].inclanDescriptions[discipline]}
						</dd>
					</span>
				</div>
			{/each}

			<h3 class="h3 mt-2">Archetypes</h3>
			{#each clanConfig[$characterCreationStore.clan].archetypes as archetype}
				{#each Object.entries(archetype) as [key, value]}
					<div>
						<span class="flex-auto">
							<dt class="font-bold">{key}</dt>
							<dd class="whitespace-pre-line">
								{value}
							</dd>
						</span>
					</div>
				{/each}
			{/each}

			<h3 class="h3 mt-2">Bane</h3>
			<p>{clanConfig[$characterCreationStore.clan].bane.explanation}</p>

			<h3 class="h3 mt-2">
				Compulsion: {clanConfig[$characterCreationStore.clan].compulsion.title}
			</h3>
			<p>{clanConfig[$characterCreationStore.clan].compulsion.explanation}</p>
		{/if}
	</div>
</div>
