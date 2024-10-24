import * as React from 'react';
import { Box, Container, useTheme } from '@mui/material';
import NavBar from './Navigation/NavBar';
import { NAVBAR_ITEMS } from '../utils/constants';
import Footer from './Footer';
import { MobileNavBar } from './Navigation/MobileNavBar';
import { NavDrawer } from './Navigation/NavDrawer';
import { PageContainer } from './PageContainer';


interface IPageProps {
	children?: React.ReactNode;
}

export default function Page({ children }: IPageProps) {
	const theme = useTheme();

	const [drawerOpen, setDrawerOpen] = React.useState(false);

	return (
		<Container
			disableGutters
			sx={{
				minWidth: '100vw',
				backdropFilter: 'blur(6px)'
			}}
		>
			<Box
				sx={{
					my: 4,
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'start',
					alignItems: 'center',
					position: 'relative',
					paddingHorizontal: {
						xs: '8px',
						sm: '16px'
					},
					margin: {
						xs: '0 auto',
						sm: '0 auto'
					},
					backgroundColor: '#fdfdfd',
					minHeight: '100vh',
					boxShadow: '0 0 2px 2px rgba(0, 0, 0, 0.08)',
					maxWidth: {
						xs: '100%',
						sm: '500px',
						md: '800px',
						lg: '1000px'
					}
				}}
			>
				<MobileNavBar setOpenDrawer={setDrawerOpen} />
				<NavDrawer
					isOpen={drawerOpen}
					setIsOpen={setDrawerOpen}
					navItems={NAVBAR_ITEMS}
				/>
				<NavBar items={NAVBAR_ITEMS} />
				<PageContainer>
					{children}
				</PageContainer>
				<Footer />
			</Box>
		</Container>
	);
}
