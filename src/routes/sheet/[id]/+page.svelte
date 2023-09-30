<script lang="ts">
	import CharacterSheet from '$lib/components/characterSheet/characterSheet.svelte';

	export let data;

	let innerWidth = 0;
	$: open = innerWidth >= 640 ? true : false;
</script>

<svelte:window bind:innerWidth />
<CharacterSheet characterData={data.characterData} {open} />
