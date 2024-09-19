import * as React from 'react';
import { EventCarousel } from '../../EventCarousel';
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
