import './global.css';

export const onClientEntry = () => {
	if (document.getElementById('splash-screen')) {
		document.getElementById('splash-screen').style.display = 'flex';
	}
};

export const onInitialClientRender = () => {
	if (document.getElementById('splash-screen')) {
		document.getElementById('splash-screen').style.display = 'flex';
	}
};

export const onRouteUpdate = () => {
	if (document.getElementById('splash-screen')) {
		document.getElementById('splash-screen').style.display = 'none';
	}
};
