<script lang="ts">
	import { ScreenSize } from '$lib/sceenSize';
	import Icon from '@iconify/svelte';
	import SocialButton from '../Socials/socialButton.svelte';

	let innerWidth: number = 0;
</script>

<svelte:window bind:innerWidth />

<div
	class="border-light-500 dark:border-dark-500 bg-surface-100-800-token z-10 flex flex-col gap-2 p-4 sm:flex-row md:gap-0"
>
	{#if innerWidth >= ScreenSize.SM}
		<div class="flex w-full items-start gap-1 self-center align-middle sm:items-center">
			<Icon class="h-10 w-10 self-center" icon="mdi:copyright" />
			<div class="flex flex-col gap-x-2 sm:flex-row">
				<div class="whitespace-nowrap">2024 Nächtliches Theater e.V.</div>
				<div class="whitespace-nowrap">All Rights Reserved.</div>
			</div>
		</div>
	{/if}
	<div class="flex w-full justify-start gap-4 self-center sm:justify-end">
		<SocialButton style="icon" icon="discord" iconSize="h-10 w-10" />
		<SocialButton style="icon" icon="instagram" iconSize="h-10 w-10" />
		<SocialButton style="icon" icon="facebook" iconSize="h-10 w-10" />
	</div>
</div>
