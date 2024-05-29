export const menuData: {
	id: number;
	label: string;
	icon: string;
	href?: string;
	subData?: { href: string; label: string }[];
}[] = [
	{
		id: 0,
		label: 'Sheet',
		href: '/sheet',
		icon: 'mdi:google-spreadsheet'
	},
	{
		id: 1,
		label: 'Trackers',
		href: 'trackers',
		icon: 'mdi:chart-line'
	},
	{
		id: 2,
		label: 'Battle',
		href: 'battle',
		icon: 'mdi:sword'
	}
];
