<script lang="ts">
	import Attributes from '$lib/components/attributes.svelte';
	import Backgrounds from '$lib/components/backgrounds.svelte';
	import BaseInformation from '$lib/components/baseInformation.svelte';
	import Disciplines from '$lib/components/disciplines.svelte';
	import Experience from '$lib/components/experience.svelte';
	import Flaws from '$lib/components/flaws.svelte';
	import Items from '$lib/components/items.svelte';
	import Merits from '$lib/components/merits.svelte';
	import Morality from '$lib/components/morality.svelte';
	import Skills from '$lib/components/skills.svelte';
	import Techniques from '$lib/components/techniques.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	$: ({ characterData } = data);
</script>

<h1 class="h1">{characterData.name}</h1>
<BaseInformation
	clan={characterData.clan}
	generation={characterData.generation}
	archetype={characterData.archetype}
/>
<Attributes attributes={characterData.attributes} generation={characterData.generation} />
<Skills skills={characterData.skills} />
<Disciplines disciplines={characterData.disciplines} />
<Techniques techniques={characterData.techniques} />
<Morality morality={characterData.morality} />
<Merits merits={characterData.merits} />
<Flaws flaws={characterData.flaws} />
<Backgrounds backgrounds={characterData.backgrounds} />
<Items items={characterData.items} />
<Experience experience={characterData.experience} />
