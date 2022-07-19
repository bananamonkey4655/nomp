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
import { motion } from "framer-motion";

function Lobby() {
  // lobbypage variant
  const pageVariants = {
    exit: {
      opacity: 0,
      transition: { duration: 0.5 },
    },
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 1,
      },
    },
  };

  const { socket } = useSocket();
  const { name, groupId } = socket;
  const navigate = useNavigate();

  const [groupMembers, setGroupMembers] = useState([]);
  const [isHost, setIsHost] = useState(false);

  useEffect(() => {
    socket.on("update-members", (newMembers) => {
      setGroupMembers(newMembers);
    });
    socket.on(
      "members-start-search",
      ({ location, query, budget, coordinates, radius }) => {
        navigate(`/voting`, {
          state: { location, query, budget, coordinates, radius },
        }); //TODO: call yelp api once only and store eateries
      }
    );
  }, [socket]);

  useEffect(() => {
    // Set the user on this page as host if server's data says so
    setIsHost(
      !!groupMembers.filter(
        (member) => member.nickname === name && member.isHost
      ).length
    );
  }, [groupMembers]);

  // TODO: change index
  return groupMembers?.length ? (
    <motion.div
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="lobby-container"
    >
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
        <GroupSettings isHost={isHost} />
      </section>

      <ChatBox name={name} groupId={groupId} />
    </motion.div>
  ) : (
    <h1>
      <Loader message="Loading..." />
    </h1>
  );
}

export default Lobby;