import { SxProps, Theme, TypographyVariantsOptions } from '@mui/material';
import { TypographyOptions } from '@mui/material/styles/createTypography';

declare module '@mui/material/styles' {
	interface TypographyVariants {
		navBarMenu: SxProps<Theme> ;
	}

	interface TypographyVariantsOptions {
    navBarMenu?: SxProps<Theme>;
  }
}

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    navBarMenu: true;
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
		color: 'black',
		fontSize: '1.6em',
		'@media (max-width:600px)': {
			fontSize: '1.8em'
		}
	},
	h2: {
		color: 'black',
		fontSize: '0.9em',
		fontWeight: '400',
		'@media (max-width:600px)': {
			fontSize: '1.0em',
			fontWeight: '500'
		}
	},
	navBarMenu: {
		color: 'black',
		fontSize: '0.9em',
		textAlign: 'start'
	},
};
