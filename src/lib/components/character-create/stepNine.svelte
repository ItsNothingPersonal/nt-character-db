<script lang="ts">
	import { Step } from '@skeletonlabs/skeleton';
	import type { ZodIssue } from 'zod';
	import CharacterSheet from '../characterSheet/characterSheet.svelte';
	import { characterCreateStore } from '../characterSheet/characterStore';

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
