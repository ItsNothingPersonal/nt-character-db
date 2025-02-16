import type { SkillDotCategory } from '$lib/zod/lotn/enums/skillDotsCategory';
import { skillName, type SkillName } from '$lib/zod/lotn/enums/skillName';
import cloneDeep from 'lodash/cloneDeep';
import { derived, get, type Writable, writable } from 'svelte/store';
import { z } from 'zod';
import { characterCreationStore } from './characterCreationStore';

export class SkillsPaidWithDotsStore {
	private _initialSkillsPaidWithDotsStoreValues: SkillsPaidWithDotsStoreEntrySchema = {
		3: { max: 3, skillNames: [] },
		2: { max: 5, skillNames: [] },
		1: { max: 7, skillNames: [] }
	};
	_skillsPaidWithDotsStoreInternal: Writable<SkillsPaidWithDotsStoreEntrySchema> = writable(
		cloneDeep(this._initialSkillsPaidWithDotsStoreValues)
	);
	private unsubscribe: () => void;

	constructor() {
		let initialValue: SkillsPaidWithDotsStoreEntrySchema;

		if (typeof localStorage !== 'undefined') {
			const storedValue = localStorage.getItem('skillsPaidWithDotsStore');
			initialValue = storedValue
				? JSON.parse(storedValue)
				: cloneDeep(this._initialSkillsPaidWithDotsStoreValues);
		} else {
			initialValue = cloneDeep(this._initialSkillsPaidWithDotsStoreValues);
		}

		this._skillsPaidWithDotsStoreInternal.set(initialValue);

		if (typeof localStorage !== 'undefined') {
			this.unsubscribe = this._skillsPaidWithDotsStoreInternal.subscribe((value) => {
				localStorage.setItem('skillsPaidWithDotsStore', JSON.stringify(value));
			});
		} else {
			this.unsubscribe = () => {};
		}
	}

	destroy() {
		this.unsubscribe();
	}

	reset() {
		this._skillsPaidWithDotsStoreInternal.set(
			cloneDeep(this._initialSkillsPaidWithDotsStoreValues)
		);
	}

	get store() {
		return get(this._skillsPaidWithDotsStoreInternal);
	}

	get amount3Dots() {
		return derived(this._skillsPaidWithDotsStoreInternal, ($store) => {
			return $store[3].skillNames.length;
		});
	}

	get max3Dots() {
		return derived(this._skillsPaidWithDotsStoreInternal, ($store) => {
			return $store[3].max;
		});
	}

	get amount2Dots() {
		return derived(this._skillsPaidWithDotsStoreInternal, ($store) => {
			return $store[2].skillNames.length;
		});
	}

	get max2Dots() {
		return derived(this._skillsPaidWithDotsStoreInternal, ($store) => {
			return $store[2].max;
		});
	}

	get amount1Dots() {
		return derived(this._skillsPaidWithDotsStoreInternal, ($store) => {
			return $store[1].skillNames.length;
		});
	}

	get max1Dots() {
		return derived(this._skillsPaidWithDotsStoreInternal, ($store) => {
			return $store[1].max;
		});
	}

	getMaxDots(value: SkillDotCategory) {
		return derived(this._skillsPaidWithDotsStoreInternal, ($store) => {
			return $store[value].max;
		});
	}

	getSkillNamesPaidWithDots(value: SkillDotCategory) {
		return derived(this._skillsPaidWithDotsStoreInternal, ($store) => {
			return $store[value].skillNames;
		});
	}

	getSkillsWithPointValue(value: SkillDotCategory) {
		return derived(
			[characterCreationStore, this._skillsPaidWithDotsStoreInternal],
			([$characterCreationStore, $skillsPaidWithDotsStore]) => {
				return $characterCreationStore.skills.filter((skill) =>
					$skillsPaidWithDotsStore[value].skillNames.includes(skill.name)
				);
			}
		);
	}

	addSkillsPaidWithDots(name: SkillName, value: SkillDotCategory) {
		this._skillsPaidWithDotsStoreInternal.update((store) => {
			store[value].skillNames = [...store[value].skillNames, name];
			return store;
		});
	}

	removeSkillsPaidWithDots(name: SkillName, value: SkillDotCategory) {
		this._skillsPaidWithDotsStoreInternal.update((store) => {
			store[value].skillNames = store[value].skillNames.filter((skill) => skill !== name);
			return store;
		});
	}

	updateSkillsPaidWithDots(name: SkillName, from: SkillDotCategory, to: SkillDotCategory) {
		this.removeSkillsPaidWithDots(name, from);
		this.addSkillsPaidWithDots(name, to);
	}

	hasSkillBeenPaidWithDots(name: SkillName) {
		if (get(this._skillsPaidWithDotsStoreInternal)[1].skillNames.some((skill) => skill === name)) {
			return true;
		}
		if (get(this._skillsPaidWithDotsStoreInternal)[2].skillNames.some((skill) => skill === name)) {
			return true;
		}
		if (get(this._skillsPaidWithDotsStoreInternal)[3].skillNames.some((skill) => skill === name)) {
			return true;
		}

		return false;
	}

	getSkillsPaidWithDotsByName(name: SkillName) {
		const skillsPaidWithDots = get(this._skillsPaidWithDotsStoreInternal);

		if (skillsPaidWithDots[1].skillNames.some((skill) => skill === name)) {
			return 1;
		}
		if (skillsPaidWithDots[2].skillNames.some((skill) => skill === name)) {
			return 2;
		}
		if (skillsPaidWithDots[3].skillNames.some((skill) => skill === name)) {
			return 3;
		}
	}
}

const skillsPaidWithDotsStoreEntrySchema = z.object({
	3: z.object({ max: z.literal(3), skillNames: skillName.array() }),
	2: z.object({ max: z.literal(5), skillNames: skillName.array() }),
	1: z.object({ max: z.literal(7), skillNames: skillName.array() })
});
type SkillsPaidWithDotsStoreEntrySchema = z.infer<typeof skillsPaidWithDotsStoreEntrySchema>;

export const skillsPaidWithDotsStore = new SkillsPaidWithDotsStore();
