import { SxProps, Theme, TypographyVariantsOptions } from '@mui/material';
import { TypographyOptions } from '@mui/material/styles/createTypography';

declare module '@mui/material/styles' {
	interface TypographyVariants {
		navBarMenu: SxProps<Theme>;
		navDrawer: SxProps<Theme>;
		navDrawerSub: SxProps<Theme>;
		title: SxProps<Theme>;
	}

	interface TypographyVariantsOptions {
		navBarMenu?: SxProps<Theme>;
		navDrawer?: SxProps<Theme>;
		navDrawerSub?: SxProps<Theme>;
		title?: SxProps<Theme>;
	}
}

declare module '@mui/material/Typography' {
	interface TypographyPropsVariantOverrides {
		navBarMenu: true;
		navDrawer: true;
		navDrawerSub: true;
		title: true;
	}
}

export const typography: TypographyOptions = {
	fontFamily: 'Raleway',
	body1: {
		fontSize: '0.9em',
		'@media (max-width:600px)': {
			fontSize: '1.3em'
		}
	},
	body2: {
		fontFamily: 'Raleway',
		fontSize: '0.9em',
		'@media (max-width:600px)': {
			fontSize: '1.1em'
		}
	},
	subtitle1: {
		fontSize: '0.6em',
		fontWeight: '300',
		color: '#eee',
		'@media (max-width:600px)': {
			fontSize: '1.2em'
		}
	},
	subtitle2: {
		fontSize: '0.6em',
		fontWeight: '500',
		fontStyle: 'italic',
		'@media (max-width:600px)': {
			fontSize: '1.2em'
		}
	},
	button: {
		fontSize: '0.9em'
	},
	h1: {
		fontFamily: 'Raleway',
		fontSize: '1.7em',
		fontWeight: '500',
		textTransform: 'uppercase'
	},
	h2: {
		fontSize: '1.2em',
		fontWeight: '400',
		'@media (max-width:600px)': {
			fontSize: '1.5em'
		}
	},
	h3: {
		fontSize: '1em',
		fontWeight: '200',
		fontStyle: 'italic',
		'@media (max-width:600px)': {
			fontSize: '1.2em'
		}
	},
	navBarMenu: {
		fontSize: '0.9em',
		textAlign: 'start',
		textTransform: 'uppercase',
		'@media (max-width:600px)': {
			fontSize: '0.6em'
		}
	},
	navDrawer: {
		fontFamily: 'Raleway',
		fontSize: '1.4em',
		textTransform: 'uppercase',
		letterSpacing: '0.2rem'
	},
	navDrawerSub: {
		fontFamily: 'Raleway',
		fontSize: '1.2em',
		textTransform: 'uppercase',
		letterSpacing: '0.1rem'
	},
	title: {
		fontFamily: 'Raleway',
		fontSize: '1.8em',
		textTransform: 'capitalize',
		textAlign: 'left',
		lineHeight: '1.4em'
	}
};
