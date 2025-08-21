import * as React from 'react';
import { Box, Typography } from '@mui/material';
import App from '../../components/App/App';
import { HeadFC } from 'gatsby';
import { BOX_SHADOW } from '../../theme/palette';
import { StaticImage } from 'gatsby-plugin-image';
import { Heading, Paragraph } from '../../utils';
import { OpshopCarousel } from '../../components/Opshop/OpshopCarousel';

const OpShop = () => {
	return (
		<App>
			<Heading variant='h1'>St Paul's Op-Shop</Heading>
			<Paragraph>
				St Pauls Op-Shop is situated next to St Pauls church at 77 Main St,
				Romsey.
			</Paragraph>
			<Heading variant='h2'>Op-Shop Opening Hours</Heading>
			<Paragraph sx={{ marginBottom: 0 }}>Friday: 12.30-4.30pm</Paragraph>
			<Paragraph>Saturday 10am-1pm (closed during January)</Paragraph>
			<Heading variant='h2'>Item Policy</Heading>
			<Paragraph sx={{ marginBottom: 0 }}>
				We are not authorized to deal in the following items, please do not
				leave any:
			</Paragraph>
			<ul
				style={{
					width: '100%',
					textAlign: 'start',
					marginBottom: '32px',
					marginTop: '0'
				}}
			>
				<li>
					<Typography>MATTRESSES</Typography>
				</li>
				<li>
					<Typography>PRAMS</Typography>
				</li>
				<li>
					<Typography>PUSHERS</Typography>
				</li>
				<li>
					<Typography>COTS</Typography>
				</li>
				<li>
					<Typography>BABY CAPSULES</Typography>
				</li>
				<li>
					<Typography>CAR SEATS/BOOSTER SEATS</Typography>
				</li>
				<li>
					<Typography>ELECTRICAL ITEMS OF ANY SORT</Typography>
				</li>
				<li>
					<Typography>COMPUTERS/LAPTOPS</Typography>
				</li>
				<li>
					<Typography>TV'S</Typography>
				</li>
				<li>
					<Typography>GAMING EQUIPMENT</Typography>
				</li>
				<li>
					<Typography>SAFETY HEAD GEAR</Typography>
				</li>
				<li>
					<Typography>
						FURNITURE - we do not have the room to store or sell furniture of
						any size.
					</Typography>
				</li>
			</ul>
			<OpshopCarousel />
		</App>
	);
};

export default OpShop;
export const Head: HeadFC = () => <title>Op Shop</title>;
