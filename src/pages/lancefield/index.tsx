import * as React from 'react';
import App from '../../components/App/App';
import { Box, styled, Typography } from '@mui/material';
import ImageBox from '../../components/ImageBox';
import Banner from '../../images/ChristChurchLancefieldBanner.png';
import RevJohn from '../../images/RevJohn.png';
import ElizMac from '../../images/ElizMac.png';

const Heading = styled(Typography)(() => ({
	textAlign: 'left',
	width: '100%'
}));

const Paragraph = styled(Typography)(() => ({
	textAlign: 'left',
	width: '100%',
	marginBottom: '16px'
}));

interface IPortrait {
	src: any;
	desc: string;
}

const Portrait = ({ src, desc }: IPortrait) => {
	return (
		<Box
			display='flex'
			flexDirection={'column'}
			sx={{
				width: {
					xs: '60%',
					sm: '100px',
					md: '140px'
				},
				float: {
					xs: 'none',
					sm: 'right'
				},
				marginX: {
					xs: 'auto',
					sm: '16px'
				},
				marginY: '32px',
				boxShadow: '0 1px 2px 1px rgba(0, 0, 0, 0.19)'
			}}
		>
			<ImageBox
				src={src}
				backgroundColor={'whitesmoke'}
				animation='wave'
				variant='rectangular'
				alt={desc}
				aspectRatio='auto 2 / 3'
			/>
			<Typography
				variant='subtitle2'
				sx={{
					width: '100%',
					textAlign: 'left',
					backgroundColor: 'whitesmoke',
					padding: '8px',
					boxSizing: 'border-box',
					WebkitBoxSizing: 'border-box',
					MozBoxSizing: 'border-box'
				}}
			>
				{desc}
			</Typography>
		</Box>
	);
};

const AboutLancefield = () => {
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
			<Heading variant='h1'>Christ Church Lancefield</Heading>
			<Paragraph variant='body1'>
				Christ Church Lancefield was built in 1870 on Wurundjeri Land. Located
				at 33 Chauncey St Lancefield.
			</Paragraph>
			<Box
				sx={{
					width: '100%',
					display: {
						xs: 'flex',
						sm: 'block'
					},
					flexDirection: 'column',
					justifyContent: 'space-around'
				}}
			>
				<Portrait src={RevJohn} desc='Rev John Christian MacCullagh' />
				<Heading variant='h2'>Answering the Call</Heading>
				<Paragraph variant='body1'>
					In the early days of settlement in the inland districts of Victoria,
					the pioneers became accustomed to privation and loneliness and being
					cut off from active Church membership was a significant factor. The
					"Church of England" (Anglican Church), faced with a shortage of
					clergy, welcomed the offer of a young John Christian MacCullagh to go
					to the district of Lancefield.
				</Paragraph>
				<Paragraph variant='body1'>
					In January 1863 he was commissioned as a lay reader, and built the
					Anglicans up into fellowship, when it was "nearly all wild and lonely
					bush". In 1864 he went away to train for the Priesthood. In 1865 he
					married his Irish sweetheart Elizabeth Ince and was ordained priest
					27th May 1866 by Bishop Perry, the first Bishop of Melbourne, in St
					James old Cathedral Melbourne and was sent back to Lancefield with his
					newly wedded wife Elizabeth.
				</Paragraph>
			</Box>
			<Heading variant='h2'>The Building of the Church</Heading>
			<Paragraph variant='body1'>
				In 1866 a public meeting was called for the purpose of raising funds
				towards the building of a church. The committee consisted of T. Darby,
				C.Musty, G Abbott and R. Onions. The Church was designed by Leonard
				Terry, the diocesan architect (Later Terry & Oakden).
			</Paragraph>
			<Paragraph variant='body1'>
				It’s a steeply gabled design in the Early English Gothic revival style,
				with a gabled bell tower; the porch and sanctuary were later additions.
				By the end of 1869 he called for tenders to quarry bluestone and
				building the brick walls.
			</Paragraph>
			<Paragraph variant='body1'>
				The Church was completed in 1870. The original building was probably
				exposed brick and later was rendered to combat a damp problem.
			</Paragraph>

			<Box
				sx={{
					width: '100%',
					display: {
						xs: 'flex',
						sm: 'block'
					},
					flexDirection: 'column',
					justifyContent: 'space-around'
				}}
			>
				<Portrait src={ElizMac} desc='Elizabeth MacCullagh' />
				<Heading variant='h2'>Tragedy Strikes</Heading>
				<Paragraph variant='body1'>
					The Parish was large and covered a region from Bolinda to Cobaw and
					the Young Rev MacCullagh enjoyed strong support from his wife
					Elizabeth in their ministry. She is remembered for her unselfish
					devotion to the care and welfare of others. Once when hearing that a
					young boy had been lost in the bush near hesket, Elizabeth set out in
					appalling weather to bring comfort to the boys mother. She caught a
					"Chill" and died on 22nd October 1870 aged 27 years old.
				</Paragraph>
				<Paragraph variant='body1'>
					The first service held in newly built Christ Church Lancefield was
					Elizabeths funeral. Rev John MacCullagh was devastated and collapsed
					after the funeral falling dangerously ill. When he recovered, he
					requested a transfer and began a long and fruitful ministry at St
					Paul's Bendigo and later as Dean of Bendigo. However, every year he
					returned to Lancefield on the anniversary of the church he built, and
					he preached a sermon in the morning and spent the afternoon at
					Elizabeth's Grave. Dean MacCullagh died in 1917 and they now lie
					together in Lancefield Cemetery.
				</Paragraph>
			</Box>
		</App>
	);
};

export default AboutLancefield;
