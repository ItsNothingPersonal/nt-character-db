<script lang="ts">
	import type { PlayerCharacter } from '$lib/zod/playerCharacter/playerCharacter';
	import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';
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

	export let characterData: PlayerCharacter;
	export let open: boolean;
</script>

<h1 class="h1 mb-2 p-1">{characterData.name}</h1>
<Accordion padding="p-1" rounded="container" spacing="space-y-2" autocollapse={open}>
	<AccordionItem {open}>
		<svelte:fragment slot="summary">
			<h2 class="h2">Base</h2>
		</svelte:fragment>
		<svelte:fragment slot="content">
			<BaseInformation
				clan={characterData.clan}
				generation={characterData.generation}
				archetype={characterData.archetype}
			/>
		</svelte:fragment>
	</AccordionItem>

	<AccordionItem {open}>
		<svelte:fragment slot="summary">
			<h2 class="h2">Attributes</h2>
		</svelte:fragment>
		<svelte:fragment slot="content">
			<Attributes attributes={characterData.attributes} generation={characterData.generation} />
		</svelte:fragment>
	</AccordionItem>

	<AccordionItem {open}>
		<svelte:fragment slot="summary">
			<h2 class="h2">Skills</h2>
		</svelte:fragment>
		<svelte:fragment slot="content">
			<Skills skills={characterData.skills} />
		</svelte:fragment>
	</AccordionItem>

	<AccordionItem {open}>
		<svelte:fragment slot="summary">
			<h2 class="h2">Disciplines</h2>
		</svelte:fragment>
		<svelte:fragment slot="content">
			<Disciplines disciplines={characterData.disciplines} />
		</svelte:fragment>
	</AccordionItem>

	{#if characterData.techniques && characterData.techniques.length > 0}
		<AccordionItem {open}>
			<svelte:fragment slot="summary">
				<h2 class="h2">Techniques</h2>
			</svelte:fragment>
			<svelte:fragment slot="content">
				<Techniques techniques={characterData.techniques} />
			</svelte:fragment>
		</AccordionItem>
	{/if}

	<AccordionItem {open}>
		<svelte:fragment slot="summary">
			<h2 class="h2">Morality</h2>
		</svelte:fragment>
		<svelte:fragment slot="content">
			<Morality morality={characterData.morality} />
		</svelte:fragment>
	</AccordionItem>

	{#if characterData.merits && characterData.merits.length > 0}
		<AccordionItem {open}>
			<svelte:fragment slot="summary">
				<h2 class="h2">Merits</h2>
			</svelte:fragment>
			<svelte:fragment slot="content">
				<Merits merits={characterData.merits} />
			</svelte:fragment>
		</AccordionItem>
	{/if}

	{#if characterData.flaws && characterData.flaws.length > 0}
		<AccordionItem {open}>
			<svelte:fragment slot="summary">
				<h2 class="h2">Flaws</h2>
			</svelte:fragment>
			<svelte:fragment slot="content">
				<Flaws flaws={characterData.flaws} />
			</svelte:fragment>
		</AccordionItem>
	{/if}

	<AccordionItem {open}>
		<svelte:fragment slot="summary">
			<h2 class="h2">Backgrounds</h2>
		</svelte:fragment>
		<svelte:fragment slot="content">
			<Backgrounds backgrounds={characterData.backgrounds} />
		</svelte:fragment>
	</AccordionItem>

	{#if characterData.items && characterData.items.length > 0}
		<AccordionItem {open}>
			<svelte:fragment slot="summary">
				<h2 class="h2">Items</h2>
			</svelte:fragment>
			<svelte:fragment slot="content">
				<Items items={characterData.items} />
			</svelte:fragment>
		</AccordionItem>
	{/if}

	{#if characterData.experience && characterData.experience.length > 0}
		<AccordionItem {open}>
			<svelte:fragment slot="summary">
				<h2 class="h2">Experience</h2>
			</svelte:fragment>
			<svelte:fragment slot="content">
				<Experience experience={characterData.experience} />
			</svelte:fragment>
		</AccordionItem>
	{/if}
</Accordion>
