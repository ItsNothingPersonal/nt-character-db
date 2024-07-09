import type { DisciplineName } from '$lib/zod/lotn/enums/disciplineName';
import { animalismConfig } from '../config/disciplines/animalismConfig';
import { auspexConfig } from '../config/disciplines/auspexConfig';
import { bloodSorceryConfig } from '../config/disciplines/bloodSorceryConfig';
import { celerityConfig } from '../config/disciplines/celerityConfig';
import { dominateConfig } from '../config/disciplines/dominateConfig';
import { fortitudeConfig } from '../config/disciplines/fortitudeConfig';
import { obfuscateConfig } from '../config/disciplines/obfuscateConfig';
import { oblivionConfig } from '../config/disciplines/oblivionConfig';
import { potenceConfig } from '../config/disciplines/potenceConfig';
import { presenceConfig } from '../config/disciplines/presenceConfig';
import { proteanConfig } from '../config/disciplines/proteanConfig';
import { thinBloodAlchemyConfig } from '../config/disciplines/thinBloodAlchemyConfig';

export function getDisciplineConfig(disciplineName: DisciplineName) {
	switch (disciplineName) {
		case 'Animalism':
			return animalismConfig;
		case 'Blood Sorcery':
			return bloodSorceryConfig;
		case 'Auspex':
			return auspexConfig;
		case 'Celerity':
			return celerityConfig;
		case 'Dominate':
			return dominateConfig;
		case 'Fortitude':
			return fortitudeConfig;
		case 'Obfuscate':
			return obfuscateConfig;
		case 'Oblivion':
			return oblivionConfig;
		case 'Potence':
			return potenceConfig;
		case 'Presence':
			return presenceConfig;
		case 'Protean':
			return proteanConfig;
		case 'Thin-Blood Alchemy':
			return thinBloodAlchemyConfig;
	}
}
