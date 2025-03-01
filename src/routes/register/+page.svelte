<script lang="ts">
	import { enhance } from '$app/forms';

	export let form;

	export function getFieldError(fieldName: string) {
		return form?.errors?.find((e) => e.field === fieldName)?.message;
	}
</script>

<div class="flex justify-center">
	<div class="card mt-12 max-w-sm rounded-lg">
		<header class="card-header flex flex-col items-center">
			<iconify-icon height="40" icon="material-symbols:code" />
			<h2 class="text-base-content mt-2 text-center text-3xl font-bold tracking-tight">
				Registrier deinen Account
			</h2>
			<p class="mt-1 text-center">
				Oder <a class="font-medium underline decoration-dotted hover:cursor-pointer" href="/login">
					log dich ein
				</a>
				falls du schon einen Account hast.
			</p>
		</header>
		<section class="flex flex-col items-center p-4">
			<form
				class="flex w-full flex-col items-center space-y-2"
				action="?/register"
				method="POST"
				use:enhance
			>
				<div class="form-control w-full max-w-xs">
					<label class="label pb-1 font-medium" for="username">
						<span class="label-text">Benutzername</span>
					</label>
					<input
						name="username"
						class={`input-bordered input variant-form-material w-full max-w-xs ${form?.errors.some((e) => e.field === 'username') ? 'input-error' : ''}`}
						type="text"
					/>
					{#if form?.errors.some((e) => e.field === 'username')}
						<p class="variant-filled-error text-sm">
							{getFieldError('username')}
						</p>
					{/if}
				</div>
				<div class="form-control w-full max-w-xs">
					<label class="label pb-1 font-medium" for="email">
						<span class="label-text">Email</span>
					</label>
					<input
						name="email"
						class="input-bordered input variant-form-material w-full max-w-xs"
						type="email"
					/>
					{#if form?.errors.some((e) => e.field === 'email')}
						<p class="variant-filled-error text-sm">{getFieldError('email')}</p>
					{/if}
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
				<div class="form-control w-full max-w-xs">
					<label class="label pb-1 font-medium" for="passwordConfirm">
						<span class="label-text">Passwort bestätigen</span>
					</label>
					<input
						name="passwordConfirm"
						class="input-bordered input variant-form-material w-full max-w-sm"
						type="password"
					/>
					{#if form?.errors.some((e) => e.field === 'password')}
						<p class="variant-filled-error text-sm">{getFieldError('password')}</p>
					{/if}
				</div>

				<div class="w-full max-w-xs pt-3">
					<button class="variant-filled-primary btn w-full max-w-xs rounded-lg" type="submit">
						Registrieren
					</button>
				</div>
			</form>
		</section>
	</div>
</div>
