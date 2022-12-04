import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#3498db",
    },
    secondary: {
      main: "#EAF0F5",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        contained: {
          paddingTop: 4.5,
          paddingBottom: 4.5,
          paddingLeft: 6,
          paddingRight: 6,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        },
      },
    },
  },
});
