import * as React from 'react';
import {
	Box,
	Button,
	CircularProgress,
	FormControl,
	IconButton,
	InputLabel,
	MenuItem,
	OutlinedSelectProps,
	Select,
	TextField,
	Typography
} from '@mui/material';
import { BOX_SHADOW } from '../../../theme/palette';
import { StaticImage } from 'gatsby-plugin-image';
import { useState } from 'react';
import axios from 'axios';
import { Edit, Delete } from '@mui/icons-material';
import { DeleteDialog, INotificationState, Notification } from '../common';
import { EditDialog } from './EditDialog';
import { UploadDialog } from './UploadDialog';

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

interface IEditSermonListItem {
	sermon: ISermonData;
	onEdit: ({ name, author, series, date, url }: ISermonData) => Promise<void>;
	onDelete: (name: string) => Promise<void>;
}

const EditSermonListItem = ({
	sermon,
	onEdit,
	onDelete
}: IEditSermonListItem) => {
	const [showDeleteDialog, setShowDeleteDialog] =
		React.useState<boolean>(false);
	const [showEditDialog, setShowEditDialog] = React.useState<boolean>(false);

	const fileName = sermon.url.split('/').pop()!;
	const title = sermon.name ?? fileName?.slice(-10);

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
			<DeleteDialog
				isOpen={showDeleteDialog}
				setIsOpen={setShowDeleteDialog}
				fileName={fileName}
				onConfirm={onDelete}
			/>
			<EditDialog
				isOpen={showEditDialog}
				setIsOpen={setShowEditDialog}
				data={sermon}
				onConfirm={onEdit}
			/>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center'
				}}
			>
				<Typography variant='h2' textAlign='start'>
					{title.toLocaleUpperCase()}
				</Typography>
				<Typography variant='subtitle2' textAlign='start'>
					{sermon.author} - {sermon.date}
				</Typography>
				<Typography variant='subtitle2' textAlign='start'>
					{fileName}
				</Typography>
			</Box>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'row'
				}}
			>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center'
					}}
				>
					<IconButton aria-label='Edit' onClick={() => setShowEditDialog(true)}>
						<Edit
							sx={{
								fontSize: '1.5em'
							}}
						/>
					</IconButton>
				</Box>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center'
					}}
				>
					<IconButton
						aria-label='Delete'
						onClick={() => setShowDeleteDialog(true)}
					>
						<Delete
							sx={{
								fontSize: '1.5em'
							}}
						/>
					</IconButton>
				</Box>
			</Box>
		</Box>
	);
};

interface ISermonEditList {
	sermons: Array<ISermonData>;
	setSermons: React.Dispatch<React.SetStateAction<ISermonData[]>>;
	isLoading: boolean;
	setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SermonEditList = ({
	sermons,
	setSermons,
	isLoading,
	setIsLoading
}: ISermonEditList) => {
	const [search, setSearch] = useState('');
	const [series, setSeries] = useState('All');

	const [notification, setNotification] = React.useState<INotificationState>({
		isOpen: false,
		message: '',
		severity: 'success'
	});

	const [showUploadDialog, setShowUploadDialog] =
		React.useState<boolean>(false);

	const fetchSermons = async () => {
		setIsLoading(true);
		await axios
			.get(process.env.GATSBY_AZ_SERMONS_URL ?? '')
			.then(res => {
				let sermons: Array<ISermonData> = res.data?.sermons ?? [];
				sermons.forEach(sermon => {
					if (sermon.date && sermon.date.match(/^\d{4}-\d{2}-\d{2}$/)) {
						sermon.date = Intl.DateTimeFormat().format(new Date(sermon.date));
					}
				});
				sermons.sort((sermon, next) => {
					try {
						return new Date(sermon.date).getTime() - new Date(next.date).getTime();
					} catch {
						return -1;
					}
				});

				setSermons(sermons);
			})
			.catch(e => console.error(e));
		setIsLoading(false);
	};

	React.useEffect(() => {
		fetchSermons();
	}, []);

	const onDelete = async (fileName: string) => {
		setIsLoading(true);
		await axios
			.delete(process.env.GATSBY_AZ_DELETE_SERMON_URL ?? '', {
				data: {
					blobName: fileName
				},
				headers: {
					'x-functions-key': process.env.GATSBY_AZ_API_KEY
				}
			})
			.then(res => {
				setNotification({
					isOpen: true,
					message: `${fileName} has been deleted successfully`,
					severity: 'success'
				});
				fetchSermons();
			})
			.catch(e => {
				console.error(e);
				setNotification({
					isOpen: true,
					message: `There was an issue deleting ${fileName}`,
					severity: 'error'
				});
			});
		setIsLoading(false);
	};

	const onEdit = async ({ name, author, series, date, url }: ISermonData) => {
		setIsLoading(true);
		const params = {
			name,
			author,
			series,
			date,
			fileName: url.split('sermons/')[1]
		}
		console.log('calum date', date);
		await axios
			.put(process.env.GATSBY_AZ_UPDATE_SERMON_URL ?? '', params, {
				headers: {
					'x-functions-key': process.env.GATSBY_AZ_API_KEY
				}
			})
			.then(res => {
				setNotification({
					isOpen: true,
					message: `${name} has been uploaded successfully`,
					severity: 'success'
				});
				fetchSermons();
			})
			.catch(e => {
				console.error(e);
				setNotification({
					isOpen: true,
					message: `There was an issue uploading ${name}`,
					severity: 'error'
				});
			});
		setIsLoading(false);
	};

	const onUpload = async (
		{ name, author, series, date }: ISermonData,
		file: File
	) => {
		setIsLoading(true);
		const formData = new FormData();
		formData.append('audio', file!);
		formData.append('name', name);
		formData.append('author', author);
		formData.append('series', series);
		formData.append('date', date);
		await axios
			.post(process.env.GATSBY_AZ_UPLOAD_SERMON_URL!, formData, {
				headers: {
					'x-functions-key': process.env.GATSBY_AZ_API_KEY,
					'Content-Type': 'multipart/form-data'
				}
			})
			.then(res => {
				setNotification({
					isOpen: true,
					message: `${file?.name} has been uploaded successfully`,
					severity: 'success'
				});
				fetchSermons();
			})
			.catch(e => {
				console.error(e);
				setNotification({
					isOpen: true,
					message: `There was an issue uploading ${file?.name}`,
					severity: 'error'
				});
			});
		setIsLoading(false);
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
		<>
			<Notification data={notification} setData={setNotification} />
			<UploadDialog
				isOpen={showUploadDialog}
				setIsOpen={setShowUploadDialog}
				onConfirm={onUpload}
			/>
			<Box
				sx={{
					boxShadow: BOX_SHADOW,
					maxWidth: '550px',
					marginBottom: '32px'
				}}
			>
				<Box sx={{ position: 'relative' }}>
					<StaticImage
						src='../../../images/pulpit.jpg'
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
						Edit Sermons
					</Typography>
				</Box>
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
						return (
							<EditSermonListItem
								sermon={sermon}
								onEdit={onEdit}
								onDelete={onDelete}
							/>
						);
					})}
				</Box>
			</Box>
			<Button variant='contained' onClick={() => setShowUploadDialog(true)}>
				Upload Sermon
			</Button>
		</>
	);
};
