<script lang="ts">
	import type { PlayerMerit } from '$lib/zod/playerMerit';

	export let merits: PlayerMerit[] | undefined;

	const baseUrl = 'https://vamp.bynightstudios.com/vampire/merits';
</script>

{#if merits && merits.length > 0}
	<div class="mt-2">
		<h2 class="h2">Merits</h2>
		<div class="grid auto-rows-auto grid-cols-5 gap-2">
			{#each merits as merit}
				<a href="{baseUrl}/{merit.name.toLowerCase()}">
					<p>{merit.name}</p>
				</a>
			{/each}
		</div>
	</div>
{/if}
