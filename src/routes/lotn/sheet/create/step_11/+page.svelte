<script lang="ts">
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import { characterStore } from '$lib/components/lotn/characterSheet/characterStore';
	import HelpText from '$lib/components/lotn/characterSheet/components/HelpText.svelte';
	import Tracker from '$lib/components/lotn/trackers/tracker/tracker.svelte';
	import { characterCreationStore } from '$lib/stores/characterCreationStore';
	import { getHealthTotal, getInitiative, getSkillValueByName, getWillpowerTotal } from '$lib/util';
	import { playerCharacter } from '$lib/zod/lotn/playerCharacter/playerCharacter';

	let responseMessage: string | undefined;

	$: submitting = false;

	async function saveToDatabase() {
		submitting = true;
		try {
			const response = await fetch(`${base}/api/lotn/character`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify($characterCreationStore)
			});

			if (response.ok) {
				const result = playerCharacter.safeParse(await response.json());
				if (result.success) {
					submitting = false;
					characterStore.set(result.data);
					goto(`${base}/lotn/sheet/${result.data.id}`, { replaceState: true });
				} else {
					responseMessage = JSON.stringify(result.error.errors, undefined, 2);
				}
			} else {
				responseMessage = 'Failed to submit data';
			}
		} catch (error) {
			responseMessage = 'Network error occurred';
		}
		submitting = false;
	}

	function validCharacter() {
		const result = playerCharacter.safeParse($characterCreationStore);
		if (result.success) {
			return true;
		} else {
			const errors = result.error?.errors;
			return errors.length === 1 && errors[0].path.length === 1 && errors[0].path[0] === 'id'
				? true
				: false;
		}
	}

	function getErrorMessages() {
		const result = playerCharacter.safeParse($characterCreationStore);
		if (result.success) {
			return [];
		} else {
			return result.error?.errors.filter((e) => e.path[0] !== 'id') ?? [];
		}
	}
</script>

<div class="grid grid-cols-1 grid-rows-1 gap-2 sm:grid-cols-3">
	<HelpText id="character-health">
		<Tracker title="Health" value={getHealthTotal(true)} />
		<svelte:fragment slot="helpText">
			All characters start with 3 + Stamina ({$characterCreationStore.attributes.physical_stamina})
			health levels. The last three health levels represent your Injured health levels.
		</svelte:fragment>
	</HelpText>
	<HelpText id="character-willpower">
		<Tracker title="Willpower" value={getWillpowerTotal(true)} />
		<svelte:fragment slot="helpText">
			All characters start with Willpower equal to their Resolve ({$characterCreationStore
				.attributes.mental_resolve}) + Composure ({$characterCreationStore.attributes
				.social_composure}).
		</svelte:fragment>
	</HelpText>
	<HelpText id="character-initiative">
		<Tracker title="Initiative" value={getInitiative(true)} />
		<svelte:fragment slot="helpText">
			All characters have an Initiative score equal to their Composure ({$characterCreationStore
				.attributes.social_composure}) + Awareness ({getSkillValueByName(
				'Awareness',
				$characterCreationStore.skills
			)}).
		</svelte:fragment>
	</HelpText>
</div>

{#if validCharacter()}
	<aside class="alert variant-filled-success col-span-2 mt-4 rounded-lg">
		<div>
			<iconify-icon height="48" icon="mdi:success" />
		</div>
		<div class="alert-message">
			<h3 class="h3">The character seems to be a valid character</h3>
			<p>
				The character seems to be valid. This does not mean the character fullfills all requirements
				of the storyteller team, just that it is formally correct.
			</p>
		</div>
	</aside>

	<button
		class="variant-filled-primary btn mt-4 w-full rounded-lg"
		disabled={submitting}
		type="button"
		on:click={async () => {
			await saveToDatabase();
		}}
	>
		Save To Database
	</button>

	{#if responseMessage}
		<aside class="alert variant-filled-success col-span-2 mt-4 rounded-lg">
			<div>
				<iconify-icon height="48" icon="mdi:info" />
			</div>
			<div class="alert-message">
				<h3 class="h3">Response from server</h3>
				<p>{responseMessage}</p>
			</div>
		</aside>
	{/if}
{:else}
	<aside class="alert variant-filled-warning col-span-2 mt-4 rounded-lg">
		<div>
			<iconify-icon height="48" icon="mdi:warning" />
		</div>
		<div class="alert-message">
			<h3 class="h3">The character is invalid</h3>
			<p>There are some formal validation errors with the character.</p>
			{#each getErrorMessages() as error}
				<p>{error.path}: {error.message}</p>
			{/each}
		</div>
	</aside>
{/if}
