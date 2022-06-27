import { useAuth } from "../context/AuthProvider";

import Logo from "../components/Logo/Logo";
import CreateGroupButton from "../components/CreateGroupButton/CreateGroupButton";

const Home = () => {
  const { token } = useAuth();

  return (
    <div className="home d-flex flex-column">
      <div className="logo-creategroup position-relative d-flex justify-content-center">
        {token ? <CreateGroupButton /> : <h1>Nomp Homepage placeholder</h1>}
      </div>
      <div className="searchbar d-flex justify-content-center"></div>
    </div>
  );
};

export default Home;
