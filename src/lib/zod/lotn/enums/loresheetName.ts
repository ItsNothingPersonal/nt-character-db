import { z } from 'zod';

export const loresheetName = z.enum([
	'Anarch Revolt',
	'The Cobweb',
	'The Church of Set',
	'The Circulatory System',
	'Convention of Thorns',
	'Descendant of Hardestadt',
	'Descendant of Helena',
	'Descendant of Karl Schrekt',
	'Descendant of Montano',
	'Descendant of Tyler',
	'Descendant of Vasantasena',
	'Descendant of Xaviar',
	'Descendant of Zao-Xue',
	'Descendant of Zelios',
	'The First Inquisition',
	'Firstlight',
	'Golconda',
	'High Clan',
	'Low Clan',
	'Scion of Lucretia',
	'Sect War Veteran',
	'The Society of Heralds',
	'The Trinity',
	'The Week of Nightmares'
]);
export type LoresheetName = z.infer<typeof loresheetName>;
