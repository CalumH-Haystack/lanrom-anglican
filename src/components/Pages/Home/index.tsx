import * as React from 'react';
import { CheckBox, EditNote } from '@mui/icons-material';
import {
	Box,
	Button,
	Container,
	SxProps,
	Theme,
	Typography,
	useTheme
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import logo from '../../../images/logo.png';
import ImageBox from '../../ImageBox';
import { EventCarousel } from '../../EventCarousel';
import { theme } from '../../../theme';
import { JoinUs, LogoAndMission } from './components';
import { PageContainer } from '../../PageContainer';

const Home = () => {
	return (
		<PageContainer>
			<LogoAndMission />
			<EventCarousel />
			<JoinUs />
		</PageContainer>
	);
};

export default Home;
