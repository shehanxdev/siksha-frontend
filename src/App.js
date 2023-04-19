import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./screens/Login/Login";
import Dashboard from "./screens/Dashboard/Dashboard";
import NavBar from "./components/NavBar/NavBar";
import AddInuiry from "./screens/AddInquiry/AddInuiry";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <div style={{ minHeight: "100vh" }}>
      <NavBar />
      <BrowserRouter>
        <Routes>
          <Route path="" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/add" element={<AddInuiry />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
