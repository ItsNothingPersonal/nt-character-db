<script lang="ts">
	import { isNullOrUndefined, typedObjectKeys } from '$lib/util';
	import {
		mentalSpecialization,
		type MentalSpecialization
	} from '$lib/zod/enums/mentalSpecialization';
	import {
		physicalSpecialization,
		type PhysicalSpecialization
	} from '$lib/zod/enums/physicalSpecialization';
	import { priorities, type Priorities } from '$lib/zod/enums/priorities';
	import {
		socialSpecialization,
		type SocialSpecialization
	} from '$lib/zod/enums/socialSpecialization';
	import type { PlayerCharacterCreate } from '$lib/zod/playerCharacter/playerCharacter';
	import { RadioGroup, RadioItem, Step } from '@skeletonlabs/skeleton';
	import ValueRating from '../valueRating/valueRating.svelte';

	export let playerCharacter: PlayerCharacterCreate;

	playerCharacter.attributes = {
		physical_value: 0,
		social_value: 0,
		mental_value: 0
	};

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
	let selectedPhysicalSpecialization: PhysicalSpecialization;
	let social: Priorities;
	let selectedSocialSpecialization: SocialSpecialization;
	let mental: Priorities;
	let selectedMentalSpecialization: MentalSpecialization;

	$: locked =
		isNullOrUndefined(physical) ||
		isNullOrUndefined(social) ||
		isNullOrUndefined(mental) ||
		isNullOrUndefined(selectedPhysicalSpecialization) ||
		isNullOrUndefined(selectedSocialSpecialization) ||
		isNullOrUndefined(selectedMentalSpecialization) ||
		physical === social ||
		physical === mental ||
		social === mental;

	$: {
		if (!isNullOrUndefined(playerCharacter.attributes)) {
			playerCharacter.attributes.physical_value = cfg[physical];
			playerCharacter.attributes.social_value = cfg[social];
			playerCharacter.attributes.mental_value = cfg[mental];

			playerCharacter.attributes.physical_specialization = [selectedPhysicalSpecialization];
			playerCharacter.attributes.social_specialization = [selectedSocialSpecialization];
			playerCharacter.attributes.mental_specialization = [selectedMentalSpecialization];
		}
	}
</script>

<Step {locked}>
	<svelte:fragment slot="header">Step 4: Assign Initial Attributes</svelte:fragment>
	<div class="grid auto-rows-auto grid-cols-3 gap-2">
		<RadioGroup id="physical" rounded="rounded-none">
			{#each validPriorities as priority}
				<RadioItem bind:group={physical} name="justify" value={priority}>{priority}</RadioItem>
			{/each}
		</RadioGroup>

		<RadioGroup id="social" rounded="rounded-none">
			{#each validPriorities as priority}
				<RadioItem bind:group={social} name="justify" value={priority}>{priority}</RadioItem>
			{/each}
		</RadioGroup>

		<RadioGroup id="mental" rounded="rounded-none">
			{#each validPriorities as priority}
				<RadioItem bind:group={mental} name="justify" value={priority}>{priority}</RadioItem>
			{/each}
		</RadioGroup>
	</div>
	<div
		class="grid auto-rows-auto grid-cols-1 gap-2 gap-y-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3"
	>
		<ValueRating
			label="Physical"
			value={playerCharacter.attributes?.physical_value ?? 0}
			max={10}
		/>
		<ValueRating label="Social" value={playerCharacter.attributes?.social_value ?? 0} max={10} />
		<ValueRating label="Mental" value={playerCharacter.attributes?.mental_value ?? 0} max={10} />
	</div>
	<div class="grid auto-rows-auto grid-cols-3 gap-2">
		<RadioGroup id="physical_specialization" rounded="rounded-none">
			{#each validPhysicalSpecializations as specialization}
				<RadioItem
					bind:group={selectedPhysicalSpecialization}
					name="justify"
					value={specialization}
				>
					{specialization}
				</RadioItem>
			{/each}
		</RadioGroup>

		<RadioGroup id="social_specialization" rounded="rounded-none">
			{#each validSocialSpecializations as specialization}
				<RadioItem bind:group={selectedSocialSpecialization} name="justify" value={specialization}>
					{specialization}
				</RadioItem>
			{/each}
		</RadioGroup>

		<RadioGroup id="mental_specialization" rounded="rounded-none">
			{#each validMentalSpecializations as specialization}
				<RadioItem bind:group={selectedMentalSpecialization} name="justify" value={specialization}>
					{specialization}
				</RadioItem>
			{/each}
		</RadioGroup>
	</div>
</Step>
