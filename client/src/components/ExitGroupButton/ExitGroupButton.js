import styles from "./ExitGroupButton.module.css";

import { useNavigate } from "react-router-dom";
import { useSocket } from "context/SocketProvider";

function ExitGroupButton() {
  const { disconnectSocket } = useSocket();
  const navigate = useNavigate();

  const exitGroup = () => {
    disconnectSocket();
    navigate("/group");
  };

  return (
    <button className={styles.btn} onClick={exitGroup}>
      Exit Group
    </button>
  );
}

export default ExitGroupButton;
