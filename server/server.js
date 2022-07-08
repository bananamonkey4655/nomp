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
const { addEateryVote, changeMemberDoneStatus, isGameOver, handleGameOver } =
  require("./controllers/minigameHandler")(io);
const {
  sanitizeInput,
  addMemberToMap,
  removeMemberFromMap,
  updateMembersOnClient,
  deleteGroupIfEmpty,
  emitMessageToClients,
} = require("./controllers/groupHandler")(io);

const members = new Map();

// Run when client connects
io.on("connection", (socket) => {
  console.log(`Connection: User socket id: ${socket.id}`);

  // Add user to group
  socket.on("user:join-group", ({ nickname, groupId, isHost }) => {
    sanitizeInput(groupId);
    socket.join(groupId);
    addMemberToMap(nickname, groupId, isHost, members);

    updateMembersOnClient(groupId, members);
    io.to(groupId).emit("chat:new-member", nickname);

    // Broadcast message to chat room
    socket.on("send-message", (message) => {
      emitMessageToClients(groupId, message);
    });

    // Begin voting game when host starts
    socket.on(
      "host-start-search",
      ({ location, searchTerm, budget, groupId }) => {
        io.in(groupId).emit("members-start-search", {
          location,
          searchTerm,
          budget,
        });
      }
    );

    // Increment vote count for a restaurant
    socket.on("add-desired-eatery", addEateryVote);

    // End voting game when completed
    socket.on("member-completed-game", (name) => {
      console.log("Received member-completed-game event");
      changeMemberDoneStatus(name, members, groupId);
      if (isGameOver(members, groupId)) {
        console.log("Game is over");
        handleGameOver(groupId);
      }
    });

    // Disconnect from server
    socket.on("disconnect", () => {
      console.log(`Disconnected: ${socket.id}`);
      removeMemberFromMap(nickname, groupId, members);
      updateMembersOnClient(groupId, members);
      deleteGroupIfEmpty(groupId, members);
    });
  });
});

server.listen(process.env.PORT || 5000, () => {
  console.log(`Server is running`);
});
