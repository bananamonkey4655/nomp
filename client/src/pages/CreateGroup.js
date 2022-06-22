import { useSocket } from "../context/SocketProvider";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const CreateGroup = () => {
  const [nickname, setNickname] = useState("");
  const [group, setGroup] = useState("");
  const { socket, initSocket } = useSocket();
  const navigate = useNavigate();

  useEffect(() => {
    initSocket();
  }, []);

  const joinGroup = (e) => {
    e.preventDefault();
    if (group === "") return;

    console.log("Joining group: " + nickname + " " + group);
    socket.nickname = nickname;
    socket.group = group;
    socket.emit("join-group", group);
    navigate("/lobby");
  };

  return (
    <>
      <h1>Join a group:</h1>
      <form id="group" onSubmit={joinGroup}>
        <label>Nickname:</label>
        <input
          type="text"
          placeholder="Your name"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          required
        ></input>
        <label>Room:</label>
        <input
          type="text"
          placeholder="Join room ID"
          value={group}
          onChange={(e) => setGroup(e.target.value)}
          required
        ></input>
      </form>
      <button type="submit" form="group">
        Join group
      </button>
    </>
  );
};

export default CreateGroup;
