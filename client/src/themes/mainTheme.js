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

    MuiSpeedDial: {
      defaultProps: {
        FabProps: {
          sx: {
            backgroundImage: 'linear-gradient(45deg, #D38312 , #A83279)',
            borderRadius: '100%',
            color: '#DDDEE2',
            width: '50px',
            height: '50px',
          },
        },
      },
      styleOverrides: {
        root: {},
      },
    },
  },

  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
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
