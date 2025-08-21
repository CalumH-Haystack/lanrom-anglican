import * as React from 'react';
import App from '../../components/App/App';
import { HeadFC } from 'gatsby';
import { ContactForm } from '../../components/Contact/components';
import { Heading, Paragraph } from '../../utils';
import { Box } from '@mui/material';
import { StaticImage } from 'gatsby-plugin-image';
import { BOX_SHADOW } from '../../theme/palette';

const Contact = () => {
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
					src='../../images/socialsBanner.jpg'
					alt='Aerial view of Christ Church Lancefield'
					placeholder='blurred'
					layout='constrained'
				/>
			</Box>
			<Heading variant='h1'>Contact Us</Heading>
			<Heading variant='h2'>St Pauls Romsey</Heading>
			<Paragraph>77 Main St, Romsey, VIC</Paragraph>
			<Heading variant='h2'>Christ Church Lancefield</Heading>
			<Paragraph sx={{ marginBottom: '48px' }}>33 Chauncey St, Lancefield, VIC</Paragraph>
			<ContactForm />
		</App>
	);
};

export default Contact;
export const Head: HeadFC = () => <title>Contact Us</title>;
