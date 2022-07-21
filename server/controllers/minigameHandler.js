const eateriesByRoomId = new Map();

module.exports = (io) => {
  const addEateryVote = ({ eateryId, roomId }) => {
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
  };

  const changeMemberDoneStatus = ({ name, roomId }, map) => {
    const roomMembers = map.get(roomId);
    const gameCompletedMember = roomMembers.find(
      (member) => member.nickname === name
    );
    gameCompletedMember.done = true;
  };

  const handleGameOver = (roomId, membersMap) => {
    const isGameOver = (map, roomId) => {
      const roomMembers = map.get(roomId);
      console.log("Checking if game is over...");
      console.log(roomMembers);

      if (!roomMembers) {
        return false;
      }

      for (const member of roomMembers) {
        if (!member.done) {
          return false;
        }
      }
      return true;
    };

    if (!isGameOver(membersMap, roomId)) {
      return;
    }

    console.log("Game is over");
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
  };

  return {
    addEateryVote,
    changeMemberDoneStatus,
    handleGameOver,
  };
};
