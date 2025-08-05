import * as React from 'react';
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	TextField
} from '@mui/material';
import { ISermonData } from './components';

interface IEditDialog {
	isOpen: boolean;
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
	data: ISermonData;
	onConfirm: ({
		name,
		author,
		series,
		date,
		url
	}: ISermonData) => Promise<void>;
}

export const EditDialog = ({
	isOpen,
	setIsOpen,
	onConfirm,
	data
}: IEditDialog) => {
	const fileName = data.url.split('/').pop();
	const handleClose = () => {
		setUpdateData(data);
		setIsOpen(false);
	};

	const [updateData, setUpdateData] = React.useState<ISermonData>(data);

	const onSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		handleClose();
		onConfirm(updateData);
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
			<DialogTitle>{'Edit File'}</DialogTitle>
			<DialogContent>
				<DialogContentText>Editing metadata for {fileName}</DialogContentText>
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
					<DialogActions>
						<Button onClick={handleClose}>Cancel</Button>
						<Button type='submit'>Update</Button>
					</DialogActions>
				</form>
			</DialogContent>
		</Dialog>
	);
};
