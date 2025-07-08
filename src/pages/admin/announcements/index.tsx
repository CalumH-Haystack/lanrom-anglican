import * as React from 'react';
import App from '../../../components/App/App';
import { HeadFC, navigate } from 'gatsby';
import { Heading, Paragraph } from '../../../utils';
import { Box, Button, useTheme } from '@mui/material';

const ManageAnnouncements = () => {
	const theme = useTheme();

	return (
		<App>
			<Heading variant='h1'>Manage Announcements</Heading>
			<Paragraph>
				Use this area to manage the announcements carousel on the homepage.
			</Paragraph>
		</App>
	);
};

export default ManageAnnouncements;
export const Head: HeadFC = () => <title>Admin</title>;
