<script lang="ts">
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import { sessionStore } from '$lib/util';
	import Icon from '@iconify/svelte';
	import { getModalStore, type ModalSettings } from '@skeletonlabs/skeleton';
	import type { AuthProviderInfo } from 'pocketbase';

	export let data;

	const redirectUrl = `${$page.url.origin}/redirect`;
	const modalStore = getModalStore();

	function gotoAuthProvider(providerData: AuthProviderInfo) {
		if (browser && providerData) {
			const jsonProvider = JSON.stringify(providerData);
			document.cookie = `oauth=${jsonProvider}`;
			sessionStorage.removeItem('oauths');
			sessionStore('oauths', jsonProvider);
			const redirectURL = `${providerData.authUrl}${redirectUrl}`;
			window.location.href = redirectURL || '';
		}
	}

	function getProviderImageName(name: string = 'bitcoin') {
		if (name === 'discord') name = 'discord-alt';
		let imageProvider = `bxl:${name}`;
		if (name == 'kakao') imageProvider = `simple-icons:kakaotalk`;

		return imageProvider;
	}

	function modalPasswortReset(): void {
		const modal: ModalSettings = {
			type: 'component',
			component: 'passwordResetModalDialog',
			title: 'Passwort zurücksetzen'
		};
		modalStore.trigger(modal);
	}
</script>

<div class="flex justify-center">
	<div class="card mt-12 max-w-sm">
		<header class="card-header flex flex-col items-center">
			<Icon icon="material-symbols:code" width={16} height={16} />
			<h2 class="text-base-content mt-2 text-center text-3xl font-bold tracking-tight">
				Logge dich ein
			</h2>
			<p class="mt-1 text-center">
				Oder <a
					href="/register"
					class="font-medium underline decoration-dotted hover:cursor-pointer"
				>
					registrier dich
				</a> falls du noch keinen Account hast.
			</p>
		</header>
		<section class="flex flex-col items-center p-4">
			<form method="POST" action="?/login" class="flex w-full flex-col items-center space-y-2">
				<div class="form-control w-full max-w-xs">
					<label for="email" class="label pb-1 font-medium">
						<span class="label-text">Email</span>
					</label>
					<input
						type="email"
						name="email"
						class="input-bordered input variant-form-material w-full max-w-xs"
					/>
				</div>
				<div class="form-control w-full max-w-xs">
					<label for="password" class="label pb-1 font-medium">
						<span class="label-text">Passwort</span>
					</label>
					<input
						type="password"
						name="password"
						class="input-bordered input variant-form-material w-full max-w-xs"
					/>
				</div>
				<div class="w-full max-w-xs pt-3">
					<button class="variant-filled-primary btn w-full max-w-xs rounded-none" type="submit">
						Login
					</button>
				</div>
			</form>
			<div class="w-full max-w-xs pt-3">
				<button
					class="variant-filled-secondary btn w-full max-w-xs rounded-none"
					on:click={() => modalPasswortReset()}
				>
					Passwort vergessen
				</button>
			</div>
		</section>
		{#if data.authProviders.length > 0}
			<footer class="card-footer">
				<div class="items-center text-center">
					<span class="pb-4 text-sm font-black"> oder nutze einen der folgenden Logins... </span>

					<div class="flex flex-col justify-center gap-2 text-center">
						{#each data.authProviders as p}
							<button
								type="button"
								class="variant-filled btn rounded-none"
								on:click={() => gotoAuthProvider(p)}
							>
								<span>
									<img
										alt={p.name}
										src="https://api.iconify.design/{getProviderImageName(
											p.name
										)}.svg?color=%23888888"
									/>
								</span>
								<span>
									{p.name}
								</span>
							</button>
						{/each}
					</div>
				</div>
			</footer>
		{/if}
	</div>
</div>
