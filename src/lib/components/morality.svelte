<script lang="ts">
	import type { PlayerMorality } from '$lib/zod/playerMorality';
	import ValueNumber from './valueNumber/valueNumber.svelte';

	export let morality: PlayerMorality;

	const baseUrl = 'https://vamp.bynightstudios.com/vampire/merits';
</script>

<div class="mt-2">
	<h2 class="h2">Morality</h2>
	<ValueNumber
		label={morality.name}
		value={morality.value}
		href="{baseUrl}/{morality.name.toLowerCase()}"
	/>
</div>
