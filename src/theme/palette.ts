import { getContrastRatio, PaletteOptions } from "@mui/material";

declare module '@mui/material/styles' {
	// interface PaletteColor {
	//   darker?: string;
	// }

	// interface PaletteOptions {
	// 	yellow?: PaletteColorOptions;
	// }
}

export const palette: PaletteOptions = {
  primary: {
    main: '#684430',
    light: '#B49C83',
    dark: '#482f21',
    contrastText: '#eee'
  },
}

export const BOX_SHADOW = 2;