const express = require("express");
const db = require("./config/database");
const cors = require("cors");
const axios = require("axios");
const session = require("express-session");
const passport = require("passport");
const auth = require("./routes/auth");
const eatery = require("./routes/eatery");
const FRONTEND_URL = require("./config/config");

require("dotenv").config();
require("./config/passport");

const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: { origin: FRONTEND_URL, methods: ["GET", "POST"] },
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/auth", auth);
app.use("/eatery", eatery);

app.get("/", (req, res) => {
  res.send(
    "<h1>This is the response from the GET request for the backend</h1>"
  );
});

/*************************************************************************************************************************************************************************** */
// Create two-way WebSocket connection

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

io.on("connection", (socket) => {
  console.log(`Connection: User socket id: ${socket.id}`);

  socket.on("user:join-group", ({ nickname, groupId, isHost }) => {
    sanitizeInput(groupId);
    socket.join(groupId);
    addMemberToMap(nickname, groupId, isHost, members);

    updateMembersOnClient(groupId, members);
    io.to(groupId).emit("chat:new-member", nickname);

    socket.on("send-message", (message) => {
      emitMessageToClients(groupId, message);
    });

    socket.on("host-start-search", ({ location, searchTerm, groupId }) => {
      io.in(groupId).emit("members-start-search", { location, searchTerm });
    });

    socket.on("add-desired-eatery", addEateryVote);

    socket.on("member-completed-game", (name) => {
      console.log("Received member-completed-game event");
      changeMemberDoneStatus(name, members, groupId);
      if (isGameOver(members, groupId)) {
        console.log("Game is over");
        handleGameOver(groupId);
      }
    });

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
