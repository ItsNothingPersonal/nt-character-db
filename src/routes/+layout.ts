import type { LayoutLoad } from './$types';

export const load = (async ({ params }) => {
	return { characterId: params.id };
}) satisfies LayoutLoad;
