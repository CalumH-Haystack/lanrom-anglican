import * as React from 'react';
import App from '../../components/App/App';
import { Box } from '@mui/material';
import { BOX_SHADOW } from '../../theme/palette';
import { StaticImage } from 'gatsby-plugin-image';
import { HeadFC } from 'gatsby';
import { Heading, Paragraph } from '../../utils';

const AboutRomsey = () => {
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
					src='../../images/RomseyChurchBanner.png'
					alt="Front view of St Paul's Romsey"
					placeholder='blurred'
					layout='constrained'
					aspectRatio={3}
				/>
			</Box>
			<Heading variant='h1' sx={{ marginBottom: '16px' }}>
				St Paul’s Romsey
			</Heading>
			<Heading variant='h2'>History</Heading>
			<Paragraph variant='body1'>
				St Paul’s Romsey was originally part of the parish of Lancefield, of
				which the first Incumbent was Rev.J.C MacCullagh, who was afterwards
				Archdeacon and later Dean of Bendigo. The Romsey church was built in
				1871, with the foundation stone being laid on 20th December 1870 by the
				Very Rev Hussey Burgh Macaratney D.D.; Dean of Melbourne from 1850 until
				his death in 1894 at the age of 95 years. Unfortunately the exact stone
				involved cannot be identified and it can only be presumed that an
				unmarked stone was laid. While the church was being built services were
				held in the Romsey Presbyterian Church by the kind permissions of
				Rev.W.A. Lind.
			</Paragraph>
			<Paragraph variant='body1'>
				The first service to be held in the new church took place on Sunday 26th
				November, 1871; the preacher being the first incumbent Rev.H.F.Scott.
				The first wedding, that of Mr & Mrs Cryer (Mr Cryer was licensee of the
				Duck Holes hotel) was celebrated on November 5th 1872.
			</Paragraph>
			<Paragraph variant='body1'>
				For more historical details, a brief history can be purchased from the
				church for $2.
			</Paragraph>
		</App>
	);
};

export default AboutRomsey;
export const Head: HeadFC = () => (
	<title>About St Paul's Romsey</title>
);
