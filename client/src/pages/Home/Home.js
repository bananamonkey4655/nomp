import styles from "./Home.module.css";
import groupImage from "assets/bg/group_img_2.png";
import foodImage from "assets/bg/food_img_4.png";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSocket } from "context/SocketProvider";
import { motion } from "framer-motion";
import Button from "react-bootstrap/esm/Button";

function Home() {
  // framer-motion variants
  // section
  const parentVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.75,
        staggerChildren: 0.75,
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
        duration: 0.25,
      },
    },
  };

  // homepage variant
  const pageVariants = {
    // exit: {
    //   opacity: 0,
    //   transition: { duration: 1 },
    // },
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
        duration: 0.5,
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

  const navigate = useNavigate();

  return (
    <div className={styles.wrapper}>
      <motion.div
        variants={pageVariants}
        exit="exit"
        className={styles.container}
      >
        <motion.section
          variants={parentVariants}
          initial="hidden"
          animate="visible"
          className={styles.left}
        >
          <motion.h1 variants={childVariants} className={styles.title}>
            Find food with friends!
          </motion.h1>
          <motion.p variants={childVariants} className={styles.description}>
            Join a group, set your preferences and vote with your friends to
            find a place to eat!
          </motion.p>
          <motion.div
            variants={buttonVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
          >
            <Button
              size="lg"
              onClick={() => navigate("/group")}
              className={styles.button}
            >
              Get Started
            </Button>
          </motion.div>
          <motion.div variants={childVariants} className={styles.foodContainer}>
            <img
              src={foodImage}
              className={styles.food}
              alt="A plate of food"
            />
          </motion.div>
          <div className="red-circle"></div>
        </motion.section>
        <div className={styles.box}>
          <motion.img
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25, duration: 0.5 }}
            src={groupImage}
            alt="Landing page image"
          />
        </div>
      </motion.div>
    </div>
  );
}

export default Home;
