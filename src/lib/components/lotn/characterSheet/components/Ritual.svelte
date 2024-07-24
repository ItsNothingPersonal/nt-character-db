<script lang="ts">
	import type { BloodSorceryRitualName } from '$lib/zod/lotn/enums/bloodSorceryRitualName';
	import { bloodSorceryRitualConfig } from '../../config/bloodSorceryRitualsConfig';
	import HelpText from './HelpText.svelte';

	export let ritual: BloodSorceryRitualName;

	const ritualConfigEntry = bloodSorceryRitualConfig.rituals[ritual];
</script>

<div class="flex flex-col">
	{#if ritualConfigEntry}
		<label
			class="card label grid h-full w-full grid-cols-1 grid-rows-1 rounded-sm p-4"
			for={ritual}
		>
			<HelpText id={ritual}>
				<span id={ritual} class="whitespace-pre-line">
					{ritual} (Level {ritualConfigEntry.level})
				</span>
				<svelte:fragment slot="helpText">
					{#if ritualConfigEntry.prerequisite}
						<p class="whitespace-pre-line">
							<span class="font-bold">Prerequisite:</span>
							{ritualConfigEntry.prerequisite}
						</p>
					{/if}
					<p class="whitespace-pre-line">
						<span class="font-bold">Ingredients:</span>
						{ritualConfigEntry.ingredients}
					</p>
					{#if ritualConfigEntry.process}
						<p class="whitespace-pre-line">
							<span class="font-bold">Process:</span>
							{ritualConfigEntry.process}
						</p>
					{/if}
					{#if ritualConfigEntry.challengePool}
						<p class="whitespace-pre-line">
							<span class="font-bold">Challenge Pool:</span>
							{#if typeof ritualConfigEntry.challengePool.defender === 'string'}
								{ritualConfigEntry.challengePool.attacker.attribute} + {ritualConfigEntry
									.challengePool.attacker.skill} vs {ritualConfigEntry.challengePool.defender}
							{:else}
								{ritualConfigEntry.challengePool.attacker.attribute} + {ritualConfigEntry
									.challengePool.attacker.skill} vs {`${ritualConfigEntry.challengePool.defender.attribute} + ${ritualConfigEntry.challengePool.defender.skillOrAttribute}`}
							{/if}

							{#if ritualConfigEntry.challengePool.hint}
								{ritualConfigEntry.challengePool.hint}
							{/if}
						</p>
					{/if}
					{#if ritualConfigEntry.system}
						<p class="whitespace-pre-line">
							<span class="font-bold">System:</span>
							{ritualConfigEntry.system}
						</p>
					{/if}
					{#if ritualConfigEntry.processAndSystem}
						<p class="whitespace-pre-line">
							<span class="font-bold">Process and System:</span>
							{ritualConfigEntry.processAndSystem}
						</p>
					{/if}
					<p class="whitespace-pre-line">
						<span class="font-bold">Duration:</span>
						{ritualConfigEntry.duration}
					</p>
				</svelte:fragment>
			</HelpText>
		</label>
	{/if}
</div>
