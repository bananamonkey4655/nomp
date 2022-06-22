import { useSocket } from "../context/SocketProvider";
import { useEffect, useState } from "react";

const Lobby = () => {
  const { socket } = useSocket();
  const [members, setMembers] = useState([]);

  useEffect(() => {
    socket.on("new-member", (allMembers) => {
      setMembers(allMembers);
    });
  }, [socket]);

  return members?.length ? (
    <div>
      {members.map((member) => (
        <div>{member}</div>
      ))}
    </div>
  ) : (
    <h1>Loading...</h1>
  );
};

export default Lobby;
