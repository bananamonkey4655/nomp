import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { Routes, Route } from "react-router-dom";

import { AuthProvider } from "./context/AuthProvider";
import ProtectedRoute from "./router/ProtectedRoute";
import Navigation from "./pages/Navigation/Navigation";
import NoMatch from "./pages/NoMatch";
import Home from "./pages/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Dashboard from "./pages/Dashboard";
import CreateGroup from "./pages/CreateGroup";
import FindEatery from "./pages/FindEatery/FindEatery";

const App = () => {
  return (
    <AuthProvider>
      <div>
        <Navigation />
        <Routes>
          <Route index element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/creategroup" element={<CreateGroup />} />
            <Route path="/findeatery/:location/" element={<FindEatery />} />
            <Route
              path="/findeatery/:location/:term"
              element={<FindEatery />}
            />
          </Route>
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </div>
    </AuthProvider>
  );
};

export default App;
