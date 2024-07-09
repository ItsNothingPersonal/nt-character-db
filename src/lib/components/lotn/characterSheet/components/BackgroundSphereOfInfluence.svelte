<script lang="ts">
	import type { SpheresOfInfluenceName } from '$lib/zod/lotn/enums/spheresOfInfluenceName';
	import { spheresOfInfluenceConfig } from '../../config/spheresOfInfluenceConfig';
	import HelpText from './HelpText.svelte';

	export let sphereOfInfluence: SpheresOfInfluenceName;

	const config = spheresOfInfluenceConfig[sphereOfInfluence];
</script>

<div class="flex gap-2">
	<span class="underline underline-offset-1">Sphere of Influence: </span>
	<HelpText id={`sphere-of-influence-${sphereOfInfluence}`}>
		<span>{sphereOfInfluence}</span>
		<svelte:fragment slot="helpText">
			<p class="whitespace-pre-line">
				{config.description}
			</p>
			{#if config.examples}
				<br />
				<p class="whitespace-pre-line">
					<strong>Example Contacts and Allies: </strong>
					{config.examples}
				</p>
			{/if}
		</svelte:fragment>
	</HelpText>
</div>
