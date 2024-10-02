import * as React from 'react';
import { Typography } from '@mui/material';
import App from '../../components/App/App';
import { HeadFC } from 'gatsby';

const OpShop = () => {
	return (
		<App>
			<Typography variant='h1' >OpShop</Typography>
		</App>
	);
};

export default OpShop;
export const Head: HeadFC = () => (
	<title>Op Shop</title>
);
