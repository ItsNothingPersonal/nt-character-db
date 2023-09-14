<script lang="ts">
	import type { PlayerTechnique } from '$lib/zod/playerTechnique';
	import { Heading } from 'flowbite-svelte';
	import Technique from './technique.svelte';

	export let techniques: PlayerTechnique[] | undefined;
</script>

{#if techniques && techniques.length > 0}
	<div class="mt-2">
		<Heading tag="h2">Techniques</Heading>
		<div class="grid auto-rows-auto grid-cols-1 xs:grid-cols-2 sm:grid-cols-3">
			{#each techniques as technique}
				<Technique name={technique.name} />
			{/each}
		</div>
	</div>
{/if}
