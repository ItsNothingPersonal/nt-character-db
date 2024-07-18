<script lang="ts">
	import { characterStore } from '../characterStore';
	import Background from '../components/Background.svelte';
</script>

<div class="grid auto-rows-auto grid-cols-2 gap-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-5">
	{#each $characterStore.backgrounds as background}
		<Background {background} />
	{/each}
</div>
