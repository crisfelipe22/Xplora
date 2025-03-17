import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#6239E6",
    },
    secondary: {
      main: "#2E1F5E",
      dark: "#110A29"
    },
    text: {
      primary: "#05030D",
    },
    background: {
      paper: "#F2EFFD",
      default: "#F9F7FF",
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
