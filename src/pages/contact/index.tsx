import * as React from 'react';
import { Typography } from '@mui/material';
import App from '../../components/App/App';
import { HeadFC } from 'gatsby';

const Contact = () => {
	return (
		<App>
			<Typography variant='h1' >Contact</Typography>
		</App>
	);
};

export default Contact;
export const Head: HeadFC = () => (
	<title>Contact Us</title>
);
