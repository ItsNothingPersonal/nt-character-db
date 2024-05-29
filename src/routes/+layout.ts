export async function load({ params, data }) {
	return { characterId: params.id, user: data.user };
}
