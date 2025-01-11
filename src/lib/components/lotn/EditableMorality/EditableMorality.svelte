<script lang="ts">
	import type { PlayerMorality } from '$lib/zod/lotn/playerCharacter/playerMorality';

	export let morality: PlayerMorality;
</script>

<label class="card flex flex-col rounded-lg p-4" for={morality.conviction}>
	<span id={morality.conviction} class="whitespace-pre-line font-bold">{morality.conviction}</span>
	<p class="whitespace-pre-line text-sm">{morality.touchstone}</p>
</label>
