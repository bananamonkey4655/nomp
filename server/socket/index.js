// Maps to store data
const usersByRoomId = new Map();
const roomInfoByRoomId = new Map();

// Event handlers
const votingGameHandler = require("../controllers/minigameHandler");
const userGroupHandler = require("../controllers/groupHandler");

// Main socket.io logic resides here
module.exports = (io, socket) => {
  const {
    canUserJoinGroup,
    addMemberToMap,
    removeMemberFromMap,
    updateMembersOnClient,
    deleteGroupIfEmpty,
    createRoomInfo,
  } = userGroupHandler(io);

  const {
    handleVotingGameStart,
    addEateryVote,
    changeMemberDoneStatus,
    handleGameOver,
  } = votingGameHandler(io);

  // Run when client connects
  console.log(
    io.engine.clientsCount,
    `Connection: User socket id: ${socket.id}`
  );

  socket.on("try-join", (userDetails, callbackFromClient) => {
    const status = canUserJoinGroup(
      userDetails,
      usersByRoomId,
      roomInfoByRoomId
    );
    callbackFromClient(status);
  });

  socket.on("join-group", (userDetails) => {
    const { nickname, groupId, isHost } = userDetails;

    //TODO: find a better way
    const eventListenerNames = [
      "chat:send-message",
      "host-start-search",
      "increment-eatery-vote",
      "user-voting-complete",
      "quit-group",
      "disconnect",
    ];

    socket.join(groupId);

    addMemberToMap({ name: nickname, roomId: groupId, isHost }, usersByRoomId);
    createRoomInfo(groupId, roomInfoByRoomId);

    updateMembersOnClient(groupId, usersByRoomId);
    io.in(groupId).emit("chat:new-member", nickname);

    // Listen for messages to broadcast to chat room
    socket.on("chat:send-message", (message) => {
      io.in(groupId).emit("chat:new-message", message);
    });

    // Listen for host to start voting game
    socket.on("host-start-search", (queryParameters) => {
      handleVotingGameStart(groupId, roomInfoByRoomId, queryParameters);
    });

    // Increment vote count for a restaurant
    socket.on("increment-eatery-vote", addEateryVote);

    // End voting game when completed
    socket.on("user-voting-complete", () => {
      changeMemberDoneStatus(
        { name: nickname, roomId: groupId },
        usersByRoomId
      );
      handleGameOver(groupId, usersByRoomId, roomInfoByRoomId);
    });

    socket.on("quit-group", () => {
      console.log("quitting group");
      socket.leave(groupId);
      removeEventListeners(socket, eventListenerNames);
      io.in(groupId).emit("chat:leave-group", nickname);
      removeMemberFromMap({ name: nickname, roomId: groupId }, usersByRoomId);
      updateMembersOnClient(groupId, usersByRoomId);
      deleteGroupIfEmpty(groupId, usersByRoomId);
      handleGameOver(groupId, usersByRoomId, roomInfoByRoomId);
      // io.in(socket.id).socketsLeave(groupId);
    });

    // Disconnect from server
    socket.on("disconnect", () => {
      io.to(groupId).emit("chat:leave-group", nickname);
      removeMemberFromMap({ name: nickname, roomId: groupId }, usersByRoomId);
      updateMembersOnClient(groupId, usersByRoomId);
      deleteGroupIfEmpty(groupId, usersByRoomId);
      handleGameOver(groupId, usersByRoomId, roomInfoByRoomId);
    });
  });
};

//Helper function
function removeEventListeners(socket, listeners) {
  for (const listener of listeners) {
    socket.removeAllListeners(listener);
  }
}
