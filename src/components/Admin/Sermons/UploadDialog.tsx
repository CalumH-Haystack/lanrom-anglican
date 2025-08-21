import * as React from 'react';
import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	TextField,
	useTheme
} from '@mui/material';
import { VisuallyHiddenInput } from '../common';
import FolderIcon from '@mui/icons-material/Folder';
import { ISermonData } from '../../Sermons/components';

interface IUploadDialog {
	isOpen: boolean;
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
	onConfirm: (
		{ name, author, series, date }: ISermonData,
		file: File
	) => Promise<void>;
}

export const UploadDialog = ({
	isOpen,
	setIsOpen,
	onConfirm
}: IUploadDialog) => {
	const theme = useTheme();

	const [file, setFile] = React.useState<File>();

	const handleClose = () => {
		setUpdateData({
			name: '',
			author: '',
			date: '',
			url: '',
			series: '',
			subject: ''
		});
		setIsOpen(false);
	};

	const [updateData, setUpdateData] = React.useState<ISermonData>({
		name: '',
		author: '',
		date: '',
		url: '',
		series: '',
		subject: ''
	});

	const onSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		handleClose();
		onConfirm(updateData, file!);
	};

	const onChange = (
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setUpdateData({
			...updateData,
			[event.target.name]: event.target.value
		});
	};

	return (
		<Dialog open={isOpen} onClose={handleClose}>
			<DialogTitle>{'Upload File'}</DialogTitle>
			<DialogContent>
				<DialogContentText>Uploading new sermon file</DialogContentText>
				<form onSubmit={onSubmit}>
					<TextField
						autoFocus
						required
						margin='dense'
						name='name'
						label='Title'
						type='text'
						value={updateData.name}
						onChange={onChange}
						fullWidth
						variant='standard'
					/>
					<TextField
						required
						margin='dense'
						name='author'
						label='Author'
						type='text'
						value={updateData.author}
						onChange={onChange}
						fullWidth
						variant='standard'
					/>
					<TextField
						required
						margin='dense'
						name='series'
						label='Series'
						type='text'
						value={updateData.series}
						onChange={onChange}
						fullWidth
						variant='standard'
					/>
					<TextField
						required
						margin='dense'
						name='subject'
						label='Subject'
						type='text'
						value={updateData.subject}
						onChange={onChange}
						fullWidth
						variant='standard'
					/>
					<TextField
						required
						margin='dense'
						name='date'
						label='Date'
						type='date'
						value={updateData.date}
						onChange={onChange}
						fullWidth
						variant='standard'
						slotProps={{
							inputLabel: {
								shrink: true
							}
						}}
					/>
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'row',
							margin: '16px auto'
						}}
					>
						<TextField
							required
							name='file'
							type='text'
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
								accept={'audio/*'}
								onChange={(event: { target: HTMLInputElement }) =>
									event.target.files && setFile(event.target.files[0])
								}
							/>
						</Button>
					</Box>
					<DialogActions>
						<Button onClick={handleClose}>Cancel</Button>
						<Button type='submit' disabled={!(file instanceof File)}>
							Upload
						</Button>
					</DialogActions>
				</form>
			</DialogContent>
		</Dialog>
	);
};
