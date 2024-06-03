import { browser } from '$app/environment';
import { PUBLIC_CHARACTER_DB_PB_URL } from '$env/static/public';
import { getDisciplineTestpool } from '$lib/validation/testpools';
import type { AttributeName } from '$lib/zod/classic/enums/attributeName';
import type { DisciplineName } from '$lib/zod/classic/enums/disciplineName';
import type { SkillName } from '$lib/zod/classic/enums/skillName';
import type { PlayerAttribute } from '$lib/zod/classic/playerCharacter/playerAttribute';
import type { PlayerSkill } from '$lib/zod/classic/playerCharacter/playerSkill';
import type { Testpool } from '$lib/zod/classic/validation/testpool';

export function isNullOrUndefined<T>(obj: T | null | undefined): obj is null | undefined {
	return typeof obj === 'undefined' || obj === null;
}

export function detectTouchscreen() {
	let isTouchscreen = false;
	if (typeof window !== 'undefined' && typeof navigator !== 'undefined') {
		if ('maxTouchPoints' in navigator && navigator.maxTouchPoints > 0) {
			isTouchscreen = true;
		} else if ('msMaxTouchPoints' in navigator && (navigator.msMaxTouchPoints as number) > 0) {
			isTouchscreen = true;
		} else {
			const mQ = matchMedia('(pointer:coarse)');
			if (mQ && mQ.matches) {
				isTouchscreen = true;
			} else if ('orientation' in window) {
				isTouchscreen = true;
			} else {
				const userAgent = navigator.userAgent;
				if (/Mobi|Android|iPhone|iPad|iPod/.test(userAgent)) {
					isTouchscreen = true;
				}
			}
		}
	}
	return isTouchscreen;
}

export function getAllDisciplineTestpools(disciplineNames: DisciplineName[]) {
	const result = new Map<DisciplineName, Testpool | undefined>();

	for (const name of disciplineNames) {
		result.set(name, getDisciplineTestpool(name));
	}

	return result;
}

export function getAttributeValueByName(
	attributeName: AttributeName | undefined,
	playerAttributes: PlayerAttribute
) {
	if (!attributeName) {
		return 0;
	}

	let value: number;
	if (attributeName === 'Physical') {
		value = playerAttributes.physical_value;
	} else if (attributeName === 'Social') {
		value = playerAttributes.social_value;
	} else {
		value = playerAttributes.mental_value;
	}

	return value;
}

export function getSkillValueByName(skillName: SkillName | undefined, playerSkills: PlayerSkill[]) {
	return playerSkills.find((e) => e.name === skillName)?.value ?? 0;
}

export function getAttributeForDisciplineName(
	disciplineName: DisciplineName,
	relevantTestpools: Map<DisciplineName, Testpool | undefined>
) {
	return relevantTestpools.get(disciplineName)?.attribute;
}

export function getSkillForDisciplineName(
	disciplineName: DisciplineName,
	relevantTestpools: Map<DisciplineName, Testpool | undefined>
) {
	return relevantTestpools.get(disciplineName)?.skillName;
}

export function typedObjectKeys<T extends object>(object: T) {
	return Object.keys(object) as (keyof typeof object)[];
}

export function sessionStore(field: string, value: string) {
	if (browser) window.sessionStorage.setItem(field, value);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function serializeNonPOJOs<T>(obj: any) {
	return structuredClone<T>(obj);
}

export function isNotNullOrUndefined<T>(obj: T | null | undefined): obj is T {
	return !isNullOrUndefined<T>(obj);
}

export function sqlTimeNow(): string {
	const time = new Date().toISOString().replace('T', ' ');

	return time;
}

export function toTitleCase(str: string): string {
	return (
		str
			.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
			?.map((x) => x.charAt(0).toUpperCase() + x.slice(1))
			.join(' ') ?? str
	);
}

export function getImageURL(
	collectionId: string,
	recordId: string,
	fileName: string,
	size: string
): string {
	return `${PUBLIC_CHARACTER_DB_PB_URL}/api/files/${collectionId}/${recordId}/${fileName}?thumb=${size}`;
}

export function titleCaseWord(word: string): string {
	if (!word) return word;
	return word[0].toUpperCase() + word.substring(1).toLowerCase();
}
