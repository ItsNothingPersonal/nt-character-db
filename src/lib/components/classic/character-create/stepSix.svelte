<script lang="ts">
	import { characterCreateStore } from '$lib/components/classic/characterSheet/characterStore';
	import EditableRatingSelection from '$lib/components/editableRatingSelection/editableRatingSelection.svelte';
	import ValueRating from '$lib/components/valueRating/valueRating.svelte';
	import { typedObjectKeys } from '$lib/util';
	import { backgroundName, type BackgroundName } from '$lib/zod/classic/enums/backgroundName';
	import { playerBackground } from '$lib/zod/classic/playerCharacter/playerBackground';
	import { Step } from '@skeletonlabs/skeleton';

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
		configKey="Background"
		label="Background"
		propertyName="backgrounds"
		validNames={validBackgrounds}
		{validRating}
		bind:playerCharacter={$characterCreateStore}
	/>
	<div class="grid auto-rows-auto grid-cols-3 gap-2">
		{#each $characterCreateStore.backgrounds?.toSorted( (a, b) => a.name.localeCompare(b.name) ) ?? [] as background}
			<ValueRating
				href="{baseUrl}/{background.name.toLowerCase()}"
				label={background.name}
				showInput={hasSpecialization.includes(background.name)}
				value={background.value}
				bind:specialization={background.specialization}
			/>
		{/each}
	</div>
</Step>
