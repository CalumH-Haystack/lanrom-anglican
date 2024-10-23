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
import { IApiLunch, submitLunch } from './api';

function SendEmail({ firstName, lastName, howMany }: IApiLunch): string {
	var subject = 'Community Lunch RSVP';
	var body = `Name: ${firstName} ${lastName}\r\nAttending: ${howMany}`;
	var uri = `mailto:admin@lancefieldromseyanglican.org?subject=`;
	uri += encodeURIComponent(subject);
	uri += '&body=';
	uri += encodeURIComponent(body);
	return uri;
}

const LunchForm = () => {
	const theme = useTheme();
	const isMobileView = useMediaQuery(theme.breakpoints.down('sm'));

	const [firstName, setFirstName] = useState(initData(useRef()));
	const [lastName, setLastName] = useState(initData(useRef()));
	const [email, setEmail] = useState(initData(useRef()));
	const [howMany, setHowMany] = useState(initData(useRef()));
	const [isNotRobot, setIsNotRobot] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [apiError, setApiError] = useState<boolean | null>(null);

	const data = [firstName, lastName, email, howMany];
	const setData = [setFirstName, setLastName, setEmail, setHowMany];

	const setAllTouched = () => {
		data.forEach((datum: any, index) => {
			setData[index]({
				...datum,
				touched: true
			});
		});
	};

	const onSubmit = async () => {
		let errorRefs: any[] = [];
		data.forEach(val => {
			if (val.hasError) {
				errorRefs.push(val.ref);
			}
		});

		if (errorRefs.length > 0) {
			setAllTouched();
			errorRefs[0].current.focus();
		} else {
			setIsLoading(true);
			const dataObject: IApiLunch = {
				firstName: firstName.value,
				lastName: lastName.value,
				email: email.value,
				howMany: howMany.value
			};
			let response;
			try {
				response = await submitLunch(dataObject);
				setApiError(false);
			} catch (e) {
				setApiError(true);
			}
			setIsLoading(false);
		}
	};

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
					marginBottom: '32px'
				}}
			>
				Come to our next lunch
			</Heading>
			<Box
				sx={{
					width: '100%',
					display: 'flex',
					justifyContent: 'center',
					marginBottom: '16px'
				}}
			>
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
							label={FIELD_NAMES.EMAIL}
							data={email}
							setData={setEmail}
							validation={VALIDATIONS[FIELD_NAMES.EMAIL]}
						/>
					</Section>
					<Section>
						<StyledTextInput
							label={FIELD_NAMES.HOW_MANY}
							data={howMany}
							setData={setHowMany}
							validation={VALIDATIONS[FIELD_NAMES.HOW_MANY]}
							inputMode='numeric'
						/>
					</Section>
				</Box>
			</Box>
			{apiError === null && (
				<>
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
							sx={{
								padding: '4px 48px',
								margin: '16px auto',
								backgroundColor: theme.palette.grey[900]
							}}
							onClick={() => onSubmit()}
							disabled={!isNotRobot}
						>
							<Typography variant='button'>Submit</Typography>
						</Button>
					)}
				</>
			)}
			{apiError && (
				<Heading variant='h2' sx={{ textAlign: 'center' }}>
					There was an issue submitting, you can contact us directly through our{' '}
					<a
						href={SendEmail({
							firstName: firstName.value,
							lastName: lastName.value,
							howMany: howMany.value,
							email: email.value
						})}
					>
						email
					</a>{' '}
					instead.
				</Heading>
			)}
			{apiError !== null && !apiError && (
				<Heading variant='h2' sx={{ textAlign: 'center' }}>
					Submitted, see you there!
				</Heading>
			)}
		</Box>
	);
};

export default LunchForm;
