import * as React from 'react';
import App from '../../components/App/App';
import { HeadFC, navigate } from 'gatsby';
import { Heading, Paragraph } from '../../utils';
import { Box, Button, useTheme } from '@mui/material';

const Admin = () => {
	const theme = useTheme();
	const [userName, setUserName] = React.useState('Administrator');

	async function getUserInfo() {
		const response = await fetch('/.auth/me');
		const payload = await response.json();
		const { clientPrincipal } = payload;
		if (clientPrincipal && clientPrincipal.userDetails) {
			setUserName(clientPrincipal.userDetails);
		}
	}

	React.useEffect(() => {
		getUserInfo();
	}, []);

	return (
		<App>
			<Heading variant='h1'>Welcome, {userName}</Heading>
			<Paragraph>
				Use this admin area to manage the announcements carousel on the homepage, or
				to upload and manage sermons.
			</Paragraph>
			<Box sx={{
				display: 'flex',
				flexDirection: {
					xs: 'column',
					md: 'row'
				},
				width: '100%',
				alignContent: 'space-around'
			}}>
				<Button
					variant='contained'
					sx={{
						padding: '4px 24px',
						margin: '16px auto',
						backgroundColor: theme.palette.grey[900]
					}}
					onClick={() => navigate('/admin/announcements')}
				>
					Manage Announcements
				</Button>

				<Button
					variant='contained'
					sx={{
						padding: '4px 24px',
						margin: '16px auto',
						backgroundColor: theme.palette.grey[900]
					}}
					onClick={() => navigate('/admin/sermons')}
				>
					Manage Sermons
				</Button>
			</Box>
		</App>
	);
};

export default Admin;
export const Head: HeadFC = () => <title>Admin</title>;
