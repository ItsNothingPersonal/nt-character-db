<script lang="ts">
	import EditableBackground from '../../EditableBackground/EditableBackground.svelte';
	import { characterStore } from '../characterStore';
</script>

<div class="grid auto-rows-auto grid-cols-1 gap-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-5">
	{#each $characterStore.backgrounds as background}
		<EditableBackground {background} />
	{/each}
</div>
