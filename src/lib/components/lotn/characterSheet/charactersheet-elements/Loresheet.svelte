<script lang="ts">
	import { Ratings } from '@skeletonlabs/skeleton';
	import { loresheetConfig } from '../../config/loresheetConfig';
	import { characterStore } from '../characterStore';
	import HelpText from '../components/HelpText.svelte';
	import { interactiveModeStore } from '../interactiveModeStore';

	const config = $characterStore.loresheet
		? loresheetConfig[$characterStore.loresheet.name]
		: undefined;

	function getValueDescription(value: number) {
		if (!config) return undefined;

		switch (value) {
			case 1:
				return config.level1;
			case 2:
				return config.level2;
			case 3:
				return config.level3;
		}
	}
</script>

{#if $characterStore.loresheet}
	<label class="label grid w-full auto-rows-auto grid-cols-1" for={$characterStore.loresheet.name}>
		<HelpText id={$characterStore.loresheet.name} placement="bottom-start">
			<span id={$characterStore.loresheet.name} class="whitespace-pre-line">
				<h3 class="h3">{$characterStore.loresheet.name}</h3>
			</span>
			<svelte:fragment slot="helpText">
				{#if config}
					{#if config.prerequisite}
						<p class="whitespace-pre-line">
							<span class="font-bold">Prerequisite:</span>
							{config.prerequisite}
						</p>
					{/if}

					<p class="whitespace-pre-line">
						{config.description}
					</p>
				{/if}
			</svelte:fragment>
		</HelpText>

		<div class="grid auto-rows-auto grid-cols-1 gap-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-5">
			{#if $characterStore.loresheet.values}
				{#each $characterStore.loresheet.values.sort() as loreSheetLevel}
					<div class="card rounded-lg p-4">
						<label
							class="label grid w-full grid-cols-[3fr_1fr] grid-rows-1"
							for={`${$characterStore.loresheet.name}-${loreSheetLevel}`}
						>
							<HelpText id={`${$characterStore.loresheet.name}-${loreSheetLevel}`}>
								<span
									id={`${$characterStore.loresheet.name}-${loreSheetLevel}`}
									class="text-nowrap font-bold"
								>
									{getValueDescription(loreSheetLevel)?.title}
								</span>
								<svelte:fragment slot="helpText">
									<p class="whitespace-pre-line">
										{getValueDescription(loreSheetLevel)?.description}
									</p>
								</svelte:fragment>
							</HelpText>

							<HelpText id={`${$characterStore.loresheet.name}-${loreSheetLevel}-value`}>
								<Ratings
									id={`${$characterStore.loresheet.name}-${loreSheetLevel}-value`}
									interactive={$interactiveModeStore}
									justify="justify-left"
									max={3}
									bind:value={loreSheetLevel}
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
										{getValueDescription(loreSheetLevel)?.description}
									</p>
								</svelte:fragment>
							</HelpText>
						</label>
					</div>
				{/each}
			{/if}
		</div>
	</label>
{:else}
	<p>Es ist für diesen Charakter kein Loresheet eingetragen!</p>
{/if}
