import * as React from 'react';
import App from '../../../components/App/App';
import { HeadFC, navigate } from 'gatsby';
import { Heading, Paragraph } from '../../../utils';
import { Box, Button, CircularProgress, useTheme } from '@mui/material';
import { SermonEditList } from '../../../components/Admin/Sermons/components';
import {
	UploadWidget,
	Notification,
	INotificationState
} from '../../../components/Admin/common';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axios from 'axios';
import { ISermonData } from '../../../components/Sermons/components';

const ManageSermons = () => {
	const theme = useTheme();

	const [sermons, setSermons] = React.useState<ISermonData[]>(
		new Array<ISermonData>()
	);
	const [isLoading, setIsLoading] = React.useState<boolean>(false);

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

	const [file, setFile] = React.useState<File>();
	const [uploadNotif, setUploadNotif] = React.useState<INotificationState>({
		isOpen: false,
		message: '',
		severity: 'success'
	});
	const [showUploadSpinner, setShowUploadSpinner] =
		React.useState<boolean>(false);

	return (
		<App>
			<Heading variant='h1'>Manage Sermons</Heading>
			<Paragraph>Use this area to upload and manage sermons.</Paragraph>
			<SermonEditList
				sermons={sermons}
				setSermons={setSermons}
				isLoading={isLoading}
				setIsLoading={setIsLoading}
			/>
			<Heading variant='h2'>Upload Announcement Image</Heading>
			{showUploadSpinner && <CircularProgress />}
			<Notification data={uploadNotif} setData={setUploadNotif} />
			<Button>
				Upload Sermon
			</Button>
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

export default ManageSermons;
export const Head: HeadFC = () => <title>Admin</title>;
