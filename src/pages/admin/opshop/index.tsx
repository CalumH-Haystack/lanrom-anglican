import * as React from 'react';
import App from '../../../components/App/App';
import { HeadFC, navigate } from 'gatsby';
import { Heading, Paragraph } from '../../../utils';
import { Button, CircularProgress, useTheme } from '@mui/material';
import axios from 'axios';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {
	OpshopList,
} from '../../../components/Admin/Opshop/components';
import { INotificationState, Notification, UploadWidget } from '../../../components/Admin/common';

const ManageOpshop = () => {
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
	const [showDeleteSpinner, setShowDeleteSpinner] =
		React.useState<boolean>(false);
	const [uploadNotif, setUploadNotif] = React.useState<INotificationState>({
		isOpen: false,
		message: '',
		severity: 'success'
	});
	const [showUploadSpinner, setShowUploadSpinner] =
		React.useState<boolean>(false);

	const fetchUrls = async () => {
		await axios
			.get(process.env.GATSBY_AZ_OpshopS_URL ?? '')
			.then(res => {
				const urls: Array<string> = res.data?.urls ?? [];

				setImageUrls(urls);
			})
			.catch(e => console.error(e));
	};

	const onDelete = async (name: string) => {
		setShowDeleteSpinner(true);
		await axios
			.delete(process.env.GATSBY_AZ_DELETE_OPSHOP_URL ?? '', {
				data: {
					blobName: name
				},
				headers: {
					'x-functions-key': process.env.GATSBY_AZ_API_KEY
				}
			})
			.then(res => {
				setDeleteNotif({
					isOpen: true,
					message: `${name} has been deleted successfully`,
					severity: 'success'
				});
				fetchUrls();
			})
			.catch(e => {
				console.error(e);
				setDeleteNotif({
					isOpen: true,
					message: `There was an issue deleting ${name}`,
					severity: 'error'
				});
			});
		setShowDeleteSpinner(false);
	};

	const onUpload = async () => {
		setShowUploadSpinner(true);
		const formData = new FormData();
		formData.append('image', file!);
		await axios
			.post(process.env.GATSBY_AZ_UPLOAD_OPSHOP_URL ?? '', formData, {
				headers: {
					'x-functions-key': process.env.GATSBY_AZ_API_KEY,
					'Content-Type': 'multipart/form-data'
				}
			})
			.then(res => {
				setUploadNotif({
					isOpen: true,
					message: `${file?.name} has been uploaded successfully`,
					severity: 'success'
				});
				fetchUrls();
			})
			.catch(e => {
				console.error(e);
				setUploadNotif({
					isOpen: true,
					message: `There was an issue uploading ${file?.name}`,
					severity: 'error'
				});
			});
		setShowUploadSpinner(false);
	};

	React.useEffect(() => {
		fetchUrls();
	}, []);

	return (
		<App>
			<Heading variant='h1'>Manage Opshops</Heading>
			<Paragraph>
				Use this area to manage the Opshops carousel.
			</Paragraph>
			<Heading variant='h2'>Manage Carousel</Heading>
			{showDeleteSpinner && <CircularProgress />}
			<Notification data={deleteNotif} setData={setDeleteNotif} />
			<OpshopList imageUrls={imageUrls} onDelete={onDelete} />

			<Heading variant='h2'>Upload Opshop Image</Heading>
			{showUploadSpinner && <CircularProgress />}
			<Notification data={uploadNotif} setData={setUploadNotif} />
			<UploadWidget file={file} setFile={setFile} onUpload={onUpload} accept='image/*'/>
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

export default ManageOpshop;
export const Head: HeadFC = () => <title>Admin</title>;
