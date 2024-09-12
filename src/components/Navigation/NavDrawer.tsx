import * as React from 'react';
import {
	Box,
	Divider,
	Drawer,
	List,
	ListItem,
	ListItemButton,
	ListItemText,
	SwipeableDrawer,
	Typography,
	useTheme
} from '@mui/material';
import { INavBarItem } from './NavBar';
import logo from '../../images/logo.png';
import { useNavigate } from 'react-router-dom';

interface INavDrawer {
	isOpen: boolean;
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
	navItems: INavBarItem[];
}

export const NavDrawer = ({ isOpen, setIsOpen, navItems }: INavDrawer) => {
	const theme = useTheme();
	const navigate = useNavigate();

	const container =
		window !== undefined ? () => window.document.body : undefined;

	const handleDrawerToggle = () => {
		setIsOpen(!isOpen);
	};

	const isCurrentPath = (item: INavBarItem) => {
		return (
			item.path == location.pathname ||
			item.subMenu?.map(item => item.path).includes(location.pathname)
		);
	};

	return (
		<nav>
			<SwipeableDrawer
				container={container}
				variant='temporary'
				open={isOpen}
				onOpen={handleDrawerToggle}
				onClose={handleDrawerToggle}
				ModalProps={{
					keepMounted: true // Better open performance on mobile.
				}}
				sx={{
					display: { xs: 'block', md: 'none' },
					'& .MuiDrawer-paper': { boxSizing: 'border-box', width: '250px' }
				}}
			>
				<Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
					<Box
						component='img'
						src={logo}
						sx={{
							padding: '32px',
							paddingBottom: '8px',
							width: '100%',
							boxSizing: 'border-box',
							WebkitBoxSizing: 'border-box',
							MozBoxSizing: 'border-box'
						}}
					/>
					<List>
						{navItems.map(item => (
							<>
								<ListItem
									key={item.path}
									disablePadding
									sx={{
										backgroundColor: isCurrentPath(item) ? '#68443022' : 'auto'
									}}
								>
									<ListItemButton
										sx={{ textAlign: 'center' }}
										onClick={() => navigate(item.path)}
									>
										<ListItemText
											primaryTypographyProps={{ variant: 'navDrawer' }}
											primary={item.name}
											sx={{
												textAlign: 'start'
											}}
										/>
									</ListItemButton>
								</ListItem>
								{item.subMenu?.map((subItem, index) => (
									<ListItem
										key={subItem.path}
										disablePadding
										sx={{
											marginBottom:
												item.subMenu && index === item.subMenu?.length - 1
													? '8px'
													: 'auto',
											backgroundColor: isCurrentPath(subItem)
												? '#68443011'
												: 'auto'
										}}
									>
										<ListItemButton
											sx={{ textAlign: 'center', padding: '4px' }}
											onClick={() => navigate(subItem.path)}
										>
											<ListItemText
												primaryTypographyProps={{ variant: 'navDrawerSub' }}
												primary={subItem.name}
												sx={{
													textAlign: 'start',
													paddingLeft: '32px'
												}}
											/>
										</ListItemButton>
									</ListItem>
								))}
							</>
						))}
					</List>
				</Box>
			</SwipeableDrawer>
		</nav>
	);
};