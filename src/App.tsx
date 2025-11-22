import { BrowserRouter, Routes, Route } from "react-router-dom";
import QRGenerator from "./pages/QRGenerator";
import JoinEvent from "./pages/JoinEvent";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<QRGenerator />} />
        <Route path="/join" element={<JoinEvent />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;