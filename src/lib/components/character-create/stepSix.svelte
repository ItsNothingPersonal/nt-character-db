<script lang="ts">
	import { typedObjectKeys } from '$lib/util';
	import { backgroundName, type BackgroundName } from '$lib/zod/enums/backgroundName';
	import { playerBackground } from '$lib/zod/playerCharacter/playerBackground';
	import { Step } from '@skeletonlabs/skeleton';
	import { characterCreateStore } from '../characterSheet/characterStore';
	import EditableRatingSelection from '../editableRatingSelection/editableRatingSelection.svelte';
	import ValueRating from '../valueRating/valueRating.svelte';

	const validBackgrounds = typedObjectKeys(backgroundName.Values);
	$: validRating = [3, 2, 1];
	const hasSpecialization: BackgroundName[] = [
		'Allies',
		'Contacts',
		'Haven',
		'Influences',
		'Retainers'
	];
	const baseUrl = 'https://vamp.bynightstudios.com/vampire/backgrounds';

	$: locked = !playerBackground.array().length(3).safeParse($characterCreateStore.backgrounds)
		.success;
</script>

<Step {locked}>
	<svelte:fragment slot="header">Step 6: Assign Initial Backgrounds</svelte:fragment>
	<EditableRatingSelection
		label="Background"
		propertyName="backgrounds"
		configKey="Background"
		validNames={validBackgrounds}
		{validRating}
		bind:playerCharacter={$characterCreateStore}
	/>
	<div class="grid auto-rows-auto grid-cols-3 gap-2">
		{#each $characterCreateStore.backgrounds?.toSorted( (a, b) => a.name.localeCompare(b.name) ) ?? [] as background}
			<ValueRating
				label={background.name}
				value={background.value}
				bind:specialization={background.specialization}
				showInput={hasSpecialization.includes(background.name)}
				href="{baseUrl}/{background.name.toLowerCase()}"
			/>
		{/each}
	</div>
</Step>
