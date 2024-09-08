import * as React from 'react';
import Box from '@mui/material/Box';
import { Button, ButtonProps, styled, useTheme } from '@mui/material';

const NavButton = styled(Button)<ButtonProps>(({ theme }) => ({
	color: 'black',
	borderRadius: '0',
	padding: '12px 40px',
	borderBottom: `1px solid ${theme.palette.primary.light}`,
  flex: '1',
  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
	'&:hover': {
		backgroundColor: '#F5F5F5'
		// borderBottom: `2px solid ${theme.palette.primary.main}`,
	}
}));

export default function NavBar() {
	const theme = useTheme();
	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'row'
			}}
		>
			<NavButton>HOME</NavButton>
			<NavButton>ABOUT</NavButton>
			<NavButton>OUTREACH</NavButton>
			<NavButton>SERMONS</NavButton>
			<NavButton>CONTACT</NavButton>
		</Box>
	);
}
