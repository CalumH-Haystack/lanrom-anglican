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
import { useLocation, useNavigate } from 'react-router-dom';

interface IButton {
	name: string;
	path: string;
}

export interface INavBarItem extends IButton {
	subMenu?: IButton[];
}

export interface IDropMenu {
	options: IButton[];
}

interface INavBar {
	items: INavBarItem[];
}

const NavButton = styled(Button)<ButtonProps>(({ theme }) => ({
	color: 'black',
	borderRadius: '0',
	padding: '12px 40px',
	borderBottom: `1px solid ${theme.palette.primary.light}`,
	flex: '1',
	[theme.breakpoints.down('md')]: {
		display: 'none'
	},
	'&:hover': {
		backgroundColor: '#F5F5F5'
	}
}));

const DropMenu = ({ options }: IDropMenu) => {
	const location = useLocation();
	const navigate = useNavigate();

	return (
		<Paper
			className='DropMenu'
			sx={{
				borderRadius: 0
			}}
		>
			{options.map(option => (
				<>
					<MenuItem
						key={option.path}
						selected={location.pathname === option.path}
						onClick={() => navigate(option.path)}
					>
						<Typography variant='navBarMenu' style={{ whiteSpace: 'normal' }}>
							{option.name}
						</Typography>
					</MenuItem>
				</>
			))}
		</Paper>
	);
};

export default function NavBar({ items }: INavBar) {
	const theme = useTheme();
	const navigate = useNavigate();

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'row'
			}}
			component='nav'
		>
			{items.map(item => (
				<>
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
					>
						<NavButton
							className='NavButton'
							onClick={() => navigate(item.path)}
						>
							{item.name.toLocaleUpperCase()}
						</NavButton>
						{item.subMenu && <DropMenu options={item.subMenu} />}
					</Box>
				</>
			))}
		</Box>
	);
}
