<script lang="ts">
	import type { PlayerAttribute } from '$lib/zod/playerAttribute';
	import { Heading } from 'flowbite-svelte';
	import TextWithValue from './textWithValue.svelte';

	export let attributes: PlayerAttribute;
</script>

<div class="mt-2">
	<Heading tag="h2">Attributes</Heading>
	<div class="grid auto-rows-auto grid-cols-1 xss:grid-cols-2 sm:grid-cols-3">
		<TextWithValue
			name="Physical"
			value={attributes.physical_value}
			specialization={attributes.physical_specialization.join(', ')}
		/>
		<TextWithValue
			name="Social"
			value={attributes.social_value}
			specialization={attributes.social_specialization.join(', ')}
		/>
		<TextWithValue
			name="Mental"
			value={attributes.mental_value}
			specialization={attributes.mental_specialization.join(', ')}
		/>
	</div>
</div>
