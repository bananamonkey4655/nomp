import { useSocket } from "../../context/SocketProvider";
import React, { useEffect, useState } from "react";
import { useNavigate} from "react-router-dom";
import ChatBox from "../../components/ChatBox/ChatBox";
import GroupSettings from "../../components/GroupSettings/GroupSettings";
import { AnimatePresence, motion } from "framer-motion";

import { AlignLeftSimple, Users } from "phosphor-react";
import "./Lobby.css";
import Loader from "../../components/Loader/Loader";

const Lobby = () => {
  // lobbypage variant
  const pageVariants ={
    exit: {
      opacity: 0,
      transition: { duration : 0.5}
    },
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 1,
      }
    }
  }

  const { socket, name, groupId } = useSocket();
  const [groupMembers, setGroupMembers] = useState([]);
  const [isHost, setIsHost] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    socket.on("update-members", (newMembers) => {
      setGroupMembers(newMembers);
    });
    socket.on("members-start-search", ({ location, searchTerm }) => {
      navigate(`/findeatery/${location}/${searchTerm}`); //TODO: call yelp api once only and store eateries
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
     <motion.div key={groupMembers} variants={pageVariants} initial="hidden" animate="visible" exit="exit" className="lobby-container">
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
        <GroupSettings isHost={isHost} />
      </section>

      <ChatBox name={name} />
    </motion.div>
  ) : (
    <motion.h1 key={groupMembers} variants={pageVariants} initial="hidden" animate="visible" exit="exit">
      <Loader message="Loading..."/>
    </motion.h1>
  );
};

export default Lobby;
