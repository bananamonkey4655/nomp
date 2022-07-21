import { useSocket } from "../context/SocketProvider";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ChatBox from "../components/ChatBox";
import GroupSettings from "../components/GroupSettings";
import LoadingDisplay from "../components/LoadingDisplay";
import InviteLink from "../components/InviteLink";
import { Users } from "phosphor-react";
import "../styles/Lobby.css";
import { FRONTEND_URL } from "../config";
import { AnimatePresence, motion } from "framer-motion";

import Loader from "../components/Loader/Loader";

const Lobby = () => {
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
    socket.on("members-start-search", ({ location, searchTerm, budget }) => {
      navigate(`/voting`, { state: { location, searchTerm, budget } }); //TODO: call yelp api once only and store eateries
    });
  }, [socket]);

  useEffect(() => {
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

      <ChatBox name={name} />
    </motion.div>
  ) : (
    <h1>
      <Loader message="Loading..." />
    </h1>
  );
};

export default Lobby;
