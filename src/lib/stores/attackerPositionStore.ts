import type { AttackerPosition } from '$lib/zod/lotn/enums/attackerPosition';
import { writable } from 'svelte/store';

export const attackerPositionStore = writable<AttackerPosition>('mediumRange');
