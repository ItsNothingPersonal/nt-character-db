<script lang="ts">
	import type { PlayerDiscipline } from '$lib/zod/lotn/playerCharacter/playerDiscipline';
	import { Ratings } from '@skeletonlabs/skeleton';
	import { createEventDispatcher } from 'svelte';
	import { getDisciplineConfig } from '../../util/disciplines';
	import DisciplinePower from './DisciplinePower.svelte';
	import HelpText from './HelpText.svelte';

	export let discipline: PlayerDiscipline;
	export let max = 5;
	export let start = 0;
	export let value: number;

	const disciplineConfig = getDisciplineConfig(discipline.name);

	const dispatch = createEventDispatcher<{
		change: { label: string; old: number; new: number };
	}>();

	function iconClick(event: CustomEvent<{ index: number }>): void {
		if (value === event.detail.index) {
			return;
		}

		const valueOld = value;

		if (event.detail.index < start) {
			value = start;
		} else {
			value = event.detail.index;
		}

		dispatch('change', { label: discipline.name, old: valueOld, new: value });
	}
</script>

<div class="card flex flex-col rounded-sm p-4">
	<label class="label grid w-full grid-cols-2 grid-rows-1" for={discipline.name}>
		<HelpText id={discipline.name}>
			<span id={discipline.name} class="font-bold">{discipline.name}</span>
			<svelte:fragment slot="helpText">
				<p class="whitespace-pre-line">
					<span class="font-bold">Typ:</span>
					{#if typeof disciplineConfig.characteristics.type === 'string'}
						{disciplineConfig.characteristics.type}
					{:else}
						{disciplineConfig.characteristics.type.text}. {disciplineConfig.characteristics.type
							.hint}
					{/if}
				</p>
				<br />
				<p class="whitespace-pre-line">
					<span class="font-bold">Masquerade Threat:</span>
					{disciplineConfig.characteristics.masqueradeThreat.type}

					{#if disciplineConfig.characteristics.masqueradeThreat.description}
						<br />
						{disciplineConfig.characteristics.masqueradeThreat.description}
					{/if}
				</p>

				{#if disciplineConfig.characteristics.description}
					<br />
					<p class="whitespace-pre-line">
						{disciplineConfig.characteristics.description}
					</p>
				{/if}
			</svelte:fragment>
		</HelpText>
		<p id={discipline.name}>
			<Ratings justify="justify-left" {max} bind:value={discipline.value} on:icon={iconClick}>
				<svelte:fragment slot="empty">
					<iconify-icon icon="prime:circle" />
				</svelte:fragment>
				<svelte:fragment slot="full">
					<iconify-icon icon="prime:circle-fill" />
				</svelte:fragment>
			</Ratings>
		</p>
		{#each discipline.powers as power}
			<div class="col-span-2 grid w-full auto-rows-auto grid-cols-1">
				<DisciplinePower discipline={discipline.name} power={power.name} />
			</div>
		{/each}
	</label>
</div>
