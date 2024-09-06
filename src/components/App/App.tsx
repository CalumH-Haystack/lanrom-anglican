import React, { useEffect, useState } from 'react';
import './App.css';
import { ThemeProvider } from '@emotion/react';
import { BrowserRouter as Router } from 'react-router-dom';
import SplashScreen from '../../components/SplashScreen';
import { theme } from '../../theme';
import Page from '../Page';

function App() {
	const [isLoading, setIsLoading] = useState(true);
	const [fadeSplash, setFadeSplash] = useState(false);

	useEffect(() => {
		const checkFontsLoaded = async () => {
			await document.fonts.ready;
			
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
					<Router>
						<Page />
					</Router>
				</header>
			</div>
		</ThemeProvider>
	);
}

export default App;
