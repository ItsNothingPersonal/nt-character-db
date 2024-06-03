<script lang="ts">
	import P from '$lib/components/typography/p.svelte';
	import { characterStore } from '../characterStore';
</script>

<div class="grid grid-cols-3 grid-rows-1 gap-2">
	<label class="label flex flex-col" for="clan">
		<span>Clan</span>
		<p id="clan" class="variant-form-material chip m-0 mt-1 justify-start px-3 py-2 text-base">
			{$characterStore.clan}
		</p>
	</label>
	<label class="label flex flex-col" for="generation">
		<span>Generation</span>
		<P id="generation">{$characterStore.generation}</P>
	</label>
	<label class="label flex flex-col" for="archetype">
		<span>Archetype</span>
		<P id="archetype">{$characterStore.archetype}</P>
	</label>
</div>
