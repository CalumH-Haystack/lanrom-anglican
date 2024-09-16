import Box from '@mui/material/Box';
import React from 'react';
import logo from '../images/logo.png';

const SplashScreen = ({ fade }: any) => {
	return (
		<Box
			sx={{
				width: '100%',
				height: '100vh',
				top: '0',
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				backgroundColor: 'white',
				position: 'fixed',
				zIndex: '99',
				animation: fade && 'ease',
				animationName: fade && 'fadeOut',
				animationDuration: fade && '0.5s'
			}}
		>
			<Box
				component='img'
				sx={{
					width: '80px',
					height: '80px',
					animation: 'ease-in-out infinite alternate',
					animationName: 'scale',
					animationDuration: '1s'
				}}
				alt='Anglican Parish of Lancefield with Romsey Logo'
				src={logo}
			/>
		</Box>
	);
};

export default SplashScreen;
