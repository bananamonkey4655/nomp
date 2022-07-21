const express = require("express");
const db = require("./config/database");
const cors = require("cors");
const auth = require("./routes/auth");
const eatery = require("./routes/eatery");
const geolocation = require("./routes/geolocation");
const user = require("./routes/user");
const FRONTEND_URL = require("./config/config");

require("dotenv").config();

const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: { origin: FRONTEND_URL, methods: ["GET", "POST"] },
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/auth", auth);
app.use("/eatery", eatery);
app.use("/geolocation", geolocation);
app.use("/user", user);

app.get("/", (req, res) => {
  res.send(
    "<h1>This is the response from the GET request for the backend</h1>"
  );
});

// Websocket
// TODO: organize into other folders
const { addEateryVote, changeMemberDoneStatus, handleGameOver } =
  require("./controllers/minigameHandler")(io);
const {
  doesHostAlreadyExist,
  addMemberToMap,
  removeMemberFromMap,
  updateMembersOnClient,
  deleteGroupIfEmpty,
} = require("./controllers/groupHandler")(io);

const usersByRoomId = new Map();

// Run when client connects
io.on("connection", (socket) => {
  console.log(
    io.engine.clientsCount,
    `Connection: User socket id: ${socket.id}`
  );

  socket.on("try-join", (name, roomId, callback) => {
    const status = canUserJoinGroup({ name, roomId }, usersByRoomId);
    callback(status);
  });

  function canUserJoinGroup({ name, roomId }, usersByRoomId) {
    const users = usersByRoomId.get(roomId);

    // Check if user already exists
    if (users && users.some((user) => user.nickname === name)) {
      return { ok: false, error: "User already exists" };
    }

    //TODO: check if room has already started voting

    return { ok: true };
  }

  // Add user to group
  socket.on("join-group", (userDetails) => {
    const { nickname, groupId, isHost } = userDetails;

    // groupId = (function sanitizeInput(string) {
    //   return string.toLowerCase();
    // })(groupId);

    socket.join(groupId);

    addMemberToMap({ name: nickname, roomId: groupId, isHost }, usersByRoomId);

    updateMembersOnClient(groupId, usersByRoomId);
    io.in(groupId).emit("chat:new-member", nickname);

    // Listen for messages to broadcast to chat room
    socket.on("chat:send-message", (message) => {
      io.in(groupId).emit("chat:new-message", message);
    });

    // Listen for host to start voting game
    socket.on("host-start-search", (queryParameters) => {
      io.in(groupId).emit("members-start-search", queryParameters);
    });

    // Increment vote count for a restaurant
    socket.on("increment-eatery-vote", addEateryVote);

    // End voting game when completed
    socket.on("user-voting-complete", (name) => {
      console.log("Received user-voting-complete event");
      changeMemberDoneStatus(
        { name: nickname, roomId: groupId },
        usersByRoomId
      );
      handleGameOver(groupId, usersByRoomId);
    });

    socket.on("quit-group", () => {
      console.log(`${nickname} quit ${groupId}`);
      console.log("--------------------------------------------------------");
      io.in(groupId).emit("chat:leave-group", nickname);
      removeMemberFromMap({ name: nickname, roomId: groupId }, usersByRoomId);
      updateMembersOnClient(groupId, usersByRoomId);
      deleteGroupIfEmpty(groupId, usersByRoomId);
      handleGameOver(groupId, usersByRoomId);
    });

    // Disconnect from server
    socket.on("disconnect", () => {
      console.log(`Disconnected: ${socket.id}`);
      console.log("--------------------------------------------------------");
      io.to(groupId).emit("chat:leave-group", nickname);
      removeMemberFromMap({ name: nickname, roomId: groupId }, usersByRoomId);
      updateMembersOnClient(groupId, usersByRoomId);
      deleteGroupIfEmpty(groupId, usersByRoomId);
      handleGameOver(groupId, usersByRoomId);
    });
  });
});

server.listen(process.env.PORT || 5000, () => {
  console.log(`Server is running`);
});
