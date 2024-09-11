import * as React from 'react';
import { AppBar, Box, IconButton, Toolbar, useTheme } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { relative } from 'path';
import LancefieldRomseyIconWhite from '../../images/LancefieldRomseyIconWhite.png';
import { useNavigate } from 'react-router-dom';

export const MobileNavBar = () => {
	const theme = useTheme();
	const navigate = useNavigate();

	return (
		<AppBar
			component='nav'
			sx={{
				backgroundColor: '#303030',
				[theme.breakpoints.up('md')]: {
					display: 'none'
				},
				[theme.breakpoints.up('sm')]: {
					position: 'absolute'
				}
			}}
		>
			<Toolbar sx={{ position: 'relative', justifyContent: 'center' }}>
				<Box
					component='img'
					src={LancefieldRomseyIconWhite}
					sx={{
						height: '2em'
					}}
					onClick={() => navigate('/')}
				/>
				<IconButton
					color='inherit'
					aria-label='open drawer'
					edge='start'
					onClick={() => {}}
					sx={{ mr: 2, position: 'absolute', left: '16px' }}
				>
					<MenuIcon sx={{ fontSize: { xs: '1.5em', sm: '1.2em' } }} />
				</IconButton>
			</Toolbar>
		</AppBar>
	);
};
