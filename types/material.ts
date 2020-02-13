import { Theme } from '@material-ui/core/styles/createMuiTheme';

export interface SpTypography {
  primary: string;
  secondary: string;
  body: string;
  error: string;
  success: string;
  warning: string;
  info: string;
  gray: string;
  primaryDark: string;
  primaryDarker: string;
  highlight: string;
  white: string;
}

interface Status {
  success: string;
  warning: string;
  error: string;
  info: string;
}

declare module '@material-ui/core/styles/createPalette' {
  interface SimplePaletteColorOptions {
    light?: string;
    lighter?: string;
    main: string;
    dark?: string;
    contrastText?: string;
    disabled?: string;
  }
  interface Palette {
    contrastThreshold: number;
    tonalOffset: number;
    primary: PaletteColor;
    secondary: PaletteColor;
  }
  interface PaletteOptions {
    contrastThreshold?: number;
    tonalOffset?: number;
  }
}

declare module '@material-ui/core/styles/createMuiTheme' {
  interface Theme {
    status: Status;
    text: SpTypography;
  }
  interface ThemeOptions {
    status: Status;
    text: SpTypography;
  }
}
