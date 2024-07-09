<script lang="ts">
	import P from '$lib/components/typography/p.svelte';
	import { clanConfig } from '../../config/clanConfig';
	import { predatorHuntingPool } from '../../config/predatorHuntingPoolConfig';
	import { characterStore } from '../characterStore';
	import LabelWithHelpText from '../components/LabelWithHelpText.svelte';
</script>

<div class="grid grid-cols-3 grid-rows-1 gap-2">
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
	<label class="label flex flex-col" for="predatorType">
		<span>Predator Type</span>
		<P id="predatorType">{$characterStore.predatorType}</P>
	</label>
	<label class="label flex flex-col" for="huntingPool">
		<span>Hunting Pool</span>
		<P id="huntingPool">{predatorHuntingPool[$characterStore.predatorType].join(' + ')}</P>
	</label>
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
