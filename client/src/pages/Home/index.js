import styles from "./Home.module.css";
import groupImage from "../../assets/group_img_2.png";
import foodImage from "../../assets/food_img_4.png";

import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

function Home() {
  const navigate = useNavigate();

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
        staggerChildren: 0.5,
      },
    },
  };

  // children of section
  const childVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 1,
      },
    },
  };

  // homepage variant
  const pageVariants = {
    exit: {
      opacity: 0,
      transition: { duration: 0.5 },
    },
    //exit: {
    //  x: '-100vw',
    //  transition: { ease: 'easeInOut' }
    //}
  };

  // get started button
  const buttonVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        // delay as button will not use childVariant but still has to appear in order
        delay: 1,
        duration: 1,
      },
    },
    hover: {
      scale: 1.1,
      textShadow: "0px 0px 8px rgb(255,255,255)",
      boxShadow: "0px 0px 8px rgb(255,255,255)",
      transition: {
        duration: 0.5,
        repeat: Infinity,
        repeatType: "reverse",
      },
    },
  };

  const containerVariants = {
    hidden: { opacity: 0, x: "-100vw" },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <motion.div
      variants={pageVariants}
      exit="exit"
      className={styles.container}
    >
      <motion.section
        variants={parentVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 variants={childVariants} className={styles.title}>
          {" "}
          Find food with friends!
        </motion.h1>
        <motion.p variants={childVariants} className={styles.description}>
          Join a group, set your preferences and vote with your friends to find
          a place to eat!
        </motion.p>
        <motion.div
          variants={buttonVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
          className="button-box"
        >
          <button onClick={() => navigate("/group")} className={styles.button}>
            Get Started
          </button>
        </motion.div>
        <motion.div variants={childVariants}>
          <img src={foodImage} className={styles.food} />
        </motion.div>
        <div className="red-circle"></div>
      </motion.section>
      <div className={styles.box}>
        <motion.img
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1.5 }}
          src={groupImage}
        />
      </div>
    </motion.div>
  );
}

export default Home;