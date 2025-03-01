export const menuDataLotN: {
	id: number;
	label: string;
	icon: string;
	href?: string;
	subData?: { href: string; label: string }[];
}[] = [
	{
		id: 0,
		label: 'Sheet',
		href: '/lotn/sheet/[id]',
		icon: 'mdi:google-spreadsheet'
	},
	{
		id: 1,
		label: 'Trackers',
		href: '/lotn/sheet/[id]/trackers',
		icon: 'mdi:chart-line'
	},
	{
		id: 2,
		label: 'Battle',
		href: '/lotn/sheet/[id]/battle',
		icon: 'mdi:sword'
	},
	{
		id: 3,
		label: 'Experience',
		href: '/lotn/sheet/[id]/exp-list',
		icon: 'arcticons:stockswidget'
	}
];
