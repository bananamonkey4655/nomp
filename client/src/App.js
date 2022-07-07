import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";
import { SocketProvider } from "./context/SocketProvider";

import ProtectedRoute from "./router/ProtectedRoute";
import Navigation from "./pages/Navigation/Navigation";
import NoMatch from "./pages/NoMatch/NoMatch";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Dashboard from "./pages/Dashboard/Dashboard";
import Group from "./pages/Group/Group";
import Voting from "./pages/Voting/Voting";
import GroupSettings from "./components/GroupSettings/GroupSettings";
import Lobby from "./pages/Lobby/Lobby";
import ResultsPage from "./pages/ResultsPage/ResultsPage";

import "./App.css";

const App = () => {
  return (
    <AuthProvider>
      <SocketProvider>
        <Navigation />
        <main className="app-body">
          <Routes>
            <Route index element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/group" element={<Group />} />
              <Route path="/lobby" element={<Lobby />} />
              <Route path="/searchsettings" element={<GroupSettings />} />
              <Route path="/voting" element={<Voting />} />
              <Route path="/gameover" element={<ResultsPage />} />
            </Route>
            <Route path="*" element={<NoMatch />} />
          </Routes>
        </main>
      </SocketProvider>
    </AuthProvider>
  );
};

export default App;
