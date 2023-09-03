<script lang="ts">
	import type { ArchetypeName } from '$lib/zod/archetypeName';
	import type { ClanName } from '$lib/zod/clanName';
	import { Label, P } from 'flowbite-svelte';

	export let clan: ClanName;
	export let generation: number;
	export let archetype: ArchetypeName;
</script>

<div class="grid grid-cols-2 sm:grid-cols-3 grid-rows-2 sm:grid-rows-1 mt-4">
	<Label color="red" class="flex items-center font-bold gap-2">
		Clan <P>{clan}</P>
	</Label>
	<Label color="red" class="flex items-center font-bold gap-2">
		Generation <P>{generation}th</P>
	</Label>
	<Label color="red" class="flex items-center font-bold gap-2 col-span-2 sm:col-span-1">
		Archetype <P>{archetype}</P>
	</Label>
</div>
