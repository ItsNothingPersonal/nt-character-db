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
		{max}
		specialization={$characterStore.attributes.physical_specialization}
		start={get(characterStore).attributes.physical_value}
		bind:value={$characterStore.attributes.physical_value}
		on:change={handleChange}
	/>
	<ValueRating
		label="Social"
		{max}
		specialization={$characterStore.attributes.social_specialization}
		start={get(characterStore).attributes.social_value}
		bind:value={$characterStore.attributes.social_value}
		on:change={handleChange}
	/>
	<ValueRating
		label="Mental"
		{max}
		specialization={$characterStore.attributes.mental_specialization}
		start={get(characterStore).attributes.mental_value}
		bind:value={$characterStore.attributes.mental_value}
		on:change={handleChange}
	/>
</div>
