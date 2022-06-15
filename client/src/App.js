
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import './App.css';
import CreateGroup from './pages/CreateGroup'
import NavBar from './components/NavBar/NavBar';
import { AuthProvider } from "./context/AuthProvider";
import ProtectedRoute from "./router/ProtectedRoute";
import Navigation from "./pages/Navigation";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import NoMatch from "./pages/NoMatch";
import Register from "./pages/Register";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    document.title = "Nomp";
  }, []);

  return (
    <AuthProvider>
      <div>
        <h1 style={{ backgroundColor: "wheat" }}>Nomp App</h1>
        <Navigation />
        <Routes>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="/creategroup" element={<CreateGroup />} />
          <Route path="register" element={<Register />} />
          <Route
            path="dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
