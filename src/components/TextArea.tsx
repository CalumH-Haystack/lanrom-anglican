import {
	FormControl,
	FormHelperText,
	TextField
} from '@mui/material';
import React from 'react';
import { TextInputProps } from './TextInput';

export const TextArea = ({
	label,
	data,
	setData,
	optional = false,
	validation
}: TextInputProps) => {
	const hasError = (val: string) => validation(val) !== '';
	const remainingChars: number = 500 - data.value.length;
	return (
		<FormControl
			sx={{
				alignItems: 'start',
				width: '100%'
			}}
		>
			<TextField
				label={label}
				fullWidth
				value={data.value}
				onChange={event =>
					setData({
						...data,
						value: event.target.value,
						hasError: hasError(event.target.value)
					})
				}
				onBlur={event =>
					setData({
						...data,
						touched: event.target.value.length > 0
					})
				}
				required={!optional}
				color='primary'
				multiline
				minRows='3'
				maxRows='5'
				inputRef={data.ref}
			/>
			<FormHelperText error={data.touched && hasError(data.value)}>
				{data.touched && hasError(data.value)
					? validation(data.value)
					: `${remainingChars} char(s) remaining`}
			</FormHelperText>
		</FormControl>
	);
};
