import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material";
import { theme } from "./theme";
import WeatherCard from "./WeatherCard";
function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="app">
        <CssBaseline />
        <WeatherCard />
      </div>
    </ThemeProvider>
  );
}

export default App;
