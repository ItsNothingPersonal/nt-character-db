export const menuData: {
	id: number;
	label: string;
	href?: string;
	subData?: { href: string; label: string }[];
}[] = [
	{
		id: 0,
		label: 'Sheet',
		href: ''
	},
	{
		id: 1,
		label: 'Trackers',
		href: 'trackers'
	},
	{
		id: 2,
		label: 'Battle',
		href: 'battle'
	},
	{
		id: 3,
		label: 'Impressum'
	}
];
