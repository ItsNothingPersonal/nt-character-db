<script lang="ts">
	import type { OblivionCeremonyName } from '$lib/zod/lotn/enums/oblivionCeremonyName';
	import { ceremoniesConfig } from '../../config/ceremoniesConfig';
	import HelpText from './HelpText.svelte';

	export let ceremony: OblivionCeremonyName;

	const ceremonyConfigEntry = ceremoniesConfig.ceremonies[ceremony];
</script>

<div class="flex flex-col">
	{#if ceremonyConfigEntry}
		<label
			class="card label grid h-full w-full grid-cols-1 grid-rows-1 rounded-lg p-4"
			for={ceremony}
		>
			<HelpText id={ceremony}>
				<span id={ceremony} class="whitespace-pre-line">
					{ceremony} (Level {ceremonyConfigEntry.level})
				</span>
				<svelte:fragment slot="helpText">
					<p class="whitespace-pre-line">
						<span class="font-bold">Ingredients:</span>
						{ceremonyConfigEntry.ingredients}
					</p>
					<br />
					<p class="whitespace-pre-line">
						<span class="font-bold">Process:</span>
						{ceremonyConfigEntry.process}
					</p>
					<br />
					<p class="whitespace-pre-line">
						<span class="font-bold">System:</span>
						{ceremonyConfigEntry.system}
					</p>
					<br />
					{#if ceremonyConfigEntry.statblock}
						<p class="whitespace-pre-line">
							<span class="font-bold">Statblock: {ceremonyConfigEntry.statblock.name}</span><br />
							{ceremonyConfigEntry.statblock.description}
						</p>
						<br />
					{/if}
					<p class="whitespace-pre-line">
						<span class="font-bold">Duration:</span>
						{ceremonyConfigEntry.duration}
					</p>
				</svelte:fragment>
			</HelpText>
		</label>
	{/if}
</div>
