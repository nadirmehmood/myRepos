// import Home from "./components/pages/Home";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Login from "./Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Transactions from "./pages/Transactions";
import Users from "./pages/Users";
import Navbar from "./components/Navbar";
// import ProtectedRoutes from "./ProtectedRoutes";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />

          <Route element={<Navbar />}>
            <Route path="/Home" element={<Home />} />
            <Route path="/Users" element={<Users />} />
            <Route path="/Transactions" element={<Transactions />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
