import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Header from "./components/layouts/Header";
import Search from "./components/Search";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/search" element={<Header />} />
        </Routes>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
