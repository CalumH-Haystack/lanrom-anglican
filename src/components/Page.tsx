import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { Routes, Route } from 'react-router-dom';
import { useMediaQuery, useTheme } from '@mui/material';
import NavBar from './NavBar';

export default function Page() {
	const theme = useTheme();
	return (
		<Container
			disableGutters
			sx={{
				minWidth: '100vw',
				backdropFilter: 'blur(4px)'
			}}
		>
			<Box
				sx={{
					my: 4,
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'center',
					paddingHorizontal: {
						xs: '8px',
						sm: '16px'
					},
					margin: {
						xs: '0 16px',
						sm: '0 auto'
					},
					backgroundColor: 'white',
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
				<NavBar />
				<Routes></Routes>
			</Box>
		</Container>
	);
}
