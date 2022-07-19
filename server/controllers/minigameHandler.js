const eateries = new Map();

module.exports = (io) => {
  const addEateryVote = ({ eateryId, roomId }) => {
    if (!eateries.has(roomId)) {
      eateries.set(roomId, new Map());
    }
    const voteCounts = eateries.get(roomId);

    if (!voteCounts.has(eateryId)) {
      voteCounts.set(eateryId, 1);
      return;
    }
    const curr = voteCounts.get(eateryId);
    voteCounts.set(eateryId, curr + 1);
  };

  const changeMemberDoneStatus = (name, map, roomId) => {
    const roomMembers = map.get(roomId);
    const gameCompletedMember = roomMembers.find(
      (member) => member.nickname === name
    );
    gameCompletedMember.done = true;
  };

  const handleGameOver = (membersMap, roomId) => {
    const isGameOver = (map, roomId) => {
      const roomMembers = map.get(roomId);

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

    const voteCounts = eateries.get(roomId);
    let max = 0;
    let highestVotedEatery = null;

    for (const [eatery, count] of voteCounts) {
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
