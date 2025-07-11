import * as React from 'react';
import App from '../../../components/App/App';
import { HeadFC, navigate } from 'gatsby';
import { Heading, Paragraph } from '../../../utils';
import { Box, Button, useTheme } from '@mui/material';

const ManageSermons = () => {
	const theme = useTheme();

	return (
		<App>
			<Heading variant='h1'>Manage Sermons</Heading>
			<Paragraph>
				Use this area to upload and manage sermons.
			</Paragraph>
		</App>
	);
};

export default ManageSermons;
export const Head: HeadFC = () => <title>Admin</title>;
