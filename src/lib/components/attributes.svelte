<script lang="ts">
	import type { PlayerAttribute } from '$lib/zod/playerAttribute';
	import { Heading } from 'flowbite-svelte';
	import Attribute from './attribute.svelte';

	export let attributes: PlayerAttribute;
</script>

<div class="mt-2">
	<Heading tag="h2">Attributes</Heading>
	<div class="grid grid-cols-3 grid-rows-1">
		<Attribute
			name="Physical"
			attributeValue={attributes.physical_value}
			attributeSpecialization={attributes.physical_specialization}
		/>
		<Attribute
			name="Social"
			attributeValue={attributes.social_value}
			attributeSpecialization={attributes.social_specialization}
		/>
		<Attribute
			name="Mental"
			attributeValue={attributes.mental_value}
			attributeSpecialization={attributes.mental_specialization}
		/>
	</div>
</div>
