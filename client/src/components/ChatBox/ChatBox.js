import { useEffect, useState } from "react";
import { useSocket } from "../../context/SocketProvider";

import "./ChatBox.css";

const ChatBox = ({ name }) => {
  const [message, setMessage] = useState("");
  const { socket } = useSocket();
  const [chatMessages, setChatMessages] = useState([]);

  const sendMessage = (e) => {
    e.preventDefault();
    socket.emit("send-message", { name, message });

    setMessage("");
  };

  const updateChat = (data) => {
    setChatMessages((prev) => [...prev, data]);
  };

  useEffect(() => {
    socket.on("chat:new-member", (name) => {
      updateChat({ name: "NOMP", message: `${name} has joined the lobby` });
    });
    socket.on("new-message", (payload) => {
      updateChat(payload);
    });
  }, [socket]);

  return (
    <div className="chatbox-wrapper">
      <h1>Chat Lobby</h1>
      <section className="chat-container">
        {chatMessages.map((msg, index) => {
          return (
            <div className="chat-message-box" key={index}>
              <h5>{msg.name}</h5>
              <p>{msg.message}</p>
            </div>
          );
        })}
      </section>
      <form onSubmit={sendMessage}>
        <label>
          Message
          <input
            type="text"
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </label>
        <input type="submit" value="Send" />
      </form>
    </div>
  );
};

export default ChatBox;
