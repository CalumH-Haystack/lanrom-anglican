import React, { useEffect, useState } from 'react';
import './App.css';
import { ThemeProvider } from '@emotion/react';
import SplashScreen from '../../components/SplashScreen';
import { theme } from '../../theme';
import Page from '../Page';

interface IAppProps {
	children?: React.ReactNode;
}

function App({ children }: IAppProps) {
	const [isLoading, setIsLoading] = useState(true);
	const [fadeSplash, setFadeSplash] = useState(false);

	useEffect(() => {
		const checkFontsLoaded = async () => {
			await document && document.fonts.ready;

			setTimeout(() => {
				setFadeSplash(true);
				setTimeout(() => setIsLoading(false), 500);
			}, 1000);
		};
		checkFontsLoaded().catch(console.error);
	}, [setIsLoading]);

	return (
		<ThemeProvider theme={theme}>
			{isLoading && <SplashScreen fade={fadeSplash} />}
			<div className='App'>
				<header className='App-header'>
					<Page>
						{children}
					</Page>
				</header>
			</div>
		</ThemeProvider>
	);
}

export default App;
