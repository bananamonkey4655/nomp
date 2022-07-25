import "./Group.css";
import Button from "react-bootstrap/esm/Button";

import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSocket } from "context/SocketProvider";
import ErrorMessage from "components/ErrorMessage";

function Group() {
  const { socket } = useSocket();
  const navigate = useNavigate();
  const { groupInviteId } = useParams();

  const [nickname, setNickname] = useState("");
  const [roomName, setRoomName] = useState("");
  const [error, setError] = useState(null);

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

    socket.emit("try-join", { name, roomId: room }, (response) => {
      if (!response.ok) {
        console.log(response.error);
        setError(response.error);
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
              pattern="[a-zA-Z0-9\s]+"
              required
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              className="mx-1 my-1 w-100"
            />
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
            />
          </label>

          {error && <ErrorMessage message={error} />}

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
