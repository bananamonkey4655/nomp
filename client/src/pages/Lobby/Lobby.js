import "./Lobby.css";
import { Users } from "phosphor-react";

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

  useEffect(() => {
    socket.emit("join-group", {
      nickname: name,
      groupId: groupId,
      isHost: isHost,
    });
  }, []);

  useEffect(() => {
    socket.on("update-members", (newMembers) => {
      setGroupMembers(newMembers);
    });

    socket.on("members-start-search", (queryParameters) => {
      navigate(`/voting`, {
        state: queryParameters,
      }); //TODO: call yelp api once only and store eateries
    });

    return () => {
      socket.off("update-members");
      socket.off("members-start-search");
    };
  }, [socket]);

  useEffect(() => {
    console.log(groupMembers);
  }, [groupMembers]);

  const user = groupMembers.find((member) => member.nickname === name);

  // TODO: change index
  if (!groupMembers) {
    return (
      <h1>
        <Loader message="Loading..." />
      </h1>
    );
  }

  // TODO: make smaller components here
  return (
    <div className="lobby-container">
      <section className="lobby-left">
        <div className="members">
          <ExitGroupButton />
          <div className="members-count-wrapper">
            <div className="members-count">
              <Users size={30} />
              <span>{groupMembers.length}</span>
            </div>
          </div>
          <ul className="members-list">
            {groupMembers.map((member, index) => (
              <li key={index}>
                {member.isHost ? member.nickname + " (Host)" : member.nickname}
              </li>
            ))}
          </ul>
        </div>
        <InviteLink />
        <GroupSettings isHost={user?.isHost} />
      </section>

      <ChatBox name={name} groupId={groupId} />
    </div>
  );
}

export default Lobby;
