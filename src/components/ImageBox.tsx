import * as React from 'react';
import { Box, BoxProps, Skeleton } from '@mui/material';
import { useState } from 'react';

interface ImageProps extends BoxProps {
	src: string;
	backgroundColor?: string;
	animation?: 'pulse' | 'wave' | false;
	variant?: 'circular' | 'rectangular' | 'rounded';
	aspectRatio?: string;
	alt?: string;
}

const ImageBox = ({
	src,
	backgroundColor = 'white',
	animation = 'pulse',
	variant = 'rounded',
	aspectRatio = 'auto',
	alt = '',
	onClick,
	sx
}: ImageProps) => {
	const img = new Image();
	img.src = src;

	const [imageLoading, setImageLoading] = useState(!img.complete);
	const [fadeSkeleton, setFadeSkeleton] = useState(false);

	const handleLoaded = () => {
		setFadeSkeleton(true);
		setTimeout(() => setImageLoading(false), 200);
	};

	return (
		<Box
			sx={{
				position: 'relative',
				...sx
			}}
			onClick={onClick}
		>
			{imageLoading && (
				<Box
					sx={{
						animation: fadeSkeleton ? 'ease' : 'none',
						animationName: fadeSkeleton ? 'fadeOut' : '',
						animationDuration: fadeSkeleton ? '0.3s' : ''
					}}
				>
					<Skeleton
						sx={{
							display: 'flex',
							backgroundColor: backgroundColor,
							position: 'absolute',
							top: 0,
							left: 0,
							width: '100%',
							height: '100%'
						}}
						animation={animation}
						variant={variant}
					/>
				</Box>
			)}
			<Box
				component='img'
				display='flex'
				onLoad={() => handleLoaded()}
				src={src}
				sx={{
					width: '100%',
					padding: '0',
					backgroundColor: backgroundColor,
					aspectRatio: aspectRatio
				}}
				alt={alt}
			/>
		</Box>
	);
};

export default ImageBox;
