const express = require("express");
const cors = require("cors");
const { randomBytes } = require("crypto");
const axios = require("axios");

const app = express();
const port = 4000;

// all global middlewares
app.use(express.json());
app.use(cors());

const posts = {};

// fatching all posts.
app.get("/posts", (req, res) => {
  res.send(posts);
});

// creating new post.
app.post("/posts", async (req, res) => {
  const id = randomBytes(4).toString("hex");
  const { title } = req.body;
  posts[id] = {
    id,
    title,
  };
  await axios.post(`http://localhost:4005/events`, {
    type: "PostCreated",
    data: {
      id,
      title,
    },
  });
  res.status(201).send(posts[id]);
});

// listening to event-bus.
app.post("/events", (req, res) => {
  console.log("EventRecieved : ", req.body.type);
  return res.send({});
});

app.listen(port, () =>
  console.log(`posts service is running on port : ${port}`)
);
