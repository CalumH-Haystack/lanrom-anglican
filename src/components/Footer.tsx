import * as React from 'react';
import Box from '@mui/material/Box';
import {
	Link,
	styled,
	Typography,
	useMediaQuery,
	useTheme
} from '@mui/material';
import Facebook from '@mui/icons-material';

const FooterText = styled(Typography)(({ theme }) => ({
	margin: useMediaQuery(theme.breakpoints.up('md')) ? '0px 16px' : '2px 0 2px',
	textAlign: useMediaQuery(theme.breakpoints.up('md')) ? 'center' : 'start',
	alignSelf: useMediaQuery(theme.breakpoints.up('md')) ? 'center' : 'auto'
}));

export default function Footer() {
	const theme = useTheme();
	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: {
					xs: 'column',
					md: 'row'
				},
				width: '100%',
				boxSizing: 'border-box',
				WebkitBoxSizing: 'border-box',
				MozBoxSizing: 'border-box',
				justifyContent: 'center',
				alignItems: {
					xs: 'start',
					lg: 'center',
				},
				paddingX: '16px',
				paddingY: {
					xs: '16px',
					md: '4px'
				},
				backgroundColor: '#303030'
			}}
		>
			<Link
				href='https://www.facebook.com/LancefieldRomseyAnglican'
				target='_blank'
			>
				<Facebook
					sx={{
						color: 'white',
						display: 'flex',
						fontSize: { xs: '2em', sm: '1em' },
					}}
				/>
			</Link>
			<FooterText variant='subtitle1'>
				© 2024 Romsey Lancefield Anglican
			</FooterText>
		</Box>
	);
}
