import * as React from 'react';
import Box from '@mui/material/Box';
import {
	Link,
	styled,
	Typography,
	useMediaQuery,
	useTheme
} from '@mui/material';
import { Facebook, Instagram } from '@mui/icons-material';
import { StaticImage } from 'gatsby-plugin-image';
import { getUserName } from '../utils/api';

const FooterText = styled(Typography)(({ theme }) => ({
	margin: useMediaQuery(theme.breakpoints.up('md')) ? '0px 24px' : '2px 0 2px',
	textAlign: useMediaQuery(theme.breakpoints.up('md')) ? 'center' : 'start',
	alignSelf: useMediaQuery(theme.breakpoints.up('md')) ? 'center' : 'auto'
}));

export default function Footer() {
	const [userName, setUserName] = React.useState<string | null>(null);

	const fetchUser = async () => {
		setUserName(await getUserName());
	};

	React.useEffect(() => {
		fetchUser();
	}, []);

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
					lg: 'center'
				},
				paddingX: '16px',
				paddingY: {
					xs: '16px',
					md: '4px'
				},
				backgroundColor: '#303030'
			}}
		>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'row'
				}}
			>
				<Link
					href='https://www.facebook.com/LancefieldRomseyAnglican'
					target='_blank'
					marginRight='8px'
				>
					<Facebook
						sx={{
							color: 'white',
							display: 'flex',
							fontSize: { xs: '2em', sm: '1em' }
						}}
					/>
				</Link>
				<Link
					href='https://www.instagram.com/lancefield_romsey_anglican'
					target='_blank'
				>
					<Instagram
						sx={{
							color: 'white',
							display: 'flex',
							fontSize: { xs: '2em', sm: '1em' }
						}}
					/>
				</Link>
			</Box>
			<Link
				href='/Privacy-policy-lanrom.pdf'
				target='_blank'
				sx={{
					textDecoration: 'none'
				}}
			>
				<FooterText
					variant='subtitle1'
					sx={{
						textDecoration: 'none',
						textDecorationColor: 'white',
						'&:hover, &:active': {
							textDecoration: 'underline'
						}
					}}
				>
					Privacy Policy
				</FooterText>
			</Link>
			{userName !== null && (
				<Link
					href='/logout'
					sx={{
						textDecoration: 'none'
					}}
				>
					<FooterText
						variant='subtitle1'
						sx={{
							textDecoration: 'none',
							textDecorationColor: 'white',
							'&:hover, &:active': {
								textDecoration: 'underline'
							},
							marginLeft: '0px'
						}}
					>
						Logout
					</FooterText>
				</Link>
			)}
			<FooterText
				variant='subtitle1'
				sx={{
					margin: 0
				}}
			>
				© 2025 Romsey Lancefield Anglican
			</FooterText>
			<Link
				href='https://www.haystackdev.au/'
				target='_blank'
				sx={{
					margin: useMediaQuery(theme.breakpoints.up('md'))
						? '0px 24px'
						: '4px 0'
				}}
			>
				{useMediaQuery(theme.breakpoints.up('md')) ? (
					<StaticImage
						src='../images/madeByHaystackWhite.png'
						alt='Made by Haystack'
						placeholder='blurred'
						height={24}
						style={{
							display: 'flex'
						}}
					/>
				) : (
					<StaticImage
						src='../images/madeByHaystackWhite.png'
						alt='Made by Haystack'
						placeholder='blurred'
						height={40}
						style={{
							display: 'flex'
						}}
					/>
				)}
			</Link>
		</Box>
	);
}
