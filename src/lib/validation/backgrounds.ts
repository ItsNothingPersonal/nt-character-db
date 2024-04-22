export function getGenerationNumber(generationDots: number): number {
	let generation = 0;
	switch (generationDots) {
		case 1:
			generation = 11;
			break;
		case 2:
			generation = 9;
			break;
		case 3:
			generation = 8;
			break;
		case 4:
			generation = 7;
			break;
		case 5:
			generation = 6;
			break;
	}

	return generation;
}
