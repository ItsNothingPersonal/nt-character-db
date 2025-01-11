<script lang="ts">
	import type { PlayerSkill } from '$lib/zod/lotn/playerCharacter/playerSkill';
	import { Ratings } from '@skeletonlabs/skeleton';
	import { createEventDispatcher } from 'svelte';
	import HelpText from '../characterSheet/components/HelpText.svelte';
	import { createNumberList } from '../util/generalUtils';
	import { getSkillHelptext } from '../util/skillUtil';

	export let skill: PlayerSkill;
	export let showDeleteButton: boolean = false;
	export let minValue: number = 1;
	export let displayStyle: 'numbers' | 'dots' = 'numbers';
	export let displayValue: 'below' | 'beside' = 'below';
	export let editModeEnabled: boolean = false;

	const dispatchChange = createEventDispatcher<{
		valueChange: { label: string; value: number };
		specializationChange: { label: string; specialization: string | undefined | null };
		deleteChange: { label: string };
	}>();

	function iconClick(event: CustomEvent<{ index: number }>) {
		if (event.detail.index > minValue) {
			return dispatchChange('valueChange', { label: skill.name, value: event.detail.index });
		}

		return dispatchChange('valueChange', { label: skill.name, value: minValue });
	}
</script>

<div class="card rounded-lg">
	<header class="card-header pb-4">
		<div class="grid grid-cols-2 gap-2">
			{#if displayValue === 'below'}
				<div class="flex flex-col">
					<HelpText id={skill.name}>
						<h3 class="h3 text-nowrap">{skill.name}</h3>
						<svelte:fragment slot="helpText">
							<p class="whitespace-pre-line">
								{getSkillHelptext(skill.name)}
							</p>
						</svelte:fragment>
					</HelpText>
					{#if displayStyle === 'numbers'}
						<label class="label">
							{#if editModeEnabled}
								<span>Value</span>
								<select
									class="select rounded-lg"
									value={skill.value}
									on:change={() =>
										dispatchChange('valueChange', { label: skill.name, value: skill.value })}
								>
									<option disabled selected value={undefined}>
										Please select a rating for that skill
									</option>

									{#each createNumberList(5, minValue) as rating}
										<option selected={rating === skill.value} value={rating}>
											{rating}
										</option>
									{/each}
								</select>
							{:else}
								<span>Value: {skill.value}</span>
							{/if}
						</label>
					{:else}
						<Ratings
							interactive={editModeEnabled}
							justify="justify-left"
							max={5}
							value={skill.value}
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
			{:else}
				<div class="flex gap-2">
					<HelpText id={skill.name}>
						<h3 class="h3 text-nowrap">{skill.name}</h3>
						<svelte:fragment slot="helpText">
							<p class="whitespace-pre-line">
								{getSkillHelptext(skill.name)}
							</p>
						</svelte:fragment>
					</HelpText>
					{#if displayStyle === 'numbers'}
						{#if editModeEnabled}
							<select
								class="select rounded-lg"
								value={skill.value}
								on:change={() =>
									dispatchChange('valueChange', { label: skill.name, value: skill.value })}
							>
								<option disabled selected value={undefined}>
									Please select a rating for that skill
								</option>

								{#each createNumberList(5, minValue) as rating}
									<option selected={rating === skill.value} value={rating}>
										{rating}
									</option>
								{/each}
							</select>
						{:else}
							<span class="text-2xl">{skill.value}</span>
						{/if}
					{:else}
						<Ratings
							interactive={editModeEnabled}
							justify="justify-left"
							max={5}
							value={skill.value}
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
			{#if showDeleteButton}
				<button
					class="variant-filled-primary btn ml-auto w-3 rounded-lg"
					type="button"
					on:click={() => dispatchChange('deleteChange', { label: skill.name })}
				>
					<iconify-icon height="12" icon="mdi:remove" />
				</button>
			{/if}
		</div>
		{#if skill.specialization}
			<section class="flex flex-col pt-0">
				{#if editModeEnabled}
					<label>
						<span class="font-bold">Specialization</span>
						<input
							id="name"
							class="input variant-form-material"
							disabled={!editModeEnabled}
							type="text"
							value={skill.specialization ?? ''}
							on:blur={(event) =>
								dispatchChange('specializationChange', {
									label: skill.name,
									specialization: event.currentTarget.value
								})}
						/>
					</label>
				{:else}
					<p class="whitespace-pre-line text-sm">{skill.specialization}</p>
				{/if}
			</section>
		{/if}
	</header>
</div>
