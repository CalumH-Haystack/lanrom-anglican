import React, { useEffect, useState } from 'react';
import './App.css';
import { ThemeProvider } from '@emotion/react';
import { theme } from '../../theme';
import Page from '../Page';
import { useLocation } from '@reach/router';

interface IAppProps {
	children?: React.ReactNode;
}

function App({ children }: IAppProps) {

	return (
		<ThemeProvider theme={theme}>
			<div className='App'>
				<header className='App-header'>
					<Page>{children}</Page>
				</header>
			</div>
		</ThemeProvider>
	);
}

export default App;
