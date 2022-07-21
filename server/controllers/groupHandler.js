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
  const addMemberToMap = ({ name, roomId, isHost }, map) => {
    const user = { nickname: name, isHost, done: false };

    if (!map.has(roomId)) {
      //Initialize members array if doesn't exist yet
      map.set(roomId, [user]);
      return;
    }

    const roomMembers = map.get(roomId);

    if (doesHostAlreadyExist(roomMembers)) {
      map.set(roomId, [...roomMembers, { ...user, isHost: false }]);
      return;
    }

    map.set(roomId, [...roomMembers, { ...user, isHost: true }]);
  };

  const updateMembersOnClient = (roomId, map) => {
    console.log(`Updating members on client of ${roomId}:`);
    io.to(roomId).emit("update-members", map.get(roomId));
  };

  // Given a member, remove him from data structure
  const removeMemberFromMap = ({ name, roomId }, map) => {
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

  const changeHostIfNone = (members) => {
    if (!members) {
      return;
    }

    for (const member of members) {
      if (member.isHost) {
        return;
      }
    }

    members[0].isHost = true;
  };

  return {
    doesHostAlreadyExist,
    addMemberToMap,
    removeMemberFromMap,
    updateMembersOnClient,
    deleteGroupIfEmpty,
    changeHostIfNone,
  };
};
