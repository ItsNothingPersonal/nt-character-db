<script lang="ts">
	import { attributesPaidWithDotsStore } from '$lib/stores/attributesPaidWithDotsStore';
	import type { AttributeName } from '$lib/zod/lotn/enums/attributeName';
	import type { PlayerAttribute } from '$lib/zod/lotn/playerCharacter/playerAttribute';
	import { createEventDispatcher } from 'svelte';
	import EditableAttribute from './EditableAttribute.svelte';

	export let playerAttributes: PlayerAttribute;

	export let displayStyle: 'numbers' | 'dots' = 'numbers';
	export let displayValue: 'below' | 'beside' = 'below';
	export let editModeEnabled: boolean = false;

	const dispatchChange = createEventDispatcher<{
		valueChange: { label: AttributeName; value: number };
	}>();
</script>

<div class="grid auto-rows-auto grid-cols-1 gap-2 lg:grid-cols-3">
	<div class="flex flex-col gap-2">
		<h3 class="h3">Physical</h3>
		<EditableAttribute
			attributeName="Strength"
			attributeValue={playerAttributes.physical_strength}
			{displayStyle}
			{displayValue}
			{editModeEnabled}
			minValue={attributesPaidWithDotsStore.getAttributesPaidWithDotsByName('Strength')}
			on:valueChange={(event) => dispatchChange('valueChange', event.detail)}
		/>
		<EditableAttribute
			attributeName="Dexterity"
			attributeValue={playerAttributes.physical_dexterity}
			{displayStyle}
			{displayValue}
			{editModeEnabled}
			minValue={attributesPaidWithDotsStore.getAttributesPaidWithDotsByName('Dexterity')}
			on:valueChange={(event) => dispatchChange('valueChange', event.detail)}
		/>
		<EditableAttribute
			attributeName="Stamina"
			attributeValue={playerAttributes.physical_stamina}
			{displayStyle}
			{displayValue}
			{editModeEnabled}
			minValue={attributesPaidWithDotsStore.getAttributesPaidWithDotsByName('Stamina')}
			on:valueChange={(event) => dispatchChange('valueChange', event.detail)}
		/>
	</div>
	<div class="flex flex-col gap-2">
		<h3 class="h3">Social</h3>
		<EditableAttribute
			attributeName="Charisma"
			attributeValue={playerAttributes.social_charisma}
			{displayStyle}
			{displayValue}
			{editModeEnabled}
			minValue={attributesPaidWithDotsStore.getAttributesPaidWithDotsByName('Charisma')}
			on:valueChange={(event) => dispatchChange('valueChange', event.detail)}
		/>
		<EditableAttribute
			attributeName="Manipulation"
			attributeValue={playerAttributes.social_manipulation}
			{displayStyle}
			{displayValue}
			{editModeEnabled}
			minValue={attributesPaidWithDotsStore.getAttributesPaidWithDotsByName('Manipulation')}
			on:valueChange={(event) => dispatchChange('valueChange', event.detail)}
		/>
		<EditableAttribute
			attributeName="Composure"
			attributeValue={playerAttributes.social_composure}
			{displayStyle}
			{displayValue}
			{editModeEnabled}
			minValue={attributesPaidWithDotsStore.getAttributesPaidWithDotsByName('Composure')}
			on:valueChange={(event) => dispatchChange('valueChange', event.detail)}
		/>
	</div>
	<div class="flex flex-col gap-2">
		<h3 class="h3">Mental</h3>
		<EditableAttribute
			attributeName="Intelligence"
			attributeValue={playerAttributes.mental_intelligence}
			{displayStyle}
			{displayValue}
			{editModeEnabled}
			minValue={attributesPaidWithDotsStore.getAttributesPaidWithDotsByName('Intelligence')}
			on:valueChange={(event) => dispatchChange('valueChange', event.detail)}
		/>
		<EditableAttribute
			attributeName="Wits"
			attributeValue={playerAttributes.mental_wits}
			{displayStyle}
			{displayValue}
			{editModeEnabled}
			minValue={attributesPaidWithDotsStore.getAttributesPaidWithDotsByName('Wits')}
			on:valueChange={(event) => dispatchChange('valueChange', event.detail)}
		/>
		<EditableAttribute
			attributeName="Resolve"
			attributeValue={playerAttributes.mental_resolve}
			{displayStyle}
			{displayValue}
			{editModeEnabled}
			minValue={attributesPaidWithDotsStore.getAttributesPaidWithDotsByName('Resolve')}
			on:valueChange={(event) => dispatchChange('valueChange', event.detail)}
		/>
	</div>
</div>
