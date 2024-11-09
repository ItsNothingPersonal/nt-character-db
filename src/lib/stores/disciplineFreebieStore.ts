import { disciplineName, type DisciplineName } from '$lib/zod/lotn/enums/disciplineName';
import { get, type Writable, writable } from 'svelte/store';
import { z } from 'zod';

export class DisciplineFreebieStore {
	constructor() {
		this._disciplineFreebieStoreInternal = writable(
			disciplineFreebieStoreEntrySchema.parse({ disciplines: [] })
		);
	}

	private _disciplineFreebieStoreInternal: Writable<DisciplineFreebieStoreEntrySchema>;

	setDiscipline(name: DisciplineName, value: number = 1) {
		this._disciplineFreebieStoreInternal.update((store) => {
			const index = store.disciplines.findIndex((discipline) => discipline.name === name);

			if (index === -1) {
				store.disciplines.push({ name, value });
			} else {
				store.disciplines[index].value = value;
			}

			return store;
		});
	}

	getDiscipline(name: DisciplineName) {
		return get(this._disciplineFreebieStoreInternal).disciplines.find(
			(discipline) => discipline.name === name
		);
	}

	removeDiscipline(name: DisciplineName) {
		this._disciplineFreebieStoreInternal.update((store) => {
			store.disciplines = store.disciplines.filter((discipline) => discipline.name !== name);
			return store;
		});
	}

	getStore() {
		return this._disciplineFreebieStoreInternal;
	}
}

const disciplineFreebieStoreEntrySchema = z.object({
	disciplines: z.object({ name: disciplineName, value: z.number() }).array().max(3)
});
type DisciplineFreebieStoreEntrySchema = z.infer<typeof disciplineFreebieStoreEntrySchema>;

export const disciplineFreebieStore = new DisciplineFreebieStore();
