import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Header from "./components/layouts/Header";
import Search from "./components/Search";
import Create from "./components/Create";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/search" element={<Header />} />
          <Route path="/create" element={<Header />} />
        </Routes>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/create" element={<Create />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
