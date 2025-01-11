<script lang="ts">
	import EditableMorality from '../../EditableMorality/EditableMorality.svelte';
	import { characterStore } from '../characterStore';
</script>

<div class="grid auto-rows-auto grid-cols-1 gap-2 sm:grid-cols-3">
	{#each $characterStore.morality as morality}
		<EditableMorality {morality} />
	{/each}
</div>
