const express = require("express");
const path = require("path");
const app = express();
const { ObjectId } = require("mongodb");

app.use(express.json());
var cors = require("cors");
app.use(cors());

const flash = require("connect-flash");
app.use(flash());

const { Server } = require("socket.io");
const http = require("http");
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    transports: ["websocket", "polling"],
    methods: ["GET", "POST"],
    credentials: true,
  },
  allowEIO3: true,
});

//connect mongoDB
const MongoClient = require("mongodb").MongoClient;
MongoClient.connect(
  "mongodb+srv://junsaiadmin:password1234@cluster0.akash.mongodb.net/?retryWrites=true&w=majority",
  { useUnifiedTopology: true },
  function (error, client) {
    if (error) {
      return console.log(error);
    }
    db = client.db("react");
    server.listen(8080, function () {
      console.log("listening on 8080");
    });
  }
);

const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const session = require("express-session");

app.use(
  session({ secret: "secretcode", resave: true, saveUninitialized: false })
);
app.use(passport.initialize());
app.use(passport.session());

//check id and pw
passport.use(
  new LocalStrategy(
    {
      usernameField: "id",
      passwordField: "pw",
      session: true,
      passReqToCallback: false,
    },
    function (inputedID, inputedPW, done) {
      console.log(inputedID, inputedPW);
      db.collection("users").findOne(
        { id: inputedID },
        function (error, result) {
          if (error) return done(error);
          if (!result) return done(null, false, { message: "wrong ID" });
          if (inputedPW == result.pw) {
            return done(null, result);
          } else {
            return done(null, false, { message: "wrong password" });
          }
        }
      );
    }
  )
);

passport.serializeUser(function (user, done) {
  console.log(user.id);
  done(null, user.id);
});

passport.deserializeUser(function (ID, done) {
  db.collection("users").findOne({ id: ID }, function (error, result) {
    console.log("passport2");
    done(null, result);
  });
});

//Login
app.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  function (req, res) {
    req.session.save(function () {
      let user = {
        _id: req.user._id,
        name: req.user.name,
        id: req.user.id,
        content: req.user.content,
        profileUrl: req.user.profileUrl,
        joinDate: req.user.joinDate,
        role: req.user.role,
      };
      res.json({ user: user });
    });
  }
);

function checklogin(req, res, next) {
  if (req.user) {
    next();
  } else {
    res.redirect("/");
  }
}

app.get("/logout", function (req, res) {
  req.logout();
});

app.post("/register", function (req, res) {
  let newUser = {
    name: req.body.newUser.name,
    id: req.body.newUser.id,
    pw: req.body.newUser.pw,
    content: req.body.newUser.content,
    profileUrl: req.body.newUser.profileUrl,
    role: "normal",
    joinDate: new Date(),
  };
  console.log(newUser);

  db.collection("users").findOne({ id: newUser.id }, function (error, result) {
    console.log(result);
    if (result != null) {
      res.json({ error: "This ID already exists" });
    } else {
      db.collection("users").insertOne(newUser, function (error2, result2) {
        //add check wether login ID exist already
        res.json({ success: "Created Account" });
      });
    }
  });
});

app.post("/addpost", function (req, res) {
  let newPost = {
    authorName: req.body.post.authorName,
    authorID: req.body.post.authorID,
    author_id: req.body.post.author_id,
    authoProfileUrl: req.body.post.authoProfileUrl,
    content: req.body.post.content,
    contentImageUrl: req.body.post.contentImageUrl,

    date: new Date(),
    likes: 0,
    liked: false,
    followed_id: [],
  };
  console.log(newPost);
  db.collection("posts").insertOne(newPost, function (error, result) {
    res.json({ newPost: newPost });
  });
});

app.get("/getposts/skip=:skip", function (req, res) {
  db.collection("posts")
    .find()
    .limit(3)
    .skip(parseInt(req.params.skip))
    .sort({ date: -1 })
    .toArray(function (error, result) {
      // console.log(result);
      // console.log(req.params.start);
      res.json({ posts: result });
    });
});

app.get("/getprofile/id=:id", function (req, res) {
  db.collection("users").findOne(
    { id: req.params.id },
    function (error, result) {
      delete result["pw"];
      res.json({ profile: result });
    }
  );
});

app.post("/changeprofile", function (req, res) {
  db.collection("users").updateOne(
    { _id: ObjectId(req.body.newProfile._id) },
    {
      $set: {
        name: req.body.newProfile.name,
        profileUrl: req.body.newProfile.profileUrl,
        content: req.body.newProfile.content,
      },
    }
  ),
    function (error, result) {};
  db.collection("posts").updateMany(
    { author_id: req.body.newProfile._id },
    {
      $set: {
        authorName: req.body.newProfile.name,
        authoProfileUrl: req.body.newProfile.profileUrl,
      },
    },
    function (error, result) {
      console.log(result);
    }
  );

  let user = req.body.newProfile;
  res.json({ user: user });
});

app.post("/likethispost", function (req, res) {
  if (req.body.user._id === "0") {
    res.json("do login");
    return;
  }
  console.log(req.body);
  if (req.body.post.liked === false) {
    newlike = {
      post_id: req.body.post._id,
      user_id: req.body.user._id,
      userName: req.body.user.displayName,
      userId: req.body.user.id,
      date: new Date(),
    };
    console.log(req.body.user);
    console.log(newlike);
    db.collection("posts")
      .updateOne({ _id: ObjectId(req.body.post._id) }, { $inc: { likes: 1 } })
      .then(() => {
        db.collection("likes").insertOne(newlike, function (error, result) {
          console.log(result);
        });
      });
    console.log("likes + 1");
    res.json("i love this");
  } else {
    db.collection("posts")
      .updateOne({ _id: ObjectId(req.body.post._id) }, { $inc: { likes: -1 } })
      .then(() => {
        db.collection("likes").deleteMany({
          $and: [
            { post_id: req.body.post._id },
            { user_id: req.body.user._id },
          ],
        });
      });
    console.log("likes - 1");
    res.json("i dont love this");
  }
});

app.post("/getmylikes", function (req, res) {
  console.log(req.body.user);
  db.collection("likes")
    .find({ user_id: req.body.user._id })
    .toArray()
    .then((result) => {
      console.log(result);
      res.json({ liked: result });
    });
  // console.log(req.body.user);
});

app.post("/chatrooms", function (req, res) {
  db.collection("chatrooms")
    .find({ who_id: req.body.user._id })
    .toArray()
    .then((result) => {
      res.json({ chatrooms: result });
    });
});

app.post("/getmessages", function (req, res) {
  // console.log(req.body.user);
  // console.log(req.body.chatroom_id);
  db.collection("messages")
    .find({ chatroom_id: req.body.chatroom_id })
    .toArray()
    .then((result) => {
      // console.log(result);
      res.json({ targetMessages: result });
    });
});

app.post("/sendmessage", function (req, res) {
  // console.log(req.body.newMessage);
  db.collection("messages")
    .insertOne(req.body.newMessage)
    .then((result) => {
      console.log("sended a message");
      // console.log(result);
    });
});

io.on("connection", (socket) => {
  // console.log('soket on')
  socket.on("JOIN_ROOM", (chatroom) => {
    console.log("joined chatroom");
    console.log(chatroom._id);
    socket.join(chatroom._id);
  });

  socket.on("DISCONNET", () => {
    console.log("connection closed");
  });

  socket.on("ROOM_SEND", (message) => {
    console.log("emitted a message");
    console.log(message);
    io.to(message.chatroom_id).emit("ROOM_MESSAGE", message);
  });
});

app.post("/checkchatroomandcreateone", function (req, res) {
  console.log(req.body.post);
  console.log(req.body.user);
  if (req.body.user._id !== req.body.post.author_id) {
    db.collection("chatrooms")
      .findOne({ who_id: req.body.user._id, who_id: req.body.post.author_id })
      .then((result) => {
        console.log(result);
        res.json({ chatroom: result });
      });
  }

  // let newChatroom = {
  //   who_id: [req.body.post.author_id, req.body.user._id],
  //   whoName:  [req.body.post.authorName, req.body.user._id],
  //   date: new Date(),
  //   latestDate: new Date(),
  //   self: false,
  // };
  // db.collection('chatrooms').insertOne(newChatroom, function (error, result) {
  //   console.log(result);
  // });
});

app.use(express.static(path.join(__dirname, "./../build")));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "./../build/index.html"));
});

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./../build/index.html"));
});
