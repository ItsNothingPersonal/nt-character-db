export const menuDataClassic: {
	id: number;
	label: string;
	icon: string;
	href?: string;
	subData?: { href: string; label: string }[];
}[] = [
	{
		id: 0,
		label: 'Sheet',
		href: '/classic/sheet/[id]',
		icon: 'mdi:google-spreadsheet'
	},
	{
		id: 1,
		label: 'Trackers',
		href: '/classic/sheet/[id]/trackers',
		icon: 'mdi:chart-line'
	},
	{
		id: 2,
		label: 'Battle',
		href: '/classic/sheet/[id]/battle',
		icon: 'mdi:sword'
	}
];

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
	}
];
