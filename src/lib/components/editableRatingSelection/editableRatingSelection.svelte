<script generics="T extends PlayerCharacterCreate|PlayerCharacter" lang="ts">
	import { characterStore } from '$lib/components/classic/characterSheet/characterStore';
	import RatingSelection from '$lib/components/ratingSelection/ratingSelection.svelte';
	import { isNullOrUndefined } from '$lib/util';
	import { getGenerationNumber } from '$lib/validation/backgrounds';
	import { costConfig } from '$lib/validation/config/constConfig';
	import type { BackgroundName } from '$lib/zod/classic/enums/backgroundName';
	import type { CharacterSheetSectionName } from '$lib/zod/classic/enums/characterSheetSectionName';
	import type { DisciplineName } from '$lib/zod/classic/enums/disciplineName';
	import type { FlawName } from '$lib/zod/classic/enums/flawName';
	import type { MeritName } from '$lib/zod/classic/enums/meritName';
	import type { SkillName } from '$lib/zod/classic/enums/skillName';
	import type { TechniqueName } from '$lib/zod/classic/enums/techniqueName';
	import type {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		PlayerCharacter,
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		PlayerCharacterCreate
	} from '$lib/zod/classic/playerCharacter/playerCharacter';
	import { get } from 'svelte/store';

	export let label: string;
	export let playerCharacter: T;
	export let propertyName: keyof T;
	export let validNames:
		| SkillName[]
		| BackgroundName[]
		| DisciplineName[]
		| TechniqueName[]
		| MeritName[]
		| FlawName[];
	export let validRating: number[] = [];
	export let calculateCost: boolean = false;
	export let configKey: CharacterSheetSectionName;
	export let uniqueEntries: boolean = false;
	export let showRating: boolean = true;
	export let addButton: () => void = addButtonDefault;
	export let removeButton: () => void = removeButtonDefault;

	let selectedName: SkillName | BackgroundName | MeritName | FlawName;
	let selectedValue: number;

	$: disabledAdd = uniqueEntries
		? // eslint-disable-next-line @typescript-eslint/no-explicit-any
			(playerCharacter[propertyName] as any[])?.find((e) => e.name === selectedName)
		: showRating && validRating.length === 0;

	$: disabledRemove = playerCharacter[propertyName]
		? // eslint-disable-next-line @typescript-eslint/no-explicit-any
			(playerCharacter[propertyName] as any[]).length === 0 ||
			isNullOrUndefined(
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				(playerCharacter[propertyName] as any[]).find((e) => e.name === selectedName)
			)
		: true;

	function updateProperty<X>(
		obj: Record<string, X | X[]>,
		key: string | number | symbol,
		value: X | X[]
	): void {
		if (typeof key === 'string' && Array.isArray(obj[key])) {
			// Handle array case
			if (Array.isArray(value)) {
				obj[key] = value;
			} else {
				throw new Error(`Property ${key} is an array, but the provided value is not.`);
			}
		} else {
			// Handle non-array case
			if (typeof key === 'string') {
				obj[String(key)] = value as X;
			} else {
				throw new Error(`Property ${key.toString()} is not a string.`);
			}
		}
	}

	function addButtonDefault() {
		if (selectedName === 'Generation') {
			playerCharacter.generation = getGenerationNumber(selectedValue);
		}

		const propertyContent = !playerCharacter[propertyName]
			? []
			: // eslint-disable-next-line @typescript-eslint/no-explicit-any
				(playerCharacter[propertyName] as any[]);
		const contentIndex = propertyContent.findIndex((e) => e.name === selectedName);

		if (contentIndex !== -1) {
			propertyContent[contentIndex] = { name: selectedName, value: selectedValue };
		} else {
			propertyContent.push({ name: selectedName, value: selectedValue });
		}

		updateProperty(playerCharacter, propertyName, propertyContent);

		if (calculateCost) {
			const costConfigEntry = costConfig.get(configKey);
			if (isNullOrUndefined(costConfigEntry)) {
				console.error(`Config zum Steigern für ${configKey} fehlt!`);
				return;
			}

			playerCharacter = costConfigEntry(
				get(characterStore),
				selectedName,
				'add',
				true,
				propertyContent[contentIndex]?.value ?? 0,
				selectedValue
			) as T;
		} else {
			const indexRating = validRating.findIndex((e) => e === selectedValue);
			validRating = validRating.filter((_, i) => i !== indexRating);
			if (validRating.length > 0) {
				selectedValue = validRating[0];
			}
		}

		// triggering sveltes reactivity
		playerCharacter = playerCharacter;
	}

	function removeButtonDefault() {
		if (!playerCharacter[propertyName]) return;

		if (selectedName === 'Generation') {
			playerCharacter.generation = 13;
		}

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const propertyValue = playerCharacter[propertyName] as any[];
		const contentIndex = propertyValue.findIndex((e) => e.name === selectedName);

		if (contentIndex === -1) return;

		if (calculateCost) {
			const costConfigEntry = costConfig.get(configKey);
			if (isNullOrUndefined(costConfigEntry)) {
				console.error(`Config zum Steigern für ${configKey} fehlt!`);
				return;
			}

			playerCharacter = costConfigEntry(
				get(characterStore),
				selectedName,
				'remove',
				true,
				propertyValue[contentIndex].value,
				0
			) as T;
		}

		playerCharacter[propertyName] = propertyValue.filter(
			(_, i) => i !== contentIndex
		) as T[keyof T];
		validRating = [...validRating, propertyValue[contentIndex].value].toSorted((a, b) => b - a);

		// triggering sveltes reactivity
		playerCharacter = playerCharacter;
	}
</script>

<RatingSelection
	{label}
	optionNames={validNames}
	optionRatings={validRating}
	{showRating}
	bind:selectedName
	bind:selectedValue
/>
<button
	class="variant-filled btn rounded-none"
	disabled={disabledAdd}
	type="button"
	on:click={addButton}
>
	Add {label}
</button>
<button
	class="variant-filled btn rounded-none"
	disabled={disabledRemove}
	type="button"
	on:click={removeButton}
>
	Remove {label}
</button>
