<script lang="ts">
	import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';
	import { characterStore } from './characterStore';
	import BaseInformation from './charactersheet-elements/baseInformation.svelte';

	import Loresheet from './charactersheet-elements/Loresheet.svelte';
	import Attributes from './charactersheet-elements/attributes.svelte';
	import Backgrounds from './charactersheet-elements/backgrounds.svelte';
	import Ceremonies from './charactersheet-elements/ceremonies.svelte';
	import Disciplines from './charactersheet-elements/disciplines.svelte';
	import Flaws from './charactersheet-elements/flaws.svelte';
	import Merits from './charactersheet-elements/merits.svelte';
	import Rituals from './charactersheet-elements/rituals.svelte';
	import Skills from './charactersheet-elements/skills.svelte';
	import { interactiveModeStore } from './interactiveModeStore';

	export let autocollapse: boolean;
	export let interactive: boolean = false;
	export let open: boolean = false;

	onMount(() => {
		if (interactive) {
			interactiveModeStore.set(true);
		} else {
			interactiveModeStore.set(false);
		}
	});
</script>

<h1 class="h1 mb-2 w-full p-1 font-bold">{$characterStore.name}</h1>
<Accordion {autocollapse} padding="p-1" rounded="container" spacing="space-y-2">
	<AccordionItem {autocollapse} {open}>
		<svelte:fragment slot="summary">
			<h2 class="h2">Base</h2>
		</svelte:fragment>
		<svelte:fragment slot="content">
			<BaseInformation />
		</svelte:fragment>
	</AccordionItem>
	<AccordionItem {autocollapse} {open}>
		<svelte:fragment slot="summary">
			<h2 class="h2">Attributes</h2>
		</svelte:fragment>
		<svelte:fragment slot="content">
			<Attributes />
		</svelte:fragment>
	</AccordionItem>
	<AccordionItem {autocollapse} {open}>
		<svelte:fragment slot="summary">
			<h2 class="h2">Skills</h2>
		</svelte:fragment>
		<svelte:fragment slot="content">
			<Skills />
		</svelte:fragment>
	</AccordionItem>
	<AccordionItem {autocollapse} {open}>
		<svelte:fragment slot="summary">
			<h2 class="h2">Disciplines</h2>
		</svelte:fragment>
		<svelte:fragment slot="content">
			<Disciplines />
		</svelte:fragment>
	</AccordionItem>
	<AccordionItem {autocollapse} {open}>
		<svelte:fragment slot="summary">
			<h2 class="h2">Backgrounds</h2>
		</svelte:fragment>
		<svelte:fragment slot="content">
			<Backgrounds />
		</svelte:fragment>
	</AccordionItem>
	{#if $characterStore.loresheet}
		<AccordionItem {autocollapse} {open}>
			<svelte:fragment slot="summary">
				<h2 class="h2">Loresheet</h2>
			</svelte:fragment>
			<svelte:fragment slot="content">
				<Loresheet />
			</svelte:fragment>
		</AccordionItem>
	{/if}
	{#if $characterStore.merits && $characterStore.merits.length > 0}
		<AccordionItem {autocollapse} {open}>
			<svelte:fragment slot="summary">
				<h2 class="h2">Merits</h2>
			</svelte:fragment>
			<svelte:fragment slot="content">
				<Merits />
			</svelte:fragment>
		</AccordionItem>
	{/if}
	{#if $characterStore.flaws && $characterStore.flaws.length > 0}
		<AccordionItem {autocollapse} {open}>
			<svelte:fragment slot="summary">
				<h2 class="h2">Flaws</h2>
			</svelte:fragment>
			<svelte:fragment slot="content">
				<Flaws />
			</svelte:fragment>
		</AccordionItem>
	{/if}
	{#if $characterStore.rituals && $characterStore.rituals.length > 0}
		<AccordionItem {autocollapse} {open}>
			<svelte:fragment slot="summary">
				<h2 class="h2">Blood Sorcery Rituals</h2>
			</svelte:fragment>
			<svelte:fragment slot="content">
				<Rituals />
			</svelte:fragment>
		</AccordionItem>
	{/if}
	{#if $characterStore.ceremonies && $characterStore.ceremonies.length > 0}
		<AccordionItem {autocollapse} {open}>
			<svelte:fragment slot="summary">
				<h2 class="h2">Oblivion Ceremonies</h2>
			</svelte:fragment>
			<svelte:fragment slot="content">
				<Ceremonies />
			</svelte:fragment>
		</AccordionItem>
	{/if}
</Accordion>
