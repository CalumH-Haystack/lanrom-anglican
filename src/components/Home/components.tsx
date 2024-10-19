import {
	Box,
	BoxProps,
	Typography,
	useMediaQuery,
	useTheme
} from '@mui/material';
import React, { useState } from 'react';
import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';
import { LAT_LONG } from '../../utils/constants';
import { BOX_SHADOW } from '../../theme/palette';
import { StaticImage } from 'gatsby-plugin-image';

export const LogoAndMission = () => {
	return (
		<Box
			sx={{
				width: '100%',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignContent: 'center',
				alignItems: 'center'
			}}
		>
			<Box
				sx={{
					display: 'flex',
					flexDirection: {
						xs: 'column',
						md: 'row'
					},
					justifyContent: 'center',
					alignContent: 'center',
					alignItems: 'center',
					marginBottom: '32px',
					paddingX: '32px'
				}}
			>
				<Box
					sx={{
						flex: 2,
						margin: {
							xs: '0 0 32px 0',
							md: '0 32px 0 0'
						}
					}}
				>
					<StaticImage
						src='../../images/logo.png'
						alt="Anglican Parish of Lancefield with Romsey"
						placeholder='blurred'
						layout='constrained'
					/>
				</Box>
				<Typography
					variant='title'
					sx={{
						flex: 3,
						textAlign: {
							xs: 'center',
							md: 'left'
						}
					}}
				>
					Connecting With God In Our Community
				</Typography>
			</Box>
		</Box>
	);
};

interface IMapBox extends BoxProps {
	center: google.maps.LatLngLiteral;
	visibleZoom?: number;
	label?: string;
}

const MapBox = ({
	center,
	visibleZoom = 15,
	label = '',
	...props
}: IMapBox) => {
	const [zoom, setZoom] = useState(visibleZoom);

	const markerLabel: google.maps.MarkerLabel = {
		text: label,
		color: 'white'
	};

	const theme = useTheme();
	const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));
	return (
		<Box {...props} boxShadow={BOX_SHADOW}>
			<Map
				style={{
					width: props.width ? 'inherit' : isLargeScreen ? '350px' : '270px',
					height: isLargeScreen ? '230px' : '180px',
					color: 'white'
				}}
				defaultCenter={center}
				defaultZoom={zoom}
				onZoomChanged={e => setZoom(e.map.getZoom() ?? zoom)}
				gestureHandling={'cooperative'}
				disableDefaultUI={true}
				minZoom={10}
			>
				<Marker
					position={center}
					label={markerLabel}
					visible={zoom <= visibleZoom}
				/>
			</Map>
		</Box>
	);
};

export const JoinUs = () => {
	const theme = useTheme();
	const isMobileView = useMediaQuery(theme.breakpoints.down('md'));

	const googleMapsApiKey = process.env.GATSBY_GOOGLE_MAPS_API_KEY ?? '';
	const LanMap = () => (
		<MapBox
			center={LAT_LONG.LANCEFIELD}
			label='C'
			width={isMobileView ? '100%' : undefined}
		/>
	);
	const RomMap = () => (
		<MapBox
			center={LAT_LONG.ROMSEY}
			visibleZoom={17}
			label='S'
			width={isMobileView ? '100%' : undefined}
		/>
	);

	return (
		<APIProvider apiKey={googleMapsApiKey}>
			<Typography
				variant='h1'
				sx={{
					width: '100%',
					textAlign: 'left'
				}}
			>
				Join Us
			</Typography>
			{!isMobileView && (
				<>
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'row',
							width: '100%',
							marginBottom: '4px'
						}}
					>
						<Typography variant='h2'>Christ Church Lancefield</Typography>
						<Box
							sx={{
								backgroundColor: theme.palette.primary.light,
								height: '2px',
								marginX: '8px',
								flex: 1,
								alignSelf: 'center'
							}}
						/>
						<Typography variant='h2'>Sunday 10.30am</Typography>
					</Box>
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'row',
							width: '100%',
							marginBottom: '4px'
						}}
					>
						<Typography variant='h2'>St Paul’s Anglican Romsey</Typography>
						<Box
							sx={{
								backgroundColor: theme.palette.primary.light,
								height: '2px',
								marginX: '12px',
								flex: 1,
								alignSelf: 'center'
							}}
						/>
						<Typography variant='h2'>Sunday 9am</Typography>
					</Box>
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'row',
							width: '100%',
							justifyContent: 'space-between',
							marginTop: '32px'
						}}
					>
						<LanMap />
						<RomMap />
					</Box>
				</>
			)}
			{isMobileView && (
				<>
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'column',
							width: '100%',
							marginBottom: '4px'
						}}
					>
						<Typography variant='h2' textAlign='left'>
							Christ Church Lancefield
						</Typography>
						<Typography variant='h3' textAlign='left'>
							Sunday 10.30am
						</Typography>
						<Box
							sx={{
								width: '100%',
								display: 'flex',
								justifyContent: 'space-around',
								marginY: '16px'
							}}
						>
							<LanMap />
						</Box>
						<Typography variant='h2' textAlign='left'>
							St Paul’s Anglican Romsey
						</Typography>
						<Typography variant='h3' textAlign='left'>
							Sunday 9am
						</Typography>
						<Box
							sx={{
								width: '100%',
								display: 'flex',
								justifyContent: 'space-around',
								marginTop: '16px'
							}}
						>
							<RomMap />
						</Box>
					</Box>
				</>
			)}
		</APIProvider>
	);
};
