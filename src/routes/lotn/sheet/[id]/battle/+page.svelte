<script lang="ts">
	import { characterStore } from '$lib/components/lotn/characterSheet/characterStore';
	import HelpText from '$lib/components/lotn/characterSheet/components/HelpText.svelte';
	import { bloodPotencyConfig } from '$lib/components/lotn/config/bloodPotencyConfig.js';
	import { conditionConfig } from '$lib/components/lotn/config/conditionConfig';
	import Tracker from '$lib/components/lotn/trackers/tracker/tracker.svelte';
	import {
		calculateDisciplinePowerChallengeTestPool,
		getDisciplinePowerConfigEntry,
		hasDisciplineHint,
		hasDisciplinePowerChallengePool
	} from '$lib/components/lotn/util/disciplines';
	import {
		sortDisciplinePowerAscending,
		sortStringAscending
	} from '$lib/components/lotn/util/generalUtils.js';
	import { getItemQualityDescription } from '$lib/components/lotn/util/itemUtil.js';
	import Checkbox from '$lib/components/typography/checkbox.svelte';
	import CheckBoxWithHelpText from '$lib/components/typography/checkBoxWithHelpText.svelte';
	import Select from '$lib/components/typography/select.svelte';
	import { attackerPositionStore } from '$lib/stores/attackerPositionStore';
	import { bloodSurgeStore } from '$lib/stores/bloodSurgeStore';
	import { characterConditionStore } from '$lib/stores/characterConditionStore';
	import { frenzyStore } from '$lib/stores/frenzyStore';
	import {
		getBrawlTestPool,
		getCloseCombatDodgeTestPool,
		getDefenderTestPool,
		getInitiativePool,
		getMeleeTestPool,
		getRangedDodgeTestPool,
		getRangedTestPool
	} from '$lib/testPools/testPools';
	import type { PlayerItem } from '$lib/zod/lotn/playerCharacter/playerItem';

	let selectedWeapon: PlayerItem | undefined;
	let selectedDefenseItem: PlayerItem | undefined;
	$: selectedWeaponItemQualityDescription = selectedWeapon
		? getItemQualityDescription(selectedWeapon.quality, selectedWeapon.type)
		: undefined;
	$: selectedDefenseItemQualityDescription = selectedDefenseItem
		? getItemQualityDescription(selectedDefenseItem.quality, selectedDefenseItem.type)
		: undefined;

	const weapons =
		$characterStore.items?.filter((e) => e.type === 'melee' || e.type === 'ranged') ?? [];
	const defenseItems = $characterStore.items?.filter((e) => e.type === 'protective') ?? [];
</script>

<h1 class="h1">Battle-Sheet</h1>
<h2 class="h2">Items</h2>
<div class="mb-6 grid grid-cols-1 grid-rows-1 gap-2 sm:grid-cols-3">
	<div class="flex flex-col">
		<Select items={weapons} label="Weapons" bind:value={selectedWeapon} />
		{#key selectedWeaponItemQualityDescription}
			{#if selectedWeapon}
				{#if selectedWeaponItemQualityDescription}
					<HelpText id={selectedWeapon.name}>
						<p class="pl-2">{selectedWeapon.quality}</p>
						<svelte:fragment slot="helpText">
							<p class="whitespace-pre-line">
								{selectedWeaponItemQualityDescription}
							</p>
						</svelte:fragment>
					</HelpText>
				{:else}
					<p class="pl-2">{selectedWeapon.quality}</p>
				{/if}
			{/if}
		{/key}
	</div>
	<div class="flex flex-col">
		<Select items={defenseItems} label="Defense Items" bind:value={selectedDefenseItem} />
		{#key selectedDefenseItemQualityDescription}
			{#if selectedDefenseItem}
				{#if selectedDefenseItemQualityDescription}
					<HelpText id={selectedDefenseItem.name}>
						<p class="pl-2">{selectedDefenseItem.quality}</p>
						<svelte:fragment slot="helpText">
							<p class="whitespace-pre-line">
								{selectedDefenseItemQualityDescription}
							</p>
						</svelte:fragment>
					</HelpText>
				{:else}
					<p class="pl-2">{selectedDefenseItem.quality}</p>
				{/if}
			{/if}
		{/key}
	</div>
</div>

<h2 class="h2 mt-6">Initiative</h2>
<div class="mb-4 mt-2 grid auto-rows-auto grid-cols-1 gap-2 sm:grid-cols-6">
	<Tracker title="Initiative" value={getInitiativePool(selectedWeapon)} />
</div>

<h2 class="h2">Conditions</h2>
<div
	class="card mb-4 mt-2 grid grid-cols-1 grid-rows-1 rounded-lg sm:grid-cols-3 [&>label>input]:h-10 [&>label>input]:w-10 [&>label>label]:text-base sm:[&>label>label]:text-4xl [&>label]:p-2"
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
		onChange={() => {
			if ($attackerPositionStore !== 'mediumRange' && $characterConditionStore.prone === false) {
				$attackerPositionStore = 'mediumRange';
			}
		}}
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
		class="card mb-4 mt-2 grid grid-cols-2 grid-rows-1 rounded-lg sm:w-2/3 [&>label>input]:h-10 [&>label>input]:w-10 [&>label]:p-2 [&>label]:text-base sm:[&>label]:text-4xl"
	>
		<Checkbox
			checked={$attackerPositionStore === 'attackerMoreThanThreeMetersAway'}
			onChange={() =>
				$attackerPositionStore !== 'attackerMoreThanThreeMetersAway'
					? ($attackerPositionStore = 'attackerMoreThanThreeMetersAway')
					: ($attackerPositionStore = 'mediumRange')}
		>
			&gt; 3m
		</Checkbox>

		<Checkbox
			checked={$attackerPositionStore === 'attackerLessThanTwoMetersAway'}
			onChange={() =>
				$attackerPositionStore !== 'attackerLessThanTwoMetersAway'
					? ($attackerPositionStore = 'attackerLessThanTwoMetersAway')
					: ($attackerPositionStore = 'mediumRange')}>&lt; 2m</Checkbox
		>
	</div>
{/if}

<h2 class="h2 mt-6">Test-Pools</h2>
<div
	class="card mb-4 mt-2 grid grid-cols-1 grid-rows-1 rounded-lg sm:w-2/3 sm:grid-cols-2 [&>label>input]:h-10 [&>label>input]:w-10 [&>label>label]:text-base [&>label]:p-2 sm:[&>label]:text-4xl"
>
	<Checkbox bind:checked={$frenzyStore}>Frenzy</Checkbox>
	<Checkbox bind:checked={$bloodSurgeStore}>Blood Surge</Checkbox>
</div>

<h3 class="h3">Physisch</h3>
<div class="mb-4 mt-2 grid auto-rows-auto grid-cols-1 gap-2 sm:grid-cols-6">
	{#key $characterConditionStore || $attackerPositionStore || $bloodSurgeStore}
		<Tracker title="Brawl" value={getBrawlTestPool()} />
		<Tracker title="Melee" value={getMeleeTestPool(selectedWeapon)} />
		<Tracker title="Ranged" value={getRangedTestPool()} />
		<Tracker
			title="Dodge Close Combat"
			value={getCloseCombatDodgeTestPool()}
			value2={getCloseCombatDodgeTestPool(selectedDefenseItem)}
		/>
		<Tracker
			title="Dodge Range"
			value={getRangedDodgeTestPool()}
			value2={getRangedDodgeTestPool(selectedDefenseItem)}
		/>
	{/key}
</div>

{#if $characterStore.disciplines.length > 0}
	<h3 class="h3">Disziplinen</h3>
	{#each $characterStore.disciplines.sort( (a, b) => sortStringAscending(a.name, b.name) ) as discipline}
		{#if hasDisciplinePowerChallengePool(discipline.name, discipline.powers) || hasDisciplineHint(discipline.name, discipline.powers)}
			<h4 class="h4">{discipline.name}</h4>

			<div class="mb-4 mt-2 grid auto-rows-auto grid-cols-1 gap-2 sm:grid-cols-6">
				{#each discipline.powers.sort(sortDisciplinePowerAscending) as power}
					{#if calculateDisciplinePowerChallengeTestPool(discipline.name, power.name) > 0}
						{#key $characterConditionStore || $bloodSurgeStore}
							<HelpText id={`${discipline.name}-${power}`}>
								<Tracker
									title={power.name}
									value={calculateDisciplinePowerChallengeTestPool(discipline.name, power.name)}
								/>
								<svelte:fragment slot="helpText">
									{#if getDisciplinePowerConfigEntry(discipline.name, power.name)?.challengePool?.defender}
										<p class="whitespace-pre-line">
											<span class="font-bold">Opponent:</span>
											{#if typeof getDisciplinePowerConfigEntry(discipline.name, power.name)?.challengePool?.defender === 'string'}
												{getDisciplinePowerConfigEntry(discipline.name, power.name)?.challengePool
													?.defender}
											{:else}
												{getDefenderTestPool(discipline.name, power.name)}
											{/if}
										</p>
									{/if}
								</svelte:fragment>
							</HelpText>
						{/key}
					{:else if getDisciplinePowerConfigEntry(discipline.name, power.name)?.hint}
						<HelpText id={`${discipline.name}-${power}`}>
							<Tracker title={power.name} />
							<svelte:fragment slot="helpText">
								{#if getDisciplinePowerConfigEntry(discipline.name, power.name)?.hint}
									<p class="whitespace-pre-line">
										{getDisciplinePowerConfigEntry(discipline.name, power.name)?.hint}
									</p>
								{/if}
							</svelte:fragment>
						</HelpText>
					{/if}
				{/each}
			</div>
		{/if}
	{/each}
{/if}

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
