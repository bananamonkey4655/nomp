const express = require("express");
const db = require("./config/database");
const cors = require("cors");

// const session = require("express-session");
const passport = require("passport");
// const MongoStore = require("connect-mongo");
const auth = require("./routes/auth");

require("dotenv").config();
require("./config/passport");

const app = express();

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(
//   session({
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: true,
//     store: MongoStore.create({
//       mongoUrl: process.env.MONGODB_URI,
//       collectionName: "sessions",
//     }),
//     // cookie: {
//     //   maxAge: 1000 * 10,
//     // },
//   })
// );
app.use(passport.initialize());
// app.use(passport.session());
app.use("/auth", auth);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is running`);
});

/** Obsolete: for reference */

// app.use((req, res, next) => {
//   res.locals.currentUser = req.user;
//   next();
// });

// app.get("/", (req, res) => {
//   res.send(`<h1>Home page</h1><p>Please <a href="/register">register</a></p>
//   <p>Please <a href="/login">login</a></p>`);
// });

// app.get("/success", (req, res) => {
//   res.send(`<h1>Success page!</h1>
//       <h3>You are authenticated: ${req.isAuthenticated()}</h3>`);
// });

// app.get("/failure", (req, res) => {
//   res.send(`<h1>Failure page!</h1>
//       <h3>You are authenticated: ${req.isAuthenticated()}</h3>`);
// });

// app.get("/login", (req, res) => {
//   res.send(
//     `<h1>please log in</h1>
//     <form action="/login" method="POST">
//     <label for="username">Username</label>
//     <input name="username" placeholder="username" type="text" />
//     <label for="password">Password</label>
//     <input name="password" type="password" />
//     <button>Log In</button>
//   </form>`
//   );
// });

// app.get("/logout", (req, res) => {
//   req.logout((err) => {
//     if (err) {
//       return next(err);
//     }
//     res.redirect("/");
//   });
// });

// app.get("/register", (req, res) => {
//   const form = `<h1>Sign Up</h1>
//   <form action="" method="POST">
//     <label for="username">Username</label>
//     <input name="username" placeholder="username" type="text" />
//     <label for="password">Password</label>
//     <input name="password" type="password" />
//     <button>Sign Up</button>
//   </form>`;

//   res.send(form);
// });

// app.post("/register", (req, res, next) => {
//   const saltLength = 10;
//   bcrypt.hash(req.body.password, saltLength, (err, hashedPassword) => {
//     if (err) {
//       return next(err);
//     }
//     const user = new UserModel({
//       username: req.body.username,
//       password: hashedPassword,
//     });
//     user.save((err) => {
//       if (err) {
//         res.json({ success: false });
//       }
//       res.json({ success: true });
//     });
//   });
// });
