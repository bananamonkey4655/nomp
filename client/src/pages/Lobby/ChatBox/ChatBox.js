import styles from "./ChatBox.module.css";

import { useEffect, useState, useRef } from "react";
import { useSocket } from "context/SocketProvider";

function ChatBox({ name, groupId }) {
  const { socket } = useSocket();

  const messageEl = useRef(null);
  const [myMessage, setMyMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);

  const sendMyMessage = (e) => {
    e.preventDefault();

    const message = myMessage.trim();
    setMyMessage("");

    if (!message) {
      return;
    }
    socket.emit("chat:send-message", { name, message });
  };

  const updateChat = (msg) => {
    setChatMessages((prev) => [...prev, msg]);
  };

  // Auto scroll to bottom of chat on new message
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

    socket.on("chat:new-message", (message) => {
      updateChat(message);
    });

    socket.on("chat:leave-group", (nickname) => {
      updateChat({
        name: "NOMP",
        message: `${nickname} has left the lobby`,
      });
    });

    // Turn off event listeners after dismounting
    return () => {
      socket.off("chat:new-member");
      socket.off("chat:new-message");
      socket.off("chat:leave-group");
    };
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        {/* <h2>Group ID: {groupId}</h2> */}
        <h2>Group Chat</h2>
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
}

export default ChatBox;
