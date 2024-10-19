import {
	Box,
	Button,
	CircularProgress,
	Typography,
	useMediaQuery,
	useTheme
} from '@mui/material';
import React, { useRef, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { BOX_SHADOW } from '../../theme/palette';
import { Heading, initData, Section } from '../../utils';
import { StyledTextInput } from '../TextInput';
import { FIELD_NAMES, VALIDATIONS } from './constants';
import { TextArea } from '../TextArea';
import { Send } from '@mui/icons-material';

export const ContactForm = () => {
	const theme = useTheme();
	const isMobileView = useMediaQuery(theme.breakpoints.down('sm'));

	const [firstName, setFirstName] = useState(initData(useRef()));
	const [lastName, setLastName] = useState(initData(useRef()));
	const [subject, setSubject] = useState(initData(useRef()));
	const [message, setMessage] = useState(initData(useRef()));
	const [isNotRobot, setIsNotRobot] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	return (
		<Box
			sx={{
				boxShadow: BOX_SHADOW,
				border: `1.5px solid black`,
				borderRadius: '2px',
				padding: '32px',
        maxWidth: '420px'
			}}
		>
			<Heading
				variant='h1'
				sx={{
					textAlign: 'center',
					marginBottom: '32px',
				}}
			>
				Get in touch
			</Heading>
			<Box sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '16px'
      }}>
				<Box
					sx={{
						width: 'fit-content'
					}}
				>
					<Section>
						<StyledTextInput
							label={FIELD_NAMES.FIRST_NAME}
							sx={{
								marginRight: !isMobileView ? '16px' : undefined,
								marginBottom: isMobileView ? '8px' : undefined
							}}
							data={firstName}
							setData={setFirstName}
							validation={VALIDATIONS[FIELD_NAMES.FIRST_NAME]}
						/>
						<StyledTextInput
							label={FIELD_NAMES.LAST_NAME}
							data={lastName}
							setData={setLastName}
							validation={VALIDATIONS[FIELD_NAMES.LAST_NAME]}
						/>
					</Section>
					<Section>
						<StyledTextInput
							label={FIELD_NAMES.SUBJECT}
							data={subject}
							setData={setSubject}
							validation={VALIDATIONS[FIELD_NAMES.SUBJECT]}
						/>
					</Section>
					<Section>
						<TextArea
							label={FIELD_NAMES.MESSAGE}
							data={message}
							setData={setMessage}
							validation={VALIDATIONS[FIELD_NAMES.MESSAGE]}
              inputMode='numeric'
						/>
					</Section>
				</Box>
			</Box>
			<Box
				sx={{
					display: 'flex',
					paddingBottom: '16px',
					justifyContent: 'center'
				}}
			>
				<ReCAPTCHA
					sitekey={process.env.GATSBY_RECAPTCHA_SITE_KEY ?? ''}
					onChange={() => setIsNotRobot(true)}
					onErrored={() => setIsNotRobot(false)}
					onExpired={() => setIsNotRobot(false)}
					size={isMobileView ? 'compact' : 'normal'}
				/>
			</Box>
			{isLoading ? (
				<Box
					sx={{
						width: 'inherit',
						alignContent: 'center'
					}}
				>
					<CircularProgress />
				</Box>
			) : (
				<Button
					variant='contained'
					endIcon={<Send />}
					sx={{
						padding: '4px 48px',
						margin: '16px auto',
						backgroundColor: theme.palette.grey[900]
					}}
					// onClick={() => onSubmit()}
					disabled={!isNotRobot}
				>
					<Typography variant='button'>Send</Typography>
				</Button>
			)}
		</Box>
	);
};
