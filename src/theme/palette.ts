import { getContrastRatio, PaletteColorOptions, PaletteOptions } from "@mui/material";

declare module '@mui/material/styles' {
	// interface PaletteColor {
	//   darker?: string;
	// }

	interface PaletteOptions {
		yellow?: PaletteColorOptions;
	}
}

const redBase = '#ff5757';

const brownBase = '#c98e17';

const yellowBase = '#ffde59';

export const palette: PaletteOptions = {
  primary: {
    main: '#f03a3a',
    light: redBase,
    dark: '#b23c3c',
    contrastText: '#eee'
  },
  secondary: {
    main: brownBase,
    light: '#cda422',
    dark: '#c26902',
    contrastText: getContrastRatio(brownBase, '#fff') > 4.5 ? '#fff' : '#111'
  },
  yellow: {
    main: yellowBase,
    light: '#fef0b7',
    dark: '#ffcc22',
    contrastText: getContrastRatio(yellowBase, '#fff') > 4.5 ? '#fff' : '#111'
  }
}