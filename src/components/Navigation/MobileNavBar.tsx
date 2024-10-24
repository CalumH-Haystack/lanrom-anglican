import * as React from 'react';
import {
	AppBar,
	Box,
	IconButton,
	Toolbar,
	useScrollTrigger,
	useTheme
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { relative } from 'path';
import LancefieldRomseyIconWhite from '../../images/LancefieldRomseyIconWhite.png';
import { navigate } from 'gatsby';

interface IElevationScroll {
	/**
	 * Injected by the documentation to work in an iframe.
	 * You won't need it on your project.
	 */
	window?: () => Window;
	children?: React.ReactElement<any>;
}

function ElevationScroll(props: IElevationScroll) {
	const { children, window } = props;
	// Note that you normally won't need to set the window ref as useScrollTrigger
	// will default to window.
	// This is only being set here because the demo is in an iframe.
	const trigger = useScrollTrigger({
		disableHysteresis: true,
		threshold: 0,
		target: window ? window() : undefined
	});

	return children
		? React.cloneElement(children, {
				elevation: trigger ? 4 : 0
		  })
		: null;
}

interface IMobileNavBar {
	setOpenDrawer: React.Dispatch<React.SetStateAction<boolean>>;
}

export const MobileNavBar = ({ setOpenDrawer }: IMobileNavBar) => {
	const theme = useTheme();

	const handleMenuOnClick = () => {
		setOpenDrawer(true);
	};

	return (
		<ElevationScroll>
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
				position='sticky'
			>
				<Toolbar sx={{ position: 'relative', justifyContent: 'center' }}>
					<IconButton onClick={() => navigate('/')}>
						<Box
							component='img'
							src={LancefieldRomseyIconWhite}
							sx={{
								height: '1.7em'
							}}
						/>
					</IconButton>
					<IconButton
						color='inherit'
						aria-label='open drawer'
						edge='start'
						onClick={handleMenuOnClick}
						sx={{ mr: 2, position: 'absolute', left: '16px' }}
					>
						<MenuIcon sx={{ fontSize: { xs: '1.5em', sm: '1.2em' } }} />
					</IconButton>
				</Toolbar>
			</AppBar>
		</ElevationScroll>
	);
};
