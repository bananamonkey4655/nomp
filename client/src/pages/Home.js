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
import Button from "react-bootstrap/esm/Button";
import { motion, AnimatePresence } from "framer-motion";

const Home = () => {
  const navigate = useNavigate();
  const { token } = useAuth();

  // framer-motion variants
  // section
  const parentVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 1,
        staggerChildren: 0.5
      }
    },
  }

  // children of section
  const childVariants ={
    hidden: {
      opacity: 0
    },
    visible: {
      opacity : 1,
      transition: {
        duration: 1
      }
    },
  }

  // homepage variant
  const pageVariants ={
    exit: {
      opacity: 0,
      transition: { duration : 0.5}
    },
    //exit: {
    //  x: '-100vw',
    //  transition: { ease: 'easeInOut' }
    //}
  }

  // get started button
  const buttonVariants ={
    hidden: {opacity : 0},
    visible: {
      opacity: 1,
      transition: {
        // delay as button will not use childVariant but still has to appear in order
        delay: 1,
        duration: 1
      }
    },
    hover: {
      scale: 1.1,
      textShadow: "0px 0px 8px rgb(255,255,255)",
      boxShadow: "0px 0px 8px rgb(255,255,255)",
      transition: {
        duration: 0.5,
        repeat: Infinity,
        repeatType: 'reverse'
      }
    }
  }

  const containerVariants = {
    hidden: {opacity : 0, x: '-100vw'},
    visible: {opacity : 1, x : 0}
  }

  // return (
  //   <div className="home d-flex flex-column">
  //     <div className="logo-creategroup position-relative d-flex justify-content-center">
  //       {token ? <CreateGroupButton /> : <h1>Nomp Homepage placeholder</h1>}
  //     </div>
  //     <div className="searchbar d-flex justify-content-center"></div>
  //   </div>
  // );
  return (
    <motion.div variants={pageVariants} exit="exit" className="home-wrapper">
      <motion.section variants={parentVariants} initial="hidden" animate="visible">
        <motion.h1 variants={childVariants}> Find food with friends!</motion.h1>
        <motion.p variants={childVariants}>
          Join or create a group, then set your preferences and click to find a
          place to eat!
        </motion.p>
        <motion.div variants={buttonVariants} initial="hidden" animate="visible" whileHover="hover" className="button-box">
        <Button
        variant="primary"
        size="lg" 
        onClick={() => navigate("/group")}
        className="fw-bold"
        >
        Get Started
        </Button>
        </motion.div>
        <motion.div variants={childVariants} className="food-img-box">
          <img src={food4} />
        </motion.div>
        <div className="red-circle"></div>
      </motion.section>
      <div className="img-box">
        <motion.img
        initial={{ opacity: 0 }} 
        animate={{ opacity : 1 }} 
        transition={{ delay : 1, duration : 1.5 }} 
        src={group2} 
        />
      </div>
    </motion.div>
  );
};

export default Home;
