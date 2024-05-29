import { PBUser } from '$lib/zod/user';
import PocketBase from 'pocketbase';

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			pb: PocketBase;
			user: PBUser | undefined;
		}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};
