<script lang="ts">
	import type { MeritName } from '$lib/zod/lotn/enums/meritName';
	import type { SkillName } from '$lib/zod/lotn/enums/skillName';
	import { type PlayerMerit } from '$lib/zod/lotn/playerCharacter/playerMerit';
	import { Ratings } from '@skeletonlabs/skeleton';
	import { createEventDispatcher } from 'svelte';
	import HelpText from '../characterSheet/components/HelpText.svelte';
	import { interactiveModeStore } from '../characterSheet/interactiveModeStore';
	import { meritConfig } from '../config/meritsConfig';
	import { getMeritValueDescription, meritHasLinkedSkills } from '../util/meritUtil';

	export let merit: PlayerMerit & { id: string };
	export let showDeleteButton: boolean = false;
	export let disableDeleteButton: boolean = false;
	export let displayFormat: 'row' | 'column' = 'row';
	export let showDescriptionInput: boolean = false;
	export let enableEditValue: boolean = false;
	export let enableEditLinkedSkill: boolean = false;
	export let startValue: number = 1;

	const config = meritConfig[merit.name];

	const dispatchChange = createEventDispatcher<{
		deleteClick: { id: string };
		valueChange: { id: string; label: MeritName; value: number };
		descriptionChange: { id: string; description: string | undefined };
		linkedSkillChange: { id: string; linkedSkill: SkillName | undefined };
	}>();

	function iconClick(event: CustomEvent<{ index: number }>) {
		const maxValue = meritConfig[merit.name]?.max ?? 5;

		if (event.detail.index > maxValue) {
			event.detail.index = maxValue;
		}

		if (event.detail.index > startValue) {
			return dispatchChange('valueChange', {
				id: merit.id,
				label: merit.name,
				value: Number(event.detail.index)
			});
		}

		return dispatchChange('valueChange', {
			id: merit.id,
			label: merit.name,
			value: startValue
		});
	}
</script>

<label
	class={`row card grid w-full grid-cols-1 grid-rows-[min-content] rounded-lg p-2`}
	for={`${merit.name}-${merit.id}`}
>
	<div class="flex justify-between gap-x-4">
		<div
			class={`label flex flex-wrap ${displayFormat === 'row' ? 'w-full flex-row justify-between' : 'flex-col'}`}
		>
			<div class="w-fit">
				{#if config && config.prerequisite}
					<HelpText id={`${merit.name}-${merit.id}`} placement="bottom-start">
						<span id={`${merit.name}-${merit.id}`} class="whitespace-nowrap">{merit.name}</span>
						<svelte:fragment slot="helpText">
							{#if config && config.prerequisite}
								<p class="whitespace-pre-line">
									<span class="font-bold">Prerequisite:</span>
									{#if Array.isArray(config.prerequisite)}
										{#each config.prerequisite as prerequisite}
											{#if typeof prerequisite === 'string'}
												{prerequisite}
											{:else}
												{prerequisite.name}
												{prerequisite.value}
											{/if}
										{/each}
									{:else if typeof config.prerequisite === 'string'}
										{config.prerequisite}
									{:else}
										{config.prerequisite.name}
										{config.prerequisite.value}
									{/if}
								</p>
							{/if}
						</svelte:fragment>
					</HelpText>
				{:else if config}
					<HelpText id={`${merit.name}-${merit.id}`} placement="bottom-start">
						<span id={`${merit.name}-${merit.id}`} class="whitespace-nowrap">{merit.name}</span>
						<svelte:fragment slot="helpText">
							<p class="whitespace-pre-line">
								{getMeritValueDescription(merit.name, merit.value)}
							</p>
						</svelte:fragment>
					</HelpText>
				{:else}
					<span id={`${merit.name}-${merit.id}`} class="whitespace-nowrap">{merit.name}</span>
				{/if}
			</div>
			<div>
				{#if !enableEditValue}
					<HelpText id={`${merit.name}-${merit.id}-value`}>
						<Ratings
							id={`${merit.name}-${merit.id}-value`}
							interactive={$interactiveModeStore}
							justify="justify-left"
							bind:value={merit.value}
						>
							<svelte:fragment slot="empty">
								<iconify-icon icon="prime:circle" />
							</svelte:fragment>
							<svelte:fragment slot="full">
								<iconify-icon icon="prime:circle-fill" />
							</svelte:fragment>
						</Ratings>
						<svelte:fragment slot="helpText">
							<p class="whitespace-pre-line">
								{getMeritValueDescription(merit.name, merit.value)}
							</p>
						</svelte:fragment>
					</HelpText>
				{:else}
					<Ratings
						id={`${merit.name}-${merit.id}-value`}
						interactive={true}
						justify="justify-left"
						max={5}
						value={merit.value}
						on:icon={iconClick}
					>
						<svelte:fragment slot="empty">
							<iconify-icon icon="prime:circle" />
						</svelte:fragment>
						<svelte:fragment slot="full">
							<iconify-icon icon="prime:circle-fill" />
						</svelte:fragment>
					</Ratings>
				{/if}
			</div>
		</div>
		{#if showDeleteButton}
			<button
				class="variant-filled-primary btn max-h-8 max-w-8 justify-self-end rounded-lg text-sm"
				disabled={disableDeleteButton}
				type="button"
				on:click={() => {
					dispatchChange('deleteClick', { id: merit.id });
				}}
			>
				<iconify-icon height="16" icon="mdi:remove" />
			</button>
		{/if}
	</div>
	{#if showDescriptionInput}
		<textarea
			class="textarea variant-form-material mt-2"
			maxlength="100"
			rows="1"
			bind:value={merit.description}
			on:change={() => {
				dispatchChange('descriptionChange', { id: merit.id, description: merit.description });
			}}
		/>
	{:else if merit.description}
		<p class="whitespace-pre-line text-sm">
			{merit.description}
		</p>
	{/if}
	{#if meritHasLinkedSkills(merit)}
		{#if enableEditLinkedSkill}
			<select
				class="select mt-2 max-h-fit rounded-lg"
				bind:value={merit.linkedSkill}
				on:change={() =>
					dispatchChange('linkedSkillChange', { id: merit.id, linkedSkill: merit.linkedSkill })}
			>
				<option disabled selected value={undefined}> Please select an option </option>

				{#each meritHasLinkedSkills(merit) ?? [] as linkedSkill}
					<option selected={linkedSkill === merit.linkedSkill} value={linkedSkill}>
						{linkedSkill}
					</option>
				{/each}
			</select>
		{:else}
			<p class="whitespace-pre-line text-sm">
				{merit.linkedSkill}
			</p>
		{/if}
	{/if}
</label>
