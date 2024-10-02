import * as React from 'react';
import { Typography } from '@mui/material';
import App from '../../components/App/App';
import { HeadFC } from 'gatsby';

const Lunch = () => {
	return (
		<App>
			<Typography variant='h1' >Lunch</Typography>
		</App>
	);
};

export default Lunch;
export const Head: HeadFC = () => (
	<title>Community Lunch</title>
);
