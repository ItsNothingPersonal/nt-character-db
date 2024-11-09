export type BackgroundChangeEvent = {
	id: string;
	label: string;
	type: 'value' | 'description' | 'sphereOfInfluence';
	value: number | string | undefined;
};
