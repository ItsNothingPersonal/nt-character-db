<script lang="ts">
	import { goto } from '$app/navigation';
	// trest

	import { projectsDefinition } from '$lib/components/lotn/config/projectsDefinition';
	import { characterCreationStore } from '$lib/stores/characterCreationStore';
	import { clanName } from '$lib/zod/lotn/enums/clanName';
	import { projectName, type ProjectName } from '$lib/zod/projectName';
	import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';

	onMount(() => {
		if (get(characterCreationStore).project) {
			goto('/lotn/sheet/create/step_01');
		}
	});

	function setProject(projectName: ProjectName) {
		characterCreationStore.clear();
		characterCreationStore.update((store) => {
			store.project = projectName;
			return store;
		});

		goto('/lotn/sheet/create/step_01');
	}
</script>

<aside class="alert variant-filled mb-4 rounded-lg">
	<div class="alert-message">
		<h3 class="h3 font-bold">Project Selection</h3>
		<p>
			Before you can start creating a character you need to decide which project the character is
			intended for.
		</p>
	</div>
</aside>

<div class="grid grid-cols-2 gap-2">
	{#each Object.entries(projectsDefinition) as [identifier, project]}
		{@const projectIdentifier = projectName.parse(identifier)}
		<div class="card flex flex-col gap-2 rounded-lg p-4">
			<h2 class="h2">
				{projectIdentifier}
			</h2>

			<div>
				<h3 class="h3">Storytellers</h3>
				<ol class="list-inside list-disc">
					{#each project.storytellers as storyteller}
						<li class="list-item">
							<span>
								{storyteller}
							</span>
						</li>
					{/each}
				</ol>
			</div>

			<Accordion>
				<AccordionItem rounded="container rounded-lg px-0" spacing="space-y-2">
					<svelte:fragment slot="summary">Description</svelte:fragment>
					<svelte:fragment slot="content">
						<div class="flex flex-col gap-2 text-pretty">
							{#each project.description as paragraph}
								<p>
									{paragraph}
								</p>
							{/each}
						</div>
					</svelte:fragment>
				</AccordionItem>
				<AccordionItem rounded="container rounded-lg px-0" spacing="space-y-2">
					<svelte:fragment slot="summary">Default Clans</svelte:fragment>
					<svelte:fragment slot="content">
						{#if project.defaultClans.sort() !== clanName.options.sort()}
							<aside class="alert variant-filled mb-4 rounded-lg">
								<div class="alert-message">
									<p>
										The following clans can be selected in a majority of cases. Every clan
										<strong> not </strong> on this list must be discussed with the storyteller team,
										and its selection is subject to more scrutiny.
									</p>
								</div>
							</aside>
						{/if}
						<ol class="list-inside list-disc">
							{#each project.defaultClans as clan}
								<li class="list-item">
									<span>
										{clan}
									</span>
								</li>
							{/each}
						</ol>
					</svelte:fragment>
				</AccordionItem>
			</Accordion>

			<div>
				<h3 class="h3">Start-XP</h3>
				<p>{project.startExp}</p>
			</div>

			<button
				class="variant-filled-primary btn rounded-lg"
				on:click={() => setProject(projectIdentifier)}
			>
				Set Project
			</button>
		</div>
	{/each}
</div>
