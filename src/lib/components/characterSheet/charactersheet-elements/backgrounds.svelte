<script lang="ts">
	import EditableRatingSelection from '$lib/components/editableRatingSelection/editableRatingSelection.svelte';
	import ValueRating from '$lib/components/valueRating/valueRating.svelte';
	import { isNullOrUndefined, typedObjectKeys } from '$lib/util';
	import { getGenerationNumber } from '$lib/validation/backgrounds';
	import { costConfig } from '$lib/validation/config/constConfig';
	import { backgroundName } from '$lib/zod/enums/backgroundName';
	import { get } from 'svelte/store';
	import { characterStore } from '../characterStore';
	import { interactiveModeStore } from '../interactiveModeStore';

	const baseUrl = 'https://vamp.bynightstudios.com/vampire/backgrounds';
	const changedBackgrounds = new Map<string, number>();
	const validBackgrounds = typedObjectKeys(backgroundName.Values);
	const validRating = [1, 2, 3, 4, 5, 6, 7];

	function handleChange(event: CustomEvent<{ label: string; old: number; new: number }>): void {
		const costConfigEntry = costConfig.get('Background');

		if (isNullOrUndefined(costConfigEntry)) {
			console.error('Config zum Steigern für Backgrounds fehlt!');
			return;
		}

		if (!changedBackgrounds.has(event.detail.label)) {
			changedBackgrounds.set(event.detail.label, event.detail.old);
		}

		if (event.detail.label === 'Generation') {
			$characterStore.generation = getGenerationNumber(event.detail.new);
		}

		$characterStore = costConfigEntry(
			get(characterStore),
			event.detail.label,
			event.detail.new > event.detail.old ? 'add' : 'remove',
			true,
			event.detail.old,
			event.detail.new
		);
	}
</script>

{#if $interactiveModeStore}
	<EditableRatingSelection
		label="Background"
		propertyName="backgrounds"
		configKey="Background"
		validNames={validBackgrounds}
		{validRating}
		bind:playerCharacter={$characterStore}
		calculateCost={true}
	/>
{/if}
<div
	class="grid auto-rows-auto grid-cols-2 gap-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-6"
>
	{#each $characterStore.backgrounds as background}
		<ValueRating
			label={background.name}
			bind:value={background.value}
			specialization={background.specialization}
			href="{baseUrl}/{background.name.toLowerCase()}{background.name === 'Rituals'
				? ' (sabbat only)'
				: ''}"
			on:change={handleChange}
			start={changedBackgrounds.get(background.name)}
		/>
	{/each}
</div>
