import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import BACKEND_URL from "../config";

const SocketContext = createContext();

const useSocket = () => useContext(SocketContext);

const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  const initSocket = () => {
    const socket = io(BACKEND_URL);
    setSocket(socket);
  };

  const isHost = false;

  const setHost = () => {
    isHost = !isHost;
  };

  const value = { socket, initSocket, isHost, setHost };
  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
};

export { SocketProvider, useSocket };

// socket.on("connect", () => {
//   console.log(`Client: connected with ${socket.id}`);
// });

// socket.emit("custom-event", "Hello server");
// //create socket rooms => allow user to input room they want to enter.
