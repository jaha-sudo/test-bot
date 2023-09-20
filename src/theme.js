import { createTheme } from "@mui/material";

const appTheme = createTheme({
  palette: {
    primary: {
      main: "#8F797E",
      contrastText: "#f5f5f5",
    },
    secondary: {
      main: "#f5f5f5",
      contrastText: "#8F797E",
    },
  },
});

export default appTheme;
