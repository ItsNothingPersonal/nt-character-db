<script lang="ts">
	import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';
	import { characterStore } from './characterStore';
	import Attributes from './charactersheet-elements/attributes.svelte';
	import Backgrounds from './charactersheet-elements/backgrounds.svelte';
	import BaseInformation from './charactersheet-elements/baseInformation.svelte';
	import Disciplines from './charactersheet-elements/disciplines.svelte';
	import Experience from './charactersheet-elements/experience.svelte';
	import Flaws from './charactersheet-elements/flaws.svelte';
	import Items from './charactersheet-elements/items.svelte';
	import Merits from './charactersheet-elements/merits.svelte';
	import Morality from './charactersheet-elements/morality.svelte';
	import Skills from './charactersheet-elements/skills.svelte';
	import Techniques from './charactersheet-elements/techniques.svelte';
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

<h1 class="h1 mb-2 w-full p-1">{$characterStore.name}</h1>
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

	{#if ($characterStore.techniques && $characterStore.techniques.length > 0) || ($interactiveModeStore && $characterStore.generation >= 8)}
		<AccordionItem {autocollapse} {open}>
			<svelte:fragment slot="summary">
				<h2 class="h2">Techniques</h2>
			</svelte:fragment>
			<svelte:fragment slot="content">
				<Techniques />
			</svelte:fragment>
		</AccordionItem>
	{/if}

	<AccordionItem {autocollapse} {open}>
		<svelte:fragment slot="summary">
			<h2 class="h2">Morality</h2>
		</svelte:fragment>
		<svelte:fragment slot="content">
			<Morality />
		</svelte:fragment>
	</AccordionItem>

	{#if ($characterStore.merits && $characterStore.merits.length > 0) || $interactiveModeStore}
		<AccordionItem {autocollapse} {open}>
			<svelte:fragment slot="summary">
				<h2 class="h2">Merits</h2>
			</svelte:fragment>
			<svelte:fragment slot="content">
				<Merits />
			</svelte:fragment>
		</AccordionItem>
	{/if}

	{#if ($characterStore.flaws && $characterStore.flaws.length > 0) || $interactiveModeStore}
		<AccordionItem {autocollapse} {open}>
			<svelte:fragment slot="summary">
				<h2 class="h2">Flaws</h2>
			</svelte:fragment>
			<svelte:fragment slot="content">
				<Flaws />
			</svelte:fragment>
		</AccordionItem>
	{/if}

	<AccordionItem {autocollapse} {open}>
		<svelte:fragment slot="summary">
			<h2 class="h2">Backgrounds</h2>
		</svelte:fragment>
		<svelte:fragment slot="content">
			<Backgrounds />
		</svelte:fragment>
	</AccordionItem>

	{#if $characterStore.items && $characterStore.items.length > 0}
		<AccordionItem {autocollapse} {open}>
			<svelte:fragment slot="summary">
				<h2 class="h2">Items</h2>
			</svelte:fragment>
			<svelte:fragment slot="content">
				<Items items={$characterStore.items} />
			</svelte:fragment>
		</AccordionItem>
	{/if}

	{#if $characterStore.experience && $characterStore.experience.length > 0}
		<AccordionItem {autocollapse} {open}>
			<svelte:fragment slot="summary">
				<h2 class="h2">Experience</h2>
			</svelte:fragment>
			<svelte:fragment slot="content">
				<Experience experience={$characterStore.experience} />
			</svelte:fragment>
		</AccordionItem>
	{/if}
</Accordion>
