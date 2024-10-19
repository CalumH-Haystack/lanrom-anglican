import { Box, styled, Typography } from "@mui/material";
import React from "react";

export const initData = (ref: React.MutableRefObject<undefined>) => {
	return {
		value: '',
		touched: false,
		ref,
		hasError: true
	};
};

export const Section = ({ children }: any) => {
	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: {
					xs: 'column',
					sm: 'row'
				},
				alignItems: 'start',
				marginBottom: '16px'
			}}
		>
			{children}
		</Box>
	);
};

export const Heading = styled(Typography)(() => ({
	textAlign: 'left',
	width: '100%'
}));

export const Paragraph = styled(Typography)(() => ({
	textAlign: 'left',
	width: '100%',
	marginBottom: '16px'
}));