<script lang="ts">
	import type { FlawName } from '$lib/zod/lotn/enums/flawName';
	import { type SkillName } from '$lib/zod/lotn/enums/skillName';
	import type { PlayerFlaw } from '$lib/zod/lotn/playerCharacter/playerFlaw';
	import { Ratings } from '@skeletonlabs/skeleton';
	import { createEventDispatcher } from 'svelte';
	import HelpText from '../characterSheet/components/HelpText.svelte';
	import { flawConfig } from '../config/flawsConfig';
	import { getApplicableFlawLevels, getFlawValueDescription } from '../util/flawUtil';
	import { createNumberList } from '../util/generalUtils';

	export let flaw: PlayerFlaw & { id: string };

	export let showDeleteButton: boolean = false;
	export let minValue: number = 1;
	export let displayStyle: 'numbers' | 'dots' = 'numbers';
	export let displayValue: 'below' | 'beside' = 'below';
	export let editModeEnabled: boolean = false;
	export let displayFormat: 'row' | 'column' = 'row';

	const dispatchChange = createEventDispatcher<{
		valueChange: { id: string; label: FlawName; value: number };
		descriptionChange: { id: string; description: string | undefined };
		linkedSkillChange: { id: string; linkedSkill: SkillName | undefined };
		deleteClick: { id: string };
	}>();
	const config = flawConfig[flaw.name];

	function iconClick(event: CustomEvent<{ index: number }>) {
		if (event.detail.index > minValue) {
			return dispatchChange('valueChange', {
				id: flaw.id,
				label: flaw.name,
				value: event.detail.index
			});
		}

		return dispatchChange('valueChange', {
			id: flaw.id,
			label: flaw.name,
			value: minValue
		});
	}
</script>

{#if editModeEnabled}
	<div class="card rounded-lg">
		<header class="card-header">
			{#if displayValue === 'below'}
				<div class="flex">
					<HelpText id={`${flaw.name}-${flaw.value}`}>
						<h3 class="h3">{flaw.name}</h3>
						<svelte:fragment slot="helpText">
							<p class="whitespace-pre-line">
								{getFlawValueDescription(flaw.name, flaw.value)}
							</p>
						</svelte:fragment>
					</HelpText>

					{#if showDeleteButton}
						<button
							class="variant-filled-primary btn ml-auto w-3 rounded-lg"
							type="button"
							on:click={() =>
								dispatchChange('deleteClick', {
									id: flaw.id
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
								value={flaw.value}
								on:change={(event) =>
									dispatchChange('valueChange', {
										id: flaw.id,
										label: flaw.name,
										value: Number.parseInt(event.currentTarget.value)
									})}
							>
								<option disabled selected value={undefined}>
									Please select a rating for that merit
								</option>

								{#each createNumberList(getApplicableFlawLevels(flaw.name).length, minValue) as rating}
									<option selected={rating === flaw.value} value={rating}>
										{rating}
									</option>
								{/each}
							</select>
						{:else}
							<span>Value: {flaw.value}</span>
						{/if}
					</label>
				{:else}
					<Ratings
						interactive={editModeEnabled}
						justify="justify-left"
						max={5}
						value={flaw.value}
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
						<HelpText id={flaw.name}>
							<h3 class="h3">{flaw.name}</h3>
							<svelte:fragment slot="helpText">
								<p class="whitespace-pre-line">
									{getFlawValueDescription(flaw.name, flaw.value)}
								</p>
							</svelte:fragment>
						</HelpText>

						{#if showDeleteButton}
							<button
								class="variant-filled-primary btn ml-auto w-3 rounded-lg"
								type="button"
								on:click={() =>
									dispatchChange('deleteClick', {
										id: flaw.id
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
								value={flaw.value}
								on:change={(event) =>
									dispatchChange('valueChange', {
										id: flaw.id,
										label: flaw.name,
										value: Number.parseInt(event.currentTarget.value)
									})}
							>
								<option disabled selected value={undefined}>
									Please select a rating for that merit
								</option>

								{#each createNumberList(5, minValue) as rating}
									<option selected={rating === flaw.value} value={rating}>
										{rating}
									</option>
								{/each}
							</select>
						{:else}
							<span class="text-2xl">{flaw.value}</span>
						{/if}
					{:else}
						<Ratings
							interactive={editModeEnabled}
							justify="justify-left"
							max={5}
							value={flaw.value}
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
	</div>
{:else}
	<label class="card flex flex-col rounded-lg p-4" for={`${flaw.name}-${flaw.id}`}>
		<div class={`label flex ${displayFormat === 'row' ? 'flex-row gap-x-2' : 'flex-col '}`}>
			{#if config && config.prerequisite}
				<HelpText id={`${flaw.name}-${flaw.id}`}>
					<span id={`${flaw.name}-${flaw.id}`} class="whitespace-pre-line">{flaw.name}</span>
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
				<HelpText id={`${flaw.name}-${flaw.id}`}>
					<span id={`${flaw.name}-${flaw.id}`} class="whitespace-pre-line">{flaw.name}</span>
					<svelte:fragment slot="helpText">
						<p class="whitespace-pre-line">
							{getFlawValueDescription(flaw.name, flaw.value)}
						</p>
					</svelte:fragment>
				</HelpText>
			{:else}
				<span id={`${flaw.name}-${flaw.id}`} class="whitespace-pre-line">{flaw.name}</span>
			{/if}
			{#if flaw.value > 0}
				<HelpText id={`${flaw.name}-${flaw.id}-value`}>
					<Ratings
						id={`${flaw.name}-${flaw.id}-value`}
						justify="justify-left"
						bind:value={flaw.value}
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
							{getFlawValueDescription(flaw.name, flaw.value)}
						</p>
					</svelte:fragment>
				</HelpText>
			{/if}
		</div>
		{#if flaw.description}
			<p class="whitespace-pre-line text-sm">
				{flaw.description}
			</p>
		{/if}
	</label>
{/if}
