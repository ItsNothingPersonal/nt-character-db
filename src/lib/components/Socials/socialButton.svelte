<script lang="ts">
	import { titleCaseWord } from '$lib/util';
	import Icon from '@iconify/svelte';
	import { socialIconConfig, type SocialMedia } from './socialIconConfig';

	export let icon: SocialMedia;
	export let href: string | undefined = undefined;
	export let text: string | undefined = undefined;
	export let style: 'button' | 'icon' = 'button';
	export let iconSize: string | undefined = undefined;

	const buttonStyle = 'variant-filled-primary btn rounded-lg text-lg';
	$: styling = style === 'button' ? buttonStyle : undefined;
</script>

<a
	class={styling}
	role="button"
	href={socialIconConfig[icon].href ? socialIconConfig[icon].href : href}
	aria-label={icon !== 'email'
		? `Link zu unserem Social-Media-Auftritt bei ${titleCaseWord(icon)}`
		: `E-Mail-Adresse ${text}`}
>
	<Icon icon={socialIconConfig[icon].icon} class="{style === 'button' ? 'mr-2' : ''} {iconSize}" />
	{#if style === 'button'}
		{#if icon === 'discord'}
			Discord
		{:else if icon === 'facebook'}
			Facebook
		{:else if icon === 'instagram'}
			Instagram
		{:else}
			{text}
		{/if}
	{/if}
</a>
