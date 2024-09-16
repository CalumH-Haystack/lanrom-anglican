import { Box, Typography, useTheme } from '@mui/material';
import ImageBox from '../../ImageBox';
import React from 'react';
import logo from '../../../images/logo.png';

export const LogoAndMission = () => {
	return (
		<Box
			sx={{
				width: '100%',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignContent: 'center',
				alignItems: 'center'
			}}
		>
			<Box
				sx={{
					display: 'flex',
					flexDirection: {
						xs: 'column',
						md: 'row'
					},
					justifyContent: 'center',
					alignContent: 'center',
					alignItems: 'center',
					marginBottom: '32px',
					paddingX: '32px'
				}}
			>
				<ImageBox
					src={logo}
					alt='Anglican Parish of Lancefield with Romsey'
					aspectRatio='234/265'
					sx={{
						flex: 2,
						margin: {
							xs: '0 0 32px 0',
							md: '0 32px 0 0'
						}
					}}
				/>
				<Typography
					variant='title'
					sx={{
						flex: 3,
						textAlign: {
							xs: 'center',
							md: 'left'
						}
					}}
				>
					Connecting With God In Our Community
				</Typography>
			</Box>
		</Box>
	);
};

export const JoinUs = () => {
  const theme = useTheme();

	return (
		<>
			<Typography
				variant='h1'
				sx={{
					width: '100%',
					textAlign: 'left',
					marginBottom: '4px'
				}}
			>
				Join Us
			</Typography>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'row',
					width: '100%',
					marginBottom: '4px'
				}}
			>
				<Typography variant='h2'>Christ Church Lancefield</Typography>
				<Box
					sx={{
						backgroundColor: theme.palette.primary.light,
						height: '2px',
						marginX: '8px',
						flex: 1,
						alignSelf: 'center'
					}}
				/>
				<Typography variant='h2'>Sunday 10.30am</Typography>
			</Box>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'row',
					width: '100%',
					marginBottom: '4px'
				}}
			>
				<Typography variant='h2'>St Paul’s Anglican Romsey</Typography>
				<Box
					sx={{
						backgroundColor: theme.palette.primary.light,
						height: '2px',
						marginX: '12px',
						flex: 1,
						alignSelf: 'center'
					}}
				/>
				<Typography variant='h2'>Sunday 9am</Typography>
			</Box>
		</>
	);
};
