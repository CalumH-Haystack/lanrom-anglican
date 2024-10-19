import { SxProps, TextField, useMediaQuery, useTheme } from '@mui/material';
import { useEffect } from 'react';
import React from 'react';

export interface InputProps {
	label: string;
	setData: Function;
	optional?: boolean;
	validation: Function;
	data: any;
	sx?: SxProps;
}

export interface TextInputProps extends InputProps {
	data: {
		value: string;
		touched: boolean;
		ref: any;
		hasError: boolean;
	};
	placeholder?: string;
	inputMode?: "search" | "text" | "email" | "tel" | "url" | "none" | "numeric" | "decimal" | undefined;
}

export const StyledTextInput = ({
	label,
	data,
	setData,
	optional = false,
	placeholder = '',
	validation,
	inputMode = 'text',
	sx = {}
}: TextInputProps) => {
	useEffect(() => {
		if (optional) {
			setData({
				...data,
				hasError: false
			});
		}
	}, [data, optional, setData]);
	const theme = useTheme();
	const helperText = () => {
		if (data.touched && validation(data.value)) {
			return validation(data.value);
		} else return optional ? 'optional' : '';
	};
	const hasError = (val: string) => validation(val) !== '';
	return (
		<TextField
			variant='standard'
			color='primary'
			label={label}
			sx={sx}
			value={data.value}
			onChange={event =>
				setData({
					...data,
					value: event.target.value
				})
			}
			onBlur={event =>
				setData({
					...data,
					value: data.value.trim(),
					touched: event.target.value.length > 0,
					hasError: hasError(event.target.value)
				})
			}
			required={!optional}
			error={data.touched && validation(data.value) !== ''}
			helperText={helperText()}
			fullWidth={useMediaQuery(theme.breakpoints.down('sm'))}
			placeholder={placeholder}
			inputRef={data.ref}
			inputMode={inputMode}
			slotProps={{
				inputLabel: {
					shrink: true,
					sx: {
						fontSize: '1.1em',
						overflow: 'visible'
					}
				}
			}}
		/>
	);
};
