module.exports = (io) => {
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
    console.log(`Removing member ${name} from map...`);
    if (map.has(roomId)) {
      const roomMembers = map.get(roomId);
      const updatedArray = roomMembers.filter((member) => {
        return member.nickname !== name;
      });
      map.set(roomId, updatedArray);
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
    addMemberToMap,
    removeMemberFromMap,
    updateMembersOnClient,
    deleteGroupIfEmpty,
    emitMessageToClients,
  };
};
