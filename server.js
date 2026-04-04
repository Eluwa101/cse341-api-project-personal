require("dotenv").config();
const express = require("express");
const app = express();

const { connectToMongo, closeMongo } = require("./data/dbconnect");
const swaggerRouter = require("./routes/swagger");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const GithubStrategy = require("passport-github2").Strategy;
const cors = require("cors");

const PORT = process.env.PORT || 8080;

if (process.env.NODE_ENV === "production") {
  app.set("trust proxy", 1);
}

app
.use(express.json())
.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URI,
    dbName: process.env.MONGODB_DB,
    collectionName: "sessions"
  }),
  cookie: {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production"
  }
}))

// basic express session setup
.use(passport.initialize())
// initialize passport session handling on every route
.use(passport.session())
// allow passport to use express-session
.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "Z-Key"]
}))
.use("/api-docs", swaggerRouter)
.use("/", require("./routes/index.js"));

passport.use(new GithubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: process.env.GITHUB_CALLBACK_URL
},
function (accessToken, refreshToken, profile, done) {
  // In a real application, you would save the user info to your database here
  // User.create({ githubId: profile.id, username: profile.username }, function (err, user)
  return done(null, profile);
}
));


passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});


const startServer = async () => {
  await connectToMongo();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer().catch((error) => {
  console.error("Failed to start server:", error);
  process.exit(1);
});

const shutdown = async () => {
  await closeMongo();
  process.exit(0);
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
