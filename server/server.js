const express = require("express");
const db = require("./config/database");
const cors = require("cors");
const axios = require("axios");
const session = require("express-session");
const passport = require("passport");
// const MongoStore = require("connect-mongo"); //OBSOLETE REMOVE LATER, replace authentication method of sessions with JWT
const auth = require("./routes/auth");
const eatery = require("./routes/eatery");

require("dotenv").config();
require("./config/passport");

const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: { origin: "http://localhost:3000", methods: ["GET", "POST"] }, //change url for production
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
    // *****OBSOLETE, REMOVE LATER********
    // store: MongoStore.create({
    //   mongoUrl: process.env.MONGODB_URI,
    //   collectionName: "sessions",
    // }),
    // cookie: {
    //   maxAge: 1000 * 10,
    // },
    // ************************************
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
  // res.send("This is the response from the GET request for the backend"); //TEST
  // res.json({ hello: "world" }); //TEST
});

/*************************************************************************************************************************************************************************** */
// Create two-way WebSocket connection
const groups = new Map(); // TODO: maybe use Redis
// const colors = ["red", "orange", "yellow", "green", "blue"];

io.on("connection", (socket) => {
  console.log(`Connection: User socket id: ${socket.id}`);

  socket.on("join-group", ({ nickname, groupId, isHost }) => {
    groupId = groupId.toLowerCase(); // Sanitize input, TODO: merge into a function
    socket.join(groupId);

    // console.log(`Join-Group: ${socket.id} joined group: ${groupId}`);
    // const groupSize = io.sockets.adapter.rooms.get(groupId).size;
    // console.log(`Room Size: ${groupSize}`);

    // Add to groupId:[names]->key:value Map
    if (groups.has(groupId)) {
      const roomMembers = groups.get(groupId);
      if (isHost) {
        for (let i = 0; i < roomMembers.length; i++) {
          if (roomMembers[i].isHost) {
            groups.set(groupId, [...roomMembers, { nickname, isHost: false }]);
            break;
          }
        }
      } else {
        groups.set(groupId, [...roomMembers, { nickname, isHost }]);
      }
    } else {
      groups.set(groupId, [{ nickname, isHost }]);
    }

    io.to(groupId).emit("update-members", groups.get(groupId)); //TODO: change to a function
    io.to(groupId).emit("new-member", nickname); //TODO: change to a function

    socket.on("send-message", (payload) => {
      console.log("Message sent to server");
      io.in(groupId).emit("new-message", payload);
    });

    socket.on("disconnect", () => {
      console.log(`Disconnected: ${socket.id}`);

      // Update Map
      if (groups.has(groupId)) {
        const groupSize = io.sockets.adapter.rooms.get(groupId)?.size;

        const groupMembers = groups.get(groupId);
        groupMembers.splice(groupMembers.indexOf(nickname), 1); // Retrieve the array and remove disconnected user's nickname
        io.to(groupId).emit("update-members", groups.get(groupId));
        if (!groupSize) {
          groups.delete(groupId);
        }
      }
    });
  });
});

// What's next? =>
// Allow users to set location (only one location), either only allow host to choose the location or let all users change
// Move fetch API logic from client to server (websocket)
// What is hosting a group? => Joining a group and you are the only member. So our logic => If yo uare the only member, you are the host. (can set location)

server.listen(process.env.PORT || 5000, () => {
  console.log(`Server is running`);
});
