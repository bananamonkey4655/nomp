import { createContext, useContext, useState } from "react";
import { io } from "socket.io-client";
import BACKEND_URL from "../config";

const SocketContext = createContext();

const useSocket = () => useContext(SocketContext);

const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [name, setName] = useState("");
  const [groupId, setGroupId] = useState(null);

  const initSocket = () => {
    const socket = io(BACKEND_URL);
    setSocket(socket);
  };

  let isHost = false;

  const value = {
    socket,
    initSocket,
    name,
    setName,
    groupId,
    setGroupId,
    isHost,
  };

  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
};

export { SocketProvider, useSocket };
