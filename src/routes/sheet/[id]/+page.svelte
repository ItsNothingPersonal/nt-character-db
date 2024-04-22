<script lang="ts">
	import CharacterSheet from '$lib/components/characterSheet/characterSheet.svelte';

	let innerWidth = 0;
	$: autocollapse = innerWidth >= 640 ? true : false;
</script>

<svelte:window bind:innerWidth />
<CharacterSheet {autocollapse} />
