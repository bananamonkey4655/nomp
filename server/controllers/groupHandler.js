module.exports = (io) => {
  // const addUserToGroup = function ({ nickname, groupId, isHost }) {
  //   console.log("Adding user to group...");
  //   const socket = this; //because using arrow function doesnt work with 'this'
  //   sanitizeInput(groupId);
  //   socket.join(groupId);
  //   addMemberToMap(nickname, groupId, isHost, names);
  //   io.to(groupId).emit("update-members", names.get(groupId));
  //   io.to(groupId).emit("new-member", nickname);
  // };

  // Given input string, return sanitized output.
  const sanitizeInput = (string) => string.toLowerCase();

  // Given array of users, return whether there is already a host.
  const doesHostAlreadyExist = (roomMembers) => {
    for (const member of roomMembers) {
      if (member.isHost) {
        return true;
      }
    }
    return false;
  };

  // Given a new member, add to data structure
  const addMemberToMap = (name, roomId, isHost, map) => {
    if (!map.has(roomId)) {
      //Initialize members array if doesn't exist yet
      map.set(roomId, [{ nickname: name, isHost, done: false }]);
    } else {
      const roomMembers = map.get(roomId);
      if (!isHost || doesHostAlreadyExist(roomMembers)) {
        map.set(roomId, [
          ...roomMembers,
          { nickname: name, isHost: false, done: false },
        ]);
      } else {
        map.set(roomId, [
          ...roomMembers,
          { nickname: name, isHost: true, done: false },
        ]);
      }
    }
  };

  const emitMessageToClients = (roomId, message) => {
    io.in(roomId).emit("new-message", message);
  };

  const updateMembersOnClient = (roomId, map) => {
    console.log("Updating members on client...");
    io.to(roomId).emit("update-members", map.get(roomId));
  };

  // Given a member, remove him from data structure
  const removeMemberFromMap = (name, roomId, map) => {
    console.log("Removing member from map...");
    if (map.has(roomId)) {
      const roomMembers = map.get(roomId);
      roomMembers.splice(roomMembers.indexOf(name), 1); // Retrieve the array and remove disconnected user's nickname
      console.log("Member removed");
    }
  };

  const deleteGroupIfEmpty = (roomId, map) => {
    console.log("Checking if group is empty for deletion:");
    const roomSize = io.sockets.adapter.rooms.get(roomId)?.size;
    if (!roomSize) {
      console.log("Deleting group since empty...");
      map.delete(roomId);
    }
  };

  return {
    sanitizeInput,
    addMemberToMap,
    removeMemberFromMap,
    updateMembersOnClient,
    deleteGroupIfEmpty,
    emitMessageToClients,
  };
};
