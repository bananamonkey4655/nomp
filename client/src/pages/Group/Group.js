import { useSocket } from "../../context/SocketProvider";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import "./Group.css";

const Group = () => {
  const [nickname, setNickname] = useState("");
  const [groupId, setGroupId] = useState("");
  const { socket, initSocket } = useSocket();
  const navigate = useNavigate();

  useEffect(() => {
    initSocket();
  }, []);

  const joinGroup = (e, isHost) => {
    e.preventDefault();
    if (groupId === "") return;

    socket.emit("join-group", { nickname, groupId, isHost });
    navigate("/lobby", { state: { name: nickname } });
  };

  return (
    <div className="group-wrapper">
      <div className="group-container">
        <h1>Create or join a group</h1>
        <form>
          <label>
            Nickname:
            <input
              type="text"
              placeholder="Your name"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              required
            ></input>
          </label>

          <label>
            Room:
            <input
              type="text"
              placeholder="Join room ID"
              value={groupId}
              onChange={(e) => setGroupId(e.target.value)}
              required
            ></input>
          </label>
          <button onClick={(e) => joinGroup(e, true)} className="create-button">
            Create a group
          </button>
          <button onClick={(e) => joinGroup(e, false)}>Join Group</button>
        </form>
      </div>
    </div>
  );
};

export default Group;
