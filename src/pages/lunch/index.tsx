import * as React from 'react';
import { Box } from '@mui/material';
import App from '../../components/App/App';
import { BOX_SHADOW } from '../../theme/palette';
import { HeadFC } from 'gatsby';
import { StaticImage } from 'gatsby-plugin-image';
import LunchForm from '../../components/Lunch/components';
import { Heading, Paragraph } from '../../utils';

const Lunch = () => {
	return (
		<App>
			<Heading variant='h1'>Parish Meal</Heading>
			<Paragraph variant='body1'>
				All are welcome at our parish meal which is held on the 5th Sunday
				of the month in the Anglican church hall. We would love to provide a
				place for people new and old to come together, share a meal and maybe
				make new connections. RSVP below and we'll keep you in the loop about
				the next one.
			</Paragraph>
			<Paragraph variant='body1' paddingBottom='32px'>
				For catering purposes we would love to know if you are coming in advance
				(if possible).
			</Paragraph>
			<LunchForm />
		</App>
	);
};

export default Lunch;
export const Head: HeadFC = () => <title>Parish Meal</title>;
