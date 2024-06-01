import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PlaylistCreator from "./pages/PlaylistCreator";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PlaylistCreator />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
