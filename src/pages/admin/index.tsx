import * as React from 'react';
import App from '../../components/App/App';
import { HeadFC, navigate } from 'gatsby';
import { Heading, Paragraph } from '../../utils';
import { Box, Button, Link, useTheme } from '@mui/material';
import { getUserName } from '../../utils/api';

const Admin = () => {
	const theme = useTheme();
	const [userName, setUserName] = React.useState<string | null>('Administrator');

	const fetchUser = async () => {
		setUserName(await getUserName())
	}

	React.useEffect(() => {
		fetchUser();
	}, []);

	return (
		<App>
			<Heading variant='h1'>Welcome, {userName}</Heading>
			<Paragraph>
				Use this admin area to manage the announcements carousel on the
				homepage, or to upload and manage sermons.
			</Paragraph>
			<Box
				sx={{
					display: 'flex',
					flexDirection: {
						xs: 'column',
						md: 'row'
					},
					width: '100%',
					alignContent: 'space-around'
				}}
			>
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
			<Link href='/logout'>
					Log Out
			</Link>
		</App>
	);
};

export default Admin;
export const Head: HeadFC = () => <title>Admin</title>;
