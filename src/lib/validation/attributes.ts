export function getAttributesMaximum(generation: number) {
	let result = 10;

	switch (generation) {
		case 6:
			result += 5;
			break;
		case 7:
			result += 4;
			break;
		case 8:
			result += 3;
			break;
		case 9:
		case 10:
			result += 2;
			break;
		case 11:
		case 12:
		case 13:
			result += 1;
			break;
		default:
			result += 0;
	}

	return result;
}
