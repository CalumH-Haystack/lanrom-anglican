import {
	Box,
	CircularProgress,
	FormControl,
	IconButton,
	InputLabel,
	MenuItem,
	OutlinedSelectProps,
	Select,
	TextField,
	Typography,
	useMediaQuery,
	useTheme
} from '@mui/material';
import React, { createRef, RefObject, useEffect, useState } from 'react';
import { BOX_SHADOW } from '../../theme/palette';
import { StaticImage } from 'gatsby-plugin-image';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { Pause, PlayArrow } from '@mui/icons-material';
import H5AudioPlayer from 'react-h5-audio-player';
import axios from 'axios';

export interface ISermonData {
	name: string;
	author: string;
	date: string;
	url: string;
	series: string;
}

interface ISeriesDropdown extends OutlinedSelectProps {
	value: string;
	setValue: React.Dispatch<React.SetStateAction<string>>;
	sermons: Array<ISermonData>;
}

const SeriesDropdown = ({ value, setValue, sermons, sx }: ISeriesDropdown) => {
	const seriesArr = new Array<string>();
	for (const sermon of sermons) {
		if (!seriesArr.includes(sermon.series)) seriesArr.push(sermon.series);
	}
	return (
		<FormControl sx={sx} fullWidth>
			<InputLabel id='series-label' size='small'>
				Select Series
			</InputLabel>
			<Select
				labelId='series-label'
				value={value}
				label='Select Series'
				onChange={e => setValue(e.target.value)}
				sx={{
					textAlign: 'start'
				}}
				size='small'
			>
				<MenuItem value={'All'}>All</MenuItem>
				{seriesArr.map(series => (
					<MenuItem value={series}>{series}</MenuItem>
				))}
			</Select>
		</FormControl>
	);
};

interface ISermonListItem {
	name: string;
	author: string;
	date: string;
	playing: boolean;
	onPause: Function;
	onPlay: Function;
}

const SermonListItem = ({
	name,
	author,
	date,
	playing,
	onPause,
	onPlay
}: ISermonListItem) => {
	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'row',
				justifyContent: 'space-between',
				padding: '8px 16px',
				'&:hover': {
					backgroundColor: '#eeeeee'
				},
				borderBottom: '1px solid #eeeeee'
			}}
		>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center'
				}}
			>
				<Typography variant='h2' textAlign='start'>
					{name.toLocaleUpperCase()}
				</Typography>
				<Typography variant='subtitle2' textAlign='start'>
					{author} - {date}
				</Typography>
			</Box>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center'
				}}
			>
				{playing ? (
					<IconButton aria-label='Pause' onClick={() => onPause()}>
						<Pause
							fontSize='medium'
							sx={{
								fontSize: '1.5em'
							}}
						/>
					</IconButton>
				) : (
					<IconButton aria-label='Play Arrow' onClick={() => onPlay()}>
						<PlayArrow
							sx={{
								fontSize: '1.5em'
							}}
						/>
					</IconButton>
				)}
			</Box>
		</Box>
	);
};

export const SermonPlayer = () => {
	const playerRef: RefObject<H5AudioPlayer> = createRef();

	const [search, setSearch] = useState('');
	const [series, setSeries] = useState('All');
	const [nowPlaying, setNowPlaying] = useState('');
	const [paused, setPaused] = useState(true);
	const [sermons, setSermons] = useState(new Array<ISermonData>());
	const [isLoading, setIsLoading] = useState(true);

	const fetchSermons = async () => {
		setIsLoading(true);
		await axios
			.get(process.env.GATSBY_AZ_SERMONS_URL ?? '')
			.then(res => {
				const sermons: Array<ISermonData> = res.data?.sermons ?? [];

				setSermons(sermons);
			})
			.catch(e => console.error(e));
		setIsLoading(false);
	};

	useEffect(() => {
		fetchSermons();
	}, []);

	const onPause = () => {
		playerRef.current?.audio.current?.pause();
	};

	const onPlay = (url: string) => {
		if (nowPlaying === url) {
			playerRef.current?.audio.current?.play();
		} else {
			setNowPlaying(url);
		}
	};

	const sermonFilter = (sermon: ISermonData): boolean => {
		const matchesSearch: boolean = search
			? sermon.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
			: true;
		const matchesSeries: boolean =
			series === 'All' ? true : sermon.series === series;

		return matchesSearch && matchesSeries;
	};

	return (
		<Box
			sx={{
				boxShadow: BOX_SHADOW,
				maxWidth: '550px'
			}}
		>
			<Box sx={{ position: 'relative' }}>
				<StaticImage
					src='../../images/pulpit.jpg'
					alt='Pulpit and font, inside Christ Church Lancefield'
					placeholder='blurred'
					layout='constrained'
					aspectRatio={2.5}
				/>
				<Typography
					variant='h1'
					sx={{
						position: 'absolute',
						left: '0',
						right: '0',
						top: '0',
						bottom: '0',
						alignContent: 'center',
						color: 'white',
						fontWeight: '700',
						textShadow: '1px 1px 3px black'
					}}
				>
					Sermons
				</Typography>
			</Box>
			<AudioPlayer
				autoPlay
				src={nowPlaying}
				ref={playerRef}
				onPause={() => setPaused(true)}
				onPlay={() => setPaused(false)}
			/>
			<Box
				sx={{
					py: '12px',
					px: '16px',
					display: 'flex',
					flexDirection: {
						xs: 'column',
						md: 'row'
					},
					boxShadow: 1,
					zIndex: 100,
					backgroundColor: 'white',
					borderBottom: '1px solid #eeeeee'
				}}
			>
				<TextField
					label='Search'
					type='search'
					size='small'
					value={search}
					onChange={e => setSearch(e.target.value)}
					sx={{
						maxWidth: {
							xs: 'auto',
							md: '40%'
						},
						marginRight: {
							xs: '0',
							md: '8px'
						},
						marginBottom: {
							xs: '12px',
							md: '0'
						}
					}}
				/>
				<SeriesDropdown
					value={series}
					setValue={setSeries}
					sermons={sermons}
					sx={{
						maxWidth: {
							xs: 'auto',
							md: '40%'
						}
					}}
				/>
			</Box>
			{isLoading && (
				<Box
					sx={{
						width: 'inherit',
						alignContent: 'center',
						minHeight: '40vh',
						backgroundColor: 'white'
					}}
				>
					<CircularProgress />
				</Box>
			)}
			{!isLoading && sermons.length === 0 && (
				<Box
					sx={{
						width: 'inherit',
						alignContent: 'center',
						minHeight: '20vh',
						backgroundColor: 'white'
					}}
				>
					<Typography variant='body1'>
						There aren't any sermons available at the moment.
					</Typography>
				</Box>
			)}
			<Box
				sx={{
					maxHeight: '60vh',
					overflowY: 'scroll',
					backgroundColor: 'white'
				}}
			>
				{sermons.filter(sermonFilter).map(sermon => {
					const fileName = sermon.url.split('/').pop();
					const title = sermon.name ?? fileName?.slice(-10);
					return (
						<SermonListItem
							name={title}
							author={sermon.author}
							date={sermon.date}
							playing={sermon.url === nowPlaying && !paused}
							onPause={() => onPause()}
							onPlay={() => onPlay(sermon.url)}
						/>
					);
				})}
			</Box>
		</Box>
	);
};
