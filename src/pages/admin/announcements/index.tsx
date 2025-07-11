import * as React from 'react';
import App from '../../../components/App/App';
import { HeadFC, navigate } from 'gatsby';
import { Heading, Paragraph } from '../../../utils';
import {
	Alert,
	Box,
	Button,
	Collapse,
	IconButton,
	ImageList,
	ImageListItem,
	ImageListItemBar,
	styled,
	TextField,
	useMediaQuery,
	useTheme
} from '@mui/material';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import FolderIcon from '@mui/icons-material/Folder';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CloseIcon from '@mui/icons-material/Close';

const VisuallyHiddenInput = styled('input')({
	clip: 'rect(0 0 0 0)',
	clipPath: 'inset(50%)',
	height: 1,
	overflow: 'hidden',
	position: 'absolute',
	bottom: 0,
	left: 0,
	whiteSpace: 'nowrap',
	width: 1
});

interface INotificationState {
	isOpen: boolean;
	message: string;
	severity: 'error' | 'info' | 'success' | 'warning';
}

interface INotification {
	data: INotificationState;
	setData: React.Dispatch<React.SetStateAction<INotificationState>>;
}

const Notification = ({ data, setData }: INotification) => (
	<Collapse in={data.isOpen}>
		<Alert
			action={
				<IconButton
					aria-label='close'
					color='inherit'
					onClick={() => {
						setData({ ...data, isOpen: false });
					}}
					sx={{
						padding: '4px'
					}}
				>
					<CloseIcon fontSize='inherit' />
				</IconButton>
			}
			sx={{ mb: 2 }}
		>
			<Paragraph
				sx={{
					fontSize: '0.7em',
					marginBottom: 0,
					padding: 0
				}}
			>
				{data.message}
			</Paragraph>
		</Alert>
	</Collapse>
);

const ManageAnnouncements = () => {
	const theme = useTheme();
	const isMobileView = useMediaQuery(theme.breakpoints.down('md'));

	const [imageUrls, setImageUrls] = React.useState<Array<string>>(
		new Array<string>()
	);
	const [file, setFile] = React.useState<File>();

	const [deleteNotif, setDeleteNotif] = React.useState<INotificationState>({
		isOpen: false,
		message: '',
		severity: 'success'
	});
	const [uploadNotif, setUploadNotif] = React.useState<INotificationState>({
		isOpen: false,
		message: '',
		severity: 'success'
	});

	const fetchUrls = async () => {
		await axios
			.get(process.env.GATSBY_AZ_ANNOUNCEMENTS_URL ?? '')
			.then(res => {
				const urls: Array<string> = res.data?.urls ?? [];
				console.log(urls);

				setImageUrls(urls);
			})
			.catch(e => console.error(e));
	};

	React.useEffect(() => {
		fetchUrls();
	}, []);

	return (
		<App>
			<Heading variant='h1'>Manage Announcements</Heading>
			<Paragraph>
				Use this area to manage the announcements carousel on the homepage.
			</Paragraph>
			<Heading variant='h2'>Manage Carousel</Heading>
			<Notification data={deleteNotif} setData={setDeleteNotif} />
			<ImageList cols={isMobileView ? 1 : 2}>
				{imageUrls.map((url, index) => {
					const title = url.split('announcements/')[1];
					return (
						<ImageListItem key={`${url}-${index}`}>
							<img
								srcSet={`${url}?w=248&fit=crop&auto=format&dpr=2 2x`}
								src={`${url}?w=248&fit=crop&auto=format`}
								alt={title}
								loading='lazy'
							/>
							<ImageListItemBar
								title={title}
								actionIcon={
									<IconButton
										sx={{ color: 'rgba(255, 255, 255, 0.7)' }}
										aria-label={`delete ${title}`}
									>
										<DeleteIcon />
									</IconButton>
								}
							/>
						</ImageListItem>
					);
				})}
			</ImageList>

			<Heading variant='h2'>Upload Announcement Image</Heading>
			<Notification data={uploadNotif} setData={setUploadNotif} />
			<Box
				sx={{
					width: '100%',
					alignContent: 'start'
				}}
			>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'row',
						margin: '16px auto'
					}}
				>
					<TextField
						slotProps={{
							input: {
								readOnly: true,
								style: {
									borderTopRightRadius: '0px',
									borderBottomRightRadius: '0px'
								}
							}
						}}
						value={file?.name}
					/>
					<Button
						component='label'
						sx={{
							borderTopLeftRadius: '0px',
							borderBottomLeftRadius: '0px',
							backgroundColor: theme.palette.grey[900]
						}}
						variant='contained'
						startIcon={
							<FolderIcon
								style={{ width: '30px', height: '30px', paddingLeft: '8px' }}
							/>
						}
					>
						<VisuallyHiddenInput
							type='file'
							accept='image/*'
							onChange={(event: { target: HTMLInputElement }) =>
								event.target.files && setFile(event.target.files[0])
							}
						/>
					</Button>
				</Box>
				<Button
					variant='contained'
					sx={{
						display: 'flex',
						backgroundColor: theme.palette.grey[900]
					}}
					disabled={file === undefined}
				>
					Upload
				</Button>
			</Box>
			<Button
				sx={{
					marginTop: '64px',
					alignSelf: 'start',
					backgroundColor: theme.palette.grey[900]
				}}
				variant='contained'
				onClick={() => navigate('/admin')}
				startIcon={<ArrowBackIcon />}
			>
				Admin Home
			</Button>
		</App>
	);
};

export default ManageAnnouncements;
export const Head: HeadFC = () => <title>Admin</title>;
