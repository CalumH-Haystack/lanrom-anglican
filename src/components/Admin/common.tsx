import * as React from 'react';
import {
	Alert,
	Box,
	Button,
	Collapse,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	IconButton,
	styled,
	TextField,
	useTheme
} from '@mui/material';
import { Paragraph } from '../../utils';
import CloseIcon from '@mui/icons-material/Close';
import FolderIcon from '@mui/icons-material/Folder';

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

export interface INotificationState {
	isOpen: boolean;
	message: string;
	severity: 'error' | 'info' | 'success' | 'warning';
}

interface INotification {
	data: INotificationState;
	setData: React.Dispatch<React.SetStateAction<INotificationState>>;
}

export const Notification = ({ data, setData }: INotification) => (
	<Collapse in={data.isOpen}>
		<Alert
			severity={data.severity}
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
			sx={{ margin: '16px' }}
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

interface IUploadWidget {
	file: File | undefined;
	setFile: React.Dispatch<React.SetStateAction<File | undefined>>;
	onUpload: Function;
  accept: string;
}

export const UploadWidget = ({ file, setFile, onUpload, accept }: IUploadWidget) => {
	const theme = useTheme();

	return (
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
						accept={accept}
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
				onClick={() => onUpload()}
			>
				Upload
			</Button>
		</Box>
	);
};

interface IDeleteDialog {
	isOpen: boolean;
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
	fileName: string;
	onConfirm: (name: string) => Promise<void>;
}

export const DeleteDialog = ({
	isOpen,
	setIsOpen,
	fileName,
	onConfirm
}: IDeleteDialog) => {
	const handleClose = () => setIsOpen(false);

	return (
		<Dialog open={isOpen} onClose={handleClose}>
			<DialogTitle>{'Delete File?'}</DialogTitle>
			<DialogContent>
				<DialogContentText>
					Are you sure you want to delete "{fileName}"?
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose}>No</Button>
				<Button
					onClick={() => {
						onConfirm(fileName);
						handleClose();
					}}
					autoFocus
				>
					Yes
				</Button>
			</DialogActions>
		</Dialog>
	);
};
