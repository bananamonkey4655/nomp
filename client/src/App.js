import './App.css';
import Login from "./components/Login";
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home';
import CreateGroup from './pages/CreateGroup'
import NavBar from './components/NavBar/NavBar';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div>
      <BrowserRouter>
        <NavBar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/creategroup" element={<CreateGroup />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
