import { backgroundPaymentStore, characterCreationStore } from '$lib/stores/characterCreationStore';
import { generateId } from '$lib/util';
import type { BackgroundName } from '$lib/zod/lotn/enums/backgroundName';
import { get } from 'svelte/store';
import { alliesConfig } from '../config/backgrounds/alliesConfig';
import { contactsConfig } from '../config/backgrounds/contactsConfig';
import { fameConfig } from '../config/backgrounds/fameConfig';
import { familiarConfig } from '../config/backgrounds/familiarConfig';
import { havenConfig } from '../config/backgrounds/havenConfig';
import { herdConfig } from '../config/backgrounds/herdConfig';
import { maskConfig } from '../config/backgrounds/maskConfig';
import { resourcesConfig } from '../config/backgrounds/resourcesConfig';

export const canOnlyBeBoughtOnce: BackgroundName[] = ['Herd', 'Resources'];

export function getBackgroundConfig(backgroundName: BackgroundName) {
	switch (backgroundName) {
		case 'Allies':
			return alliesConfig;
		case 'Contacts':
			return contactsConfig;
		case 'Fame':
			return fameConfig;
		case 'Familiar':
			return familiarConfig;
		case 'Haven':
			return havenConfig;
		case 'Herd':
			return herdConfig;
		case 'Mask':
			return maskConfig;
		case 'Resources':
			return resourcesConfig;
	}
}

export function addBackground(
	name: BackgroundName,
	canOnlyBeBoughtOnce: BackgroundName[],
	characterCreation = false
) {
	if (canOnlyBeBoughtOnce.includes(name)) {
		const doesBackgroundExist = get(characterCreationStore).backgrounds.some(
			(background) => background.name === name
		);

		if (doesBackgroundExist) {
			return;
		}
	}

	const id = generateId();
	if (characterCreation) {
		const paymentResult = backgroundPaymentStore.increaseBackground(id, name, 1);
		if (!paymentResult) return;
	}

	characterCreationStore.update((store) => {
		return {
			...store,
			backgrounds: [...store.backgrounds, { name, value: 1, id }]
		};
	});

	return id;
}