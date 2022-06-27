import { useAuth } from "../context/AuthProvider";

import Logo from "../components/Logo/Logo";
import CreateGroupButton from "../components/CreateGroupButton/CreateGroupButton";
import group2 from "../assets/group_img_2.png";
import group1 from "../assets/group_img.png";
import food1 from "../assets/food_img_1.png";
import food2 from "../assets/food_img_2.png";
import food3 from "../assets/food_img_3.png";
import food4 from "../assets/food_img_4.png";
import "./Home.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const { token } = useAuth();

  // return (
  //   <div className="home d-flex flex-column">
  //     <div className="logo-creategroup position-relative d-flex justify-content-center">
  //       {token ? <CreateGroupButton /> : <h1>Nomp Homepage placeholder</h1>}
  //     </div>
  //     <div className="searchbar d-flex justify-content-center"></div>
  //   </div>
  // );
  return (
    <div className="home-wrapper">
      <section>
        <h1>Find food with friends!</h1>
        <p>
          Join or create a group, then set your preferences and click to find a
          place to eat!
        </p>
        <button onClick={() => navigate("/group")}>Get Started</button>
        <div className="food-img-box">
          <img src={food4} />
        </div>
        <div className="red-circle"></div>
      </section>
      <div className="img-box">
        <img src={group2} />
      </div>
    </div>
  );
};

export default Home;
