import { useAuth } from "../context/AuthProvider";

import Logo from "../components/Logo/Logo";
import CreateGroupButton from "../components/CreateGroupButton/CreateGroupButton";

const Home = () => {
  const { token } = useAuth();

  return (
    <div className="home d-flex flex-column">
      <div className="logo-creategroup position-relative d-flex justify-content-center">
        <div className="position-absolute top-0 start-0 mt-3 ms-3">
          <Logo />
        </div>
        {token ? <CreateGroupButton /> : <h1>Nomp Homepage placeholder</h1>}
      </div>
      <div className="searchbar d-flex justify-content-center"></div>
    </div>
  );
};

export default Home;
