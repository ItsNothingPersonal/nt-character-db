<script lang="ts">
	import EditableAttribute from '../../EditableAttributes/EditableAttribute.svelte';
	import { characterStore } from '../characterStore';
</script>

<div class="grid auto-rows-auto grid-cols-1 gap-2 lg:grid-cols-3">
	<div class="flex flex-col gap-2">
		<h3 class="h3">Physical</h3>
		<EditableAttribute
			attributeName="Strength"
			attributeValue={$characterStore.attributes.physical_strength}
			displayStyle="dots"
		/>
		<EditableAttribute
			attributeName="Dexterity"
			attributeValue={$characterStore.attributes.physical_dexterity}
			displayStyle="dots"
		/>
		<EditableAttribute
			attributeName="Stamina"
			attributeValue={$characterStore.attributes.physical_stamina}
			displayStyle="dots"
		/>
	</div>
	<div class="flex flex-col gap-2">
		<h3 class="h3">Social</h3>
		<EditableAttribute
			attributeName="Charisma"
			attributeValue={$characterStore.attributes.social_charisma}
			displayStyle="dots"
		/>
		<EditableAttribute
			attributeName="Manipulation"
			attributeValue={$characterStore.attributes.social_manipulation}
			displayStyle="dots"
		/>
		<EditableAttribute
			attributeName="Composure"
			attributeValue={$characterStore.attributes.social_composure}
			displayStyle="dots"
		/>
	</div>
	<div class="flex flex-col gap-2">
		<h3 class="h3">Mental</h3>
		<EditableAttribute
			attributeName="Intelligence"
			attributeValue={$characterStore.attributes.mental_intelligence}
			displayStyle="dots"
		/>
		<EditableAttribute
			attributeName="Wits"
			attributeValue={$characterStore.attributes.mental_wits}
			displayStyle="dots"
		/>
		<EditableAttribute
			attributeName="Resolve"
			attributeValue={$characterStore.attributes.mental_resolve}
			displayStyle="dots"
		/>
	</div>
</div>
