import { loresheetConfig } from '$lib/components/lotn/config/loresheetConfig';
import { predatorTypeConfig } from '$lib/components/lotn/config/predatorTypeConfig';
import { generateId } from '$lib/util';
import {
	backgroundAdvantageName,
	type BackgroundAdvantageName
} from '$lib/zod/lotn/enums/backgroundAdvantageName';
import { backgroundName, type BackgroundName } from '$lib/zod/lotn/enums/backgroundName';
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
	associatedAdvantage: paymentStoreAdvantageEntrySchema.array()
});
type PaymentStoreSchema = z.infer<typeof paymentStoreSchema>;

export class BackgroundPaymentStore {
	private _initialPaymentStoreValues: PaymentStoreSchema = {
		backgrounds: [],
		associatedAdvantage: [],
		loresheet: []
	};
	private _paymentStoreInternal: Writable<PaymentStoreSchema> = writable(
		cloneDeep(this._initialPaymentStoreValues)
	);
	private unsubscribePaymentStore: () => void;

	private _usedFreebiePointsInternal: Readable<number>;
	private _maxFreebiePointsInternal: Readable<number>;

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
				$store.associatedAdvantage.reduce((acc, curr) => {
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
	}

	destroy() {
		this.unsubscribePaymentStore();
	}

	reset() {
		this._usedFreebiePointsInternal = writable(0);
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

	getBackgroundByName(name: BackgroundName) {
		return get(this._paymentStoreInternal).backgrounds.filter((entry) => entry.name === name);
	}

	getBackgroundByNameArray(names: BackgroundName[]) {
		let result: PaymentStoreEntrySchema[] = [];
		names.map((name) => {
			result = [...result, ...this.getBackgroundByName(name)];
		});
		return result;
	}

	getBackgroundAdvantageByBackgroundName(name: BackgroundName) {
		return get(this._paymentStoreInternal).associatedAdvantage.filter(
			(entry) => entry.name === name && entry.fixed === 0
		);
	}

	getBackgroundAdvantageByBackgroundNameArray(names: BackgroundName[]) {
		let result: PaymentStoreEntrySchema[] = [];
		names.map((name) => {
			result = [
				...result,
				...get(this._paymentStoreInternal).associatedAdvantage.filter(
					(entry) => entry.name === name
				)
			];
		});
		return result;
	}

	getBackgroundAdvantage(name: BackgroundName, advantage: BackgroundAdvantageName) {
		return get(this._paymentStoreInternal).associatedAdvantage.filter(
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
			get(this._paymentStoreInternal).associatedAdvantage.reduce(
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
		const configEntry = this.getLoresheetChange(background);
		if (!configEntry) return 0;

		const allSimilarBackgrounds = this.getBackgroundByName(background);
		const totalPoints = allSimilarBackgrounds.reduce((acc, entry) => acc + entry.loresheet, 0);

		const allSimilarBackgroundsAdvantages = this.getBackgroundAdvantageByBackgroundName(background);
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
			.associatedAdvantage.filter((entry) => entry.name === name)
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
		const existingEntry = get(this._paymentStoreInternal).associatedAdvantage.find(
			(entry) => entry.id === id && entry.advantageName === advantage
		);
		if (!existingEntry) return 0;
		return (
			existingEntry.predator +
			existingEntry.loresheet +
			existingEntry.freebies +
			existingEntry.fixed
		);
	}

	increaseBackground(id: string, background: BackgroundName, value: number) {
		const { associatedAdvantage, backgrounds } = get(this._paymentStoreInternal);

		const predatorPointsLeft = this.getPredatorPointsLeft(background);
		const loresheetPointsLeft = this.getLoresheetPointsLeft(background);
		const freebiePointsLeft =
			get(this._maxFreebiePointsInternal) -
			backgrounds.reduce((acc, entry) => acc + entry.freebies, 0) -
			associatedAdvantage.reduce((acc, entry) => acc + entry.freebies, 0);

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
					const updatedArray = [...store.backgrounds];
					updatedArray[index] = { ...updatedArray[index], ...paymentStoreEntry };

					return {
						...store,
						backgrounds: updatedArray
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
			const index = store.backgrounds.findIndex((item) => item.id === id);

			if (index !== -1) {
				const updatedArray = [...store.backgrounds];
				updatedArray[index] = { ...updatedArray[index], ...existingEntry };

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
				if (!get(this._paymentStoreInternal).associatedAdvantage.some((entry) => entry.id === id)) {
					return {
						...store,
						backgrounds: updatedArray
					};
				}
			}

			if (get(this._paymentStoreInternal).associatedAdvantage.some((entry) => entry.id === id)) {
				const updatedArrayAdvantages = [...store.associatedAdvantage];
				get(this._paymentStoreInternal)
					.associatedAdvantage.map((item, index) => (item.id === id ? index : -1))
					.filter((index) => index !== -1)
					.sort((a, b) => b - a)
					.forEach((index) => updatedArrayAdvantages.splice(index, 1));

				if (updatedArray) {
					return {
						backgrounds: updatedArray,
						associatedAdvantage: updatedArrayAdvantages,
						loresheet: store.loresheet
					};
				}
				return {
					...store,
					associatedAdvantage: updatedArrayAdvantages
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
		const { associatedAdvantage, backgrounds } = get(this._paymentStoreInternal);

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
				const index = store.associatedAdvantage.findIndex(
					(item) => item.id === id && item.advantageName === backgroundAdvantage
				);

				if (index !== -1) {
					const updatedArray = [...store.associatedAdvantage];
					updatedArray[index] = paymentStoreEntry;
					return {
						...store,
						associatedAdvantage: updatedArray
					};
				}

				return store;
			});
		} else {
			this._paymentStoreInternal.update((store) => {
				return {
					...store,
					associatedAdvantage: [...store.associatedAdvantage, paymentStoreEntry]
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
		const { associatedAdvantage } = get(this._paymentStoreInternal);

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

		if (pointsToRegain !== 0) return false;

		this._paymentStoreInternal.update((store) => {
			const index = store.associatedAdvantage.findIndex(
				(item) => item.id === id && existingEntry.advantageName === backgroundAdvantage
			);

			if (index !== -1) {
				const updatedArray = [...store.associatedAdvantage];
				updatedArray[index] = { ...updatedArray[index], ...existingEntry };

				return {
					...store,
					associatedAdvantage: updatedArray
				};
			}

			return store;
		});

		return true;
	}

	deleteBackgroundAdvantage(id: string, backgroundAdvantage: BackgroundAdvantageName) {
		this._paymentStoreInternal.update((store) => {
			const index = store.associatedAdvantage.findIndex(
				(item) => item.id === id && item.advantageName === backgroundAdvantage
			);

			if (index !== -1) {
				const updatedArrayAdvantages = [...store.associatedAdvantage];
				updatedArrayAdvantages.splice(index, 1);
				return {
					...store,
					associatedAdvantage: updatedArrayAdvantages
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

			const predatorAdvantagePointsLeft = this.getPredatorAssociatedAdvantagePointsLeft(
				background,
				advantage
			);

			const loresheetAdvantagePointsLeft = this.getLoresheetPointsLeft(background);

			const valueAlreadyPaid =
				get(characterCreationStore)
					.backgrounds.find((b) => b.id === id)
					?.advantages?.find((a) => a.name === advantage)?.value ?? 0;

			return (
				predatorPointsLeft +
					loresheetPointsLeft +
					freebiePointsLeft +
					predatorAdvantagePointsLeft +
					loresheetAdvantagePointsLeft >=
				value - valueAlreadyPaid
			);
		} else {
			return true;
		}
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

		const backgroundId = Math.random().toString();
		currentBackgrounds.push({
			id: backgroundId,
			name: background,
			value: value,
			sphereOfInfluence: sphereOfInfluence,
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
				const advantages = store.associatedAdvantage;
				advantages.push({
					id: backgroundId,
					name: background,
					advantageName: advantage.name,
					fixed: advantage.value,
					predator: 0,
					loresheet: 0,
					freebies: 0
				});
				return {
					...store,
					associatedAdvantage: advantages
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
		).associatedAdvantage.find((e) => e.name === background && e.loresheet > 0);
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
}

export const backgroundPaymentStore = new BackgroundPaymentStore();
