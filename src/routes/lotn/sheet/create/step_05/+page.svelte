<script lang="ts">
	import EditableSkill from '$lib/components/lotn/EditableSkill/EditableSkill.svelte';
	import { getSkillHelptext, hasSkillSpecializations } from '$lib/components/lotn/util/skillUtil';
	import { ScreenSize } from '$lib/sceenSize';
	import { characterCreationStore } from '$lib/stores/characterCreationStore';
	import { skillsPaidWithDotsStore } from '$lib/stores/skillsPaidWithDotsStore';
	import { generateId } from '$lib/util';
	import { skillDotCategory, type SkillDotCategory } from '$lib/zod/lotn/enums/skillDotsCategory';
	import { skillName, type SkillName } from '$lib/zod/lotn/enums/skillName';
	import { Ratings } from '@skeletonlabs/skeleton';
	import { get } from 'svelte/store';

	let selectedSkill: SkillName | undefined = undefined;
	let selectedSkillSpecialization: string | undefined = undefined;

	let spendingPoints: SkillDotCategory = 3;
	let innerWidth = 0;

	const amount3Dots = skillsPaidWithDotsStore.amount3Dots;
	const max3Dots = skillsPaidWithDotsStore.max3Dots;
	const skills3Dots = skillsPaidWithDotsStore.getSkillsWithPointValue(3);
	const amount2Dots = skillsPaidWithDotsStore.amount2Dots;
	const max2Dots = skillsPaidWithDotsStore.max2Dots;
	const skills2Dots = skillsPaidWithDotsStore.getSkillsWithPointValue(2);
	const amount1Dots = skillsPaidWithDotsStore.amount1Dots;
	const max1Dots = skillsPaidWithDotsStore.max1Dots;
	const skills1Dots = skillsPaidWithDotsStore.getSkillsWithPointValue(1);

	function setSkill(skill: SkillName, skillSpecialization: string | undefined = undefined) {
		selectedSkill = skill;

		const currentSkill = $characterCreationStore.skills.find((s) => s.name === skill);
		if (
			!currentSkill &&
			get(skillsPaidWithDotsStore.getSkillsWithPointValue(spendingPoints)).length <
				get(skillsPaidWithDotsStore.getMaxDots(spendingPoints))
		) {
			characterCreationStore.update((store) => {
				store.skills = [
					...store.skills,
					{
						id: generateId(),
						name: skill,
						value: spendingPoints,
						specialization: skillSpecialization
					}
				];
				return store;
			});
			skillsPaidWithDotsStore.addSkillsPaidWithDots(skill, spendingPoints);
			return;
		}

		if (
			currentSkill &&
			currentSkill.value !== spendingPoints &&
			get(skillsPaidWithDotsStore.getSkillsWithPointValue(spendingPoints)).length <
				get(skillsPaidWithDotsStore.getMaxDots(spendingPoints))
		) {
			skillsPaidWithDotsStore.updateSkillsPaidWithDots(
				skill,
				skillDotCategory.parse(currentSkill.value),
				spendingPoints
			);

			characterCreationStore.update((store) => {
				store.skills = store.skills.map((s) => {
					if (s.name === skill) {
						s.value = spendingPoints;
						s.specialization = skillSpecialization;
					}
					return s;
				});
				return store;
			});
		}
	}

	function handleUpdateSpecialization(event: Event) {
		const customEvent = event as CustomEvent<{ label: string; specialization: string }>;
		if (customEvent.detail.label && customEvent.detail.specialization) {
			const currentSkill = $characterCreationStore.skills.find(
				(s) => s.name === customEvent.detail.label
			);
			if (currentSkill) {
				currentSkill.specialization = customEvent.detail.specialization;
			}
		}
	}

	function getAvailableSkills() {
		return skillName.options.sort();
	}
</script>

<svelte:window bind:innerWidth />

<div class="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-[auto_2fr]">
	<div class="grid grid-cols-2 grid-rows-2 gap-2 sm:grid-cols-1 sm:grid-rows-4">
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
		<div class="flex flex-col gap-2">
			{#key spendingPoints}
				{#key selectedSkillSpecialization}
					{#key selectedSkill}
						<select
							class="select rounded-lg"
							on:change={(event) => {
								if (!hasSkillSpecializations(skillName.parse(event.currentTarget.value))) {
									setSkill(skillName.parse(event.currentTarget.value));
								}
							}}
							bind:value={selectedSkill}
						>
							<option disabled selected value="">Select a Skill</option>
							{#each getAvailableSkills() as skill}
								<option value={skill}>{skill}</option>
							{/each}
						</select>
					{/key}
				{/key}
				{#if selectedSkill && hasSkillSpecializations(skillName.parse(selectedSkill))}
					<label>
						Specializations
						<input
							id="name"
							class="input variant-form-material"
							type="text"
							bind:value={selectedSkillSpecialization}
						/>
					</label>
					<button
						class="variant-filled-primary btn rounded-lg"
						type="button"
						on:click={() => {
							if (selectedSkill && selectedSkillSpecialization) {
								setSkill(selectedSkill, selectedSkillSpecialization);
								selectedSkill = undefined;
								selectedSkillSpecialization = undefined;
							}
						}}
					>
						Save Skill
					</button>
				{/if}
			{/key}
		</div>
		{#if selectedSkill}
			<p class="whitespace-pre-line">
				{getSkillHelptext(selectedSkill)}
			</p>
		{/if}
	</div>
</div>

<hr class="mt-4" />
<div class="col-span-2 grid grid-cols-2 gap-2 p-2 sm:grid-cols-3">
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
<div class="col-span-2 grid grid-cols-2 gap-2 p-2 sm:grid-cols-3">
	<div class="flex flex-col gap-2">
		{#each $skills3Dots as skill}
			<EditableSkill
				displayStyle="dots"
				displayValue={innerWidth < ScreenSize.SM ? 'below' : 'beside'}
				minValue={skill.value}
				{skill}
				on:specializationChange={(event) => handleUpdateSpecialization(event)}
			/>
		{/each}
	</div>
	<div class="flex flex-col gap-2">
		{#each $skills2Dots as skill}
			<EditableSkill
				displayStyle="dots"
				displayValue={innerWidth < ScreenSize.SM ? 'below' : 'beside'}
				minValue={skill.value}
				{skill}
				on:specializationChange={(event) => handleUpdateSpecialization(event)}
			/>
		{/each}
	</div>
	<div class="flex flex-col gap-2">
		{#each $skills1Dots as skill}
			<EditableSkill
				displayStyle="dots"
				displayValue={innerWidth < ScreenSize.SM ? 'below' : 'beside'}
				minValue={skill.value}
				{skill}
				on:specializationChange={(event) => handleUpdateSpecialization(event)}
			/>
		{/each}
	</div>
</div>
