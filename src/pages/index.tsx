import * as React from 'react';
import { JoinUs, LogoAndMission } from '../components/Home/components';
import { EventCarousel } from '../components/Home/EventCarousel';
import App from '../components/App/App';
import { HeadFC, PageProps } from 'gatsby';

const Home: React.FC<PageProps> = () => {
	return (
		<main>
			<App>
				<LogoAndMission />
				<EventCarousel />
				<JoinUs />
			</App>
		</main>
	);
};

export default Home;
export const Head: HeadFC = () => (
	<title>Anglican Parish of Lancefield with Romsey</title>
);
