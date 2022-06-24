import { useSocket } from "../../context/SocketProvider";
import { useEffect, useState } from "react";
import ChatBox from "../../components/ChatBox/ChatBox";
import { useLocation } from "react-router-dom";
import "./Lobby.css";
import GroupSettings from "../../components/GroupSettings/GroupSettings";

import { Users } from "phosphor-react";

const Lobby = () => {
  const { socket } = useSocket();
  const [groupMembers, setGroupMembers] = useState([]);
  const [isHost, setIsHost] = useState(false);
  const location = useLocation();
  const myName = location.state.name;

  useEffect(() => {
    socket.on("update-members", (newMembers) => {
      setGroupMembers(newMembers);
      console.log(newMembers);
    });
  }, [socket]);

  useEffect(() => {
    setIsHost(
      !!groupMembers.filter(
        (member) => member.nickname === myName && member.isHost
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

      <ChatBox name={myName} />
    </div>
  ) : (
    <h1>Loading...</h1>
  );
};

export default Lobby;
