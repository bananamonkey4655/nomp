const eateriesByRoomId = new Map();

module.exports = (io) => {
  const addEateryVote = ({ eateryId, roomId }) => {
    if (!eateriesByRoomId.has(roomId)) {
      eateriesByRoomId.set(roomId, new Map());
    }
    const votesByEatery = eateriesByRoomId.get(roomId);

    if (!votesByEatery.has(eateryId)) {
      votesByEatery.set(eateryId, 1);

      /**Debugging */
      console.log(eateriesByRoomId);
      /**Debugging */

      return;
    }
    const curr = votesByEatery.get(eateryId);
    votesByEatery.set(eateryId, curr + 1);

    /**Debugging */
    console.log(eateriesByRoomId);
    /**Debugging */
  };

  const changeMemberDoneStatus = ({ name, roomId }, map) => {
    const roomMembers = map.get(roomId);
    const gameCompletedMember = roomMembers.find(
      (member) => member.nickname === name
    );
    gameCompletedMember.done = true;
  };

  const handleGameOver = (roomId, usersByRoomId) => {
    const isGameOver = (usersByRoomId, roomId) => {
      const roomMembers = usersByRoomId.get(roomId);
      const votesByEatery = eateriesByRoomId.get(roomId);

      /**Debugging */
      console.log("Checking if game is over...");
      console.log("MAP usersByRoomId:");
      console.log(usersByRoomId);
      console.log("MAP votesByEatery:");
      console.log(votesByEatery);
      /**Debugging */

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

    /**Debugging */
    console.log("Game is over");
    console.log("MAP votesByEatery:");
    console.log(votesByEatery);
    /**Debugging */

    let max = 0;
    let highestVotedEatery = null;

    for (const [eatery, count] of votesByEatery) {
      if (count >= max) {
        max = count;
        highestVotedEatery = eatery;
      }
    }

    /**Debugging */
    console.log("MAP votesByEatery:");
    console.log(votesByEatery);
    console.log(`Winner is ${highestVotedEatery} with count of ${max}`);
    console.log("Emitting show results event...");
    /**Debugging */

    io.in(roomId).emit("show-results", {
      eateryId: highestVotedEatery,
      count: max,
    });

    //Cleanup votesByEatery map
    eateriesByRoomId.delete(roomId);

    /**Debugging */
    console.log("Cleanup votesByEatery, eateriesByRoomId MAP:");
    console.log(eateriesByRoomId);
    /**Debugging */
  };

  return {
    addEateryVote,
    changeMemberDoneStatus,
    handleGameOver,
  };
};
