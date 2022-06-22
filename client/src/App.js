import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";
import { SocketProvider } from "./context/SocketProvider";

import ProtectedRoute from "./router/ProtectedRoute";
import Navigation from "./pages/Navigation/Navigation";
import NoMatch from "./pages/NoMatch";
import Home from "./pages/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Dashboard from "./pages/Dashboard";
import CreateGroup from "./pages/CreateGroup";
import FindEatery from "./pages/FindEatery/FindEatery";
import GroupSettings from "./components/GroupSettings/GroupSettings";
import Lobby from "./pages/Lobby";

const App = () => {
  return (
    <AuthProvider>
      <SocketProvider>
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
              <Route path="/lobby" element={<Lobby />} />
              <Route path="/searchsettings" element={<GroupSettings />} />
              <Route path="/findeatery/:location/" element={<FindEatery />} />
              <Route
                path="/findeatery/:location/:term"
                element={<FindEatery />}
              />
            </Route>
            <Route path="*" element={<NoMatch />} />
          </Routes>
        </div>
      </SocketProvider>
    </AuthProvider>
  );
};

export default App;
