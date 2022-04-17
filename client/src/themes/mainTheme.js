import { createTheme } from '@mui/material/styles';

export const mainTheme = createTheme({
  components: {
    MuiButton: {
      defaultProps: {
        disableRipple: true,
        disableTouchRipple: true,
      },

      styleOverrides: {
        root: {
          borderRadius: 3,
          textTransform: 'none',
        },
      },
    },
  },

  palette: {
    mode: 'dark',
    primary: {
      main: '#C9A436',
    },
    secondary: {
      main: '#715c1f',
    },
    background: {
      default: '#232529',
      paper: '#212226',
    },
    text: {
      primary: '#DDDEE2',
    },
    error: {
      main: '#a32313',
    },
  },

  typography: {
    fontFamily: 'Montserrat',
  },
});
