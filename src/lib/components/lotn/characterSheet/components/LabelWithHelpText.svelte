<script lang="ts">
	import P from '$lib/components/typography/p.svelte';
	import { popup } from '@skeletonlabs/skeleton';

	export let id: string;
	export let label: string;
	export let text: string;
	export let helpText: string | undefined = undefined;
</script>

<label
	class={`label flex flex-col ${helpText ? '[&>p]:cursor-help' : '[&>p]:cursor-pointer'}`}
	for={id}
	use:popup={{ event: 'click', target: 'popupHover-' + id, placement: 'bottom' }}
>
	<span>{label}</span>
	<P {id}>{text}</P>
</label>
{#if helpText}
	<div class="card variant-filled max-w-lg p-4" data-popup="popupHover-{id}">
		<p class="whitespace-pre-line">{helpText}</p>
		<div class="variant-filled arrow" />
	</div>
{/if}
