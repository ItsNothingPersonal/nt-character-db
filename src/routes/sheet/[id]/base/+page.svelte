<script lang="ts">
	import { Heading, Label, P } from 'flowbite-svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<Heading tag="h1">{data.characterData.name}</Heading>
<div class="grid grid-cols-2 sm:grid-cols-3 grid-rows-2 sm:grid-rows-1 justify-items-center">
	<Label color="red" class="mt-4 flex items-center font-bold italic gap-2">
		Clan <P>{data.characterData.clan}</P>
	</Label>
	<Label color="red" class="mt-4 flex items-center font-bold italic gap-2">
		Generation <P>{data.characterData.generation}th</P>
	</Label>
	<Label color="red" class="mt-4 flex items-center font-bold italic gap-2 col-span-2 sm:col-span-1">
		Archetyp <P>{data.characterData.archetype}</P>
	</Label>
</div>
