<script lang="ts">
	import P from '$lib/components/typography/p.svelte';
	import { getHuntingTestPool } from '$lib/testPools/testPools';
	import { clanConfig } from '../../config/clanConfig';
	import { predatorTypeConfig } from '../../config/predatorTypeConfig';
	import { characterStore } from '../characterStore';
	import LabelWithHelpText from '../components/LabelWithHelpText.svelte';

	const predatorType = predatorTypeConfig[$characterStore.predatorType];

	function getHuntingPoolText() {
		if ('type' in predatorType.huntingPool) {
			return undefined;
		}

		return getHuntingTestPool(predatorType.huntingPool[0], predatorType.huntingPool[1]);
	}
</script>

<div class="grid auto-rows-auto grid-cols-1 gap-2 sm:grid-cols-3">
	<label class="label flex flex-col" for="clan">
		<span>Clan</span>
		<p id="clan" class="variant-form-material chip m-0 mt-1 justify-start px-3 py-2 text-base">
			{$characterStore.clan}
		</p>
	</label>
	<label class="label flex flex-col" for="generation">
		<span>Generation</span>
		<P id="generation">{$characterStore.generation}</P>
	</label>
	<label class="label flex flex-col" for="bloodPotency">
		<span>Blood Potency</span>
		<P id="bloodPotency">{$characterStore.bloodPotency}</P>
	</label>
	<LabelWithHelpText
		id="predatorType"
		helpText={predatorType.description}
		label="Predator Type"
		text={$characterStore.predatorType}
	/>
	<LabelWithHelpText
		id="huntingPool"
		helpText={'type' in predatorType.huntingPool ? predatorType.huntingPool.description : undefined}
		label="Hunting Pool"
		text={'type' in predatorType.huntingPool
			? predatorType.huntingPool.type
			: predatorType.huntingPool.join(' + ') + ` (${getHuntingPoolText()})`}
	/>
	<label class="label flex flex-col" for="sect">
		<span>Sect</span>
		<P id="sect">{$characterStore.sect}</P>
	</label>
	<LabelWithHelpText
		id="compulsion"
		helpText={clanConfig[$characterStore.clan].compulsion.explanation}
		label="Compulsion"
		text={clanConfig[$characterStore.clan].compulsion.title}
	/>
	<LabelWithHelpText
		id="clanBane"
		helpText={clanConfig[$characterStore.clan].bane.explanation}
		label="Clan Bane"
		text={clanConfig[$characterStore.clan].bane.title}
	/>

	<label class="label flex flex-col" for="clanBaneSeverity">
		<span>Clan Bane Severity</span>
		<P id="clanBaneSeverity">1</P>
	</label>
</div>
