// import Home from "./components/pages/Home";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Login from "./Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Transactions from "./pages/Transactions";
import Users from "./pages/Users";
import Home from "./components/Home";
// import ProtectedRoutes from "./ProtectedRoutes";
import "./Login.css";
import Public from "./components/Public";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route path="/public" element={<Public />} />
          <Route path="/home" element={<Home />} />
          <Route exact path="/home/Users" element={<Users />} />
          <Route exact path="/home/Transactions" element={<Transactions />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
