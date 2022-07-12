import styles from "../styles/NoMatch.module.css";

const NoMatch = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>404</h1>
      <h2 className={styles.text}>Page not found</h2>
    </div>
  );
};

export default NoMatch;
