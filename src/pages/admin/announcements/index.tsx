import * as React from 'react';
import App from '../../../components/App/App';
import { HeadFC, navigate } from 'gatsby';
import { Heading, Paragraph } from '../../../utils';
import {
	Button,
	useTheme
} from '@mui/material';
import axios from 'axios';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { AnnouncementsList, INotificationState, Notification, UploadWidget } from '../../../components/Admin/Announcements/components';

const ManageAnnouncements = () => {
	const theme = useTheme();

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
			<AnnouncementsList imageUrls={imageUrls} />

			<Heading variant='h2'>Upload Announcement Image</Heading>
			<Notification data={uploadNotif} setData={setUploadNotif} />
			<UploadWidget file={file} setFile={setFile} />
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
