<script lang="ts">
	import { clanConfig } from '$lib/components/lotn/config/clanConfig';
	import { characterCreationStore } from '$lib/stores/characterCreationStore';
	import { clanName, type ClanName } from '$lib/zod/lotn/enums/clanName';
	import { onDestroy, onMount } from 'svelte';

	onMount(() => {
		if (!$characterCreationStore.clan) {
			$characterCreationStore.clan = 'Banu Haqim';
		}
	});

	const debugSub = characterCreationStore.subscribe((value) =>
		console.warn(JSON.stringify(value, undefined, 2))
	);

	onDestroy(() => {
		debugSub();
	});

	function updateClan(clanName: ClanName) {
		characterCreationStore.update((store) => {
			store.clan = clanName;
			store.disciplines = [];
			store.merits = undefined;
			store.flaws = undefined;
			store.ghoul = false;
			return store;
		});
	}
</script>

<div class="mt-2 grid grid-cols-[auto_2fr] gap-4">
	<div class="flex flex-col gap-2">
		{#each clanName.options as clanNameEntry}
			<button
				class={`variant-filled-primary btn rounded-lg ${$characterCreationStore.clan === clanNameEntry ? 'ring-2 ring-black dark:ring-white' : ''}`}
				type="button"
				on:click={() => updateClan(clanNameEntry)}
			>
				{clanNameEntry}
			</button>
		{/each}
	</div>
	<div class="flex flex-col">
		{#if $characterCreationStore.clan}
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
