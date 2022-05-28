import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Image from "./components/Image";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/image/:filename" element={<Image />} />
      </Routes>
    </div>
  );
}

export default App;
