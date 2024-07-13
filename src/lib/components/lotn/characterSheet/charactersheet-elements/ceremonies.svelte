<script lang="ts">
	import { ceremoniesConfig } from '../../config/ceremoniesConfig';
	import { characterStore } from '../characterStore';
	import Ceremony from '../components/Ceremony.svelte';
	import HelpText from '../components/HelpText.svelte';
</script>

<HelpText id="oblivionCeremonies">
	<h3 class="h3">Ceremonies</h3>
	<svelte:fragment slot="helpText">
		<p class="whitespace-pre-line">
			<span class="font-bold">Description:</span>
			{ceremoniesConfig.characteristics}
		</p>
		<br />
	</svelte:fragment>
</HelpText>

<div class="grid auto-rows-auto grid-cols-2 gap-2 sm:grid-cols-4 md:grid-cols-4">
	{#each $characterStore.ceremonies?.sort((a, b) => a.localeCompare(b)) ?? [] as ceremony}
		<Ceremony {ceremony} />
	{/each}
</div>
