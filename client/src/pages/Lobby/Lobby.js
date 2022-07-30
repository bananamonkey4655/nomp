import styles from "./Lobby.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faCrown } from "@fortawesome/free-solid-svg-icons";

import ChatBox from "./ChatBox";
import GroupSettings from "./GroupSettings";
import InviteLink from "./InviteLink";
import Loader from "components/Loader";
import ExitGroupButton from "components/ExitGroupButton";

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSocket } from "context/SocketProvider";

function Lobby() {
  const { socket } = useSocket();
  const { name, groupId, isHost } = socket;
  const navigate = useNavigate();

  // Server is single source of truth
  const [groupMembers, setGroupMembers] = useState([]);

  // Join group on server
  useEffect(() => {
    socket.emit("join-group", {
      nickname: name,
      groupId: groupId,
      isHost: isHost,
    });
  }, []);

  // Listen for events: 1) A member joined/left the group, 2) Host starts voting game
  useEffect(() => {
    socket.on("update-members", (newMembers) => {
      setGroupMembers(newMembers);
    });

    socket.on("members-start-search", (queryParameters) => {
      navigate("/voting", {
        state: queryParameters,
      }); //TODO: call yelp api once only and store eateries
    });

    return () => {
      socket.off("update-members");
      socket.off("members-start-search");
    };
  }, [socket]);

  const user = groupMembers.find((member) => member.nickname === name);

  if (!groupMembers) {
    return (
      <h1>
        <Loader message="Loading..." />
      </h1>
    );
  }

  // TODO: make smaller components here
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.btnGroup}>
          {/* TODO: Fix issues with invite link <InviteLink /> */}
          <h1 className={styles.title}>Room ID: {groupId}</h1>
          <ExitGroupButton />
        </div>

        <div className={styles.usersContainer}>
          <div className={styles.usersCount}>
            <FontAwesomeIcon icon={faUser} />
            <span>{groupMembers.length}</span>
          </div>
          <ul>
            {groupMembers.map((member, index) => (
              <li className={styles.username} key={index}>
                {member.isHost ? (
                  <>
                    <FontAwesomeIcon icon={faCrown} />
                    <span>{member.nickname}</span>
                  </>
                ) : (
                  member.nickname
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.settingsContainer}>
          <GroupSettings isHost={user?.isHost} />
        </div>

        <div className={styles.chatContainer}>
          <ChatBox name={name} groupId={groupId} />
        </div>
      </div>
    </div>
  );
}

export default Lobby;
