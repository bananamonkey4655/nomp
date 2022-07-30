const express = require("express");
const app = express();
const server = require("http").createServer(app);

require("dotenv").config();

const cors = require("cors");
const db = require("./config/database");
const FRONTEND_URL = require("./config/config");

const auth = require("./routes/auth");
const eatery = require("./routes/eatery");
const geolocation = require("./routes/geolocation");
const user = require("./routes/user");
const socketHandler = require("./socket");

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

// Socket.io server
const io = require("socket.io")(server, {
  cors: { origin: FRONTEND_URL, methods: ["GET", "POST"] },
});

io.on("connection", (socket) => socketHandler(io, socket));

server.listen(process.env.PORT || 5000, () => {
  console.log(`Server is running on port: ${process.env.PORT}`);
});
