<script lang="ts">
	import {
		backgroundPaymentStore,
		characterCreationStore
	} from '$lib/stores/characterCreationStore';
	import { detectTouchscreen, generateId, isDesktopSize } from '$lib/util';
	import type { AlliesConfigSchema } from '$lib/zod/lotn/background/allies';
	import type { ContactsConfigSchema } from '$lib/zod/lotn/background/contacts';
	import type { FameConfigSchema } from '$lib/zod/lotn/background/fame';
	import type { FamiliarConfigSchema } from '$lib/zod/lotn/background/familiar';
	import type { HavenConfigSchema } from '$lib/zod/lotn/background/haven';
	import type { HerdConfigSchema } from '$lib/zod/lotn/background/herd';
	import type { MaskConfigSchema } from '$lib/zod/lotn/background/mask';
	import type { ResourcesConfigSchema } from '$lib/zod/lotn/background/resources';
	import {
		backgroundAdvantageName,
		type BackgroundAdvantageName
	} from '$lib/zod/lotn/enums/backgroundAdvantageName';
	import {
		backgroundDisadvantageName,
		type BackgroundDisadvantageName
	} from '$lib/zod/lotn/enums/backgroundDisadvantageName';
	import {
		spheresOfInfluenceName,
		type SpheresOfInfluenceName
	} from '$lib/zod/lotn/enums/spheresOfInfluenceName';
	import type { PlayerBackground } from '$lib/zod/lotn/playerCharacter/playerBackground';
	import { Ratings } from '@skeletonlabs/skeleton';
	import { createEventDispatcher, onMount } from 'svelte';
	import { get, writable, type Writable } from 'svelte/store';
	import BackgroundAdvantage from '../characterSheet/components/BackgroundAdvantage/BackgroundAdvantage.svelte';
	import type { BackgroundAdvantageDeleteEvent } from '../characterSheet/components/BackgroundAdvantage/BackgroundAdvantageDeleteEvent';
	import BackgroundDisadvantage from '../characterSheet/components/BackgroundDisadvantage/BackgroundDisadvantage.svelte';
	import HelpText from '../characterSheet/components/HelpText.svelte';
	import { getBackgroundConfig, getMaxSelectionSphereOfInfluence } from '../util/backgroundUtil';
	import { createNumberList } from '../util/generalUtils';
	import type { BackgroundAdvantageChangeEvent } from './BackgroundAdvantageChangeEvent';
	import type { BackgroundDisadvantageChangeEvent } from './BackgroundDisadvantageChangeEvent';
	import type { BackgroundChangeEvent } from './BackroundChangeEvent';

	export let background: PlayerBackground & { id: string };
	export let editModeEnabled: boolean = false;
	export let editModeEnabledAdvantages: boolean = false;
	export let editModeEnabledDisadvantages: boolean = false;
	export let mode: 'experience' | 'freebies' = 'freebies';

	onMount(() => {
		value = background.value;
		description = background.description;

		sphereOfInfluences.set(
			background.sphereOfInfluence && background.sphereOfInfluence.length > 0
				? background.sphereOfInfluence
				: []
		);
		singleSphereOfInfluence.set(
			background.sphereOfInfluence && background.sphereOfInfluence.length > 0
				? background.sphereOfInfluence[0]
				: undefined
		);
	});

	let value: number = 0;
	let description: string | undefined = undefined;
	let sphereOfInfluences: Writable<SpheresOfInfluenceName[]> = writable([]);
	let singleSphereOfInfluence: Writable<SpheresOfInfluenceName | undefined> = writable(undefined);
	let backgroundConfig:
		| AlliesConfigSchema
		| ContactsConfigSchema
		| FameConfigSchema
		| FamiliarConfigSchema
		| HavenConfigSchema
		| HerdConfigSchema
		| MaskConfigSchema
		| ResourcesConfigSchema = getBackgroundConfig(background.name);
	let innerWidth = 0;

	let selectedBackgroundAdvantage: BackgroundAdvantageName | undefined = backgroundConfig.advantages
		? backgroundAdvantageName.parse(Object.keys(backgroundConfig.advantages)[0])
		: undefined;
	let backgroundAdvantageValue: number = createNumberList(
		getMaxValueForBackgroundAdvantage(selectedBackgroundAdvantage),
		getMinValueForBackgroundAdvantage(selectedBackgroundAdvantage)
	)[0];
	let selectedBackgroundDisadvantage: BackgroundDisadvantageName | undefined =
		backgroundConfig.disadvantages
			? backgroundDisadvantageName.parse(Object.keys(backgroundConfig.disadvantages)[0])
			: undefined;
	let backgroundDisadvantageValue: number = createNumberList(
		getMaxValueForBackgroundAdvantage(selectedBackgroundDisadvantage),
		getMinValueForBackgroundAdvantage(selectedBackgroundDisadvantage)
	)[0];

	const dispatchChange = createEventDispatcher<{
		change: BackgroundChangeEvent;
		deleteClick: BackgroundChangeEvent;
		advantageClick: BackgroundAdvantageChangeEvent;
		disadvantageClick: BackgroundDisadvantageChangeEvent;
		advantageDeleteClick: BackgroundAdvantageDeleteEvent;
		disadvantageDeleteClick: BackgroundDisadvantageChangeEvent;
	}>();

	const config = getBackgroundConfig(background.name);

	function getMaxValueForBackgroundAdvantage(
		name: BackgroundAdvantageName | BackgroundDisadvantageName | undefined
	) {
		const isAdvantage = backgroundAdvantageName.safeParse(name);
		const isDisadvantage = backgroundDisadvantageName.safeParse(name);
		if (
			!name ||
			(isAdvantage.success &&
				(!backgroundConfig.advantages || !backgroundConfig.advantages[isAdvantage.data])) ||
			(isDisadvantage.success &&
				(!backgroundConfig.disadvantages || !backgroundConfig.disadvantages[isDisadvantage.data]))
		) {
			return 0;
		}

		const config = isAdvantage.success
			? backgroundConfig.advantages && backgroundConfig.advantages[isAdvantage.data]
			: isDisadvantage.success &&
				backgroundConfig.disadvantages &&
				backgroundConfig.disadvantages[isDisadvantage.data];
		if (!config) {
			return 0;
		}

		const keysOfConfig = Object.keys(config);
		if (keysOfConfig.includes('level2')) {
			return 2;
		} else if (keysOfConfig.includes('level1')) {
			return 1;
		}
		return 3;
	}

	function getMinValueForBackgroundAdvantage(
		name: BackgroundAdvantageName | BackgroundDisadvantageName | undefined
	) {
		const isAdvantage = backgroundAdvantageName.safeParse(name);
		const isDisadvantage = backgroundDisadvantageName.safeParse(name);

		if (
			!name ||
			(isAdvantage.success &&
				(!backgroundConfig.advantages || !backgroundConfig.advantages[isAdvantage.data])) ||
			(isDisadvantage.success &&
				(!backgroundConfig.disadvantages || !backgroundConfig.disadvantages[isDisadvantage.data]))
		) {
			return 1;
		}

		const config = isAdvantage.success
			? backgroundConfig.advantages && backgroundConfig.advantages[isAdvantage.data]
			: isDisadvantage.success &&
				backgroundConfig.disadvantages &&
				backgroundConfig.disadvantages[isDisadvantage.data];
		if (!config) {
			return 1;
		}

		const keysOfConfig = Object.keys(config);
		if (keysOfConfig.includes('level1') || keysOfConfig.includes('levelVariable')) {
			return 1;
		} else if (keysOfConfig.includes('level2')) {
			return 2;
		}
		return 3;
	}

	function isFixedBackground(id: string) {
		const store = get(backgroundPaymentStore.paymentStore);
		return (
			store.backgrounds.some(
				(background) => background.id === id && background.fixed && background.fixed > 0
			) ||
			store.associatedAdvantages.some((advantage) => advantage.id === id && advantage.fixed > 0)
		);
	}

	function isFixedBackgroundAdvantage(id: string, advantageName: BackgroundAdvantageName) {
		const store = get(backgroundPaymentStore.paymentStore);
		const result = store.associatedAdvantages.some(
			(advantage) =>
				advantage.id === id && advantage.advantageName === advantageName && advantage.fixed > 0
		);

		return result;
	}

	function getMinValueForFixedBackground(id: string) {
		const store = get(backgroundPaymentStore.paymentStore);
		const background = store.backgrounds.find((background) => background.id === id);
		if (background) {
			return background.fixed;
		}
		return 1;
	}

	function getMinValueForFixedBackgroundAdvantage(
		id: string,
		advantageName: BackgroundAdvantageName
	) {
		const store = get(backgroundPaymentStore.paymentStore);
		const advantage = store.associatedAdvantages.find(
			(advantage) => advantage.id === id && advantage.advantageName === advantageName
		);

		if (advantage) {
			return advantage.fixed;
		}

		return 1;
	}

	function getInitialMinValueForBackgroundAdvantage() {
		return selectedBackgroundAdvantage &&
			isFixedBackgroundAdvantage(background.id, selectedBackgroundAdvantage)
			? getMinValueForFixedBackgroundAdvantage(background.id, selectedBackgroundAdvantage)
			: getMinValueForBackgroundAdvantage(selectedBackgroundAdvantage);
	}

	function getValueDescription(value: number) {
		switch (value) {
			case 1:
				return config.level1;
			case 2:
				return config.level2;
			case 3:
				return config.level3;
			default:
				return '';
		}
	}

	function handleSphereOfInfluenceChange(
		// eslint-disable-next-line no-undef
		event: Event & { currentTarget: EventTarget & HTMLSelectElement }
	) {
		const isMultiple = background.advantages?.some((s) => s.name === 'Diversity');
		const selectedValues = spheresOfInfluenceName
			.array()
			.parse(Array.from(event.currentTarget.selectedOptions).map((opt) => opt.value));
		const maxSelectableOptions = getMaxSelectionSphereOfInfluence(background.advantages);

		if (isMultiple) {
			const currentValues = background.sphereOfInfluence;
			const newValue = selectedValues.find((v) => !currentValues?.includes(v));

			if (selectedValues.length > maxSelectableOptions && currentValues && newValue) {
				sphereOfInfluences.set([...currentValues.slice(1), newValue]);
			} else {
				sphereOfInfluences.update((store) => {
					store = selectedValues;
					return store;
				});
			}
		} else {
			singleSphereOfInfluence.update((store) => {
				store = selectedValues[0];
				return store;
			});
		}

		if (isMultiple) {
			dispatchChange('change', {
				id: background.id,
				label: background.name,
				type: 'sphereOfInfluence',
				value: $sphereOfInfluences
			});
		} else if ($singleSphereOfInfluence) {
			dispatchChange('change', {
				id: background.id,
				label: background.name,
				type: 'sphereOfInfluence',
				value: [$singleSphereOfInfluence]
			});
		}
	}
</script>

<svelte:window bind:innerWidth />

{#if editModeEnabled}
	<div id={background.id} class="flex flex-col gap-2">
		<div class="flex h-10">
			<h4 class="h4">
				{background.name}
			</h4>

			{#if backgroundPaymentStore.canRemoveBackground(background.id)}
				<button
					class="variant-filled-primary btn ml-auto rounded-lg"
					type="button"
					on:click={() => {
						dispatchChange('deleteClick', {
							id: background.id,
							label: background.name,
							type: 'value',
							value: value
						});
					}}
				>
					<iconify-icon height="20" icon="mdi:remove" />
				</button>
			{/if}
		</div>

		<label class="label">
			<span>Dots</span>
			<select
				class="select rounded-lg"
				disabled={createNumberList(
					3,
					isFixedBackground(background.id) ? getMinValueForFixedBackground(background.id) : 1
				).length === 1 || !editModeEnabledAdvantages}
				bind:value
				on:change={(event) => {
					const intValue = Number(event.currentTarget.value);
					dispatchChange('change', {
						id: background.id,
						label: background.name,
						type: 'value',
						value: intValue
					});
				}}
			>
				{#each createNumberList(3, isFixedBackground(background.id) ? getMinValueForFixedBackground(background.id) : 1) as point}
					<option selected={background.value === point} value={point}>
						{point}
					</option>
				{/each}
			</select>
		</label>
		<label>
			Description
			<input
				id="name"
				class="input variant-form-material"
				disabled={!editModeEnabledAdvantages}
				type="text"
				bind:value={description}
				on:change={() =>
					dispatchChange('change', {
						id: background.id,
						label: background.name,
						type: 'description',
						value: description
					})}
			/>
		</label>
		{#if background.name === 'Contacts' || background.name === 'Allies'}
			<label class="label">
				{#if background && background.advantages?.some((s) => s.name === 'Diversity')}
					<span>Spheres of Influence</span>
					{#if isDesktopSize(innerWidth) || !detectTouchscreen()}
						<aside class="alert variant-filled mb-4 rounded-lg">
							<div class="alert-message">
								<p>Select multiple values with STRG + Click</p>
							</div>
						</aside>
					{/if}
					<select
						class="select rounded-lg [&>option]:rounded-lg"
						disabled={!editModeEnabledAdvantages}
						multiple
						size="5"
						bind:value={$sphereOfInfluences}
						on:change={handleSphereOfInfluenceChange}
					>
						<option disabled selected value={undefined}>
							Choose {getMaxSelectionSphereOfInfluence(background.advantages)} Spheres of Influence
						</option>
						{#each spheresOfInfluenceName.options as sphereOfInfluence}
							<option value={sphereOfInfluence}>
								{sphereOfInfluence}
							</option>
						{/each}
					</select>
				{:else}
					<span>Sphere of Influence</span>
					<select
						class="select rounded-lg"
						disabled={!editModeEnabledAdvantages}
						value={$singleSphereOfInfluence}
						on:change={handleSphereOfInfluenceChange}
					>
						<option disabled selected value={undefined}> Choose a Sphere of Influence </option>
						{#each spheresOfInfluenceName.options as sphereOfInfluence}
							<option value={sphereOfInfluence}>
								{sphereOfInfluence}
							</option>
						{/each}
					</select>
				{/if}
			</label>
		{/if}
		{#if backgroundConfig.advantages}
			<div class="grid max-w-sm grid-cols-1 grid-rows-1 gap-2 sm:grid-cols-2">
				{#if editModeEnabledAdvantages}
					<label class="label">
						<span>Advantages</span>
						<select
							class="select rounded-lg"
							disabled={Object.keys(backgroundConfig.advantages).length === 1}
							bind:value={selectedBackgroundAdvantage}
							on:change={() => {
								backgroundAdvantageValue = createNumberList(
									getMaxValueForBackgroundAdvantage(selectedBackgroundAdvantage),
									getMinValueForBackgroundAdvantage(selectedBackgroundAdvantage)
								)[0];
								backgroundAdvantageValue = getInitialMinValueForBackgroundAdvantage();
							}}
						>
							{#each Object.keys(backgroundConfig.advantages) as backgroundAdvantage}
								<option value={backgroundAdvantage}>
									{backgroundAdvantage}
								</option>
							{/each}
						</select>
					</label>
					<label class="label">
						<span>Dots</span>
						<select
							class="select rounded-lg"
							disabled={createNumberList(
								getMaxValueForBackgroundAdvantage(selectedBackgroundAdvantage),
								getMinValueForBackgroundAdvantage(selectedBackgroundAdvantage)
							).length === 1}
							bind:value={backgroundAdvantageValue}
						>
							{#each createNumberList(getMaxValueForBackgroundAdvantage(selectedBackgroundAdvantage), getInitialMinValueForBackgroundAdvantage()) as point}
								<option selected={backgroundAdvantageValue === point} value={point}>
									{point}
								</option>
							{/each}
						</select>
					</label>
				{/if}
				{#if selectedBackgroundAdvantage}
					<button
						class="variant-filled-primary btn rounded-lg sm:col-span-2"
						disabled={!backgroundPaymentStore.canAddBackgroundAdvantage(
							background.id,
							background.name,
							selectedBackgroundAdvantage,
							backgroundAdvantageValue,
							mode
						)}
						type="button"
						on:click={() => {
							const backgroundIndex = $characterCreationStore.backgrounds.findIndex(
								(e) => e.id === background.id
							);
							if (backgroundIndex === -1) return;
							if (!selectedBackgroundAdvantage) return;

							const total = backgroundPaymentStore.getTotalAdvantagePoints(
								$characterCreationStore.backgrounds[backgroundIndex].id,
								selectedBackgroundAdvantage
							);

							if (backgroundAdvantageValue < total) {
								sphereOfInfluences.set(
									background.sphereOfInfluence
										? background.sphereOfInfluence.slice(0, backgroundAdvantageValue + 1)
										: []
								);
								singleSphereOfInfluence.set(
									background.sphereOfInfluence ? background.sphereOfInfluence[0] : undefined
								);
							}

							dispatchChange('advantageClick', {
								backgroundId: background.id,
								backgroundName: background.name,
								advantageId: generateId(),
								name: selectedBackgroundAdvantage,
								value: backgroundAdvantageValue
							});
						}}
					>
						Add Advantage
					</button>
				{/if}
			</div>
			{#if background.advantages}
				<div class="col-span-2 flex flex-col">
					<span class="underline underline-offset-1">Advantages</span>
					{#each background.advantages as advantage}
						<BackgroundAdvantage
							{advantage}
							{background}
							config={getBackgroundConfig(background.name)}
							showDeleteButton={backgroundPaymentStore.canRemoveBackgroundAdvantage(
								background.id,
								advantage.name
							) && editModeEnabledAdvantages}
							on:deleteClick={(event) => {
								dispatchChange('advantageDeleteClick', event.detail);
								background.advantages = background.advantages;
							}}
						/>
					{/each}
				</div>
			{/if}
		{/if}
		{#if backgroundConfig.disadvantages}
			<div class="grid max-w-sm grid-cols-1 grid-rows-1 gap-2 sm:grid-cols-2">
				{#if editModeEnabledDisadvantages}
					<label class="label">
						<span>Disadvantages</span>
						<select
							class="select rounded-lg"
							disabled={Object.keys(backgroundConfig.disadvantages).length === 1}
							bind:value={selectedBackgroundDisadvantage}
							on:change={() => () =>
								(backgroundDisadvantageValue = createNumberList(
									getMaxValueForBackgroundAdvantage(selectedBackgroundDisadvantage),
									getMinValueForBackgroundAdvantage(selectedBackgroundDisadvantage)
								)[0])}
						>
							{#each Object.keys(backgroundConfig.disadvantages) as backgroundDisadvantage}
								<option value={backgroundDisadvantage}>
									{backgroundDisadvantage}
								</option>
							{/each}
						</select>
					</label>
					<label class="label">
						<span>Dots</span>
						<select
							class="select rounded-lg"
							disabled={createNumberList(
								getMaxValueForBackgroundAdvantage(selectedBackgroundDisadvantage),
								getMinValueForBackgroundAdvantage(selectedBackgroundDisadvantage)
							).length === 1}
							bind:value={backgroundDisadvantageValue}
						>
							{#each createNumberList(getMaxValueForBackgroundAdvantage(selectedBackgroundDisadvantage), getMinValueForBackgroundAdvantage(selectedBackgroundDisadvantage)) as point}
								<option selected={backgroundDisadvantageValue === point} value={point}>
									{point}
								</option>
							{/each}
						</select>
					</label>
					<button
						class="variant-filled-primary btn rounded-lg sm:col-span-2"
						type="button"
						on:click={() => {
							dispatchChange('disadvantageClick', {
								backgroundId: background.id,
								name: selectedBackgroundDisadvantage,
								value: backgroundDisadvantageValue
							});
							value = background.value;
							background.disadvantages = background.disadvantages;
						}}
					>
						Add Disadvantage
					</button>
				{/if}
				{#if background.disadvantages}
					<div class="col-span-2 flex flex-col">
						<span class="underline underline-offset-1">Disadvantages</span>
						{#each background.disadvantages as disadvantage}
							<BackgroundDisadvantage
								{background}
								config={getBackgroundConfig(background.name)}
								{disadvantage}
								showDeleteButton={editModeEnabledDisadvantages}
								on:deleteClick={(event) => {
									dispatchChange('disadvantageDeleteClick', event.detail);
									background.disadvantages = background.disadvantages;
								}}
							/>
						{/each}
					</div>
				{/if}
			</div>
		{/if}
	</div>
{:else}
	<div class="card flex flex-col rounded-lg p-4">
		<label class="label grid w-full grid-cols-[1fr_auto] grid-rows-1 gap-x-2" for={background.id}>
			<HelpText id={background.id}>
				<span id={background.id} class="font-bold">{background.name}</span>
				<svelte:fragment slot="helpText">
					<p>{backgroundConfig.description}</p>
				</svelte:fragment>
			</HelpText>
			<HelpText id="{background.id}-value">
				<Ratings justify="justify-left" max={3} bind:value={background.value}>
					<svelte:fragment slot="empty">
						<iconify-icon icon="prime:circle" />
					</svelte:fragment>
					<svelte:fragment slot="full">
						<iconify-icon icon="prime:circle-fill" />
					</svelte:fragment>
				</Ratings>
				<svelte:fragment slot="helpText">
					<p class="whitespace-pre-line">
						{getValueDescription(background.value)}
					</p>
				</svelte:fragment>
			</HelpText>
			{#if background.description}
				<p class="col-span-2 whitespace-pre-line text-sm">
					{background.description}
				</p>
			{/if}
			{#if (background.name === 'Contacts' || background.name === 'Allies') && background.sphereOfInfluence}
				<div class="col-span-2">
					{#if background.sphereOfInfluence.length === 1}
						<p class="font-bold underline">Sphere of Influence</p>
					{:else}
						<p class="font-bold underline">Spheres of Influence</p>
					{/if}

					<p class="whitespace-pre-line text-sm">
						{background.sphereOfInfluence.join(', ')}
					</p>
				</div>
			{/if}
			{#if background.advantages}
				<p class="font-bold underline">Vorteile</p>
				<ol class="list col-span-2">
					{#each background.advantages as advantage}
						<li>
							<BackgroundAdvantage
								{advantage}
								{background}
								config={getBackgroundConfig(background.name)}
							/>
						</li>
					{/each}
				</ol>
			{/if}
			{#if background.disadvantages}
				<p class="font-bold underline">Nachteile</p>
				<ol class="list col-span-2">
					{#each background.disadvantages as disadvantage}
						<li>
							<BackgroundDisadvantage
								{background}
								config={getBackgroundConfig(background.name)}
								{disadvantage}
							/>
						</li>
					{/each}
				</ol>
			{/if}
		</label>
	</div>
{/if}
