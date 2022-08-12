import styles from "./ErrorPage.module.css";

import { useNavigate } from "react-router-dom";

function ErrorPage({ error }) {
  const navigate = useNavigate();

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.error}>{error}</h1>
      <button onClick={() => navigate(-1)} className={styles.return}>
        Go back
      </button>
    </div>
  );
}

export default ErrorPage;
