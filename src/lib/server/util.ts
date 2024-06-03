import type { DamageTypeName } from '$lib/zod/classic/enums/damageTypeName';
import { error } from '@sveltejs/kit';
import HttpStatusCode from './httpStatusCode';

export function validateIdParameter(url: URL): string {
	const id = url.searchParams.get('id');

	if (!id || id.length === null || id.length <= 0) {
		error(HttpStatusCode.BAD_REQUEST, 'Keine ID vorhanden');
	}

	return id;
}

export async function updateDamage(
	locals: App.Locals,
	id: string,
	type: 'add' | 'substract',
	damageType: DamageTypeName,
	normalDamageTaken: number,
	aggrevatedDamageTaken: number,
	valueNew: number
) {
	let updateString: { normal?: number; aggrevated?: number };

	switch (damageType) {
		case 'normal':
			updateString = {
				normal: type === 'add' ? normalDamageTaken + valueNew : normalDamageTaken - valueNew
			};
			break;
		case 'aggrevated':
			updateString = {
				aggrevated:
					type === 'add' ? aggrevatedDamageTaken + valueNew : aggrevatedDamageTaken - valueNew
			};
			break;
		default:
			updateString = {};
	}
	await locals.pb.collection('classic_player_character_damage_taken').update(id, updateString);
}
