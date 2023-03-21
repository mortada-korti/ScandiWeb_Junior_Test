export const MainTheme = (darkMode) => ({
  palette: {
    mode: darkMode ? "dark" : "light",
    primary: {
      main: "#186b96",
    },
    secondary: {
      main: "#f50057",
    },
    error: {
      main: "#ad0000",
    },
    success: {
      main: "#018509",
    },
    divider: darkMode ? "rgb(255,255,255,0.1)" : "rgb(0,0,0,0.1)",
    background: {
      default: darkMode ? "#1A1A1A" : "#eee",
      paper: darkMode ? "#222" : "#fff",
    },
  },
});
