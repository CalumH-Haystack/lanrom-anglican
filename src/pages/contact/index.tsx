import * as React from 'react';
import App from '../../components/App/App';
import { HeadFC } from 'gatsby';
import { ContactForm } from '../../components/Contact/components';
import { Heading, Paragraph } from '../../utils';

const Contact = () => {
	return (
		<App>
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
