import { characterStore } from '$lib/components/lotn/characterSheet/characterStore';
import HttpStatusCode from '$lib/httpStatusCode';
import { playerCharacter } from '$lib/zod/lotn/playerCharacter/playerCharacter';
import { playerItem, type PlayerItem } from '$lib/zod/lotn/playerCharacter/playerItem';

export async function load({ params, fetch }) {
	if (characterStore) {
		const response = await fetch(`/api/lotn/character?id=${params.id}`);
		characterStore.set(playerCharacter.parse(await response.json()));
	}

	const responseItems = await fetch(`/api/lotn/character/items?id=${params.id}`);

	let items: PlayerItem[] = [];

	if (responseItems.status === HttpStatusCode.OK) {
		items = playerItem.array().parse(await responseItems.json());
	}

	return { items };
}
