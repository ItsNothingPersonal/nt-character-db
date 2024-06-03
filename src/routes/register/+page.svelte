<script lang="ts">
	import Icon from '@iconify/svelte';
</script>

<div class="flex justify-center">
	<div class="card mt-12 max-w-sm">
		<header class="card-header flex flex-col items-center">
			<Icon icon="material-symbols:code" width={36} height={36} />
			<h2 class="text-base-content mt-2 text-center text-3xl font-bold tracking-tight">
				Registrier deinen Account
			</h2>
			<p class="mt-1 text-center">
				Oder <a href="/login" class="font-medium underline decoration-dotted hover:cursor-pointer">
					log dich ein
				</a>
				falls du schon einen Account hast.
			</p>
		</header>
		<section class="flex flex-col items-center p-4">
			<form method="POST" action="?/register" class="flex w-full flex-col items-center space-y-2">
				<div class="form-control w-full max-w-xs">
					<label for="username" class="label pb-1 font-medium">
						<span class="label-text">Benutzername</span>
					</label>
					<input
						type="text"
						name="username"
						class="input-bordered input variant-form-material w-full max-w-xs"
					/>
				</div>
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
				<div class="form-control w-full max-w-xs">
					<label for="passwordConfirm" class="label pb-1 font-medium">
						<span class="label-text">Passwort bestätigen</span>
					</label>
					<input
						type="password"
						name="passwordConfirm"
						class="input-bordered input variant-form-material w-full max-w-sm"
					/>
				</div>

				<div class="w-full max-w-xs pt-3">
					<button class="variant-filled-primary btn w-full max-w-xs rounded-none" type="submit">
						Registrieren
					</button>
				</div>
			</form>
		</section>
	</div>
</div>
