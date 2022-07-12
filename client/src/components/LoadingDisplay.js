import styles from "../styles/LoadingDisplay.module.css";

function LoadingDisplay() {
  return (
    <div className={styles.container}>
      <div className={styles.spinner}></div>
    </div>
  );
}

export default LoadingDisplay;
