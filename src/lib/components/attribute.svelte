<script lang="ts">
	import type { MentalSpecialization } from '$lib/zod/mentalSpecialization';
	import type { PhysicalSpecialization } from '$lib/zod/physicalSpecialization';
	import type { SocialSpecialization } from '$lib/zod/socialSpecialization';
	import { Label, P } from 'flowbite-svelte';

	export let name: 'Physical' | 'Social' | 'Mental';
	export let attributeValue: number;
	export let attributeSpecialization:
		| PhysicalSpecialization[]
		| SocialSpecialization[]
		| MentalSpecialization[];
</script>

<div class="flex flex-col">
	<Label color="red" class="flex items-center font-bold gap-2">
		{name}
		<P size="2xl">{attributeValue}</P>
	</Label>
	<P size="xs">{attributeSpecialization.join(', ')}</P>
</div>
