import "styles/App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import ProtectedRoute from "utils/ProtectedRoute";
import Navbar from "components/Navbar";
import NoMatch from "pages/NoMatch";
import Home from "pages/Home";
import Login from "pages/Login";
import Logout from "pages/Logout";
import Register from "pages/Register";
import Dashboard from "pages/Dashboard";
import Group from "pages/Group";
import Lobby from "pages/Lobby";
import Voting from "pages/Voting";
import ResultsPage from "pages/ResultsPage";

import { Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "context/AuthProvider";
import { SocketProvider } from "context/SocketProvider";
import { AnimatePresence } from "framer-motion";

function App() {
  const location = useLocation();

  return (
    <AuthProvider>
      <SocketProvider>
        <Navbar />
        <main className="app-body">
          <AnimatePresence exitBeforeEnter>
          <Routes location={location} key={location.key}>
            <Route index element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/group" element={<Group />} />
              <Route path="/group/:groupInviteId" element={<Group />} />
              <Route path="/lobby" element={<Lobby />} />
              <Route path="/voting" element={<Voting />} />
              <Route path="/gameover" element={<ResultsPage />} />
              <Route path="/signout" element={<Logout />} />
            </Route>
            <Route path="*" element={<NoMatch />} />
          </Routes>
          </AnimatePresence>
        </main>
      </SocketProvider>
    </AuthProvider>
  );
}

export default App;
