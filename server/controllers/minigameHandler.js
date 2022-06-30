const eateries = new Map();

module.exports = (io) => {
  const addEateryVote = ({ eateryId, roomId }) => {
    console.log(eateryId);
    console.log(roomId);
    if (!eateries.has(roomId)) {
      eateries.set(roomId, new Map());
    }
    const voteCounts = eateries.get(roomId);
    if (!voteCounts.has(eateryId)) {
      voteCounts.set(eateryId, 1);
    } else {
      const curr = voteCounts.get(eateryId);
      voteCounts.set(eateryId, curr + 1);
    }
    console.log(voteCounts);
    console.log("Add---------------------------------------");
  };

  const changeMemberDoneStatus = (name, map, roomId) => {
    const roomMembers = map.get(roomId);
    const gameCompletedMember = roomMembers.find(
      (member) => member.nickname === name
    );
    gameCompletedMember.done = true;
  };

  const handleGameOver = (roomId) => {
    //get the eateries with highest votes maybe top 3?
    //send them back to the client
    //emit new event
    console.log(roomId);
    const voteCounts = eateries.get(roomId);
    console.log(voteCounts);
    let max = 0;
    let highestVotedEatery = null;
    for (const [eatery, count] of voteCounts) {
      if (count > max) {
        max = count;
        highestVotedEatery = eatery;
      }
    }
    console.log(`${highestVotedEatery} wins with count of ${max}`);
    io.in(roomId).emit("show-results", {
      eateryId: highestVotedEatery,
      count: max,
    });
  };

  const isGameOver = (map, roomId) => {
    console.log("Checking if game is over...");
    const roomMembers = map.get(roomId);
    for (const member of roomMembers) {
      if (!member.done) {
        return false;
      }
    }
    return true;
  };

  return {
    addEateryVote,
    changeMemberDoneStatus,
    isGameOver,
    handleGameOver,
  };
};
