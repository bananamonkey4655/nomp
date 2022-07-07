import { useSocket } from "../../context/SocketProvider";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ChatBox from "../../components/ChatBox/ChatBox";
import GroupSettings from "../../components/GroupSettings/GroupSettings";

import { Users } from "phosphor-react";
import "./Lobby.css";

const Lobby = () => {
  const { socket, name, groupId } = useSocket();
  const [groupMembers, setGroupMembers] = useState([]);
  const [isHost, setIsHost] = useState(false);
  const navigate = useNavigate();

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
    <div className="lobby-container">
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
    </div>
  ) : (
    <h1>Loading...</h1>
  );
};

export default Lobby;
