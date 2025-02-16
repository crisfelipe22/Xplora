import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2E1F5E', 
    },
    secondary: {
      main: '#6239E6',
    },
  },
  breakpoints: {
    values: {
      mobile: 0,
      tablet: 744,
      desktop: 1440,
    },
  },
});

export default theme;
