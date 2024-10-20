import {
	Box,
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
import React, { createRef, RefObject, useState } from 'react';
import { BOX_SHADOW } from '../../theme/palette';
import { StaticImage } from 'gatsby-plugin-image';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { Pause, PlayArrow } from '@mui/icons-material';
import H5AudioPlayer from 'react-h5-audio-player';

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
}

const SeriesDropdown = ({ value, setValue, sx }: ISeriesDropdown) => {
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
				<MenuItem value={'Psalms'}>Psalms</MenuItem>
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
	const theme = useTheme();
	const isMobileView = useMediaQuery(theme.breakpoints.down('md'));
	const playerRef: RefObject<H5AudioPlayer> = createRef();

	const [search, setSearch] = useState('');
	const [series, setSeries] = useState('All');
	const [nowPlaying, setNowPlaying] = useState('');
	const [paused, setPaused] = useState(true);

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
    console.log(search, series);
    const matchesSearch: boolean = search ? sermon.name.includes(search) : true;
    const matchesSeries: boolean = series === 'All' ? true : sermon.series === series;

    return matchesSearch && matchesSeries;
  }

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
					zIndex: 100
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
					sx={{
						maxWidth: {
							xs: 'auto',
							md: '40%'
						}
					}}
				/>
			</Box>
			<Box sx={{
        maxHeight: '60vh',
        overflowY: 'scroll'
      }}>
				{sermons.filter(sermonFilter).map(sermon => {
					return (
						<SermonListItem
							name={sermon.name}
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

const sermons: Array<ISermonData> = [
	{
		name: 'Best and Worst of Times',
		author: 'Rev Len Greenhall',
		date: '26/05/2024',
    series: 'Len Greenhall 2024',
		url: 'https://lanromstorage.blob.core.windows.net/sermons/718c95_2df5d19dff9c4b2ca9fc96319f83bd63.mp3'
	},
	{
		name: 'Psalm 15',
		author: 'Calum Hay',
		date: '11/02/2024',
    series: 'Psalms',
		url: 'https://lanromstorage.blob.core.windows.net/sermons/718c95_4ab472f41bf84f958245b102b6ed3fb7.mp3'
	},
];
