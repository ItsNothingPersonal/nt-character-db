<script lang="ts">
	import { characterStore } from '../characterStore';
	import Merit from '../components/Merit.svelte';
</script>

<div
	class="grid auto-rows-auto grid-cols-2 gap-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-6"
>
	{#each $characterStore.merits ?? [] as merit}
		<Merit {merit} />
	{/each}
</div>
