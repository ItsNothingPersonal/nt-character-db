<script lang="ts">
	import type { ArchetypeName } from '$lib/zod/archetypeName';
	import type { ClanName } from '$lib/zod/clanName';
	import { Label, P } from 'flowbite-svelte';

	export let clan: ClanName;
	export let generation: number;
	export let archetype: ArchetypeName;
</script>

<div class="xss:grid-cols-2 mt-4 grid grid-cols-1 grid-rows-2 sm:grid-cols-3 sm:grid-rows-1">
	<Label color="red" class="flex items-center gap-2 font-bold">
		Clan <P>{clan}</P>
	</Label>
	<Label color="red" class="flex items-center gap-2 font-bold">
		Generation <P>{generation}th</P>
	</Label>
	<Label color="red" class="flex items-center gap-2 font-bold">
		Archetype <P>{archetype}</P>
	</Label>
</div>
