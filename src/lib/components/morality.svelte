<script lang="ts">
	import type { PlayerMorality } from '$lib/zod/playerMorality';
	import { Heading } from 'flowbite-svelte';
	import TextWithValue from './textWithValue.svelte';

	export let morality: PlayerMorality;
</script>

<div class="mt-2">
	<Heading tag="h2">Morality</Heading>
	<div class="grid grid-cols-3 grid-rows-1">
		<TextWithValue name={morality.name} value={morality.value} />
	</div>
</div>
