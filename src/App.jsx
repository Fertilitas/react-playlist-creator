import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PlaylistCreator from "./pages/PlaylistCreator";
import SwitchDarkMode from "./components/SwitchDarkMode";
import { ThemeProvider } from "./contexts/ThemeContext";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Routes>
          <Route path="/" element={<PlaylistCreator />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <SwitchDarkMode />
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
