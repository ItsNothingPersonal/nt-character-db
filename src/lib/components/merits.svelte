<script lang="ts">
	import type { PlayerMerit } from '$lib/zod/playerMerit';

	export let merits: PlayerMerit[];

	const baseUrl = 'https://vamp.bynightstudios.com/vampire/merits';
</script>

<div
	class="grid auto-rows-auto grid-cols-1 gap-2 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-6 2xl:grid-cols-6"
>
	{#each merits as merit}
		<a href="{baseUrl}/{merit.name.toLowerCase()}" class="underline decoration-dotted">
			<p>{merit.name}</p>
		</a>
	{/each}
</div>
