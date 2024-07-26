<script lang="ts">
	import { characterStore } from '../characterStore';
	import Flaw from '../components/Flaw.svelte';
</script>

<div class="grid auto-rows-auto grid-cols-1 gap-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-5">
	{#each $characterStore.flaws ?? [] as flaw}
		<Flaw {flaw} />
	{/each}
</div>
