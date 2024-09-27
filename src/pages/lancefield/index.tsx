import * as React from 'react';
import App from '../../components/App/App';
import { Box, styled, Typography } from '@mui/material';
import { BOX_SHADOW } from '../../theme/palette';
import { StaticImage } from 'gatsby-plugin-image';

const Heading = styled(Typography)(() => ({
	textAlign: 'left',
	width: '100%'
}));

const Paragraph = styled(Typography)(() => ({
	textAlign: 'left',
	width: '100%',
	marginBottom: '16px'
}));

interface IPortraitContainer {
	children?: React.ReactNode;
	desc: string;
}

const PortraitContainer = ({ children, desc }: IPortraitContainer) => {
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
				boxShadow: BOX_SHADOW
			}}
		>
			{children}
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
			<Box
				sx={{
					boxShadow: BOX_SHADOW,
					marginBottom: '16px',
					width: '100%'
				}}
			>
				<StaticImage
					src='../../images/ChristChurchLancefieldBanner.png'
					alt='Aerial view of Christ Church Lancefield'
					placeholder='blurred'
					layout='constrained'
					aspectRatio={3}
				/>
			</Box>
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
				<PortraitContainer desc='Rev John Christian MacCullagh'>
					<StaticImage
						src='../../images/RevJohn.png'
						alt='Rev John Christian MacCullagh'
						placeholder='blurred'
						layout='constrained'
						aspectRatio={2 / 3}
					/>
				</PortraitContainer>
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
				<PortraitContainer desc='Elizabeth MacCullagh'>
					<StaticImage
						src='../../images/ElizMac.png'
						alt='Elizabeth MacCullagh'
						placeholder='blurred'
						layout='constrained'
						aspectRatio={2 / 3}
					/>
				</PortraitContainer>
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
