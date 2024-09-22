import * as React from 'react';
import { Typography } from '@mui/material';
import App from '../../components/App/App';
import Calendar from './components';

const Events = () => {
	return (
		<App>
			<Typography variant='h1' sx={{
				width: '100%',
				textAlign: 'left',
				marginBottom: '16px'
			}}>upcoming events</Typography>
			<Calendar />
		</App>
	);
};

export default Events;
