import { createContext, useContext, useState, useEffect } from "react";
import { io } from "socket.io-client";
import { BACKEND_URL } from "config";

// Initialize context
const SocketContext = createContext();
// Create custom socket hook
const useSocket = () => useContext(SocketContext);

function SocketProvider({ children }) {
  const [socket, setSocket] = useState(null);

  const quitGroup = () => {
    socket.emit("quit-group");
  };

  useEffect(() => {
    if (socket) {
      return;
    }
    const mySocket = io(BACKEND_URL);
    setSocket(mySocket);

    return () => {
      mySocket.close();
    };
  }, []);

  const value = {
    socket,
    quitGroup,
  };

  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
}

export { SocketProvider, useSocket };
