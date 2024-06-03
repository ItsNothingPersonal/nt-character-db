<script lang="ts">
	import { characterCreateStore } from '$lib/components/classic/characterSheet/characterStore';
	import ValueRating from '$lib/components/valueRating/valueRating.svelte';
	import { isNullOrUndefined } from '$lib/util';
	import type { DisciplineName } from '$lib/zod/classic/enums/disciplineName';
	import { RadioGroup, RadioItem, Step } from '@skeletonlabs/skeleton';

	const baseUrl = 'https://vamp.bynightstudios.com/vampire/disciplines';

	let primaryDiscipline: DisciplineName;

	$: {
		characterCreateStore.update((playerCharacter) => {
			return {
				...playerCharacter,
				disciplines: playerCharacter.disciplines?.map((discipline) => {
					if (discipline.name === primaryDiscipline) {
						return { ...discipline, value: 2 };
					} else {
						return { ...discipline, value: 1 };
					}
				})
			};
		});
	}

	$: locked = isNullOrUndefined($characterCreateStore.disciplines?.find((e) => e.value === 2));
</script>

<Step {locked}>
	<svelte:fragment slot="header">Step 7: Assign Initial Disciplines</svelte:fragment>
	<div class="grid grid-cols-1 grid-rows-1 gap-2">
		<RadioGroup rounded="rounded-none">
			{#each $characterCreateStore.disciplines as discipline, disciplineIndex}
				<RadioItem
					name="primary-discipline-{disciplineIndex}"
					value={discipline.name}
					bind:group={primaryDiscipline}
				>
					{discipline.name}
				</RadioItem>
			{/each}
		</RadioGroup>
	</div>

	<div class="grid grid-cols-3 grid-rows-1 gap-2">
		{#each $characterCreateStore.disciplines as discipline}
			<ValueRating
				href="{baseUrl}/{discipline.name.toLowerCase()}"
				label={discipline.name}
				max={5}
				value={discipline.value}
			/>
		{/each}
	</div>
</Step>
