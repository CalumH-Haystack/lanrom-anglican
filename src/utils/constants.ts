import { INavBarItem } from '../components/NavBar';

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
