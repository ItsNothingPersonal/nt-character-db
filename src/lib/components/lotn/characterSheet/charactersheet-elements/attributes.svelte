<script lang="ts">
	import ValueRating from '$lib/components/lotn/characterSheet/components/ValueRating.svelte';
	import { get } from 'svelte/store';
	import { attributeConfig } from '../../config/attributeConfig';
	import { characterStore } from '../characterStore';
</script>

<div class="grid auto-rows-auto grid-cols-1 gap-2 lg:grid-cols-3">
	<div class="flex flex-col gap-2">
		<h3 class="h3">Physical</h3>
		<ValueRating
			helpText={attributeConfig.physical.strength.helptext}
			label="Strength"
			start={get(characterStore).attributes.physical_strength}
			bind:value={$characterStore.attributes.physical_strength}
		/>
		<ValueRating
			helpText={attributeConfig.physical.dexterity.helptext}
			label="Dexterity"
			start={get(characterStore).attributes.physical_dexterity}
			bind:value={$characterStore.attributes.physical_dexterity}
		/>
		<ValueRating
			helpText={attributeConfig.physical.stamina.helptext}
			label="Stamina"
			start={get(characterStore).attributes.physical_stamina}
			bind:value={$characterStore.attributes.physical_stamina}
		/>
	</div>
	<div class="flex flex-col gap-2">
		<h3 class="h3">Social</h3>
		<ValueRating
			helpText={attributeConfig.social.charisma.helptext}
			label="Charisma"
			start={get(characterStore).attributes.social_charisma}
			bind:value={$characterStore.attributes.social_charisma}
		/>
		<ValueRating
			helpText={attributeConfig.social.manipulation.helptext}
			label="Manipulation"
			start={get(characterStore).attributes.social_manipulation}
			bind:value={$characterStore.attributes.social_manipulation}
		/>
		<ValueRating
			helpText={attributeConfig.social.composure.helptext}
			label="Composure"
			start={get(characterStore).attributes.social_composure}
			bind:value={$characterStore.attributes.social_composure}
		/>
	</div>
	<div class="flex flex-col gap-2">
		<h3 class="h3">Mental</h3>
		<ValueRating
			helpText={attributeConfig.mental.intelligence.helptext}
			label="Intelligence"
			start={get(characterStore).attributes.mental_intelligence}
			bind:value={$characterStore.attributes.mental_intelligence}
		/>
		<ValueRating
			helpText={attributeConfig.mental.wits.helptext}
			label="Wits"
			start={get(characterStore).attributes.mental_wits}
			bind:value={$characterStore.attributes.mental_wits}
		/>
		<ValueRating
			helpText={attributeConfig.mental.resolve.helptext}
			label="Resolve"
			start={get(characterStore).attributes.mental_resolve}
			bind:value={$characterStore.attributes.mental_resolve}
		/>
	</div>
</div>
