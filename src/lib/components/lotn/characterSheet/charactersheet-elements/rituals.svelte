<script lang="ts">
	import { bloodSorceryRitualConfig } from '../../config/bloodSorceryRitualsConfig';
	import { characterStore } from '../characterStore';
	import HelpText from '../components/HelpText.svelte';
	import Ritual from '../components/Ritual.svelte';
</script>

<HelpText id="bloodSorceryRituals">
	<h3 class="h3">Rituals</h3>
	<svelte:fragment slot="helpText">
		<p class="whitespace-pre-line">
			<span class="font-bold">Description:</span>
			{bloodSorceryRitualConfig.characteristics.description}
		</p>
		<br />
		<p class="whitespace-pre-line">
			<span class="font-bold">Wards:</span>
			{bloodSorceryRitualConfig.characteristics.wards}
		</p>
		<br />
		<p class="whitespace-pre-line">
			<span class="font-bold">Warding Circles:</span>
			{bloodSorceryRitualConfig.characteristics.wardingCircles}
		</p>
	</svelte:fragment>
</HelpText>

<div class="grid auto-rows-auto grid-cols-1 gap-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-5">
	{#each $characterStore.rituals?.sort((a, b) => a.localeCompare(b)) ?? [] as ritual}
		<Ritual {ritual} />
	{/each}
</div>
