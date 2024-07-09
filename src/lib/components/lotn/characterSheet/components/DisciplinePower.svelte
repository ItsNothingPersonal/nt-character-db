<script lang="ts">
	import {
		createNormalDisciplinePowerSchema,
		createRitualPowerSchema,
		isNormalDiscipline,
		normalDisciplinePowerUnion,
		ritualDisciplinePowerUnion,
		type NormalDisciplinePowerUnion,
		type NormalDisciplines,
		type RitualDisciplinePowerUnion,
		type RitualDisciplines
	} from '$lib/zod/lotn/util';
	import { getDisciplineConfig } from '../../util/disciplines';
	import HelpText from './HelpText.svelte';

	export let discipline: NormalDisciplines | RitualDisciplines;
	export let power: NormalDisciplinePowerUnion | RitualDisciplinePowerUnion;

	const disciplinePower = getDisciplinePower(discipline, power);

	function getDisciplinePower(
		discipline: NormalDisciplines | RitualDisciplines,
		power: NormalDisciplinePowerUnion | RitualDisciplinePowerUnion
	) {
		const config = getDisciplineConfig(discipline);
		if (isNormalDiscipline(discipline)) {
			const schema = createNormalDisciplinePowerSchema(discipline);
			const result = schema.safeParse(config.powers);

			if (result.success) {
				const powerParsed = normalDisciplinePowerUnion.parse(power);
				return result.data[powerParsed];
			} else {
				console.warn(result.error);
			}
		} else if (!isNormalDiscipline(discipline)) {
			const schema = createRitualPowerSchema(discipline);
			const result = schema.safeParse(config);
			if (result.success) {
				const powerParsed = ritualDisciplinePowerUnion.parse(power);
				return result.data[powerParsed];
			}
		}
	}
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
					{disciplinePower.challengePool.attacker} vs {disciplinePower.challengePool.defender}
					{#if disciplinePower.challengePool.hint}
						{disciplinePower.challengePool.hint}
					{/if}
				</p>
			{/if}
			<p class="whitespace-pre-line">
				<span class="font-bold">Cost:</span>
				{disciplinePower.cost}
			</p>
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
