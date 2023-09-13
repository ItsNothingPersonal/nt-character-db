<script lang="ts">
	import type { DisciplineName } from '$lib/zod/disciplineName';
	import { Label, P } from 'flowbite-svelte';

	export let name: DisciplineName;
	export let disciplineValue: number;
</script>

<div class="flex flex-col">
	<Label color="red" class="flex items-center font-bold gap-2">
		{name}
		<P size="2xl">{disciplineValue}</P>
	</Label>
</div>
