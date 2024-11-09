import type { FlawName } from '$lib/zod/lotn/enums/flawName';
import { flawConfig } from '../config/flawsConfig';
import { createNumberList } from './generalUtils';

export function getApplicableFlawLevels(flawName: FlawName) {
	const config = flawConfig[flawName];
	if (!config) return [];

	if ('levelVariable' in config && config.levelVariable) {
		return createNumberList(config.max, config.min);
	} else {
		const numberList: number[] = [];
		if ('level1' in config) numberList.push(1);
		if ('level2' in config) numberList.push(2);
		if ('level3' in config) numberList.push(3);
		if ('level4' in config) numberList.push(4);
		if ('level5' in config) numberList.push(5);
		return numberList;
	}
}

export function getFlawValueDescription(flawName: FlawName, value: number) {
	const config = flawConfig[flawName];
	if (!config) return undefined;

	if ('levelVariable' in config && config.levelVariable) {
		return config.levelVariable;
	} else {
		if (!ifFlawLevelIsConfigured(flawName, value)) return undefined;

		switch (value) {
			case 1:
				if ('level1' in config) {
					return config.level1;
				}
				break;
			case 2:
				if ('level2' in config) {
					return config.level2;
				}
				break;
			case 3:
				if ('level3' in config) {
					return config.level3;
				}
				break;
			case 4:
				if ('level4' in config) {
					return config.level4;
				}
				break;
			case 5:
				if ('level5' in config) {
					return config.level5;
				}
				break;
			default:
				return '';
		}
	}
}

export function ifFlawLevelIsConfigured(flawName: FlawName, value: number) {
	const config = flawConfig[flawName];
	if (!config) return undefined;

	const levels = getApplicableFlawLevels(flawName);
	return levels.includes(value);
}

export function isThinBloodFlaw(flawName: FlawName) {
	const config = flawConfig[flawName];
	if (!config) return false;

	return config.category === 'Thin-Blood';
}
