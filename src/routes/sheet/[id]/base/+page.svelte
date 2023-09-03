<script lang="ts">
	import Attributes from '$lib/components/attributes.svelte';
	import BaseInformation from '$lib/components/baseInformation.svelte';
	import Skills from '$lib/components/skills.svelte';
	import { Heading } from 'flowbite-svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	$: ({ characterData } = data);
</script>

<Heading tag="h1">{characterData.name}</Heading>
<BaseInformation
	clan={characterData.clan}
	generation={characterData.generation}
	archetype={characterData.archetype}
/>

<Attributes attributes={characterData.attributes} />
<Skills skills={characterData.skills} />
