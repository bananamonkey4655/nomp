import {
  stars_zero,
  stars_one,
  stars_one_half,
  stars_two,
  stars_two_half,
  stars_three,
  stars_three_half,
  stars_four,
  stars_four_half,
  stars_five,
} from "../../assets/ratings";

import styles from "./ReviewStars.module.css";

function ReviewStars({ rating }) {
  switch (rating) {
    case 0:
      return (
        <div className={styles.container}>
          <img src={stars_zero} alt="Zero Stars" className={styles.stars} />
        </div>
      );
    case 1:
      return (
        <div className={styles.container}>
          <img src={stars_one} alt="One Stars" className={styles.stars} />
        </div>
      );
    case 1.5:
      return (
        <div className={styles.container}>
          <img
            src={stars_one_half}
            alt="One Half Stars"
            className={styles.stars}
          />
        </div>
      );
    case 2:
      return (
        <div className={styles.container}>
          <img src={stars_two} alt="Two Stars" className={styles.stars} />
        </div>
      );
    case 2.5:
      return (
        <div className={styles.container}>
          <img
            src={stars_two_half}
            alt="Two Half Stars"
            className={styles.stars}
          />
        </div>
      );
    case 3:
      return (
        <div className={styles.container}>
          <img src={stars_three} alt="Three Stars" className={styles.stars} />
        </div>
      );
    case 3.5:
      return (
        <div className={styles.container}>
          <img
            src={stars_three_half}
            alt="Three Half Stars"
            className={styles.stars}
          />
        </div>
      );
    case 4:
      return (
        <div className={styles.container}>
          <img src={stars_four} alt="Four Stars" className={styles.stars} />
        </div>
      );
    case 4.5:
      return (
        <div className={styles.container}>
          <img
            src={stars_four_half}
            alt="Four Half Stars"
            className={styles.stars}
          />
        </div>
      );
    case 5:
      return (
        <div className={styles.container}>
          <img src={stars_five} alt="Five Stars" className={styles.stars} />
        </div>
      );
    default:
      return (
        <div className={styles.container}>
          <img src={stars_zero} alt="No Rating" className={styles.stars} />
        </div>
      );
  }
}

export default ReviewStars;
