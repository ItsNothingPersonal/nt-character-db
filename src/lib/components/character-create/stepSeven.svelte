<script lang="ts">
	import { isNullOrUndefined } from '$lib/util';
	import type { DisciplineName } from '$lib/zod/enums/disciplineName';
	import type { PlayerCharacterCreate } from '$lib/zod/playerCharacter/playerCharacter';
	import { RadioGroup, RadioItem, Step } from '@skeletonlabs/skeleton';
	import ValueRating from '../valueRating/valueRating.svelte';

	export let playerCharacter: PlayerCharacterCreate;

	const baseUrl = 'https://vamp.bynightstudios.com/vampire/disciplines';

	let primaryDiscipline: DisciplineName;

	$: {
		for (const discipline of playerCharacter.disciplines ?? []) {
			if (discipline.name === primaryDiscipline) {
				discipline.value = 2;
			} else {
				discipline.value = 1;
			}
		}
		playerCharacter.disciplines = playerCharacter.disciplines;
	}

	$: locked = isNullOrUndefined(playerCharacter.disciplines?.find((e) => e.value === 2));
</script>

<Step {locked}>
	<svelte:fragment slot="header">Step 7: Assign Initial Disciplines</svelte:fragment>
	<div class="grid grid-cols-1 grid-rows-1 gap-2">
		<RadioGroup id="physical" rounded="rounded-none">
			{#each playerCharacter.disciplines ?? [] as discipline}
				<RadioItem bind:group={primaryDiscipline} name="justify" value={discipline.name}>
					{discipline.name}
				</RadioItem>
			{/each}
		</RadioGroup>
	</div>

	<div class="grid grid-cols-3 grid-rows-1 gap-2">
		{#each playerCharacter.disciplines ?? [] as discipline}
			<ValueRating
				label={discipline.name}
				value={discipline.value}
				max={5}
				href="{baseUrl}/{discipline.name.toLowerCase()}"
			/>
		{/each}
	</div>
</Step>
