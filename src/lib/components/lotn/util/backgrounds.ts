import type { BackgroundName } from '$lib/zod/lotn/enums/backgroundName';
import { alliesConfig } from '../config/backgrounds/alliesConfig';
import { contactsConfig } from '../config/backgrounds/contactsConfig';
import { fameConfig } from '../config/backgrounds/fameConfig';
import { familiarConfig } from '../config/backgrounds/familiarConfig';
import { havenConfig } from '../config/backgrounds/havenConfig';
import { herdConfig } from '../config/backgrounds/herdConfig';
import { maskConfig } from '../config/backgrounds/maskConfig';
import { resourcesConfig } from '../config/backgrounds/resourcesConfig';

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
