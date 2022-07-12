import { useSocket } from "../context/SocketProvider";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import "../styles/Group.css";

const Group = () => {
  const [nickname, setNickname] = useState("");
  const [roomName, setRoomName] = useState("");
  const { socket, initSocket, setName, setGroupId } = useSocket();
  const navigate = useNavigate();
  const { groupInviteId } = useParams();

  useEffect(() => {
    initSocket();
  }, []);

  // useEffect(() => {
  //   if (socket && groupInviteId) {
  //     socket.emit("user:join-group", {
  //       nickname: "GUEST",
  //       groupId: groupInviteId,
  //       isHost: false,
  //     });
  //     setName("GUEST");
  //     setGroupId(groupInviteId);

  //     navigate("/lobby", { state: { name: "GUEST" } });
  //   }
  // }, [socket, groupInviteId]);

  const joinGroup = (e, isHost) => {
    e.preventDefault();
    if (roomName === "") return;

    socket.emit("user:join-group", { nickname, groupId: roomName, isHost });
    setName(nickname);
    setGroupId(roomName);

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
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
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
