import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import MergeMusic from "./assets/pages/MergeMusic";
import AnotherMergeMusic from "./assets/pages/AnotherMergeMusic";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<MergeMusic/>} /> */}
        <Route path="/" element={<AnotherMergeMusic />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
