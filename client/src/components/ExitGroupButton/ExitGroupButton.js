import styles from "./ExitGroupButton.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDoorOpen } from "@fortawesome/free-solid-svg-icons";

import { useNavigate } from "react-router-dom";
import { useSocket } from "context/SocketProvider";

function ExitGroupButton() {
  const { quitGroup } = useSocket();
  const navigate = useNavigate();

  const exitGroup = () => {
    quitGroup();
    navigate("/group");
  };

  return (
    <button className={styles.btn} onClick={exitGroup}>
      <FontAwesomeIcon icon={faDoorOpen} className={styles.exit} />
    </button>
  );
}

export default ExitGroupButton;
