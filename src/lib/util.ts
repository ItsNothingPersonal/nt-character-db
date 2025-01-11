import { browser } from '$app/environment';
import { page } from '$app/stores';
import { PUBLIC_CHARACTER_DB_PB_URL } from '$env/static/public';
import { get } from 'svelte/store';
import { characterStore } from './components/lotn/characterSheet/characterStore';
import { hasDisciplinePower } from './components/lotn/util/disciplines';
import { ScreenSize } from './sceenSize';
import { characterCreationStore } from './stores/characterCreationStore';
import type { SkillName } from './zod/lotn/enums/skillName';
import type { PlayerSkill } from './zod/lotn/playerCharacter/playerSkill';

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

export function isDesktopSize(innerWidth: number) {
	return innerWidth > ScreenSize.LG;
}

export function getSkillValueByName(skillName: SkillName | undefined, playerSkills: PlayerSkill[]) {
	return playerSkills.find((e) => e.name === skillName)?.value ?? 0;
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

export const transformStringToArray = (str: string) => {
	const result = str.split(',').map((s) => s.trim());
	return result.length === 1 && result[0] === '' ? undefined : result;
};

export function transformBoldMarkedText(str: string): string {
	return str.replaceAll(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
}

export function generateId() {
	return (
		Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2)
	).substring(0, 15);
}

export function getHealthTotal(isCharacterCreation: boolean = false) {
	const hasToughness = hasDisciplinePower('Fortitude', 'Toughness', isCharacterCreation);
	if (isCharacterCreation)
		return get(characterCreationStore).attributes.physical_stamina + 3 + (hasToughness ? 1 : 0);
	return get(characterStore).attributes.physical_stamina + 3 + (hasToughness ? 1 : 0);
}

export function getWillpowerTotal(isCharacterCreation: boolean = false) {
	if (isCharacterCreation)
		return (
			get(characterCreationStore).attributes.mental_resolve +
			get(characterCreationStore).attributes.social_composure
		);
	return (
		get(characterStore).attributes.mental_resolve + get(characterStore).attributes.social_composure
	);
}

export function getInitiative(isCharacterCreation: boolean = false) {
	if (isCharacterCreation)
		return (
			get(characterCreationStore).attributes.social_composure +
			getSkillValueByName('Awareness', get(characterCreationStore).skills)
		);
	return (
		get(characterStore).attributes.social_composure +
		getSkillValueByName('Awareness', get(characterStore).skills)
	);
}

export function isCreateSheetRoute() {
	const pathname = get(page).url.pathname;
	return pathname.includes('/lotn/sheet/create');
}

export function deepClone<T>(obj: T): T {
	if (obj === null || typeof obj !== 'object') {
		return obj;
	}

	if (Array.isArray(obj)) {
		return obj.map(deepClone) as unknown as T;
	}

	const clonedObj: { [key: string]: unknown } = {};
	for (const key in obj) {
		if (Object.prototype.hasOwnProperty.call(obj, key)) {
			clonedObj[key] = deepClone((obj as { [key: string]: unknown })[key]);
		}
	}

	return clonedObj as T;
}
