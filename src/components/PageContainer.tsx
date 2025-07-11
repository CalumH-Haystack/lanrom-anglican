import { Container, ContainerProps } from '@mui/material';
import React from 'react';

export const PageContainer = (props: ContainerProps) => {
	return (
		<Container
			sx={{
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignContent: 'center',
				alignItems: 'center',
				marginTop: {
					xs: '32px',
					sm: '96px',
					md: '32px'
				},
				marginBottom: '64px',
				minHeight: '80vh',
        width: '90%'
			}}
		>
			{props.children}
		</Container>
	);
};
