<script lang="ts">
	import HelpText from '../lotn/characterSheet/components/HelpText.svelte';

	export let checked = false;
	export let helpText: string;
	export let helpTextId: string;
</script>

<label class="flex items-center gap-2">
	<input class="checkbox" type="checkbox" bind:checked />
	<HelpText id={helpTextId} placement="bottom-start">
		<slot />
		<svelte:fragment slot="helpText">
			<p class="whitespace-pre-line">
				{helpText}
			</p>
		</svelte:fragment>
	</HelpText>
</label>
