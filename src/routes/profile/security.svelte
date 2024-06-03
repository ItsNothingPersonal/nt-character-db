<h3 class="text-2xl font-medium">Passwort ändern</h3>
<hr class="mb-2" />

<form action="?/updatePassword" method="post" class="flex w-full flex-col gap-2 sm:max-w-screen-sm">
	<label>
		Altes Passwort
		<input
			id="oldPassword"
			name="oldPassword"
			type="password"
			class="input variant-form-material"
			required
		/>
	</label>
	<label>
		Neues Passwort
		<input
			id="password"
			name="password"
			type="password"
			class="input variant-form-material"
			required
		/>
	</label>
	<label>
		Passwort bestätigen
		<input
			id="passwordConfirm"
			name="passwordConfirm"
			type="password"
			class="input variant-form-material"
			required
		/>
	</label>

	<div class="mt-4">
		<div class="mb-1 w-full max-w-lg">
			<button type="submit" class="variant-filled btn rounded-none">
				Passwort aktualisieren
			</button>
		</div>

		<a href="/reset-password" class="mt-4 underline decoration-dotted">
			Ich habe mein Passwort vergessen
		</a>
	</div>
</form>
