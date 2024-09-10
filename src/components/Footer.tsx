import * as React from 'react';
import Box from '@mui/material/Box';
import {
	Link,
	styled,
	Typography,
	useMediaQuery,
	useTheme
} from '@mui/material';
import Facebook from '@mui/icons-material/facebook';

const FooterText = styled(Typography)(({ theme }) => ({
	margin: useMediaQuery(theme.breakpoints.up('md'))
		? '0px 16px'
		: '2px 16px 2px',
	textAlign: useMediaQuery(theme.breakpoints.up('sm')) ? 'center' : 'start',
}));

export default function Footer() {
	const theme = useTheme();
	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: useMediaQuery(theme.breakpoints.up('md'))
					? 'row'
					: 'column',
				position: 'absolute',
				bottom: 0,
				justifyContent: 'center',
				alignItems: 'center',
				paddingHorizontal: '16px',
				paddingY: '2px',
				backgroundColor: '#303030',
				width: '100%'
			}}
		>
			<Link href='https://www.facebook.com/LancefieldRomseyAnglican' target='_blank'><Facebook sx={{ color: 'white', display: 'flex' }} /></Link>
			<FooterText variant='subtitle1'>
				© 2024 Romsey Lancefield Anglican
			</FooterText>
		</Box>
	);
}
