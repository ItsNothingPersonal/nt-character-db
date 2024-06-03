<script lang="ts">
	import CharacterSheet from '$lib/components/classic/characterSheet/characterSheet.svelte';
	import { characterCreateStore } from '$lib/components/classic/characterSheet/characterStore';
	import { Step } from '@skeletonlabs/skeleton';
	import type { ZodIssue } from 'zod';

	let parsingErrors: ZodIssue[] | undefined = undefined;

	$: locked = parsingErrors !== undefined;
</script>

<Step {locked}>
	<svelte:fragment slot="header">Step 9: Nine: Spending XP</svelte:fragment>
	{#if parsingErrors === undefined}
		<CharacterSheet autocollapse={false} interactive={true} />
	{:else}
		<p>{JSON.stringify(parsingErrors)}</p>
		<p>{JSON.stringify($characterCreateStore, undefined, 2)}</p>
	{/if}
</Step>
