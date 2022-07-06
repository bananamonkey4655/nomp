import group2 from "../../assets/group_img_2.png";
import food4 from "../../assets/food_img_4.png";
import styles from "./Home.module.css";

import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <section>
        <h1 className={styles.title}>Find food with friends!</h1>
        <p className={styles.description}>
          Join or create a group, then set your preferences and click to find a
          place to eat!
        </p>
        <button onClick={() => navigate("/group")} className={styles.button}>
          Get Started
        </button>
        <img src={food4} className={styles.food} />
        <div className={styles.background}></div>
      </section>
      <div className={styles.box}>
        <img src={group2} />
      </div>
    </div>
  );
};

export default Home;
