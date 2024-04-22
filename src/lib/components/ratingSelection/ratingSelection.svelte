<script lang="ts" generics="T">
	import Selectionbox from '../selectionbox/selectionbox.svelte';

	export let label: string;
	export let optionNames: T[];
	export let optionRatings: number[];

	export let selectedName: T;
	export let selectedValue: number;

	export let showRating: boolean = true;
</script>

<div class="grid auto-rows-auto grid-cols-3 gap-2">
	<Selectionbox {label} selectableValues={optionNames} bind:value={selectedName} />
	{#if showRating}
		<Selectionbox label="Rating" selectableValues={optionRatings} bind:value={selectedValue} />
	{/if}
</div>
