<script lang="ts">
	import { browser } from '$app/environment';
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import { sessionStore } from '$lib/util';
	import { getModalStore, type ModalSettings } from '@skeletonlabs/skeleton';
	import type { AuthProviderInfo } from 'pocketbase';

	export let data;
	export let form;

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
	<div class="card mt-12 max-w-sm rounded-lg">
		<header class="card-header flex flex-col items-center">
			<iconify-icon height="40" icon="material-symbols:code" />
			<h2 class="text-base-content mt-2 text-center text-3xl font-bold tracking-tight">
				Logge dich ein
			</h2>
			<p class="mt-1 text-center">
				Oder <a
					class="font-medium underline decoration-dotted hover:cursor-pointer"
					href="/register"
				>
					registrier dich
				</a> falls du noch keinen Account hast.
			</p>
		</header>
		<section class="flex flex-col items-center p-4">
			<form
				class="flex w-full flex-col items-center space-y-2"
				action="?/login"
				method="POST"
				use:enhance
			>
				<div class="form-control w-full max-w-xs">
					<label class="label pb-1 font-medium" for="email">
						<span class="label-text">Email</span>
					</label>
					<input
						name="email"
						class="input-bordered input variant-form-material w-full max-w-xs"
						type="email"
					/>
				</div>
				<div class="form-control w-full max-w-xs">
					<label class="label pb-1 font-medium" for="password">
						<span class="label-text">Passwort</span>
					</label>
					<input
						name="password"
						class="input-bordered input variant-form-material w-full max-w-xs"
						type="password"
					/>
				</div>
				{#if form?.notVerified}
					<aside class="alert variant-filled-warning max-w-xs rounded-lg">
						<iconify-icon height="40" icon="mdi:alert" />

						<div class="alert-message">
							<h3 class="h3 font-bold">Account not verified</h3>
							<p>Please check your emails and verify your account!</p>
						</div>
					</aside>
				{/if}
				<div class="w-full max-w-xs pt-3">
					<button class="variant-filled-primary btn w-full max-w-xs rounded-lg" type="submit">
						Login
					</button>
				</div>
			</form>
			<div class="w-full max-w-xs pt-3">
				<button
					class="variant-filled-secondary btn w-full max-w-xs rounded-lg"
					on:click={() => modalPasswortReset()}
				>
					Passwort vergessen
				</button>
			</div>
		</section>
		{#if data.authProviders.length > 0}
			<footer class="card-footer">
				<div class="flex flex-col items-center">
					<span class="text-sm font-black"> oder nutze einen der folgenden Logins... </span>

					<div class="flex w-full flex-col justify-center gap-2 text-center">
						{#each data.authProviders as p}
							<button
								class="variant-filled btn w-full max-w-xs self-center rounded-lg"
								type="button"
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
