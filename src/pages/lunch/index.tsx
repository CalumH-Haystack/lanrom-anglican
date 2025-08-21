import * as React from 'react';
import { Box, Link } from '@mui/material';
import App from '../../components/App/App';
import { BOX_SHADOW } from '../../theme/palette';
import { HeadFC } from 'gatsby';
import { StaticImage } from 'gatsby-plugin-image';
import { Heading, Paragraph } from '../../utils';

const Lunch = () => {
	return (
		<App>
			<Box
				sx={{
					boxShadow: BOX_SHADOW,
					marginBottom: '16px',
					width: '100%'
				}}
			>
				<StaticImage
					src='../../images/parishMeal.jpg'
					alt='Aerial view of Christ Church Lancefield'
					placeholder='blurred'
					layout='constrained'
					aspectRatio={3}
				/>
			</Box>
			<Heading variant='h1'>Parish Meal</Heading>
			<Paragraph variant='body1'>
				All are welcome at our parish meal which is held on the 5th Sunday of
				the month in the Anglican church hall. We would love to provide a place
				for people new and old to come together, share a meal and maybe make new
				connections. 
			</Paragraph>
			<Paragraph variant='body1'>
				<Link href={"/contact"}>Contact us</Link> to find out more.
			</Paragraph>
		</App>
	);
};

export default Lunch;
export const Head: HeadFC = () => <title>Parish Meal</title>;
