<script lang="ts">
	import { characterCreateStore } from '$lib/components/classic/characterSheet/characterStore';
	import ValueRating from '$lib/components/valueRating/valueRating.svelte';
	import { isNullOrUndefined, typedObjectKeys } from '$lib/util';
	import { mentalSpecialization } from '$lib/zod/classic/enums/mentalSpecialization';
	import { physicalSpecialization } from '$lib/zod/classic/enums/physicalSpecialization';
	import { priorities, type Priorities } from '$lib/zod/classic/enums/priorities';
	import { socialSpecialization } from '$lib/zod/classic/enums/socialSpecialization';
	import { playerAttribute } from '$lib/zod/classic/playerCharacter/playerAttribute';
	import { RadioGroup, RadioItem, Step } from '@skeletonlabs/skeleton';

	const cfg: Record<Priorities, number> = {
		Primary: 7,
		Secondary: 5,
		Tertiary: 3
	};

	const validPhysicalSpecializations = typedObjectKeys(physicalSpecialization.Values);
	const validSocialSpecializations = typedObjectKeys(socialSpecialization.Values);
	const validMentalSpecializations = typedObjectKeys(mentalSpecialization.Values);
	const validPriorities = typedObjectKeys(priorities.Values);

	let physical: Priorities;
	let social: Priorities;
	let mental: Priorities;

	$: locked =
		isNullOrUndefined(physical) ||
		isNullOrUndefined(social) ||
		isNullOrUndefined(mental) ||
		isNullOrUndefined($characterCreateStore.attributes.physical_specialization) ||
		isNullOrUndefined($characterCreateStore.attributes.social_specialization) ||
		isNullOrUndefined($characterCreateStore.attributes.mental_specialization) ||
		physical === social ||
		physical === mental ||
		social === mental ||
		!playerAttribute.safeParse($characterCreateStore.attributes).success;

	$: {
		if (!isNullOrUndefined($characterCreateStore.attributes)) {
			$characterCreateStore.attributes.physical_value = cfg[physical];
			$characterCreateStore.attributes.social_value = cfg[social];
			$characterCreateStore.attributes.mental_value = cfg[mental];
		}
	}
</script>

<Step {locked}>
	<svelte:fragment slot="header">Step 4: Assign Initial Attributes</svelte:fragment>
	<div class="grid auto-rows-auto grid-cols-3 gap-2">
		<RadioGroup rounded="rounded-none">
			{#each validPriorities as priority, indexPhysical}
				<RadioItem name="physical-priority-{indexPhysical}" value={priority} bind:group={physical}>
					{priority}
				</RadioItem>
			{/each}
		</RadioGroup>

		<RadioGroup rounded="rounded-none">
			{#each validPriorities as priority, indexSocial}
				<RadioItem name="social-priority-{indexSocial}" value={priority} bind:group={social}>
					{priority}
				</RadioItem>
			{/each}
		</RadioGroup>

		<RadioGroup rounded="rounded-none">
			{#each validPriorities as priority, indexMental}
				<RadioItem name="mental-priority-{indexMental}" value={priority} bind:group={mental}>
					{priority}
				</RadioItem>
			{/each}
		</RadioGroup>
	</div>
	<div
		class="grid auto-rows-auto grid-cols-1 gap-2 gap-y-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3"
	>
		<ValueRating
			label="Physical"
			max={10}
			value={$characterCreateStore.attributes.physical_value}
		/>
		<ValueRating label="Social" max={10} value={$characterCreateStore.attributes.social_value} />
		<ValueRating label="Mental" max={10} value={$characterCreateStore.attributes.mental_value} />
	</div>
	<div class="grid auto-rows-auto grid-cols-3 gap-2">
		<RadioGroup id="physical_specialization" rounded="rounded-none">
			{#each validPhysicalSpecializations as specialization, indexPhysical}
				<RadioItem
					name="physical-focus-{indexPhysical}"
					value={[specialization]}
					bind:group={$characterCreateStore.attributes.physical_specialization}
				>
					{specialization}
				</RadioItem>
			{/each}
		</RadioGroup>

		<RadioGroup id="social_specialization" rounded="rounded-none">
			{#each validSocialSpecializations as specialization, indexSocial}
				<RadioItem
					name="social-focus-{indexSocial}"
					value={[specialization]}
					bind:group={$characterCreateStore.attributes.social_specialization}
				>
					{specialization}
				</RadioItem>
			{/each}
		</RadioGroup>

		<RadioGroup id="mental_specialization" rounded="rounded-none">
			{#each validMentalSpecializations as specialization, indexMental}
				<RadioItem
					name="mental-focus-{indexMental}"
					value={[specialization]}
					bind:group={$characterCreateStore.attributes.mental_specialization}
				>
					{specialization}
				</RadioItem>
			{/each}
		</RadioGroup>
	</div>
</Step>
