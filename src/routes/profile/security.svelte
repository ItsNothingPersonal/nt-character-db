<h3 class="text-2xl font-medium">Passwort ändern</h3>
<hr class="mb-2" />

<form class="flex w-full flex-col gap-2 sm:max-w-screen-sm" action="?/updatePassword" method="post">
	<label>
		Altes Passwort
		<input
			id="oldPassword"
			name="oldPassword"
			class="input variant-form-material"
			required
			type="password"
		/>
	</label>
	<label>
		Neues Passwort
		<input
			id="password"
			name="password"
			class="input variant-form-material"
			required
			type="password"
		/>
	</label>
	<label>
		Passwort bestätigen
		<input
			id="passwordConfirm"
			name="passwordConfirm"
			class="input variant-form-material"
			required
			type="password"
		/>
	</label>

	<div class="mt-4">
		<div class="mb-1 w-full max-w-lg">
			<button class="variant-filled btn rounded-none" type="submit">
				Passwort aktualisieren
			</button>
		</div>

		<a class="mt-4 underline decoration-dotted" href="/reset-password">
			Ich habe mein Passwort vergessen
		</a>
	</div>
</form>
