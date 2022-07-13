import { motion } from "framer-motion";
import "./loader.css";

const Loader = (props) => {
    const loaderVariants = {
        animation: {
            x: [-20, 20],
            y: [0, -30],
            transition: {
                x: {
                    repeat: Infinity,
                    repeatType: 'reverse',
                    duration: 0.5
                    },
                y: {
                    repeat: Infinity,
                    repeatType: 'reverse',
                    duration: 0.25,
                    ease: 'easeOut'
                }
                
            }
        } 
    }

    return (
        <>
        <div className="loader-wrapper d-flex flex-column justify-content-center align-items-center">
        <div className="loader-text fs-1 fw-bold">
        {props.message}
        </div>
        <motion.div className="loader mt-5"
        variants={loaderVariants}
        animate="animation"
        >
        </motion.div>
        </div>
        </>  
    );
}
 
export default Loader;