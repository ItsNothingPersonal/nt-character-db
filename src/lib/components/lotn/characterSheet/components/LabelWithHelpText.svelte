<script lang="ts">
	import { popup } from '@skeletonlabs/skeleton';

	export let id: string;
	export let label: string;
	export let text: string | number;
	export let helpText: string | undefined = undefined;
</script>

<label
	class={`label flex flex-col ${helpText ? '[&>p]:cursor-help' : '[&>p]:cursor-pointer'}`}
	for={id}
	use:popup={{ event: 'click', target: 'popupHover-' + id, placement: 'bottom' }}
>
	<span>{label}</span>
	<p {id} class="variant-form-material chip m-0 mt-1 justify-start px-3 py-2 text-base">{text}</p>
</label>
{#if helpText}
	<div class="card variant-filled max-w-lg rounded-lg p-4" data-popup="popupHover-{id}">
		<p class="whitespace-pre-line">{helpText}</p>
		<div class="variant-filled arrow" />
	</div>
{/if}
