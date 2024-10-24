import * as React from 'react';
import Box from '@mui/material/Box';
import {
	Button,
	ButtonProps,
	Divider,
	Menu,
	MenuItem,
	Paper,
	styled,
	Typography,
	useTheme
} from '@mui/material';
import { navigate } from 'gatsby';
import { useLocation } from '@reach/router';

interface IButton {
	name: string;
	path: string;
}

export interface INavBarItem extends IButton {
	subMenu?: IButton[];
}

export interface IDropMenu {
	options: IButton[];
	pathName: string;
}

interface INavBar {
	items: INavBarItem[];
}

const NavButton = styled(Button)<ButtonProps>(({ theme }) => ({
	color: 'black',
	borderRadius: '0',
	padding: '12px 32px',
	borderBottom: `1px solid ${theme.palette.primary.light}`,
	flex: '1',
	'&:hover': {
		backgroundColor: '#F5F5F5'
	}
}));

const DropMenu: React.FC<IDropMenu> = ({ options, pathName }: IDropMenu) => {
	return (
		<Paper
			className='DropMenu'
			sx={{
				borderRadius: 0
			}}
		>
			{options.map(option => (
				<Box key={option.path}>
					<MenuItem
						key={option.path}
						selected={pathName === option.path}
						onClick={() => navigate(option.path)}
					>
						<Typography variant='navBarMenu' style={{ whiteSpace: 'normal' }}>
							{option.name}
						</Typography>
					</MenuItem>
				</Box>
			))}
		</Paper>
	);
};

export default function NavBar({ items }: INavBar) {
	const theme = useTheme();
  const location = useLocation();
	const pathName = location.pathname;

	const isCurrentPath = (item: INavBarItem) => {
		return (
			item.path == pathName ||
			item.subMenu?.map(item => item.path).includes(pathName)
		);
	};

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'row',
				[theme.breakpoints.down('md')]: {
					display: 'none'
				}
			}}
			component='nav'
		>
			{items.map(item => (
				<Box
					sx={{
						position: 'relative',
						'& .DropMenu': {
							display: 'none',
							position: 'absolute',
							top: '50px',
							zIndex: '1',
							flex: 1
						},
						'&:hover .DropMenu': {
							display: 'block'
						}
					}}
					key={item.path}
				>
					<NavButton
						className='NavButton'
						onClick={() => navigate(item.path)}
						sx={{
							borderBottom: isCurrentPath(item)
								? `2px solid ${theme.palette.primary.dark}`
								: 'auto',
							height: 'calc(100% - 2px)'
						}}
					>
						{item.name}
					</NavButton>
					{item.subMenu && <DropMenu options={item.subMenu} pathName={pathName} />}
				</Box>
			))}
		</Box>
	);
}
