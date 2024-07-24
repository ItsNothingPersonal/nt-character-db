<script lang="ts">
	import { characterStore } from '$lib/components/lotn/characterSheet/characterStore';
	import HelpText from '$lib/components/lotn/characterSheet/components/HelpText.svelte';
	import { bloodPotencyConfig } from '$lib/components/lotn/config/bloodPotencyConfig.js';
	import { conditionConfig } from '$lib/components/lotn/config/conditionConfig';
	import {
		calculateDisciplinePowerChallengeTestPool,
		getDisciplinePowerChallengePool,
		hasDisciplinePowerChallengePool
	} from '$lib/components/lotn/util/disciplines';
	import { sortStringAscending } from '$lib/components/lotn/util/generalUtils.js';
	import Tracker from '$lib/components/tracker/tracker.svelte';
	import Checkbox from '$lib/components/typography/checkbox.svelte';
	import CheckBoxWithHelpText from '$lib/components/typography/checkBoxWithHelpText.svelte';
	import Select from '$lib/components/typography/select.svelte';
	import { attackerPositionStore } from '$lib/stores/attackerPositionStore';
	import { bloodSurgeStore } from '$lib/stores/bloodSurgeStore';
	import { characterConditionStore } from '$lib/stores/characterConditionStore';
	import { frenzyStore } from '$lib/stores/frenzyStore';
	import {
		getBrawlTestPool,
		getDefenderTestPool,
		getDodgeTestPool,
		getMeleeTestPool,
		getRangedTestPool
	} from '$lib/testPools/testPools';
	import type { PlayerItem } from '$lib/zod/lotn/playerCharacter/playerItem';

	export let data;

	let selectedWeapon: PlayerItem | undefined;
	let selectedDefenseItem: PlayerItem | undefined;
	//let selectedAttackMode: { name: AttackMode } | undefined = undefined;

	const weapons = data.items.filter((e) => e.type === 'melee' || e.type === 'ranged');
	const defenseItems = data.items.filter((e) => e.type === 'protective');
</script>

<h1 class="h1">Battle-Sheet</h1>
<h2 class="h2">Items</h2>
<div class="mb-6 grid grid-cols-1 grid-rows-1 gap-2 sm:grid-cols-3">
	<div class="flex flex-col">
		<Select items={weapons} label="Weapons" bind:value={selectedWeapon} />
		{#if selectedWeapon}
			<p>{selectedWeapon.quality}</p>
		{/if}
	</div>
	<div class="flex flex-col">
		<Select items={defenseItems} label="Defense Items" bind:value={selectedDefenseItem} />
		{#if selectedDefenseItem}
			<p>{selectedDefenseItem.quality}</p>
		{/if}
	</div>
</div>

<h2 class="h2 mt-6">Initiative</h2>
<div class="mb-4 mt-2 grid auto-rows-auto grid-cols-1 gap-2 sm:grid-cols-6">
	<Tracker
		title="Initiative"
		value={$characterStore.attributes.social_composure +
			($characterStore.skills.find((e) => e.name === 'Awareness')?.value ?? 0)}
	/>
</div>

<h2 class="h2">Conditions</h2>
<div
	class="mb-4 mt-2 grid grid-cols-1 grid-rows-1 divide-x-0 border-2 border-gray-500 !divide-fix dark:border-gray-50 dark:bg-slate-900 sm:grid-cols-3 sm:divide-x-2 [&>label>input]:h-10 [&>label>input]:w-10 [&>label>label]:text-base sm:[&>label>label]:text-4xl [&>label]:p-2"
>
	<CheckBoxWithHelpText
		helpText={conditionConfig['Blinded']}
		helpTextId="blinded"
		bind:checked={$characterConditionStore.blinded}
	>
		Blinded
	</CheckBoxWithHelpText>
	<CheckBoxWithHelpText
		helpText={conditionConfig['Distracted']}
		helpTextId="distracted"
		bind:checked={$characterConditionStore.distracted}
	>
		Distracted
	</CheckBoxWithHelpText>
	<CheckBoxWithHelpText
		helpText={conditionConfig['Frightened']}
		helpTextId="frightened"
		bind:checked={$characterConditionStore.frightened}
	>
		Frightened
	</CheckBoxWithHelpText>
	<CheckBoxWithHelpText
		helpText={conditionConfig['Grappled']}
		helpTextId="grappled"
		bind:checked={$characterConditionStore.grappled}
	>
		Grappled
	</CheckBoxWithHelpText>
	<CheckBoxWithHelpText
		helpText={conditionConfig['Helpless']}
		helpTextId="helpless"
		bind:checked={$characterConditionStore.helpless}
	>
		Helpless
	</CheckBoxWithHelpText>
	<CheckBoxWithHelpText
		helpText={conditionConfig['Impaired']}
		helpTextId="impaired"
		bind:checked={$characterConditionStore.impaired}
	>
		Impaired
	</CheckBoxWithHelpText>
	<CheckBoxWithHelpText
		helpText={conditionConfig['Prone']}
		helpTextId="prone"
		bind:checked={$characterConditionStore.prone}
	>
		Prone
	</CheckBoxWithHelpText>
	<CheckBoxWithHelpText
		helpText={conditionConfig['Staggered']}
		helpTextId="staggered"
		bind:checked={$characterConditionStore.staggered}
	>
		Staggered
	</CheckBoxWithHelpText>
	<CheckBoxWithHelpText
		helpText={conditionConfig['Weakened']}
		helpTextId="weakened"
		bind:checked={$characterConditionStore.weakened}
	>
		Weakened
	</CheckBoxWithHelpText>
</div>

{#if $characterConditionStore.prone}
	<h4 class="h4">Attacker Position</h4>
	<div
		class="mb-4 mt-2 grid {$characterConditionStore.prone
			? 'grid-cols-3 [&>label]:text-base sm:[&>label]:text-4xl'
			: 'grid-cols-2 [&>label]:text-4xl'} grid-rows-1 divide-x-2 border-2 border-gray-500 dark:border-gray-50 dark:bg-slate-900 [&>label>input]:h-10 [&>label>input]:w-10 [&>label]:p-2"
	>
		<Checkbox bind:checked={$attackerPositionStore.attackerMoreThanThreeMetersAway}>
			&gt; 3m
		</Checkbox>
		<Checkbox bind:checked={$attackerPositionStore.attackerLessThanTwoMetersAway}>&lt; 2m</Checkbox>
	</div>
{/if}

<h2 class="h2 mt-6">Test-Pools</h2>
<div
	class="mb-4 mt-2 grid grid-cols-1 grid-rows-1 divide-x-0 border-2 border-gray-500 !divide-fix dark:border-gray-50 dark:bg-slate-900 sm:w-2/3 sm:grid-cols-2 sm:divide-x-2 [&>label>input]:h-10 [&>label>input]:w-10 [&>label>label]:text-base [&>label]:p-2 sm:[&>label]:text-4xl"
>
	<Checkbox bind:checked={$frenzyStore}>Frenzy</Checkbox>
	<Checkbox bind:checked={$bloodSurgeStore}>Blood Surge</Checkbox>
</div>

<h3 class="h3">Physisch</h3>
<div class="mb-4 mt-2 grid auto-rows-auto grid-cols-1 gap-2 sm:grid-cols-6">
	{#key $characterConditionStore || $attackerPositionStore || $bloodSurgeStore}
		<Tracker title="Brawl" value={getBrawlTestPool()} />
		<Tracker title="Melee" value={getMeleeTestPool()} />
		<Tracker title="Ranged" value={getRangedTestPool()} />
		<Tracker title="Dodge" value={getDodgeTestPool()} />
	{/key}
</div>

<h3 class="h3">Disziplinen</h3>
{#each $characterStore.disciplines.sort( (a, b) => sortStringAscending(a.name, b.name) ) as discipline}
	{#if hasDisciplinePowerChallengePool(discipline.name, discipline.powers)}
		<h4 class="h4">{discipline.name}</h4>

		<div class="mb-4 mt-2 grid auto-rows-auto grid-cols-1 gap-2 sm:grid-cols-6">
			{#each discipline.powers.sort(sortStringAscending) as power}
				{#if calculateDisciplinePowerChallengeTestPool(discipline.name, power) > 0}
					{#key $characterConditionStore || $bloodSurgeStore}
						<HelpText id={discipline.name}>
							<Tracker
								title={power}
								value={calculateDisciplinePowerChallengeTestPool(discipline.name, power)}
							/>
							<svelte:fragment slot="helpText">
								{#if getDisciplinePowerChallengePool(discipline.name, power)?.defender}
									<p class="whitespace-pre-line">
										<span class="font-bold">Opponent:</span>
										{#if typeof getDisciplinePowerChallengePool(discipline.name, power)?.defender === 'string'}
											{getDisciplinePowerChallengePool(discipline.name, power)?.defender}
										{:else}
											{getDefenderTestPool(discipline.name, power)}
										{/if}
									</p>
								{/if}
							</svelte:fragment>
						</HelpText>
					{/key}
				{/if}
			{/each}
		</div>
	{/if}
{/each}

<h3 class="h3">Blood Potency</h3>
<div class="mb-4 mt-2 grid auto-rows-auto grid-cols-1 gap-2 sm:grid-cols-6">
	{#key $characterConditionStore}
		<Tracker title="Blood Potency" value={$characterStore.bloodPotency} />
		<Tracker
			title="Blood Surge Bonus"
			value={bloodPotencyConfig[$characterStore.bloodPotency].bloodSurgeBonus}
		/>
		<Tracker
			title="Damage Healed"
			value={bloodPotencyConfig[$characterStore.bloodPotency].mendingDamage}
		/>
		<Tracker
			title="Discipline Defense Bonus"
			value={bloodPotencyConfig[$characterStore.bloodPotency].disciplineDefenseBonus}
		/>
		<Tracker
			title="Discipline Rousing Bonus"
			value={bloodPotencyConfig[$characterStore.bloodPotency].disciplineRousingBonus}
		/>
		<Tracker
			title="Bane Severity"
			value={bloodPotencyConfig[$characterStore.bloodPotency].baneSeverity}
		/>
		<div class="flex flex-col">
			<p class="text-center font-bold">Feeding Penalty</p>
			{#key $characterStore.willpower.value}
				<p class="my-auto pb-2 text-center">
					{bloodPotencyConfig[$characterStore.bloodPotency].feedingPenalty}
				</p>
			{/key}
		</div>
	{/key}
</div>
