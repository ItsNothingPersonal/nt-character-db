<script lang="ts">
	import ValueRating from '$lib/components/valueRating/valueRating.svelte';
	import { getAttributesMaximum } from '$lib/validation/attributes';
	import type { PlayerAttribute } from '$lib/zod/playerCharacter/playerAttribute';

	export let attributes: PlayerAttribute;
	export let generation: number;

	const max = getAttributesMaximum(generation);
</script>

<div
	class="grid auto-rows-auto grid-cols-1 gap-2 gap-y-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3"
>
	<ValueRating
		label="Physical"
		value={attributes.physical_value}
		specialization={attributes.physical_specialization}
		{max}
	/>
	<ValueRating
		label="Social"
		value={attributes.social_value}
		specialization={attributes.social_specialization}
		{max}
	/>
	<ValueRating
		label="Mental"
		value={attributes.mental_value}
		specialization={attributes.mental_specialization}
		{max}
	/>
</div>
