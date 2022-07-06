import { useEffect, useState, useRef } from "react";
import { useSocket } from "../../context/SocketProvider";

import styles from "./ChatBox.module.css";

const ChatBox = ({ name }) => {
  const { socket, groupId } = useSocket();

  const messageEl = useRef(null);
  const [myMessage, setMyMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);

  const sendMyMessage = (e) => {
    e.preventDefault();
    socket.emit("send-message", { name, message: myMessage });
    setMyMessage("");
  };

  const updateChat = (msg) => {
    setChatMessages((prev) => [...prev, msg]);
  };

  // Auto scroll to bottom of chat
  useEffect(() => {
    if (messageEl) {
      messageEl.current.addEventListener("DOMNodeInserted", (event) => {
        const { currentTarget: target } = event;
        target.scroll({ top: target.scrollHeight, behavior: "smooth" });
      });
    }
  }, []);

  useEffect(() => {
    socket.on("chat:new-member", (name) => {
      updateChat({
        name: "NOMP",
        message: `${name} has joined the lobby`,
      });
    });
    socket.on("new-message", (message) => {
      updateChat(message);
    });
  }, [socket]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>{groupId}</h1>
        <div className={styles.user}>
          <h3>{name}</h3>
          <div className={styles.online} />
        </div>
      </div>
      <section ref={messageEl} className={styles.messages}>
        {chatMessages.map((msg, index) => {
          return (
            <div
              key={index}
              className={
                msg.name === name
                  ? styles.myMessage
                  : msg.name === "NOMP"
                  ? styles.nomp
                  : ""
              }
            >
              <h5>{msg.name}</h5>
              <p>{msg.message}</p>
            </div>
          );
        })}
      </section>
      <form onSubmit={sendMyMessage} className={styles.form}>
        <input
          type="text"
          placeholder="Type your message..."
          value={myMessage}
          onChange={(e) => setMyMessage(e.target.value)}
          required
          className={styles.input}
        />
        <input type="submit" value="Send" className={styles.chatButton} />
      </form>
    </div>
  );
};

export default ChatBox;
