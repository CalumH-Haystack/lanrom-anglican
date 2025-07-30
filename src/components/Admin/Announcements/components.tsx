import * as React from 'react';
import {
	IconButton,
	ImageList,
	ImageListItem,
	ImageListItemBar,
	useMediaQuery,
	useTheme
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { DeleteDialog } from '../common';

interface IAnnouncementsList {
	imageUrls: Array<string>;
	onDelete: (name: string) => Promise<void>;
}

export const AnnouncementsList = ({
	imageUrls,
	onDelete
}: IAnnouncementsList) => {
	const theme = useTheme();
	const isMobileView = useMediaQuery(theme.breakpoints.down('md'));
	const [showDeleteDialog, setShowDeleteDialog] =
		React.useState<boolean>(false);
	const [selectedFile, setSelectedFile] = React.useState<string>('');

	const onClick = (fileName: string) => {
		setSelectedFile(fileName);
		setShowDeleteDialog(true);
	};

	return (
		<>
			<DeleteDialog
				isOpen={showDeleteDialog}
				setIsOpen={setShowDeleteDialog}
				fileName={selectedFile}
				onConfirm={onDelete}
			/>
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
										onClick={() => onClick(title)}
									>
										<DeleteIcon />
									</IconButton>
								}
							/>
						</ImageListItem>
					);
				})}
			</ImageList>
		</>
	);
};
