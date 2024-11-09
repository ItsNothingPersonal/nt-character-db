<script lang="ts">
	import type { MeritName } from '$lib/zod/lotn/enums/meritName';
	import { skillName, type SkillName } from '$lib/zod/lotn/enums/skillName';
	import type { PlayerMerit } from '$lib/zod/lotn/playerCharacter/playerMerit';
	import { Ratings } from '@skeletonlabs/skeleton';
	import { createEventDispatcher } from 'svelte';
	import HelpText from '../characterSheet/components/HelpText.svelte';
	import { createNumberList } from '../util/generalUtils';
	import {
		displaySpecificMeritDescription,
		getApplicableMeritLevels,
		getMeritValueDescription,
		meritHasLinkedSkills
	} from '../util/meritUtil';

	export let merit: PlayerMerit & { id: string };

	export let showDeleteButton: boolean = false;
	export let minValue: number = 1;
	export let displayStyle: 'numbers' | 'dots' = 'numbers';
	export let displayValue: 'below' | 'beside' = 'below';
	export let editModeEnabled: boolean = false;
	export let editModeLinkedSkillEnabled: boolean = false;

	const dispatchChange = createEventDispatcher<{
		valueChange: { id: string; label: MeritName; value: number };
		descriptionChange: { id: string; description: string | undefined };
		linkedSkillChange: { id: string; linkedSkill: SkillName | undefined };
		deleteClick: { id: string };
	}>();

	function iconClick(event: CustomEvent<{ index: number }>) {
		if (event.detail.index > minValue) {
			return dispatchChange('valueChange', {
				id: merit.id,
				label: merit.name,
				value: event.detail.index
			});
		}

		return dispatchChange('valueChange', {
			id: merit.id,
			label: merit.name,
			value: minValue
		});
	}
</script>

<div class="card rounded-lg">
	<header class="card-header">
		{#if displayValue === 'below'}
			<div class="flex">
				<HelpText id={`${merit.name}-${merit.value}`}>
					<h3 class="h3">{merit.name}</h3>
					<svelte:fragment slot="helpText">
						<p class="whitespace-pre-line">
							{getMeritValueDescription(merit.name, merit.value)}
						</p>
					</svelte:fragment>
				</HelpText>

				{#if showDeleteButton}
					<button
						class="variant-filled-primary btn ml-auto w-3 rounded-lg"
						type="button"
						on:click={() =>
							dispatchChange('deleteClick', {
								id: merit.id
							})}
					>
						<iconify-icon height="12" icon="mdi:remove" />
					</button>
				{/if}
			</div>
			{#if displayStyle === 'numbers'}
				<label class="label">
					{#if editModeEnabled}
						<span>Value</span>
						<select
							class="select rounded-lg"
							value={merit.value}
							on:change={(event) =>
								dispatchChange('valueChange', {
									id: merit.id,
									label: merit.name,
									value: Number.parseInt(event.currentTarget.value)
								})}
						>
							<option disabled selected value={undefined}>
								Please select a rating for that merit
							</option>

							{#each createNumberList(getApplicableMeritLevels(merit.name).length, minValue) as rating}
								<option selected={rating === merit.value} value={rating}>
									{rating}
								</option>
							{/each}
						</select>
					{:else}
						<span>Value: {merit.value}</span>
					{/if}
				</label>
			{:else}
				<Ratings
					interactive={editModeEnabled}
					justify="justify-left"
					max={5}
					value={merit.value}
					on:icon={iconClick}
				>
					<svelte:fragment slot="empty">
						<iconify-icon style="vertical-align: -0.225em" icon="prime:circle" />
					</svelte:fragment>
					<svelte:fragment slot="full">
						<iconify-icon style="vertical-align: -0.225em" icon="prime:circle-fill" />
					</svelte:fragment>
				</Ratings>
			{/if}
		{:else}
			<div class="grid grid-cols-[45%_auto] grid-rows-1 gap-2">
				<div class="flex">
					<HelpText id={merit.name}>
						<h3 class="h3">{merit.name}</h3>
						<svelte:fragment slot="helpText">
							<p class="whitespace-pre-line">
								{getMeritValueDescription(merit.name, merit.value)}
							</p>
						</svelte:fragment>
					</HelpText>

					{#if showDeleteButton}
						<button
							class="variant-filled-primary btn ml-auto w-3 rounded-lg"
							type="button"
							on:click={() =>
								dispatchChange('deleteClick', {
									id: merit.id
								})}
						>
							<iconify-icon height="12" icon="mdi:remove" />
						</button>
					{/if}
				</div>
				{#if displayStyle === 'numbers'}
					{#if editModeEnabled}
						<select
							class="select rounded-lg"
							value={merit.value}
							on:change={(event) =>
								dispatchChange('valueChange', {
									id: merit.id,
									label: merit.name,
									value: Number.parseInt(event.currentTarget.value)
								})}
						>
							<option disabled selected value={undefined}>
								Please select a rating for that merit
							</option>

							{#each createNumberList(5, minValue) as rating}
								<option selected={rating === merit.value} value={rating}>
									{rating}
								</option>
							{/each}
						</select>
					{:else}
						<span class="text-2xl">{merit.value}</span>
					{/if}
				{:else}
					<Ratings
						interactive={editModeEnabled}
						justify="justify-left"
						max={5}
						value={merit.value}
						on:icon={iconClick}
					>
						<svelte:fragment slot="empty">
							<iconify-icon style="vertical-align: -0.225em" icon="prime:circle" />
						</svelte:fragment>
						<svelte:fragment slot="full">
							<iconify-icon style="vertical-align: -0.225em" icon="prime:circle-fill" />
						</svelte:fragment>
					</Ratings>
				{/if}
			</div>
		{/if}
	</header>

	<div class="flex flex-col gap-2 p-4">
		{#if merit.linkedSkill && !editModeLinkedSkillEnabled}
			<p class="col-span-2 whitespace-pre-line text-sm">
				{merit.linkedSkill}
			</p>
		{:else if meritHasLinkedSkills(merit) && editModeLinkedSkillEnabled}
			<select
				class="select rounded-lg"
				value={merit.linkedSkill}
				on:change={(event) =>
					dispatchChange('linkedSkillChange', {
						id: merit.id,
						linkedSkill: skillName.parse(event.currentTarget.value)
					})}
			>
				<option disabled selected value={undefined}> Please select a linked Skill </option>

				{#each meritHasLinkedSkills(merit) ?? [] as linkedSkill}
					<option selected={merit.linkedSkill === linkedSkill} value={linkedSkill}>
						{linkedSkill}
					</option>
				{/each}
			</select>
		{/if}
		{#if displaySpecificMeritDescription(merit)}
			<input
				class="input variant-form-material mt-2"
				type="text"
				bind:value={merit.description}
				on:change={() => {
					dispatchChange('descriptionChange', { id: merit.id, description: merit.description });
				}}
			/>
		{/if}
	</div>
</div>
