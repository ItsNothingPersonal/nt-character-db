<script lang="ts">
	import { type Placement } from '@floating-ui/dom';
	import { popup } from '@skeletonlabs/skeleton';
	import { isMobileScreen } from '../../util/generalUtils';

	export let id: string;
	export let placement: Placement = isMobileScreen() ? 'bottom' : 'right-start';
</script>

<label
	class="label flex cursor-help flex-col [&>*]:pointer-events-none"
	for={id.replaceAll(' ', '_')}
	use:popup={{
		event: 'click',
		target: `popupHover-${id.replaceAll(' ', '_')}`,
		placement: isMobileScreen() ? 'bottom' : placement
	}}
>
	<slot />
</label>
<div
	class="card variant-filled z-10 max-h-[50vh] min-w-[30vh] max-w-lg overflow-y-auto overflow-x-hidden rounded-lg p-4 sm:max-h-[70vh] sm:max-w-xl"
	data-popup="popupHover-{id.replaceAll(' ', '_')}"
>
	<slot name="helpText" />
	<div class="variant-ghost arrow" />
</div>
