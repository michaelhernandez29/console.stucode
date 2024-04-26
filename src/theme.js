import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#590D82",
      light: "#590D82",
      dark: "#590D82",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#FF4081",
      light: "#FF80AB",
      dark: "#F50057",
      contrastText: "#FFFFFF",
    },
    error: {
      main: "#f44336",
      light: "#e57373",
      dark: "#d32f2f",
      contrastText: "#FFFFFF",
    },
    warning: {
      main: "#FFC107",
      light: "#FFD54F",
      dark: "#FFA000",
      contrastText: "#FFFFFF",
    },
    info: {
      main: "#2196F3",
      light: "#64B5F6",
      dark: "#1976D2",
      contrastText: "#FFFFFF",
    },
    success: {
      main: "#4CAF50",
      light: "#81C784",
      dark: "#388E3C",
      contrastText: "#FFFFFF",
    },
    background: {
      default: "#FFFFFF",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#590D82",
      secondary: "#757575",
      disabled: "#BDBDBD",
      hint: "#9E9E9E",
    },
    action: {
      active: "#590D82",
      hover: "rgba(0, 0, 0, 0.08)",
      hoverOpacity: 0.08,
      selected: "rgba(0, 0, 0, 0.14)",
      selectedOpacity: 0.14,
      disabled: "rgba(0, 0, 0, 0.26)",
      disabledBackground: "rgba(0, 0, 0, 0.12)",
      disabledOpacity: 0.38,
      focus: "rgba(0, 0, 0, 0.12)",
      focusOpacity: 0.12,
      activatedOpacity: 0.12,
    },
  },
  typography: {
    fontFamily: [
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    h1: {
      fontWeight: 500,
      fontSize: "2.25rem",
      lineHeight: 1.2,
    },
    h2: {
      fontWeight: 500,
      fontSize: "2rem",
      lineHeight: 1.2,
    },
    h3: {
      fontWeight: 500,
      fontSize: "1.75rem",
      lineHeight: 1.2,
    },
    h4: {
      fontWeight: 500,
      fontSize: "1.5rem",
      lineHeight: 1.2,
    },
    h5: {
      fontWeight: 500,
      fontSize: "1.25rem",
      lineHeight: 1.2,
    },
    h6: {
      fontWeight: 500,
      fontSize: "1rem",
      lineHeight: 1.2,
    },
    subtitle1: {
      fontSize: "1rem",
      lineHeight: 1.2,
    },
    subtitle2: {
      fontSize: "0.875rem",
      lineHeight: 1.2,
    },
    body1: {
      fontSize: "1rem",
      lineHeight: 1.5,
    },
    body2: {
      fontSize: "0.875rem",
      lineHeight: 1.5,
    },
    button: {
      fontSize: "1rem",
      lineHeight: 1.75,
      textTransform: "none",
    },
    caption: {
      fontSize: "0.75rem",
      lineHeight: 1.66,
    },
    overline: {
      fontSize: "0.75rem",
      fontWeight: 500,
      lineHeight: 2.66,
      textTransform: "uppercase",
    },
  },
});

export default theme;
