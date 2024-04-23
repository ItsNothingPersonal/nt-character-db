<script lang="ts">
	import ValueRating from '$lib/components/valueRating/valueRating.svelte';
	import { isNullOrUndefined } from '$lib/util';
	import { getAttributesMaximum } from '$lib/validation/attributes';
	import { costConfig } from '$lib/validation/config/constConfig';
	import { get } from 'svelte/store';
	import { characterStore } from '../characterStore';

	const max = getAttributesMaximum($characterStore.generation);

	function handleChange(event: CustomEvent<{ label: string; old: number; new: number }>): void {
		const costConfigEntry = costConfig.get('Attribute');

		if (isNullOrUndefined(costConfigEntry)) {
			console.error('Config zum Steigern für Attribute fehlen!');
			return;
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

<div
	class="grid auto-rows-auto grid-cols-1 gap-2 gap-y-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3"
>
	<ValueRating
		label="Physical"
		bind:value={$characterStore.attributes.physical_value}
		specialization={$characterStore.attributes.physical_specialization}
		{max}
		on:change={handleChange}
		start={get(characterStore).attributes.physical_value}
	/>
	<ValueRating
		label="Social"
		bind:value={$characterStore.attributes.social_value}
		specialization={$characterStore.attributes.social_specialization}
		{max}
		on:change={handleChange}
		start={get(characterStore).attributes.social_value}
	/>
	<ValueRating
		label="Mental"
		bind:value={$characterStore.attributes.mental_value}
		specialization={$characterStore.attributes.mental_specialization}
		{max}
		on:change={handleChange}
		start={get(characterStore).attributes.mental_value}
	/>
</div>
