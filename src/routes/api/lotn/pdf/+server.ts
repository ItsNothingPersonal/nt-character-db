import { json } from '@sveltejs/kit';
import { readdir } from 'fs/promises';
import { join } from 'path';

export async function GET({ url }) {
	const color: boolean = JSON.parse(url.searchParams.get('color') || 'false');

	try {
		const templatesPath = join(process.cwd(), `static/pdfs/${color ? 'color' : 'bw'}`);
		const files = await readdir(templatesPath);

		const pdfFiles = files.filter((file) => file.endsWith('.pdf'));

		return json({ templates: pdfFiles });
	} catch (error) {
		console.error('Error reading PDF templates:', error);
		return json({ templates: [] });
	}
}
