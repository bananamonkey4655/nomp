import "./Group.css";
import Button from "react-bootstrap/esm/Button";

import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import { useSocket } from "../../context/SocketProvider";
import { motion } from "framer-motion";

function Group() {
  // grouppage variant
  const pageVariants = {
    exit: {
      opacity: 0,
      transition: { duration: 0.5 },
    },
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

  const [nickname, setNickname] = useState("");
  const [roomName, setRoomName] = useState("");
  const { socket, initSocket } = useSocket();
  const navigate = useNavigate();
  const { groupInviteId } = useParams();

  useEffect(() => {
    initSocket();
  }, []);

  useEffect(() => {
    if (groupInviteId) {
      setRoomName(groupInviteId);
    }
  }, []);

  const joinGroup = (e, isHost) => {
    e.preventDefault();
    if (nickname === "" || roomName === "") return;

    socket.name = nickname;
    socket.groupId = roomName;

    socket.emit("user:join-group", {
      nickname: nickname,
      groupId: roomName,
      isHost: isHost,
    });

    navigate("/lobby");
  };

  return (
    <motion.div
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="group-wrapper"
    >
      <div className="group-container">
        <h1>Create or Join a group</h1>
        <form>
          <label>
            Nickname:
            <input
              type="text"
              placeholder="Your name"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              required
              className="mx-1 my-1 w-100"
            ></input>
          </label>

          <label>
            Room:
            <input
              type="text"
              placeholder="Input room ID"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
              required
              className="mx-1 my-1 w-100"
            ></input>
          </label>
          <Button
            variant="danger"
            size="lg"
            onClick={(e) => joinGroup(e, true)}
            className="mt-3 shadow create-button"
          >
            Create a Group
          </Button>
          <Button
            variant="light"
            size="lg"
            onClick={(e) => joinGroup(e, false)}
            className="mt-3 shadow"
          >
            Join a Group
          </Button>
        </form>
      </div>
    </motion.div>
  );
}

export default Group;
