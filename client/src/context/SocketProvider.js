import { createContext, useContext, useState } from "react";
import { io } from "socket.io-client";
import { BACKEND_URL } from "../config";

// Initialize context
const SocketContext = createContext();
// Create custom socket hook
const useSocket = () => useContext(SocketContext);

function SocketProvider({ children }) {
  const [socket, setSocket] = useState(null);
  const [groupId, setGroupId] = useState(null);

  const initSocket = () => {
    const socket = io(BACKEND_URL);
    setSocket(socket);
  };

  let isHost = false;

  const value = {
    socket,
    initSocket,
    groupId,
    setGroupId,
    isHost,
  };

  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
}

export { SocketProvider, useSocket };
