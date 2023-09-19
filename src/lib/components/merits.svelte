<script lang="ts">
	import type { PlayerMerit } from '$lib/zod/playerMerit';

	export let merits: PlayerMerit[] | undefined;

	const baseUrl = 'https://vamp.bynightstudios.com/vampire/merits';
</script>

{#if merits && merits.length > 0}
	<div class="mt-6">
		<h2 class="h2">Merits</h2>
		<div
			class="mt-1 grid auto-rows-auto grid-cols-1 gap-2 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-6 2xl:grid-cols-6"
		>
			{#each merits as merit}
				<a href="{baseUrl}/{merit.name.toLowerCase()}">
					<p>{merit.name}</p>
				</a>
			{/each}
		</div>
	</div>
{/if}
