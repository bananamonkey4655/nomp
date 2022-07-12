import { useState } from "react";
import { useSocket } from "../context/SocketProvider";
import { FRONTEND_URL } from "../config";

const InviteLink = () => {
  const { socket } = useSocket();
  const { groupId } = socket;

  const [isCopied, setIsCopied] = useState(false);

  const inviteLink = `${FRONTEND_URL}/group/${groupId}`;

  const handleCopyClick = async () => {
    await copyToClipboard();
    setIsCopied(true);
  };

  const copyToClipboard = async () => {
    if ("clipboard" in navigator) {
      return await navigator.clipboard.writeText(inviteLink);
    } else {
      return document.execCommand("copy", true, inviteLink); //note: deprecated
    }
  };

  return (
    <div>
      Invite Link: <span>{inviteLink}</span>
      <button onClick={handleCopyClick}>{isCopied ? "Copied" : "Copy"}</button>
    </div>
  );
};

export default InviteLink;
