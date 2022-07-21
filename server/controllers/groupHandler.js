module.exports = (io) => {
  // Given array of users, return whether there is already a host.
  function doesHostAlreadyExist(roomMembers) {
    for (const member of roomMembers) {
      if (member.isHost) {
        return true;
      }
    }
    return false;
  }

  function changeHostIfNone(users) {
    if (!users || users.length === 0) {
      return;
    }

    for (const user of users) {
      if (user.isHost) {
        return;
      }
    }

    users[0].isHost = true;
  }

  // Given a new member, add to data structure
  function addMemberToMap({ name, roomId, isHost }, usersByRoomId) {
    const user = { nickname: name, isHost, done: false };

    if (!usersByRoomId.has(roomId)) {
      //Initialize users array if doesn't exist yet
      usersByRoomId.set(roomId, [user]);
      return;
    }

    const roomMembers = usersByRoomId.get(roomId);

    if (doesHostAlreadyExist(roomMembers)) {
      usersByRoomId.set(roomId, [...roomMembers, { ...user, isHost: false }]);
      return;
    }

    usersByRoomId.set(roomId, [...roomMembers, { ...user, isHost: true }]);
  }

  function updateMembersOnClient(roomId, usersByRoomId) {
    if (!usersByRoomId.has(roomId)) {
      return;
    }
    const users = usersByRoomId.get(roomId);
    changeHostIfNone(users);
    console.log(users);
    console.log(
      `There are: ${
        io.sockets.adapter.rooms.get(roomId)?.size
      } users connected to this room`
    );
    io.to(roomId).emit("update-members", users);
  }

  // Given a member, remove him from data structure
  function removeMemberFromMap({ name, roomId }, usersByRoomId) {
    if (usersByRoomId.has(roomId)) {
      const roomMembers = usersByRoomId.get(roomId);
      const updatedArray = roomMembers.filter((user) => user.nickname !== name);
      usersByRoomId.set(roomId, updatedArray);
    }
  }

  function deleteGroupIfEmpty(roomId, usersByRoomId) {
    // const roomSize = io.sockets.adapter.rooms.get(roomId)?.size;
    if (!usersByRoomId.has(roomId)) {
      return;
    }

    const roomSize = usersByRoomId.get(roomId).length;
    if (!roomSize) {
      usersByRoomId.delete(roomId);
    }
  }

  return {
    doesHostAlreadyExist,
    addMemberToMap,
    removeMemberFromMap,
    updateMembersOnClient,
    deleteGroupIfEmpty,
  };
};
