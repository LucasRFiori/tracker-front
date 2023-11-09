import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SelectDevice } from "./pages/SelectDevice";
import { TrackDeviceById } from "./pages/TrackDeviceById";
import "./global.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" index element={<SelectDevice />} />
        <Route path="/location/:deviceId?" element={<TrackDeviceById />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
