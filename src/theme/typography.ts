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
		color: 'black',
		'@media (max-width:600px)': {
			fontSize: '1.2em'
		}
	},
	body2: {
		fontFamily: 'Raleway',
		color: 'black',
		fontSize: '0.9em',
		'@media (max-width:600px)': {
			fontSize: '1.1em'
		}
	},
	subtitle1: {
		fontSize: '0.6em',
		fontWeight: '300',
		'@media (max-width:600px)': {
			fontSize: '1.2em'
		}
	},
	h1: {
		fontFamily: 'Raleway',
		color: 'black',
		fontSize: '1.7em',
		fontWeight: '500',
		textTransform: 'uppercase',
	},
	h2: {
		color: 'black',
		fontSize: '1.3em',
		fontWeight: '400',
		'@media (max-width:600px)': {
			fontSize: '1.0em',
			fontWeight: '500'
		}
	},
	navBarMenu: {
		color: 'black',
		fontSize: '0.9em',
		textAlign: 'start',
		textTransform: 'uppercase'
	},
	navDrawer: {
		fontFamily: 'Raleway',
		color: 'black',
		fontSize: '1.4em',
		textTransform: 'uppercase',
		letterSpacing: '0.2rem'
	},
	navDrawerSub: {
		fontFamily: 'Raleway',
		color: 'black',
		fontSize: '1.2em',
		textTransform: 'uppercase',
		letterSpacing: '0.1rem'
	},
	title: {
		fontFamily: 'Raleway',
		color: 'black',
		fontSize: '1.8em',
		textTransform: 'capitalize',
		textAlign: 'left',
		lineHeight: '1.4em'
	}
};
