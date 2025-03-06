import { writable, type Writable } from 'svelte/store';

export const pdfOptionsStore: Writable<{ color: boolean; pdfName: string | undefined }> = writable({
	color: true,
	pdfName: undefined
});
