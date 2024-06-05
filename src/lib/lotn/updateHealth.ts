import type { DamageTypeName } from '$lib/zod/lotn/enums/damageTypeName';

export async function updateHealth(
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
	await locals.pb.collection('lotn_player_character_health').update(id, updateString);
}
