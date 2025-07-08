import * as React from 'react';
import App from '../../components/App/App';
import { HeadFC, navigate } from 'gatsby';
import { Heading, Paragraph } from '../../utils';
import { Button, useTheme } from '@mui/material';

const Unauthorised = () => {
	const theme = useTheme();

	return (
		<App>
			<Heading variant='h1'>Error: Unauthorised</Heading>
			<Paragraph>
				You are not authorised to view this page. if you think this is an error,
				please contact the site administrator.
			</Paragraph>
			<Button
				variant='contained'
				sx={{
					padding: '4px 48px',
					margin: '16px auto',
					backgroundColor: theme.palette.grey[900]
				}}
				onClick={() => navigate('/')}
			>Take me home</Button>
		</App>
	);
};

export default Unauthorised;
export const Head: HeadFC = () => <title>Admin</title>;
