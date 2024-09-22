import * as React from 'react';
import App from '../../components/App/App';
import { styled, Typography } from '@mui/material';
import ImageBox from '../../components/ImageBox';
import Banner from '../../images/RomseyChurchBanner.png';

const Heading = styled(Typography)(() => ({
	textAlign: 'left',
	width: '100%'
}));

const Paragraph = styled(Typography)(() => ({
	textAlign: 'left',
	width: '100%',
	marginBottom: '16px'
}));

const AboutRomsey = () => {
	return (
		<App>
			<ImageBox
				src={Banner}
				alt={'Aerial view of Christ Church Lancefield'}
				sx={{
					boxShadow: '1px 1px 2px 1px rgba(0, 0, 0, 0.2)',
					marginBottom: '16px',
					width: '100%'
				}}
				aspectRatio='auto 300/100'
			/>
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
