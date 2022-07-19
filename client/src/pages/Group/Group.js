import "./Group.css";
import Button from "react-bootstrap/esm/Button";

import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSocket } from "context/SocketProvider";

function Group() {
  const [nickname, setNickname] = useState("");
  const [roomName, setRoomName] = useState("");
  const { socket, initSocket } = useSocket();
  const navigate = useNavigate();
  const { groupInviteId } = useParams();

  useEffect(() => {
    if (!socket) {
      initSocket();
    }
  }, []);

  useEffect(() => {
    if (groupInviteId) {
      setRoomName(groupInviteId);
    }
  }, []);

  const joinGroup = (e, isHost) => {
    e.preventDefault();

    // Simple input validation
    const name = nickname.trim();
    const room = roomName.trim();

    if (!name || !room) {
      return;
    }

    socket.name = name;
    socket.groupId = room;

    socket.emit("user:join-group", {
      nickname: name,
      groupId: room,
      isHost: isHost,
    });

    navigate("/lobby");
  };

  return (
    <div className="group-wrapper">
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
    </div>
  );
}

export default Group;
