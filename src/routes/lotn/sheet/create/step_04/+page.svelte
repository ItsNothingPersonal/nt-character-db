<script lang="ts">
	import {
		attributeConfig,
		type AttributeConfigMap
	} from '$lib/components/lotn/config/attributeConfig';
	import EditableAttribute from '$lib/components/lotn/EditableAttributes/EditableAttribute.svelte';
	import { mapAttributeNameToProperty } from '$lib/components/lotn/util/attributesUtil';
	import { attributesPaidWithDotsStore } from '$lib/stores/attributesPaidWithDotsStore';
	import { characterCreationStore } from '$lib/stores/characterCreationStore';
	import type { AttributeDotCategory } from '$lib/zod/lotn/enums/attributDotCategory';
	import { attributeName, type AttributeName } from '$lib/zod/lotn/enums/attributeName';
	import { Ratings } from '@skeletonlabs/skeleton';

	let selectedAttribute: AttributeName | undefined = undefined;
	$: amount4Dots = attributesPaidWithDotsStore.amount4Dots;
	$: max4Dots = attributesPaidWithDotsStore.max4Dots;
	$: amount3Dots = attributesPaidWithDotsStore.amount3Dots;
	$: max3Dots = attributesPaidWithDotsStore.max3Dots;
	$: amount2Dots = attributesPaidWithDotsStore.amount2Dots;
	$: max2Dots = attributesPaidWithDotsStore.max2Dots;
	$: amount1Dots = attributesPaidWithDotsStore.amount1Dots;
	$: max1Dots = attributesPaidWithDotsStore.max1Dots;

	let spendingPoints: AttributeDotCategory = 4;

	function setAttribute(attribute: AttributeName) {
		if (
			spendingPoints === 1 ||
			attributesPaidWithDotsStore.getAmountDots(spendingPoints) <
				attributesPaidWithDotsStore.getMaxDots(spendingPoints)
		) {
			attributesPaidWithDotsStore.attributePaidWithDots = {
				dots: spendingPoints,
				attributeName: attribute
			};
			characterCreationStore.update((store) => {
				store.attributes[mapAttributeNameToProperty(attribute)] = spendingPoints;

				if (attribute === 'Resolve' || attribute === 'Composure') {
					store.willpower.value =
						store.attributes['mental_resolve'] + store.attributes['social_composure'];
				}

				return store;
			});
		}
	}

	function getAttributeHelpText(attribute: string) {
		const [category, attributeName] = attribute.split('_');
		return getAttributeHelpTextFromConfig(
			category as keyof AttributeConfigMap,
			attributeName as keyof AttributeConfigMap[never] as never
		);
	}

	function getAttributeHelpTextFromConfig(
		category: keyof AttributeConfigMap,
		attributeName: keyof AttributeConfigMap[keyof AttributeConfigMap]
	) {
		return attributeConfig[category][attributeName]['helptext'];
	}
</script>

<div class="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-[auto_2fr]">
	<div class="grid grid-cols-2 grid-rows-2 gap-2 sm:grid-cols-1 sm:grid-rows-4">
		<button
			class={`variant-filled-primary btn rounded-lg ${spendingPoints === 4 ? 'ring-2 ring-black dark:ring-white' : ''}`}
			type="button"
			on:click={() => (spendingPoints = 4)}
		>
			<Ratings justify="justify-left" max={5} value={4}>
				<svelte:fragment slot="empty">
					<iconify-icon icon="prime:circle" />
				</svelte:fragment>
				<svelte:fragment slot="full">
					<iconify-icon icon="prime:circle-fill" />
				</svelte:fragment>
			</Ratings>
		</button>
		<button
			class={`variant-filled-primary btn rounded-lg ${spendingPoints === 3 ? 'ring-2 ring-black dark:ring-white' : ''}`}
			type="button"
			on:click={() => (spendingPoints = 3)}
		>
			<Ratings justify="justify-left" max={5} value={3}>
				<svelte:fragment slot="empty">
					<iconify-icon icon="prime:circle" />
				</svelte:fragment>
				<svelte:fragment slot="full">
					<iconify-icon icon="prime:circle-fill" />
				</svelte:fragment>
			</Ratings>
		</button>
		<button
			class={`variant-filled-primary btn rounded-lg ${spendingPoints === 2 ? 'ring-2 ring-black dark:ring-white' : ''}`}
			type="button"
			on:click={() => (spendingPoints = 2)}
		>
			<Ratings justify="justify-left" max={5} value={2}>
				<svelte:fragment slot="empty">
					<iconify-icon icon="prime:circle" />
				</svelte:fragment>
				<svelte:fragment slot="full">
					<iconify-icon icon="prime:circle-fill" />
				</svelte:fragment>
			</Ratings>
		</button>
		<button
			class={`variant-filled-primary btn rounded-lg ${spendingPoints === 1 ? 'ring-2 ring-black dark:ring-white' : ''}`}
			type="button"
			on:click={() => (spendingPoints = 1)}
		>
			<Ratings justify="justify-left" max={5} value={1}>
				<svelte:fragment slot="empty">
					<iconify-icon icon="prime:circle" />
				</svelte:fragment>
				<svelte:fragment slot="full">
					<iconify-icon icon="prime:circle-fill" />
				</svelte:fragment>
			</Ratings>
		</button>
	</div>
	<div class="flex flex-col gap-2">
		<div class="flex flex-col">
			{#key spendingPoints}
				<select
					class="select rounded-lg"
					on:change={(event) => setAttribute(attributeName.parse(event.currentTarget.value))}
				>
					<option disabled selected value="">Select an Attribute</option>
					{#each attributeName.options as attribute}
						<option value={attribute}>{attribute}</option>
					{/each}
				</select>
			{/key}
		</div>
		{#if selectedAttribute}
			<p class="whitespace-pre-line">
				{getAttributeHelpText(selectedAttribute)}
			</p>
		{/if}
	</div>
</div>

<hr class="mt-4" />
<div class="col-span-2 grid grid-cols-2 gap-2 p-2 sm:grid-cols-4">
	<div>
		Used 4 dots: {$amount4Dots}/{$max4Dots}
	</div>
	<div>
		Used 3 dots: {$amount3Dots}/{$max3Dots}
	</div>
	<div>
		Used 2 dots: {$amount2Dots}/{$max2Dots}
	</div>
	<div>
		Used 1 dots: {$amount1Dots}/{$max1Dots}
	</div>
</div>
<div class="col-span-2 grid grid-cols-2 gap-2 p-2 sm:grid-cols-4">
	<div class="flex flex-col gap-2">
		{#each attributesPaidWithDotsStore.store[4].attributeNames as attribute}
			<EditableAttribute attributeName={attribute} attributeValue={4} displayStyle="dots" />
		{/each}
	</div>
	<div class="flex flex-col gap-2">
		{#each attributesPaidWithDotsStore.store[3].attributeNames as attribute}
			<EditableAttribute attributeName={attribute} attributeValue={3} displayStyle="dots" />
		{/each}
	</div>
	<div class="flex flex-col gap-2">
		{#each attributesPaidWithDotsStore.store[2].attributeNames as attribute}
			<EditableAttribute attributeName={attribute} attributeValue={2} displayStyle="dots" />
		{/each}
	</div>
	<div class="flex flex-col gap-2">
		{#each attributesPaidWithDotsStore.store[1].attributeNames as attribute}
			<EditableAttribute attributeName={attribute} attributeValue={1} displayStyle="dots" />
		{/each}
	</div>
</div>
