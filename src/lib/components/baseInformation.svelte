<script lang="ts">
	import type { ArchetypeName } from '$lib/zod/archetypeName';
	import type { ClanName } from '$lib/zod/clanName';
	import P from './typography/p.svelte';

	export let clan: ClanName;
	export let generation: number;
	export let archetype: ArchetypeName;
</script>

<div class="mt-4 grid grid-cols-3 grid-rows-1 gap-2">
	<label class="label flex flex-col" for="clan">
		<span>Clan</span>
		<p id="clan" class="variant-form-material chip m-0 mt-1 justify-start px-3 py-2 text-base">
			{clan}
		</p>
	</label>
	<label class="label flex flex-col" for="generation">
		<span>Generation</span>
		<P id="generation">{generation}</P>
	</label>
	<label class="label flex flex-col" for="archetype">
		<span>Archetype</span>
		<P id="archetype">{archetype}</P>
	</label>
</div>
