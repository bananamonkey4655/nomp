const eateriesByRoomId = new Map();

module.exports = (io) => {
  function addEateryVote({ eateryId, roomId }) {
    if (!eateriesByRoomId.has(roomId)) {
      eateriesByRoomId.set(roomId, new Map());
    }
    const votesByEatery = eateriesByRoomId.get(roomId);

    if (!votesByEatery.has(eateryId)) {
      votesByEatery.set(eateryId, 1);
      return;
    }
    const curr = votesByEatery.get(eateryId);
    votesByEatery.set(eateryId, curr + 1);
  }

  function changeMemberDoneStatus({ name, roomId }, usersByRoomId) {
    const users = usersByRoomId.get(roomId);

    if (!users) {
      return;
    }

    const gameCompletedMember = users.find((user) => user.nickname === name);

    if (!gameCompletedMember) {
      return;
    }

    gameCompletedMember.done = true;
  }

  function handleGameOver(roomId, usersByRoomId) {
    const isGameOver = (usersByRoomId, roomId) => {
      const roomMembers = usersByRoomId.get(roomId);
      const votesByEatery = eateriesByRoomId.get(roomId);

      if (!roomMembers || !votesByEatery) {
        return false;
      }

      for (const member of roomMembers) {
        if (!member.done) {
          return false;
        }
      }
      return true;
    };

    if (!isGameOver(usersByRoomId, roomId)) {
      return;
    }

    const votesByEatery = eateriesByRoomId.get(roomId);

    let max = 0;
    let highestVotedEatery = null;

    for (const [eatery, count] of votesByEatery) {
      if (count >= max) {
        max = count;
        highestVotedEatery = eatery;
      }
    }

    io.in(roomId).emit("show-results", {
      eateryId: highestVotedEatery,
      count: max,
    });

    //Cleanup votesByEatery map
    eateriesByRoomId.delete(roomId);
  }

  return {
    addEateryVote,
    changeMemberDoneStatus,
    handleGameOver,
  };
};
