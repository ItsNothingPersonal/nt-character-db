<script lang="ts">
	import type { Placement } from '@floating-ui/dom';
	import { popup } from '@skeletonlabs/skeleton';

	export let id: string;
	export let placement: Placement = 'bottom';
</script>

<label
	class="label flex cursor-help flex-col [&>*]:pointer-events-none"
	for={id.replaceAll(' ', '_')}
	use:popup={{
		event: 'click',
		target: `popupHover-${id.replaceAll(' ', '_')}`,
		placement: placement
	}}
>
	<slot />
</label>
<div
	class="card variant-filled z-10 max-w-xl scroll-auto rounded-lg p-4"
	data-popup="popupHover-{id.replaceAll(' ', '_')}"
>
	<slot name="helpText" />
	<div class="variant-filled arrow" />
</div>
