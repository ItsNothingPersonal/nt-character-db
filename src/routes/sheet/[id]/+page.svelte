<script lang="ts">
	import CharacterSheet from '$lib/components/characterSheet/characterSheet.svelte';
	import { detectTouchscreen } from '$lib/util';

	let innerWidth = 0;
	$: autocollapse = innerWidth <= 640 ? true : false;
</script>

<svelte:window bind:innerWidth />
<CharacterSheet {autocollapse} open={detectTouchscreen() ? false : true} />
