<script lang="ts">
	import { isNullOrUndefined, typedObjectKeys } from '$lib/util';
	import { backgroundName, type BackgroundName } from '$lib/zod/enums/backgroundName';
	import { playerBackground } from '$lib/zod/playerCharacter/playerBackground';
	import type { PlayerCharacterCreate } from '$lib/zod/playerCharacter/playerCharacter';
	import { Step } from '@skeletonlabs/skeleton';
	import ValueRating from '../valueRating/valueRating.svelte';

	export let playerCharacter: PlayerCharacterCreate;

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

	let selectedBackground: BackgroundName;
	let selectedValue: number;

	function addButton(backgroundName: BackgroundName, backgroundValue: number) {
		playerCharacter.backgrounds = [
			...(playerCharacter.backgrounds ?? []),
			{ name: backgroundName, value: backgroundValue }
		];

		[validRating.find((e) => e === backgroundValue)].filter((x) => x !== undefined);

		const indexRating = validRating.findIndex((e) => e === backgroundValue);
		validRating = validRating.filter((_, i) => i !== indexRating);
		if (validRating.length > 0) {
			selectedValue = validRating[0];
		}
	}

	function removeButton(backgroundName: BackgroundName) {
		if (playerCharacter.backgrounds) {
			const skillToBeRemoved = playerCharacter.backgrounds?.find((e) => e.name === backgroundName);

			if (skillToBeRemoved) {
				playerCharacter.backgrounds = playerCharacter.backgrounds.filter(
					(e) => e.name !== backgroundName
				);
				validRating = [...validRating, skillToBeRemoved.value].toSorted((a, b) => b - a);
			}
		}
	}

	$: locked = !playerBackground.array().length(3).safeParse(playerCharacter.backgrounds).success;
</script>

<Step {locked}>
	<svelte:fragment slot="header">Step 6: Assign Initial Backgrounds</svelte:fragment>
	<div class="grid auto-rows-auto grid-cols-3 gap-2">
		<label>
			Background
			<select class="select rounded-none" bind:value={selectedBackground}>
				{#each validBackgrounds as entry}
					<option value={entry}>{entry}</option>
				{/each}
			</select>
		</label>
		<label>
			Rating
			<select
				class="select rounded-none"
				bind:value={selectedValue}
				disabled={validRating.length === 0}
			>
				{#each validRating as entry}
					<option value={entry}>{entry}</option>
				{/each}
			</select>
		</label>
	</div>
	<button
		type="button"
		class="variant-filled btn rounded-none"
		on:click={() => addButton(selectedBackground, selectedValue)}
		disabled={validRating.length === 0 ||
			!isNullOrUndefined(playerCharacter.backgrounds?.find((e) => e.name === selectedBackground))}
	>
		Add Skill
	</button>
	<button
		type="button"
		class="variant-filled btn rounded-none"
		on:click={() => removeButton(selectedBackground)}
		disabled={playerCharacter.backgrounds
			? playerCharacter.backgrounds.length === 0 ||
			  isNullOrUndefined(playerCharacter.backgrounds.find((e) => e.name === selectedBackground))
			: true}
	>
		Remove Skill
	</button>
	<div class="grid auto-rows-auto grid-cols-3 gap-2">
		{#each playerCharacter.backgrounds?.toSorted( (a, b) => a.name.localeCompare(b.name) ) ?? [] as background}
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
