import "./Group.css";
import Button from "react-bootstrap/esm/Button";

import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSocket } from "context/SocketProvider";

function Group() {
  const { socket } = useSocket();
  const navigate = useNavigate();
  const { groupInviteId } = useParams();

  const [nickname, setNickname] = useState("");
  const [roomName, setRoomName] = useState("");

  useEffect(() => {
    if (groupInviteId) {
      setRoomName(groupInviteId);
    }
  }, []);

  const handleSubmit = (e, isHost) => {
    e.preventDefault();

    // Simple input validation
    const name = nickname.trim();
    const room = roomName.trim();

    if (!name || !room) {
      return;
    }

    socket.emit("try-join", name, room, (response) => {
      if (!response.ok) {
        console.log(response.error);
        //TODO: render error message
      } else {
        socket.name = name;
        socket.groupId = room;
        socket.isHost = isHost;
        navigate("/lobby");
      }
    });
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
              maxLength="20"
              required
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              className="mx-1 my-1 w-100"
            ></input>
          </label>

          <label>
            Room:
            <input
              type="text"
              placeholder="Input room ID"
              maxLength="20"
              required
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
              className="mx-1 my-1 w-100"
            ></input>
          </label>

          <Button
            variant="danger"
            size="lg"
            onClick={(e) => handleSubmit(e, true)}
            className="mt-3 shadow create-button"
          >
            Create a Group
          </Button>

          <Button
            variant="light"
            size="lg"
            onClick={(e) => handleSubmit(e, false)}
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
