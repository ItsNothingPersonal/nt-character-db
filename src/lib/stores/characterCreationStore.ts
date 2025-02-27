import { loresheetConfig } from '$lib/components/lotn/config/loresheetConfig';
import { predatorTypeConfig } from '$lib/components/lotn/config/predatorTypeConfig';
import { getLoresheetChanges } from '$lib/components/lotn/util/loresheetUtil';
import { generateId } from '$lib/util';
import {
	backgroundAdvantageName,
	type BackgroundAdvantageName
} from '$lib/zod/lotn/enums/backgroundAdvantageName';
import { backgroundName, type BackgroundName } from '$lib/zod/lotn/enums/backgroundName';
import { skillName, type SkillName } from '$lib/zod/lotn/enums/skillName';
import type { SpheresOfInfluenceName } from '$lib/zod/lotn/enums/spheresOfInfluenceName';
import type { PlayerBackgroundAdvantage } from '$lib/zod/lotn/playerCharacter/playerBackgroundAdvantage';
import { playerCharacterCreate } from '$lib/zod/lotn/playerCharacter/playerCharacter';
import type { AssociatedAdvantage } from '$lib/zod/lotn/types/loresheetSchema';
import cloneDeep from 'lodash/cloneDeep';
import { derived, get, writable, type Readable, type Writable } from 'svelte/store';
import { z } from 'zod';
import { localStorageCharacterCreationStore } from './localStorageCharacterCreationStore';

export const initialCharacterStoreObject = Object.freeze(playerCharacterCreate.parse({}));

export const characterCreationStore = localStorageCharacterCreationStore('characterCreationStore');

const paymentStoreEntrySchema = z.object({
	predator: z.number(),
	loresheet: z.number(),
	freebies: z.number(),
	fixed: z.number().optional(),
	id: z.string(),
	name: backgroundName
});
type PaymentStoreEntrySchema = z.infer<typeof paymentStoreEntrySchema>;

const paymentStoreAdvantageEntrySchema = z.object({
	predator: z.number(),
	loresheet: z.number(),
	freebies: z.number(),
	haven: z.number(),
	fixed: z.number(),
	id: z.string(),
	name: backgroundName,
	advantageName: backgroundAdvantageName.or(z.literal('Variabel'))
});
type PaymentStoreAdvantageEntrySchema = z.infer<typeof paymentStoreAdvantageEntrySchema>;

const paymentStoreSchema = z.object({
	backgrounds: paymentStoreEntrySchema.array(),
	loresheet: z
		.object({
			id: z.string(),
			value: z.literal(1).or(z.literal(2)).or(z.literal(3))
		})
		.array(),
	associatedAdvantages: paymentStoreAdvantageEntrySchema.array(),
	skills: z
		.object({
			name: skillName,
			value: z.number()
		})
		.array()
});
type PaymentStoreSchema = z.infer<typeof paymentStoreSchema>;

export class BackgroundPaymentStore {
	private _initialPaymentStoreValues: PaymentStoreSchema = {
		backgrounds: [],
		associatedAdvantages: [],
		loresheet: [],
		skills: []
	};
	private _paymentStoreInternal: Writable<PaymentStoreSchema> = writable(
		cloneDeep(this._initialPaymentStoreValues)
	);
	private unsubscribePaymentStore: () => void;

	private _usedFreebiePointsInternal: Readable<number>;
	private _maxFreebiePointsInternal: Readable<number>;
	private _usedHavenFreebiePointsInternal: Readable<number>;
	private _maxHavenFreebiePointsInternal: Readable<number>;

	constructor() {
		let initialValue: PaymentStoreSchema;

		if (typeof localStorage !== 'undefined') {
			const storedValue = localStorage.getItem('paymentStore');
			initialValue = storedValue
				? JSON.parse(storedValue)
				: cloneDeep(this._initialPaymentStoreValues);
		} else {
			initialValue = cloneDeep(this._initialPaymentStoreValues);
		}

		this._paymentStoreInternal.set(initialValue);

		if (typeof localStorage !== 'undefined') {
			this.unsubscribePaymentStore = this._paymentStoreInternal.subscribe((value) => {
				localStorage.setItem('paymentStore', JSON.stringify(value));
			});
		} else {
			this.unsubscribePaymentStore = () => {};
		}

		this._usedFreebiePointsInternal = derived(
			this._paymentStoreInternal,
			($store) =>
				$store.backgrounds.reduce((acc, curr) => {
					return acc + curr.freebies;
				}, 0) +
				$store.associatedAdvantages.reduce((acc, curr) => {
					return acc + curr.freebies;
				}, 0) +
				$store.loresheet.reduce((acc, curr) => {
					return acc + curr.value;
				}, 0)
		);

		this._maxFreebiePointsInternal = derived(characterCreationStore, ($store) => {
			const additionalFreebiePoints = $store.backgrounds
				.map((e) => (e.disadvantages ?? []).map((d) => d.value))
				.flat()
				.reduce((acc, curr) => {
					return acc + curr;
				}, 0);
			return Math.min(7 + additionalFreebiePoints, 12);
		});

		this._usedHavenFreebiePointsInternal = derived(this._paymentStoreInternal, ($store) =>
			$store.associatedAdvantages.reduce((acc, curr) => {
				return acc + curr.haven;
			}, 0)
		);

		this._maxHavenFreebiePointsInternal = derived(characterCreationStore, ($store) => {
			return $store.backgrounds
				.filter((bg) => bg.name === 'Haven' && bg.value >= 2)
				.reduce((acc, curr) => {
					// as we only count values >=2 we need to subtract 1 from the value to get the correct amount of freebies
					return acc + curr.value - 1;
				}, 0);
		});
	}

	destroy() {
		this.unsubscribePaymentStore();
	}

	reset() {
		this._paymentStoreInternal.set(cloneDeep(this._initialPaymentStoreValues));
	}

	get usedFreebiePoints() {
		return this._usedFreebiePointsInternal;
	}

	get maxFreebiePoints() {
		return this._maxFreebiePointsInternal;
	}

	get paymentStore() {
		return this._paymentStoreInternal;
	}

	get maxHavenFreebiePoints() {
		return this._maxHavenFreebiePointsInternal;
	}

	addLoresheetLevel(id: string, level: 1 | 2 | 3) {
		this._paymentStoreInternal.update((store) => {
			return {
				...store,
				loresheet: [...store.loresheet, { id, value: level }]
			};
		});
	}

	removeLoresheetLevel(level: 1 | 2 | 3) {
		this._paymentStoreInternal.update((store) => {
			store.loresheet = store.loresheet.filter((e) => e.value !== level);

			return store;
		});
	}

	getLoreSheetLevel(level: 1 | 2 | 3) {
		return get(this._paymentStoreInternal).loresheet.filter((e) => e.value === level);
	}

	isLoresheetMerit(id: string) {
		return get(this._paymentStoreInternal).loresheet.some((e) => e.id === id);
	}

	hasLoresheetLevelBeenPaidWithDots(level: 1 | 2 | 3) {
		return get(this._paymentStoreInternal).loresheet.some((e) => e.value === level);
	}

	getBackgroundByName(name: BackgroundName | BackgroundName[]) {
		return get(this._paymentStoreInternal).backgrounds.filter((entry) =>
			Array.isArray(name) ? name.includes(entry.name) : entry.name === name
		);
	}

	getBackgroundByNameArray(names: BackgroundName[]) {
		let result: PaymentStoreEntrySchema[] = [];
		names.map((name) => {
			result = [...result, ...this.getBackgroundByName(name)];
		});
		return result;
	}

	getBackgroundAdvantageByBackgroundName(name: BackgroundName) {
		return get(this._paymentStoreInternal).associatedAdvantages.filter(
			(entry) => entry.name === name && entry.fixed === 0
		);
	}

	getBackgroundAdvantageByBackgroundNameArray(names: BackgroundName[]) {
		let result: PaymentStoreEntrySchema[] = [];
		names.map((name) => {
			result = [
				...result,
				...get(this._paymentStoreInternal).associatedAdvantages.filter(
					(entry) => entry.name === name
				)
			];
		});
		return result;
	}

	getBackgroundAdvantage(name: BackgroundName, advantage: BackgroundAdvantageName) {
		return get(this._paymentStoreInternal).associatedAdvantages.filter(
			(entry) => entry.name === name && entry.advantageName === advantage
		);
	}

	getPredatorTypeChange(background: BackgroundName) {
		const predatorType = get(characterCreationStore).predatorType;
		if (!predatorType) return;

		const predatorConfig = predatorTypeConfig[predatorType];
		const fittingPredatorEntry = predatorConfig.changes.find(
			(entry) =>
				entry.kind === 'Background' &&
				(Array.isArray(entry.name)
					? entry.name.includes(background)
					: entry.name === background || entry.name === undefined)
		);

		return fittingPredatorEntry;
	}

	getPredatorTypeAdvantageChange(background: BackgroundName, advantage: BackgroundAdvantageName) {
		const predatorType = get(characterCreationStore).predatorType;
		if (!predatorType) return;

		const predatorConfig = predatorTypeConfig[predatorType];
		const fittingPredatorEntry =
			predatorConfig.changes.find(
				(entry) =>
					entry.kind === 'Background' &&
					(Array.isArray(entry.name) ? entry.name.includes(background) : entry.name === background)
			)?.associatedAdvantage?.name === advantage;

		return fittingPredatorEntry;
	}

	getPredatorPointsLeft(background: BackgroundName) {
		const configEntry = this.getPredatorTypeChange(background);
		if (!configEntry) return 0;

		let allSimilarBackgrounds: PaymentStoreEntrySchema[];
		if (Array.isArray(configEntry.name)) {
			allSimilarBackgrounds = this.getBackgroundByNameArray(configEntry.name);
		} else {
			allSimilarBackgrounds = this.getBackgroundByName(background);
		}

		if (configEntry.associatedAdvantage?.mayUseParentValue) {
			if (Array.isArray(configEntry.name)) {
				allSimilarBackgrounds = [
					...allSimilarBackgrounds,
					...this.getBackgroundAdvantageByBackgroundNameArray(configEntry.name)
				];
			} else {
				allSimilarBackgrounds = [
					...allSimilarBackgrounds,
					...this.getBackgroundAdvantageByBackgroundName(background)
				];
			}
		}

		const totalPoints = allSimilarBackgrounds.reduce((acc, entry) => acc + entry.predator, 0);

		return configEntry.value - totalPoints;
	}

	getPredatorPointsLeftArray(backgrounds: BackgroundName[]) {
		let totalPoints = 0;

		backgrounds.map((background) => {
			totalPoints += this.getPredatorPointsLeft(background);
		});

		return totalPoints;
	}

	getPredatorAssociatedAdvantagePointsLeft(
		background: BackgroundName,
		advantage: BackgroundAdvantageName
	) {
		const configEntry = this.getPredatorTypeChange(background);
		if (!configEntry) return 0;
		if (
			!configEntry.associatedAdvantage ||
			(configEntry.associatedAdvantage.name !== advantage &&
				configEntry.associatedAdvantage.name !== undefined)
		)
			return 0;

		let allSimilarBackgrounds: PaymentStoreEntrySchema[];
		if (Array.isArray(configEntry.name)) {
			allSimilarBackgrounds = this.getBackgroundAdvantageByBackgroundNameArray(configEntry.name);
		} else {
			allSimilarBackgrounds = this.getBackgroundAdvantageByBackgroundName(background);
		}

		if (configEntry.associatedAdvantage?.mayUseParentValue) {
			if (Array.isArray(configEntry.name)) {
				allSimilarBackgrounds = [
					...allSimilarBackgrounds,
					...this.getBackgroundByNameArray(configEntry.name)
				];
			} else {
				allSimilarBackgrounds = [...allSimilarBackgrounds, ...this.getBackgroundByName(background)];
			}
		}

		const totalPoints = allSimilarBackgrounds.reduce((acc, entry) => acc + entry.predator, 0);

		return configEntry.associatedAdvantage.mayUseParentValue
			? configEntry.value - totalPoints
			: configEntry.associatedAdvantage.value - totalPoints;
	}

	getFreebiePointsLeft() {
		return (
			get(this._maxFreebiePointsInternal) -
			get(this._paymentStoreInternal).backgrounds.reduce((acc, entry) => acc + entry.freebies, 0) -
			get(this._paymentStoreInternal).associatedAdvantages.reduce(
				(acc, entry) => acc + entry.freebies,
				0
			) -
			get(this._paymentStoreInternal).loresheet.reduce((acc, entry) => acc + entry.value, 0)
		);
	}

	getLoresheetChange(background: BackgroundName) {
		const loresheet = get(characterCreationStore).loresheet;
		if (!loresheet) return;

		const loresheetConfigEntry = loresheetConfig[loresheet.name];

		const level1 = loresheetConfigEntry.level1.changes
			?.filter((e) => e.kind === 'Background' && e.fixed !== true)
			.find((entry) =>
				Array.isArray(entry.name)
					? entry.name.some((e) => e === background)
					: entry.name === background
			);

		const level2 = loresheetConfigEntry.level2.changes
			?.filter((e) => e.kind === 'Background' && e.fixed !== true)
			.find((entry) =>
				Array.isArray(entry.name)
					? entry.name.some((e) => e === background)
					: entry.name === background
			);

		const level3 = loresheetConfigEntry.level3.changes
			?.filter((e) => e.kind === 'Background' && e.fixed !== true)
			.find((entry) =>
				Array.isArray(entry.name)
					? entry.name.some((e) => e === background)
					: entry.name === background
			);

		if (level1 && get(characterCreationStore).loresheet?.values?.includes(1)) return level1;
		if (level2 && get(characterCreationStore).loresheet?.values?.includes(2)) return level2;
		if (level3 && get(characterCreationStore).loresheet?.values?.includes(3)) return level3;
	}

	getLoresheetPointsLeft(background: BackgroundName) {
		const loresheetSelected = get(characterCreationStore).loresheet;
		if (!loresheetSelected) return 0;

		let changeEntries: BackgroundName[] = [];
		if (loresheetSelected) {
			loresheetSelected.values?.forEach((value) => {
				const level = value === 1 ? 'level1' : value === 2 ? 'level2' : 'level3';
				const changesForLevel = getLoresheetChanges(loresheetSelected.name, 'Background', level);
				if (changesForLevel) {
					const backgrounds = backgroundName
						.array()
						.parse(
							changesForLevel
								.map((entry) => (Array.isArray(entry.name) ? entry.name : [entry.name]))
								.flat()
						);
					changeEntries = [...changeEntries, ...backgrounds];
				}
			});
		}

		if (changeEntries.length <= 0) return 0;
		if (!changeEntries.includes(background)) {
			return 0;
		}

		let allSimilarBackgrounds: PaymentStoreEntrySchema[] = [];
		let allSimilarBackgroundsAdvantages: PaymentStoreAdvantageEntrySchema[] = [];

		for (const entry of changeEntries) {
			allSimilarBackgrounds = [...allSimilarBackgrounds, ...this.getBackgroundByName(entry)];
			allSimilarBackgroundsAdvantages = [
				...allSimilarBackgroundsAdvantages,
				...this.getBackgroundAdvantageByBackgroundName(entry)
			];
		}

		const configEntry = this.getLoresheetChange(background);
		if (!configEntry) return 0;

		const totalPoints = allSimilarBackgrounds.reduce((acc, entry) => acc + entry.loresheet, 0);
		const totalPointsAdvantages = allSimilarBackgroundsAdvantages.reduce(
			(acc, entry) => acc + entry.loresheet,
			0
		);

		return configEntry.value - totalPoints - totalPointsAdvantages;
	}

	getLoresheetPoints(background: BackgroundName) {
		return this.getBackgroundByName(background).reduce((acc, curr) => {
			return acc + curr.loresheet;
		}, 0);
	}

	getLoresheetPointsAssociatedAdvantage(background: BackgroundName) {
		return this.getBackgroundAdvantageByBackgroundName(background).reduce((acc, curr) => {
			return acc + curr.loresheet;
		}, 0);
	}

	getLoresheetPointsCombined(backgrounds: BackgroundName[]) {
		let totalPoints = 0;

		backgrounds.map((background) => {
			totalPoints += this.getLoresheetPoints(background);
		});

		return totalPoints;
	}

	getLoresheetPointsAssociatedAdvantageCombined(backgrounds: BackgroundName[]) {
		let totalPoints = 0;

		backgrounds.map((background) => {
			totalPoints += this.getLoresheetPointsAssociatedAdvantage(background);
		});

		return totalPoints;
	}

	showLoresheetPointsTotal(backgrounds: BackgroundName) {
		return (
			this.getLoresheetPoints(backgrounds) + this.getLoresheetPointsAssociatedAdvantage(backgrounds)
		);
	}

	showLoresheetPointsTotalCombined(backgrounds: BackgroundName[]) {
		return (
			this.getLoresheetPointsCombined(backgrounds) +
			this.getLoresheetPointsAssociatedAdvantageCombined(backgrounds)
		);
	}

	getPredatorPoints(background: BackgroundName) {
		return this.getBackgroundByName(background).reduce((acc, curr) => {
			return acc + curr.predator;
		}, 0);
	}

	getPredatorPointsCombined(backgrounds: BackgroundName[], mayUseParentValue: boolean = false) {
		let totalPoints = 0;

		backgrounds.map((background) => {
			let result = this.getPredatorPoints(background);

			if (mayUseParentValue) {
				result += this.getPredatorAdvantagePointsForBackground(background);
			}
			totalPoints += result;
		});

		return totalPoints;
	}

	getPredatorAdvantagePointsForBackground(name: BackgroundName) {
		return get(this._paymentStoreInternal)
			.associatedAdvantages.filter((entry) => entry.name === name)
			.reduce((acc, curr) => {
				return acc + curr.predator;
			}, 0);
	}

	getPredatorAdvantagePointsByBackgroundName(background: BackgroundName) {
		return this.getBackgroundAdvantageByBackgroundName(background).reduce((acc, curr) => {
			return acc + curr.predator;
		}, 0);
	}

	getPredatorAdvantagePointsByBackgroundNameArray(backgrounds: BackgroundName[]) {
		let totalPoints = 0;

		backgrounds.map((background) => {
			const result = this.getPredatorAdvantagePointsByBackgroundName(background);

			totalPoints += result;
		});

		return totalPoints;
	}

	getTotalPoints(id: string) {
		const existingEntry = get(this._paymentStoreInternal).backgrounds.find(
			(entry) => entry.id === id
		);
		if (!existingEntry) return 0;
		return (
			existingEntry.predator +
			existingEntry.loresheet +
			existingEntry.freebies +
			(existingEntry.fixed ?? 0)
		);
	}

	getTotalAdvantagePoints(id: string, advantage: BackgroundAdvantageName) {
		const existingEntry = get(this._paymentStoreInternal).associatedAdvantages.find(
			(entry) => entry.id === id && entry.advantageName === advantage
		);
		if (!existingEntry) return 0;
		return (
			existingEntry.haven +
			existingEntry.predator +
			existingEntry.loresheet +
			existingEntry.freebies +
			existingEntry.fixed
		);
	}

	increaseBackground(id: string, background: BackgroundName, value: number) {
		const { associatedAdvantages: associatedAdvantage, backgrounds } = get(
			this._paymentStoreInternal
		);

		const predatorPointsLeft = this.getPredatorPointsLeft(background);
		const loresheetPointsLeft = this.getLoresheetPointsLeft(background);
		const freebiePointsLeft =
			get(this._maxFreebiePointsInternal) -
			backgrounds.reduce((acc, entry) => acc + entry.freebies, 0) -
			associatedAdvantage.reduce((acc, entry) => acc + entry.freebies, 0) -
			(get(characterCreationStore).loresheet?.values?.reduce((acc, entry) => acc + entry, 0) ?? 0);

		const existingEntry = backgrounds.find((entry) => entry.id === id);

		let pointsToPay: number;
		let paymentStoreEntry: PaymentStoreEntrySchema;

		if (existingEntry) {
			pointsToPay =
				value -
				existingEntry.predator -
				existingEntry.loresheet -
				existingEntry.freebies -
				(existingEntry.fixed ?? 0);
			paymentStoreEntry = existingEntry;
		} else {
			pointsToPay = value;
			paymentStoreEntry = {
				id: id,
				name: background,
				predator: 0,
				loresheet: 0,
				freebies: 0,
				fixed: undefined
			};
		}

		if (predatorPointsLeft > 0 && pointsToPay > 0) {
			if (pointsToPay <= predatorPointsLeft) {
				paymentStoreEntry.predator += pointsToPay;
				pointsToPay = 0;
			} else {
				pointsToPay -= predatorPointsLeft;
				paymentStoreEntry.predator += predatorPointsLeft;
			}
		}

		if (loresheetPointsLeft > 0 && pointsToPay > 0) {
			if (pointsToPay <= loresheetPointsLeft) {
				paymentStoreEntry.loresheet += pointsToPay;
				pointsToPay = 0;
			} else {
				pointsToPay -= loresheetPointsLeft;
				paymentStoreEntry.loresheet += loresheetPointsLeft;
			}
		}

		if (pointsToPay > 0 && freebiePointsLeft > 0) {
			if (pointsToPay <= freebiePointsLeft) {
				paymentStoreEntry.freebies += pointsToPay;
				pointsToPay = 0;
			}
		}

		if (pointsToPay !== 0) return false;

		if (existingEntry) {
			this._paymentStoreInternal.update((store) => {
				const index = store.backgrounds.findIndex((item) => item.id === id);

				if (index !== -1) {
					return {
						...store,
						backgrounds: store.backgrounds.map((item, i) =>
							i === index ? { ...item, ...paymentStoreEntry } : item
						)
					};
				}

				return store;
			});
		} else {
			this._paymentStoreInternal.update((store) => {
				return {
					...store,
					backgrounds: [...store.backgrounds, paymentStoreEntry]
				};
			});
		}

		return true;
	}

	decreaseBackground(id: string, value: number) {
		const { backgrounds } = get(this._paymentStoreInternal);

		const existingEntry = backgrounds.find((entry) => entry.id === id);
		if (!existingEntry) return false;

		let pointsToRegain = this.getTotalPoints(id) - value;

		if (pointsToRegain > 0 && existingEntry.freebies > 0) {
			if (pointsToRegain <= existingEntry.freebies) {
				existingEntry.freebies -= pointsToRegain;
				pointsToRegain = 0;
			} else {
				pointsToRegain -= existingEntry.freebies;
				existingEntry.freebies = 0;
			}
		}

		if (pointsToRegain > 0 && existingEntry.loresheet > 0) {
			if (pointsToRegain <= existingEntry.loresheet) {
				existingEntry.loresheet -= pointsToRegain;
				pointsToRegain = 0;
			} else {
				pointsToRegain -= existingEntry.loresheet;
				existingEntry.loresheet = 0;
			}
		}

		if (pointsToRegain > 0 && existingEntry.predator > 0) {
			if (pointsToRegain <= existingEntry.predator) {
				existingEntry.predator -= pointsToRegain;
				pointsToRegain = 0;
			} else {
				pointsToRegain -= existingEntry.predator;
				existingEntry.predator = 0;
			}
		}

		if (pointsToRegain !== 0) return false;

		this._paymentStoreInternal.update((store) => {
			const indexBackground = store.backgrounds.findIndex((background) => background.id === id);

			if (indexBackground !== -1) {
				const updatedArray = [...store.backgrounds];
				updatedArray[indexBackground] = { ...updatedArray[indexBackground], ...existingEntry };

				return {
					...store,
					backgrounds: updatedArray
				};
			}

			return store;
		});

		return true;
	}

	deleteBackground(id: string) {
		this._paymentStoreInternal.update((store) => {
			const index = store.backgrounds.findIndex((item) => item.id === id);
			let updatedArray: PaymentStoreEntrySchema[] | undefined = undefined;

			if (index !== -1) {
				updatedArray = [...store.backgrounds];
				updatedArray.splice(index, 1);
				if (
					!get(this._paymentStoreInternal).associatedAdvantages.some((entry) => entry.id === id)
				) {
					return {
						...store,
						backgrounds: updatedArray
					};
				}
			}

			if (get(this._paymentStoreInternal).associatedAdvantages.some((entry) => entry.id === id)) {
				const updatedArrayAdvantages = [...store.associatedAdvantages];
				get(this._paymentStoreInternal)
					.associatedAdvantages.map((item, index) => (item.id === id ? index : -1))
					.filter((index) => index !== -1)
					.sort((a, b) => b - a)
					.forEach((index) => updatedArrayAdvantages.splice(index, 1));

				if (updatedArray) {
					return {
						...store,
						backgrounds: updatedArray,
						associatedAdvantages: updatedArrayAdvantages,
						loresheet: store.loresheet
					};
				}
				return {
					...store,
					associatedAdvantages: updatedArrayAdvantages
				};
			}

			return store;
		});
	}

	increaseBackgroundAdvantage(
		id: string,
		background: BackgroundName,
		backgroundAdvantage: BackgroundAdvantageName,
		value: number
	) {
		const { associatedAdvantages: associatedAdvantage, backgrounds } = get(
			this._paymentStoreInternal
		);

		const havenFreebiesLeft = this.getHavenFreebiesMax() - this.getHavenFreebiesUsed();
		const predatorPointsLeft = this.getPredatorAssociatedAdvantagePointsLeft(
			background,
			backgroundAdvantage
		);
		const loresheetPointsLeft = this.getLoresheetPointsLeft(background);
		const freebiePointsLeft =
			get(this._maxFreebiePointsInternal) -
			backgrounds.reduce((acc, entry) => acc + entry.freebies, 0) -
			associatedAdvantage.reduce((acc, entry) => acc + entry.freebies, 0);

		const existingEntry = associatedAdvantage.find(
			(entry) => entry.id === id && entry.advantageName === backgroundAdvantage
		);

		let pointsToPay: number;
		let paymentStoreEntry: PaymentStoreAdvantageEntrySchema;

		if (existingEntry) {
			pointsToPay =
				value -
				existingEntry.haven -
				existingEntry.predator -
				existingEntry.loresheet -
				existingEntry.freebies -
				existingEntry.fixed;
			paymentStoreEntry = existingEntry;
		} else {
			pointsToPay = value;
			paymentStoreEntry = {
				id: id,
				name: background,
				advantageName: backgroundAdvantage,
				haven: 0,
				predator: 0,
				loresheet: 0,
				freebies: 0,
				fixed: 0
			};
		}

		if (predatorPointsLeft > 0 && pointsToPay > 0) {
			if (pointsToPay <= predatorPointsLeft) {
				paymentStoreEntry.predator += pointsToPay;
				pointsToPay = 0;
			} else {
				pointsToPay -= predatorPointsLeft;
				paymentStoreEntry.predator += predatorPointsLeft;
			}
		}

		if (havenFreebiesLeft > 0 && pointsToPay > 0 && background === 'Haven') {
			if (pointsToPay <= havenFreebiesLeft) {
				paymentStoreEntry.haven += pointsToPay;
				pointsToPay = 0;
			} else {
				pointsToPay -= havenFreebiesLeft;
				paymentStoreEntry.haven += havenFreebiesLeft;
			}
		}

		if (loresheetPointsLeft > 0 && pointsToPay > 0) {
			if (pointsToPay <= loresheetPointsLeft) {
				paymentStoreEntry.loresheet += pointsToPay;
				pointsToPay = 0;
			} else {
				pointsToPay -= loresheetPointsLeft;
				paymentStoreEntry.loresheet += loresheetPointsLeft;
			}
		}

		if (pointsToPay > 0 && freebiePointsLeft > 0) {
			if (pointsToPay <= freebiePointsLeft) {
				paymentStoreEntry.freebies += pointsToPay;
				pointsToPay = 0;
			}
		}

		if (pointsToPay !== 0) return false;

		if (existingEntry) {
			this._paymentStoreInternal.update((store) => {
				const index = store.associatedAdvantages.findIndex(
					(item) => item.id === id && item.advantageName === backgroundAdvantage
				);

				if (index !== -1) {
					return {
						...store,
						associatedAdvantages: store.associatedAdvantages.map((item, i) =>
							i === index ? paymentStoreEntry : item
						)
					};
				}

				return store;
			});
		} else {
			this._paymentStoreInternal.update((store) => {
				return {
					...store,
					associatedAdvantages: [...store.associatedAdvantages, paymentStoreEntry]
				};
			});
		}

		return true;
	}

	decreaseBackgroundAdvantage(
		id: string,
		backgroundAdvantage: BackgroundAdvantageName,
		value: number
	) {
		const { associatedAdvantages: associatedAdvantage } = get(this._paymentStoreInternal);

		const existingEntry = associatedAdvantage.find(
			(entry) => entry.id === id && entry.advantageName === backgroundAdvantage
		);
		if (!existingEntry) return false;

		let pointsToRegain = this.getTotalAdvantagePoints(id, backgroundAdvantage) - value;

		if (pointsToRegain > 0 && existingEntry.freebies > 0) {
			if (pointsToRegain <= existingEntry.freebies) {
				existingEntry.freebies -= pointsToRegain;
				pointsToRegain = 0;
			} else {
				pointsToRegain -= existingEntry.freebies;
				existingEntry.freebies = 0;
			}
		}

		if (pointsToRegain > 0 && existingEntry.loresheet > 0) {
			if (pointsToRegain <= existingEntry.loresheet) {
				existingEntry.loresheet -= pointsToRegain;
				pointsToRegain = 0;
			} else {
				pointsToRegain -= existingEntry.loresheet;
				existingEntry.loresheet = 0;
			}
		}

		if (pointsToRegain > 0 && existingEntry.predator > 0) {
			if (pointsToRegain <= existingEntry.predator) {
				existingEntry.predator -= pointsToRegain;
				pointsToRegain = 0;
			} else {
				pointsToRegain -= existingEntry.predator;
				existingEntry.predator = 0;
			}
		}

		if (pointsToRegain > 0 && existingEntry.haven > 0) {
			if (pointsToRegain <= existingEntry.haven) {
				existingEntry.haven -= pointsToRegain;
				pointsToRegain = 0;
			} else {
				pointsToRegain -= existingEntry.haven;
				existingEntry.haven = 0;
			}
		}

		if (pointsToRegain !== 0) return false;

		this._paymentStoreInternal.update((store) => {
			const index = store.associatedAdvantages.findIndex(
				(item) => item.id === id && item.advantageName === backgroundAdvantage
			);

			if (index !== -1) {
				const updatedArray = [...store.associatedAdvantages];
				updatedArray[index] = { ...updatedArray[index], ...existingEntry };

				return {
					...store,
					associatedAdvantages: updatedArray
				};
			}

			return store;
		});

		return true;
	}

	deleteBackgroundAdvantage(id: string, backgroundAdvantage: BackgroundAdvantageName) {
		this._paymentStoreInternal.update((store) => {
			const index = store.associatedAdvantages.findIndex(
				(item) => item.id === id && item.advantageName === backgroundAdvantage
			);

			if (index !== -1) {
				const updatedArrayAdvantages = [...store.associatedAdvantages];
				updatedArrayAdvantages.splice(index, 1);
				return {
					...store,
					associatedAdvantages: updatedArrayAdvantages
				};
			}

			return store;
		});
	}

	canRemoveBackgroundDisadvantage(
		value: number,
		backgroundsValue: number,
		associatedAdvantageValue: number
	) {
		const freebiePointsLeft =
			get(this._maxFreebiePointsInternal) - backgroundsValue - associatedAdvantageValue;

		return freebiePointsLeft >= value;
	}

	canAddBackground(background: BackgroundName) {
		const predatorPointsLeft = this.getPredatorPointsLeft(background);
		const loresheetPointsLeft = this.getLoresheetPointsLeft(background);
		const freebiePointsLeft = this.getFreebiePointsLeft();

		return predatorPointsLeft + loresheetPointsLeft + freebiePointsLeft > 0;
	}

	canRemoveBackground(backgroundId: string) {
		const associatedAdvantage = get(this._paymentStoreInternal).associatedAdvantages;
		const associatedAdvantageEntries = associatedAdvantage.filter(
			(entry) => entry.id === backgroundId
		);
		const isAdvantageFixed = associatedAdvantageEntries.some((entry) => entry.fixed > 0);

		const backgroundEntry = get(this._paymentStoreInternal).backgrounds.find(
			(entry) => entry.id === backgroundId
		);
		const isBackgroundFixed = backgroundEntry?.fixed && backgroundEntry.fixed > 0;

		return !isBackgroundFixed && !isAdvantageFixed;
	}

	canAddBackgroundAdvantage(
		id: string | undefined,
		background: BackgroundName,
		advantage: BackgroundAdvantageName,
		value: number,
		mode: 'experience' | 'freebies' = 'freebies'
	) {
		if (mode === 'freebies') {
			const predatorPointsLeft = this.getPredatorPointsLeft(background);
			const loresheetPointsLeft = this.getLoresheetPointsLeft(background);
			const freebiePointsLeft = this.getFreebiePointsLeft();
			const havenFreebiesLeft = this.getHavenFreebiesMax() - this.getHavenFreebiesUsed();

			const predatorAdvantagePointsLeft = this.getPredatorAssociatedAdvantagePointsLeft(
				background,
				advantage
			);

			const loresheetAdvantagePointsLeft = this.getLoresheetPointsLeft(background);

			const valueAlreadyPaid =
				get(characterCreationStore)
					.backgrounds.find((b) => b.id === id)
					?.advantages?.find((a) => a.name === advantage)?.value ?? 0;

			const availablePoints =
				predatorPointsLeft +
				(background === 'Haven' ? havenFreebiesLeft : 0) +
				loresheetPointsLeft +
				freebiePointsLeft +
				predatorAdvantagePointsLeft +
				loresheetAdvantagePointsLeft;

			return availablePoints > 0 && availablePoints >= value - valueAlreadyPaid;
		} else {
			return true;
		}
	}

	canRemoveBackgroundAdvantage(backgroundId: string, advantageName: BackgroundAdvantageName) {
		const associatedAdvantage = get(this._paymentStoreInternal).associatedAdvantages;
		const associatedAdvantageEntries = associatedAdvantage.filter(
			(entry) => entry.id === backgroundId && entry.advantageName === advantageName
		);
		const isAdvantageFixed = associatedAdvantageEntries.some((entry) => entry.fixed > 0);

		return !isAdvantageFixed;
	}

	addFixedBackground(
		background: BackgroundName,
		value: number,
		sphereOfInfluence: SpheresOfInfluenceName | undefined = undefined,
		associcatedAdvantages: AssociatedAdvantage[] | undefined = undefined,
		updatePaymentStore: boolean = true
	) {
		const currentBackgrounds = get(characterCreationStore).backgrounds;
		const advantages: (PlayerBackgroundAdvantage & { id: string })[] = [];

		associcatedAdvantages?.forEach((advantage) => {
			if (advantage.name === 'Variabel') return;

			advantages.push({
				id: generateId(),
				name: advantage.name,
				value: advantage.value
			});
		});

		const backgroundId = generateId();
		currentBackgrounds.push({
			id: backgroundId,
			name: background,
			value: value,
			sphereOfInfluence: sphereOfInfluence ? [sphereOfInfluence] : undefined,
			advantages: advantages.length > 0 ? advantages : undefined
		});

		characterCreationStore.update((store) => {
			return {
				...store,
				backgrounds: currentBackgrounds
			};
		});

		this.paymentStore.update((store) => {
			const backgrounds = store.backgrounds;
			backgrounds.push({
				id: backgroundId,
				name: background,
				predator: 0,
				loresheet: 0,
				freebies: 0,
				fixed: updatePaymentStore ? value : undefined
			});

			return {
				...store,
				backgrounds: backgrounds
			};
		});

		advantages.forEach((advantage) => {
			this.paymentStore.update((store) => {
				const advantages = store.associatedAdvantages;
				advantages.push({
					id: backgroundId,
					name: background,
					advantageName: advantage.name,
					fixed: advantage.value,
					haven: 0,
					predator: 0,
					loresheet: 0,
					freebies: 0
				});
				return {
					...store,
					associatedAdvantages: advantages
				};
			});
		});
	}

	removeFixedBackground(background: BackgroundName) {
		const backgroundPaymentStore = get(this._paymentStoreInternal).backgrounds.find(
			(e) => e.name === background && (!e.fixed || e.fixed > 0)
		);
		if (!backgroundPaymentStore) return;

		this.deleteBackground(backgroundPaymentStore.id);

		let backgrounds = get(characterCreationStore).backgrounds;
		backgrounds = backgrounds.filter((e) => e.id !== backgroundPaymentStore.id);

		characterCreationStore.update((store) => {
			return {
				...store,
				backgrounds: backgrounds
			};
		});
	}

	removeLoresheetDotBackground(background: BackgroundName) {
		const backgroundPaymentStore = get(this._paymentStoreInternal).backgrounds.find(
			(e) => e.name === background && e.loresheet > 0
		);
		if (backgroundPaymentStore) {
			let backgrounds = get(characterCreationStore).backgrounds;
			backgrounds = backgrounds.filter((e) => e.id !== backgroundPaymentStore.id);
			characterCreationStore.update((store) => {
				return {
					...store,
					backgrounds: backgrounds
				};
			});

			this.deleteBackground(backgroundPaymentStore.id);
		}

		const backgroundAdvantagesPaymentStore = get(
			this._paymentStoreInternal
		).associatedAdvantages.find((e) => e.name === background && e.loresheet > 0);
		if (backgroundAdvantagesPaymentStore) {
			let backgrounds = get(characterCreationStore).backgrounds;
			backgrounds = backgrounds.filter((e) => e.id !== backgroundAdvantagesPaymentStore.id);
			characterCreationStore.update((store) => {
				return {
					...store,
					backgrounds: backgrounds
				};
			});

			this.deleteBackgroundAdvantage(
				backgroundAdvantagesPaymentStore.id,
				backgroundAdvantageName.parse(backgroundAdvantagesPaymentStore.advantageName)
			);
		}
	}

	getHavenFreebiesMax() {
		return get(characterCreationStore)
			.backgrounds.filter((e) => e.value >= 2)
			.map((e) => e.value)
			.reduce((acc, curr) => {
				return acc + curr - 1; // the first dot needs to be removed as it does not give freebies
			}, 0);
	}

	getHavenFreebiesUsed() {
		return get(this._paymentStoreInternal)
			.associatedAdvantages.filter((e) => e.haven > 0)
			.reduce((acc, curr) => acc + curr.haven, 0);
	}

	isFixedBackgroundAdvantage(backgroundId: string, advantage: BackgroundAdvantageName) {
		return get(this._paymentStoreInternal).associatedAdvantages.some(
			(entry) => entry.id === backgroundId && entry.advantageName === advantage && entry.fixed > 0
		);
	}

	getFixedBackgroundAdvantageValue(backgroundId: string, advantage: BackgroundAdvantageName) {
		return get(this._paymentStoreInternal).associatedAdvantages.find(
			(entry) => entry.id === backgroundId && entry.advantageName === advantage
		)?.fixed;
	}

	isLoresheetBackgroundAdvantage(backgroundId: string, advantage: BackgroundAdvantageName) {
		return get(this._paymentStoreInternal).associatedAdvantages.some(
			(entry) =>
				entry.id === backgroundId && entry.advantageName === advantage && entry.loresheet > 0
		);
	}

	isHavenBackgroundAdvantage(backgroundId: string, advantage: BackgroundAdvantageName) {
		return get(this._paymentStoreInternal).associatedAdvantages.some(
			(entry) => entry.id === backgroundId && entry.advantageName === advantage && entry.haven > 0
		);
	}

	setHavenBackgroundAdvantage(
		backgroundId: string,
		advantage: BackgroundAdvantageName,
		value: number
	) {
		this._paymentStoreInternal.update((store) => {
			const indexEdit = store.associatedAdvantages.findIndex(
				(entry) => entry.id === backgroundId && entry.advantageName === advantage
			);
			if (indexEdit === -1) {
				store.associatedAdvantages.push({
					id: backgroundId,
					name: 'Haven',
					advantageName: advantage,
					fixed: 0,
					freebies: 0,
					haven: value,
					loresheet: 0,
					predator: 0
				});
			} else {
				store.associatedAdvantages[indexEdit].haven = value;
			}

			return store;
		});
	}

	removeHavenBackgroundAdvantage(backgroundId: string, advantage: BackgroundAdvantageName) {
		this._paymentStoreInternal.update((store) => {
			const indexEdit = store.associatedAdvantages.findIndex(
				(entry) => entry.id === backgroundId && entry.advantageName === advantage
			);
			if (indexEdit === -1) {
				return store;
			}

			store.associatedAdvantages[indexEdit].haven = 0;

			return store;
		});
	}

	addSkill(skill: SkillName, value: number) {
		this.paymentStore.update((store) => {
			store.skills.push({ name: skill, value: value });
			return store;
		});
	}

	removeSkill(skill: SkillName) {
		this.paymentStore.update((store) => {
			store.skills = store.skills.filter((entry) => entry.name !== skill);
			return store;
		});
	}

	getSkillValue(skill: SkillName) {
		return get(this._paymentStoreInternal).skills.find((entry) => entry.name === skill)?.value;
	}

	includesSkill(skill: SkillName) {
		return get(this._paymentStoreInternal).skills.some((entry) => entry.name === skill);
	}
}

export const backgroundPaymentStore = new BackgroundPaymentStore();
