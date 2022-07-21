import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";
import { SocketProvider } from "./context/SocketProvider";

import ProtectedRoute from "./router/ProtectedRoute";
import Navigation from "./pages/Navigation/Navigation";
import NoMatch from "./pages/NoMatch";
import Home from "./pages/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Dashboard from "./pages/Dashboard";
import Group from "./pages/Group/Group";
import FindEatery from "./pages/FindEatery/FindEatery";
import GroupSettings from "./components/GroupSettings/GroupSettings";
import Lobby from "./pages/Lobby/Lobby";
import { AnimatePresence } from "framer-motion";
import ResultsPage from "./pages/ResultsPage/ResultsPage";

import "./App.css";

const App = () => {
  const location = useLocation();

  return (
    <AuthProvider>
      <SocketProvider>
        <Navigation />
        <main className="app-body">
        <AnimatePresence>
          <Routes location={location} key={location.key}>
            <Route index element={ <Home /> } />
            <Route path="/home" element={ <Home /> } />
            <Route path="/login" element={ <Login /> } />
            <Route path="/register" element={<Register />} />
            <Route location={location} key={location.key} element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/group" element={<Group />} />
              <Route path="/lobby" element={<Lobby />} />
              <Route path="/searchsettings" element={<GroupSettings />} />
              <Route path="/findeatery/:location/" element={<FindEatery />} />
              <Route
                path="/findeatery/:location/:term"
                element={<FindEatery />}
              />
              <Route path="/gameover" element={<ResultsPage />} />
            </Route>
            <Route path="*" element={<NoMatch />} />
          </Routes>
        </AnimatePresence>
        </main>
      </SocketProvider>
    </AuthProvider>
  );
};

export default App;
