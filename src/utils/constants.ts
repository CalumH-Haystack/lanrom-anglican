import { INavBarItem } from '../components/Navigation/NavBar';

export const NAVBAR_ITEMS: INavBarItem[] = [
	{
		name: 'Home',
		path: '/'
	},
	{
		name: 'About',
		path: '/lancefield',
		subMenu: [
			{
				name: 'Christ Church Lancefield',
				path: '/lancefield'
			},
			{
				name: 'St Paul’s Romsey',
				path: '/romsey'
			}
		]
	},
	{
		name: 'Outreach',
		path: '/events',
		subMenu: [
			{
				name: 'Events',
				path: '/events'
			},
			{
				name: 'Community Lunch',
				path: '/lunch'
			},
			{
				name: 'Op-Shop',
				path: '/opshop'
			}
		]
	},
	{
		name: 'Sermons',
		path: '/sermons'
	},
	{
		name: 'Contact',
		path: '/contact'
	}
];

export const LAT_LONG = {
	LANCEFIELD: { lat: -37.27936346552246, lng: 144.73131394633327 },
	ROMSEY: { lat: -37.35181257872831, lng: 144.74268495122752 }
};
