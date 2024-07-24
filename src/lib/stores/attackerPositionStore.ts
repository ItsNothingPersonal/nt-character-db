import { writable } from 'svelte/store';

export const attackerPositionStore = writable<{
	attackerMoreThanThreeMetersAway: boolean;
	attackerLessThanTwoMetersAway: boolean;
}>({
	attackerMoreThanThreeMetersAway: false,
	attackerLessThanTwoMetersAway: false
});
