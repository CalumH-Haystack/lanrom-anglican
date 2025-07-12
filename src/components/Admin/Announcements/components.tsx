import * as React from 'react';
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
import { Paragraph } from '../../../utils';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
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

interface IAnnouncementsList {
	imageUrls: Array<string>;
	onDelete: Function;
}

export const AnnouncementsList = ({
	imageUrls,
	onDelete
}: IAnnouncementsList) => {
	const theme = useTheme();
	const isMobileView = useMediaQuery(theme.breakpoints.down('md'));

	return (
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
									onClick={() => onDelete(title)}
								>
									<DeleteIcon />
								</IconButton>
							}
						/>
					</ImageListItem>
				);
			})}
		</ImageList>
	);
};

interface IUploadWidget {
	file: File | undefined;
	setFile: React.Dispatch<React.SetStateAction<File | undefined>>;
	onUpload: Function;
}

export const UploadWidget = ({ file, setFile, onUpload }: IUploadWidget) => {
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
				onClick={() => onUpload()}
			>
				Upload
			</Button>
		</Box>
	);
};
