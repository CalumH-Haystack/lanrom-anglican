import * as React from 'react';
import { Typography } from '@mui/material';
import App from '../../components/App/App';
import { HeadFC } from 'gatsby';

const Sermons = () => {
	return (
		<App>
			<Typography variant='h1' >Sermons</Typography>
		</App>
	);
};

export default Sermons;
export const Head: HeadFC = () => (
	<title>Sermon Archive</title>
);
