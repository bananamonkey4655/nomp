import "./styles/App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";
import { SocketProvider } from "./context/SocketProvider";

import ProtectedRoute from "./router/ProtectedRoute";
import Navigation from "./pages/Navigation";
import NoMatch from "./pages/NoMatch";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Group from "./pages/Group";
import Voting from "./pages/Voting";
import GroupSettings from "./components/GroupSettings";
import Lobby from "./pages/Lobby";
import ResultsPage from "./pages/ResultsPage";

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
              <Route path="/group/:groupInviteId" element={<Group />} />
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
