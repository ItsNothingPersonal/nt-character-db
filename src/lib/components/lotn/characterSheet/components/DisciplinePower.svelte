<script lang="ts">
	import {
		type NormalDisciplinePowerUnion,
		type NormalDisciplines,
		type RitualDisciplinePowerUnion,
		type RitualDisciplines
	} from '$lib/zod/lotn/util';
	import { getDisciplinePower } from '../../util/disciplines';
	import { joinWithOr } from '../../util/generalUtils';
	import HelpText from './HelpText.svelte';

	export let discipline: NormalDisciplines | RitualDisciplines;
	export let power: NormalDisciplinePowerUnion | RitualDisciplinePowerUnion;

	const disciplinePower = getDisciplinePower(discipline, power);
</script>

{#if disciplinePower && !('requiredIngredients' in disciplinePower)}
	<HelpText id={power}>
		<span id={power}>
			{power} (Level: {disciplinePower.level})
		</span>
		<svelte:fragment slot="helpText">
			{#if disciplinePower.amalgam}
				<p class="whitespace-pre-line">
					<span class="font-bold">Amalgam:</span>
					{disciplinePower.amalgam.name}
					{disciplinePower.amalgam.value}
				</p>
			{/if}
			{#if disciplinePower.challengePool}
				<p class="whitespace-pre-line">
					<span class="font-bold">Challenge Pool:</span>
					{#if typeof disciplinePower.challengePool.defender === 'string'}
						{disciplinePower.challengePool.attacker.attribute} + {disciplinePower.challengePool
							.attacker.skill} vs {disciplinePower.challengePool.defender}
					{:else}
						{disciplinePower.challengePool.attacker.attribute} + {disciplinePower.challengePool
							.attacker.skill} vs {`${disciplinePower.challengePool.defender.attribute} + ${disciplinePower.challengePool.defender.skillOrAttribute}`}
					{/if}

					{#if disciplinePower.challengePool.hint}
						{disciplinePower.challengePool.hint}
					{/if}
				</p>
			{/if}
			<p class="whitespace-pre-line">
				<span class="font-bold">Cost:</span>
				{disciplinePower.cost}
			</p>
			{#if disciplinePower.prerequisite}
				<p class="whitespace-pre-line">
					<span class="font-bold">Prerequisite:</span>
					{#if Array.isArray(disciplinePower.prerequisite)}
						{joinWithOr(disciplinePower.prerequisite)}
					{:else if typeof disciplinePower.prerequisite !== 'string'}
						{disciplinePower.prerequisite.main} and either {joinWithOr(
							disciplinePower.prerequisite.or
						)}
					{:else}
						{disciplinePower.prerequisite}
					{/if}
				</p>
			{/if}
			<p class="whitespace-pre-line">
				<span class="font-bold">System:</span>
				{disciplinePower.system}
			</p>
			<p class="whitespace-pre-line">
				<span class="font-bold">Duration:</span>
				{disciplinePower.duration}
			</p>
		</svelte:fragment>
	</HelpText>
{/if}
