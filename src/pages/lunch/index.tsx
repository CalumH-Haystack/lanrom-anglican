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
			<Box
				sx={{
					boxShadow: BOX_SHADOW,
					marginBottom: '32px',
					width: '100%'
				}}
			>
				<StaticImage
					src='../../images/communityLunch.png'
					alt='Anglican Parish of Lancefield with Romsey'
					placeholder='blurred'
					layout='constrained'
				/>
			</Box>
			<Heading variant='h1'>Community Lunch</Heading>
			<Paragraph variant='body1'>
				All our welcome at our community lunch which will be held on the 2nd
				Saturday of the month in the Anglican church hall. We would love to
				provide a place for people new and old to come together, share a meal
				and maybe make new connections. So please join us for a warming winter
				lunch or a summer spread and a lot of chatting.
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
export const Head: HeadFC = () => <title>Community Lunch</title>;
