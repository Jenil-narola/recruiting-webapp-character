import { createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
    },
    secondary: {
      main: '#f48fb1',
    },
  },
  components: {
    MuiBox: {
      styleOverrides: {
        root: {
          border: '1px solid #424242',
          boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16)',
          borderRadius: '25px',
        },
      },
    },
  },
});

export default darkTheme;
